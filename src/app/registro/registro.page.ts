import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestoreService } from '../services/firestore.service';
import { Google, User } from '../models';
import { AngularFireAuth } from '@angular/fire/compat/auth';


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
    private afAuth: AngularFireAuth
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


  async loginGoogles() {
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
