export interface User {
  uid: string;
  email: string;
  password: string;
  usuario: string;
  confirpassword: string;
}


export interface Google {
  uid: string;
  email: string;
  photoURL:string,
  usuario:string
}


export interface Subjects {
  Note: any[]; 
  Porcent: any[]; 
  Central: string;
  Credits: number;
  Name: string;
  Room: number;
  Teacher: string;
  userId: string;
  id:string
  Semester:string
}
