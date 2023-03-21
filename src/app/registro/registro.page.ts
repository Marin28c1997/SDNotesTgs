import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { async } from '@firebase/util';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestorageService } from '../services/firestorage.service';
import { FirestoreService } from '../services/firestore.service';


import { User } from './models';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{
  name:string;
  age:number

  formularioRegistro: FormGroup;
  uid = '';


  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navegacion: NavController,
    public firebaseauthService: FirebaseauthService,
    public firestorageService: FirestorageService,
    public firestoreService: FirestoreService,
  ) {
    this.firebaseauthService.stateAuth().subscribe(res => {
      if (res !== null) {
        this.uid = res.uid;
        // this.getUserInfo(this.uid);
      }
    });
  }

  // async ngOnInit() {
  //   const uid = await this.firebaseauthService.getUid();
  //   console.log(uid);
  // }


  // async registrarse() {
  //   const credenciales = {
  //     Email: this.newUser.Email,
  //     Password: this.newUser.Password,
  //   };

  //   const res = await this.firebaseauthService
  //     .registrar(credenciales.Email, credenciales.Password)
  //     .catch((err) => {
  //       console.log('error ->', err);
  //     });
  //   const uid = await this.firebaseauthService.getUid();
  //   this.uid = uid;
  //   this.guardarUser();
  // }

  // async guardarUser() {
  //   const path = '/User';
  //   const name = this.newUser.Username;
  //   this.firestoreService
  //     .creatDoc(this.newUser, path, this.uid)
  //     .then((res) => {
  //       console.log('guardado');
  //     })
  //     .catch((error) => { });
  // }


  // getUserInfo(uid: string) {
  //   const path = 'User';
  //   this.firestoreService.getDoc<User>(path, uid).subscribe(res => {
  //     this.newUser = res;
  //   });

  // }

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

  
  guardar() {
  
    this.name = '';
    this.age = null;
  }

}
