import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { async } from '@firebase/util';
import { AlertController, NavController } from '@ionic/angular';
import { User } from '../models';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestorageService } from '../services/firestorage.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  login: User = {
    uid: '',
    nombre: '',
    email: '',
    password: '',
    confirpassword: '',
    usuario: '',
  };
  formularioRegistro: FormGroup;

  uid = '';

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navegacion: NavController,
    public firebaseauthService: FirebaseauthService,
    public firestorageService: FirestorageService,
    public firestoreService: FirestoreService
  ) {
    this.firebaseauthService.stateAuth().subscribe(res => {
      if (res !== null) {
        this.uid = res.uid;
        this.getUserInfo(this.uid);
      }
    });
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

    const res = await this.firebaseauthService
      .registrar(credenciales.email, credenciales.password)
      .catch((err) => {
        console.log('error ->', err);
      });
    const uid = await this.firebaseauthService.getUid();
    this.login.uid = uid;
    this.guardarUser();
    this.navegacion.navigateRoot('inicio');
  }

  async guardarUser() {
    const path = 'Usuarios';
    const name = this.login.nombre;
    this.firestoreService
      .creatDoc(this.login, path, this.login.uid)
      .then((res) => {
        console.log('guardado');
      })
      .catch((error) => { });
  }


  getUserInfo(uid: string) {
    const path = 'Usuarios';
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

}
