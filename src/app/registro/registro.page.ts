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
import { FirestoreService } from '../services/firestore.service';
import Swal from 'sweetalert2';


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

    if ((this.login.email && this.login.password && this.login.usuario && this.login.confirpassword
    )=== '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debe llenar todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(credenciales.email)) {
      const alert = await this.alertController.create({
        header: 'Error de correo',
        message: 'Ingrese un correo electrónico válido',
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
      buttons: ['OK']
    });
    await alerts.present();
    this.login.uid= '';
    this.login.email= '';
    this.login.password= '';
    this.login.confirpassword= '';
    this.login.usuario= '';
  }

  async guardarUser() {
    const path = 'Users';
    const uid = await this.firebaseauthService.getUid();
    // this.uid = uid;
    this.firestoreService.creatDoc(this.login, path, this.login.uid)
      // .creatDoc(this.login, path, this.uid)
      .then((res) => {
        console.log('guardado');
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
}
