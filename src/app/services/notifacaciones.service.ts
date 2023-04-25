import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirebaseauthService } from './firebaseauth.service';
import { FirestorageService } from './firestorage.service';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';


import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotifacacionesService {

  constructor(public platform:Platform,
    public router:Router, 
    public firebaseauthService:FirebaseauthService,
    public firestorageService:FirestorageService,
    public httpClien:HttpClient) { 
      
    }

    inicializar(){
      if(this.platform.is('capacitor')){
        PushNotifications.requestPermissions().then( result => {
          console.log('PushNotifications.requestPermissions()')
          if (result.receive === 'granted') {
            PushNotifications.register();
          }
          else{
            console.log('PushNotifications.requestPermissions()=> no es movil')
          }
        })
      }

      PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
    }

    
}
