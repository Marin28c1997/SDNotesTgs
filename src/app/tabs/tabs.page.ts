import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userPhotoURL: string;
  user: firebase.User;

  constructor(private platform: Platform,
    private afAuth: AngularFireAuth) {
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
}
