import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,

} from '@angular/forms';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestoreService } from '../services/firestore.service';
import { Google, User } from '../models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  login : User = {
    uid: '',
    email: '',
    password: '',
    confirpassword: '',
    usuario: '',
  };

  private path = '/Users';
  // uid = '';


  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navegacion: NavController,
    public firebaseauthService: FirebaseauthService,
    public firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private googlePlus: GooglePlus
  ) {
   
  }

  async ngOnInit() {
    
    const uid = await this.firebaseauthService.getUid();
    console.log(uid);
  }


  async registrarse() {
    const credenciales = {
      email: this.login.email,
      password: this.login.password,
    };

    if (this.login.email.trim() === '' || this.login.password.trim() === '' || this.login.usuario.trim() === '' || this.login.confirpassword.trim() === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debe llenar todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const emailRegex = /\S+@correounivalle\.edu\.co/;
    if (!emailRegex.test(credenciales.email)) {
      const alert = await this.alertController.create({
        header: 'Error de correo',
        message: 'Ingrese un correo electrónico válido de correounivalle.edu.co',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    if (credenciales.password.length < 6) {
      const alert = await this.alertController.create({
        header: 'Error de contraseña',
        message: 'La contraseña debe ser mayor a 6 caracteres',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

      if (this.login.password 
      !== this.login.confirpassword) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Las contraseñas no coinciden',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      const emailExistente = await this.firebaseauthService.verificarEmailExistente(credenciales.email);
      if (emailExistente) {
        const alert = await this.alertController.create({
          header: 'Error de correo',
          message: 'Este correo electrónico ya está registrado',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
    
    const res = await this.firebaseauthService
      .registrar(credenciales.email, credenciales.password)
      .catch((err) => {
      alert('Hubo un error al crear el usuario');   
       console.log('error ->', err);
      });
    const uid = await this.firebaseauthService.getUid();
    // this.uid = uid;
    this.login.uid = uid;
    this.guardarUser();

    const alerts = await this.alertController.create({
      header: 'Felicidades',
      message: 'Usuario creado exitosamente',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navegacion.navigateRoot('/tabs'); // Reemplaza "/tabs" con la ruta de tu página de inicio
        }
      }]
    });

    
    await alerts.present();
    this.login.uid= '';
    this.login.email= '';
    this.login.password= '';
    this.login.confirpassword= '';
    this.login.usuario= '';
    
     // Reemplaza "/home" con la ruta de tu página de inicio
    
  }

  async guardarUser() {
    const path = 'Users';
    const uid = await this.firebaseauthService.getUid();
    // this.uid = uid;
    this.firestoreService.creatDoc(this.login, path, this.login.uid)
      // .creatDoc(this.login, path, this.uid)
      .then((res) => {
      })
      .catch((error) => { });
  }


  getUserInfo(uid: string) {
    const path = 'Users';
    this.firestoreService.getDoc<User>(path, uid).subscribe(res => {
      this.login = res;
    });

  }

  showPassword = false;
  passwordToggleIcon = 'eye';

  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }


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


}
