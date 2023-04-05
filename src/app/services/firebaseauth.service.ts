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
    try {
      await this.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      return true; // return true if login successful
    } catch (error) {
      console.log(error);
      return false; // return false if login failed
    }
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
}



// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/database';

// @Injectable({
//   providedIn: 'root',
// })
// export class FirebaseauthService {
//   constructor(public auth: AngularFireAuth, ) {
//     this.getUid();
//   }

//   login(email: string, password: string) {
//     return this.auth.signInWithEmailAndPassword(email, password);
//   }
//   logout() {
//     return this.auth.signOut();
//   }

//   registrar(email: string, password: string) {
//     return this.auth.createUserWithEmailAndPassword(email, password);
//   }

//   async loginGoogle() {
//     try {
//       return this.auth.signInWithPopup(
//         new firebase.auth.GoogleAuthProvider()
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async getUid() {
//     const user = await this.auth.currentUser;
//     if (user === null) {
//       return null;
//     } else {
//       return user.uid;
//     }
//   }

//   stateAuth() {
//     return this.auth.authState;
//   }
// }

