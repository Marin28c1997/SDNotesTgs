export interface User {
  uid: string;
  email: string;
  password: string;
  usuario: string;
  confirpassword: string;
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
}