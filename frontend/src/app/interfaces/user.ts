export interface User {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  id?: string;
  success?:boolean;
  message?:string;
}