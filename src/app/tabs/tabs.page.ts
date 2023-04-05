import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FirestoreService } from '../services/firestore.service'; 
import { User } from '../models';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userPhotoURL: string;
  user: firebase.User;
  userId: string; 
  userName:string 
  
  constructor(
    public firestorageSerive:FirestoreService,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private firebaseAuthService: FirebaseauthService,
    public alertController: AlertController,
    public navegacion: NavController
     ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.toggle('dark');
      }

      this.user = await this.afAuth.currentUser;
      this.userPhotoURL = this.user ? this.user.photoURL : '';
      console.log(this.userPhotoURL)
    });



  }

  getUserInfo(user: firebase.User) { 
    this.firestorageSerive.getDoc<User>(`Users`, this.userId).subscribe(res => { 
      console.log('got user doc', res) 
      if (res && res.usuario) { 
        this.userName = res.usuario; 
      } else { 
        this.userName = "Usuario"; 
      } 
      console.log("AQUI",this.userName) 
    }, error => { 
      console.log('error getting user doc', error) 
    }); 

  }
  ngOnInit() { 
    this.afAuth.authState.subscribe(user => { 
      if (user) { 
        this.userId = user.uid; 
        this.userName = user.displayName;
        this.getUserInfo(user); 
      } 
    }); 
  
  } 

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Está seguro de que desea salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            try {
              await this.afAuth.signOut();
              this.navegacion.navigateRoot('login');
              console.log('Logout exitoso');
              // Otros códigos después del logout exitoso
            } catch (error) {
              console.log('Error en el logout', error);
              // Otros códigos después del error en el logout
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  
}
