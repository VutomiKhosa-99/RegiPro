import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { answers } from 'src/app/interfaces/questions';
import { Router } from '@angular/router';
import { ResponsesService } from 'src/app/services/responses.service';
import { BusinessService } from 'src/app/services/store/business.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent implements OnInit {
  step: any = 1;

  errorMessage = '';

  questionsArray: answers[] = [];

  currentUser: any;

  form1: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  form2: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
  });

  submitted = false;
  submitted2 = false;


  constructor(
    private busService: BusinessService,
    private storageService: StorageService,
    private route: Router,
    private respService: ResponsesService,
    public loaderService: LoaderService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  submit() {
    this.submitted = true;

    if (this.form1.invalid) {
      return;
    }

    this.questionsArray.push(this.form1.value);

    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }

  submit2() {
    this.submitted2 = true;

    if (this.form2.invalid) {
      return;
    }

    this.questionsArray.push(this.form2.value);
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }

  submitIndustry(value : string) {
    this.submitted = true;

    this.questionsArray.push({ industry: value });

    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }

  submitPlan(value: string): void {
    this.submitted = true;

    this.questionsArray.push({ hasBusinessPlan: value });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  
  submitReg(value: string): void {
    this.submitted = true;

    this.loaderService.show(); // Show the loader

    this.questionsArray.push({ isRegistered: value });

    this.storageService.saveAnswers(this.questionsArray);
    
    const savedAnswers = this.storageService.getAnswers();

    let name = savedAnswers[0].name, industry = savedAnswers[1].industry, description = savedAnswers[2].description, hasBusinessPlan = savedAnswers[3].hasBusinessPlan, isRegistered = savedAnswers[4].isRegistered;
   
    this.respService.response(name, industry, description, isRegistered, hasBusinessPlan).subscribe({
      next: data => {
        this.addBusiness(data.response)
        console.log(data);
        this.toast.success({detail:"SUCCESS",summary: data.message, duration:5000});
        this.route.navigate(['/steps']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        
        console.log(this.errorMessage);

        this.toast.error({detail:"ERROR",summary: this.errorMessage, sticky:true});
      },
      complete: () => {
        this.loaderService.hide(); // Hide the loader
      }
    })
    // this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }

  addBusiness(business: answers){
    this.busService.addBusinessSignal(business);
  }

  previous() {
    this.questionsArray.pop();
    this.step = this.step - 1;
    console.log("remaining answers", this.questionsArray)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form1.controls;
  }
  get p(): { [key: string]: AbstractControl } {
    return this.form2.controls;
  }
}