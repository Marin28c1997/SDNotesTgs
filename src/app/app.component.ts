import { Component } from '@angular/core';
import { FirebaseauthService } from './services/firebaseauth.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
   private firebaseauthService: FirebaseauthService,
   private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.toggle('dark');
      }
    });
  }
}
