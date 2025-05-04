const axios = require('axios');
const cloudinary = require("cloudinary").v2;
const docx = require("docx");
const {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
} = docx;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const apiKey = process.env.OPENAI_API_KEY;  // Ensure the API key is fetched from the environment
const baseUrl = 'https://api.netmind.ai/inference-api/openai/v1';
const model = 'meta-llama/Llama-4-Maverick-17B-128E-Instruct';

exports.handler = async (req, res) => {
  const { name, industry, description } = req.body;

  if (!name || !industry || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulated delay

    const chatCompletionRequest = {
      model,
      messages: [
        { role: 'system', content: 'Act like you are a helpful assistant.' },
        { 
          role: 'user', 
          content: `Generate a business plan for ${name} in ${industry}, outlining ${description}. Return JavaScript array with section and content JSON properties, kept in a consistent format.`
        },
      ],
      max_tokens: 512,
    };

    const response = await axios.post(`${baseUrl}/chat/completions`, chatCompletionRequest, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    let arr = response.data.choices[0].message.content.trim();
    arr = arr.slice(1, -1);  // Assuming the response is wrapped in unnecessary quotes

    try {
      // Process and clean the JSON response
      const cleanedJson = JSON.parse(arr);
      const parsedArray = cleanedJson.map(item => ({
        ...item,
        content: item.content.replace(/\\/g, ""),
      }));

      let sectionNumber = 1;
      let allParagraphs = [];

      const businessNameHeading = new Paragraph({
        text: `${name} Business Plan`,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      });
      allParagraphs.push(businessNameHeading);

      if (Array.isArray(parsedArray)) {
        parsedArray.forEach((section) => {
          const sectionTitle = new Paragraph({
            text: `${sectionNumber}. ${section.section}`,
            heading: HeadingLevel.HEADING_1,
          });
          allParagraphs.push(sectionTitle, new Paragraph({ text: "" }));

          const contentParagraphs = section.content.split("\n").map(contentItem => new Paragraph({
            text: contentItem,
            spacing: { after: 200 },
          }));
          
          allParagraphs.push(...contentParagraphs);
          sectionNumber++;
        });

        const doc = new Document({ sections: [{ children: allParagraphs }] });
        const buffer = await Packer.toBuffer(doc);

        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "raw" },
            (error, result) => {
              if (error) {
                console.error("Error uploading to Cloudinary:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(buffer);
        });

        res.status(200).json({ url: uploadResult.secure_url });
      } else {
        console.error("Parsed content is not an array.");
        res.status(400).json({ message: "Parsed content is not valid." });
      }
    } catch (parseError) {
      console.error("Error parsing the content as JSON:", parseError);
      res.status(400).json({ message: "Bad Request: Invalid JSON" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};