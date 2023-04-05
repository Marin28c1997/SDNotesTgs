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
  Central: string;
  Credits: number;
  Name: string;
  Notes:{
    Note: number,
    Porcent: number
  };
  Room: number;
  Teacher: string;
  userId: string;
}