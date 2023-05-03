import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
  providers:[FirebaseauthService]
})
export class ContrasenaPage implements OnInit {

  userEmail = new FormControl('')
  constructor(private auth:FirebaseauthService,
    private router: Router) { }

  ngOnInit() {
  }

 async onReset(){
try {
  const email = this.userEmail.value
  await this.auth.resetPassword(email);
  window.alert('Se ha enviado el reseteo del email')
  this.router.navigate(['/login'])
} catch (error) {
  alert('Hubo un error' + error)
}
    
  }
}
