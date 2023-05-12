import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseauthService {
  constructor(public auth: AngularFireAuth) {
    this.getUid()
  }

async resetPassword(email:string):Promise<void>{
  try {
    return this.auth.sendPasswordResetEmail(email)
  } catch (error) {
    alert("Hubo un error")
  }
}

  async login(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      return true; // return true if login successful
    } catch (error) {
      console.log(error);
      return false; // return false if login failed
    }
  }

 async logout(): Promise<boolean> {
  try {
    await this.auth.signOut();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

  async registrar(email: string, password: string) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      return true; // return true if registration successful
    } catch (error) {
      console.log(error);
      return false; // return false if registration failed
    }
  }

  async loginGoogle() {
    //try {
      const prov = new firebase.auth.GoogleAuthProvider();
      const res = await this.auth.signInWithPopup(prov)
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user === null) {
      return null;
    } else {
      return user.uid;
    }
  }

  stateAuth() {
    return this.auth.authState;
  }


  async verificarEmailExistente(email: string) {
    try {
      const result = await this.auth.fetchSignInMethodsForEmail(email);
      if (result.length > 0) {
        // El correo electrónico ya está registrado en Firebase
        return true;
      } else {
        // El correo electrónico no está registrado en Firebase
        return false;
      }
    } catch (error) {
      console.log(error);
      return false; // return false en caso de error
    }
  }
  
}



