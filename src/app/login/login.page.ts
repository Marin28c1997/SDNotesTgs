import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { User } from '../models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  email: string;
  password: string;


  newFile: any;
  constructor( private afAuth: AngularFireAuth, private   firebaseauthService: FirebaseauthService,
    public navegacion: NavController, public alertController:AlertController) {
      
    }

  ngOnInit() {}



  async loginGoogles() {
    try{
      await this.firebaseauthService.loginGoogle();
      this.navegacion.navigateRoot('tabs');
    }catch(error){
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
        message: 'Usuario no registrado.',
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
