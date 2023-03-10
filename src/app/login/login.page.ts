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

  login: User = {
    uid: '',
    email: '',
    nombre:'',
    confirpassword:'',
    password: '',
    usuario: '',
  };

  name;
  email;

  newFile: any;
  constructor( private afAuth: AngularFireAuth, private   firebaseauthService: FirebaseauthService,
    public navegacion: NavController, ) {}

  ngOnInit() {}



  async loginGoogles() {
    try{
      this.firebaseauthService.loginGoogle();
    }catch(error){
      console.log(error);
    }

    this.navegacion.navigateRoot('inicio');
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
}
