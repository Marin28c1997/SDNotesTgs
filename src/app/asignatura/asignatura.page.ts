import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-asignatura',
  templateUrl: 'asignatura.page.html',
  styleUrls: ['asignatura.page.scss']
})
export class AsignaturaPage {

  constructor(private platform: Platform) {
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
