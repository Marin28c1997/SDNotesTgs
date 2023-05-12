import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Google, User } from '../models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestoreService } from '../services/firestore.service';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  uid: string;
  email: string;
  password: string;
  photoURL:string;
  usuario:string;


  constructor( private afAuth: AngularFireAuth, private   firebaseauthService: FirebaseauthService,
    public navegacion: NavController, public alertController:AlertController,
    public firestoreService:FirestoreService,
    private platform: Platform,
    private googlePlus: GooglePlus) {
      
    }

  ngOnInit() {}



  loginGoo() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
    } else {
      this.loginGoogleWeb();
    }
  }

  
  async loginGoogleAndroid() {
    try{
    const res = await this.googlePlus.login({
      'webClientId':'71405197754-h569scocea9q3s9mk34spsugr3e8ko20.apps.googleusercontent.com' ,
      'offline': true
    });
    const resConfirmed = await this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
    const users = resConfirmed.user;
    if (users && (await users).email.endsWith('correounivalle.edu.co')) {
    const user: Google = {
      uid: users.uid,
      email: users.email,
      usuario: users.displayName,
      photoURL: users.photoURL
    };
    await this.firestoreService.creatDoc(user, 'Users', user.uid);
  
    this.navegacion.navigateRoot('tabs');
  } else {
    await this.firebaseauthService.logout();
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Solo se permiten usuarios con correo de correounivalle.edu.co',
      buttons: ['OK']
    });
    await alert.present();
  }
} catch(error) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: 'No se pudo iniciar sesión con Google',
    buttons: ['OK']
  });
  await alert.present();
}

  }


async loginGoogleWeb() {
  try{
    await this.firebaseauthService.loginGoogle();
    
    // Obtiene la instancia de FirebaseAuth
    const auth = this.afAuth;
    
    // Obtiene información sobre el usuario actualmente autenticado
    const currentUser = auth.currentUser;
    
    // Verifica si el usuario está autenticado y si su correo electrónico termina en "correounivalle.edu.co"
    if (currentUser && (await currentUser).email.endsWith('correounivalle.edu.co')) {
      
         const user: Google = {
          uid: (await currentUser).uid,
          email: (await currentUser).email,
          usuario: (await currentUser).displayName,
          photoURL: (await currentUser).photoURL
        };
        await this.firestoreService.creatDoc(user, 'Users', user.uid);
      this.navegacion.navigateRoot('tabs');
    } else {
      await this.firebaseauthService.logout();
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Solo se permiten usuarios con correo de correounivalle.edu.co',
        buttons: ['OK']
      });
      await alert.present();
    }
  } catch(error) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se pudo iniciar sesión con Google',
      buttons: ['OK']
    });
    await alert.present();
  }
}

 

 showPassword = false;
 passwordToggleIcon='eye';

 togglePassword():void{
  this.showPassword = !this.showPassword;

  if(this.passwordToggleIcon=='eye'){
    this.passwordToggleIcon = 'eye-off';
  }else{
    this.passwordToggleIcon = 'eye';
  }
 }

 async iniciarSesion() {
  if (!this.email || !this.password) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El correo y la contraseña son obligatorios.',
      buttons: ['OK']
    });

    await alert.present();
  } else {
    const loggedIn = await this.firebaseauthService.login(this.email, this.password);
    if (loggedIn) {
      this.navegacion.navigateRoot('tabs');
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error de contraseña o usuario no registrado.',
        buttons: ['OK']

        
      }
      );
      await alert.present();
    }
    this.email= '';
    this.password= '';
  }
}

}
