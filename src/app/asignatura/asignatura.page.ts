import { Component, OnInit } from '@angular/core'; 
import { Google, Subjects, User } from '../models'; 
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { FirestoreService } from '../services/firestore.service'; 
import firebase from 'firebase/compat/app'; 


@Component({ 
  selector: 'app-asignatura', 
  templateUrl: 'asignatura.page.html', 
  styleUrls: ['asignatura.page.scss'] 
}) 
export class AsignaturaPage implements OnInit { 
  userId: string; 
  userName:string 
  Subjects: Subjects[] = []; 
  private path = '/Subjects'; 

  constructor( 
    public firestorageSerive:FirestoreService, 
    private afAuth: AngularFireAuth
  ) { } 

  ngOnInit() { 
    this.afAuth.authState.subscribe(user => { 
      if (user) { 
        this.userId = user.uid; 
        this.userName = user.displayName;
        this.getSubjects(); 
        this.getUserInfo(user); 
      } 
    }); 
  
  } 

  getSubjects(){ 
    this.firestorageSerive.getCollection<Subjects>(this.path, ref => ref.where('userId', '==', this.userId)).subscribe(res => { 
      this.Subjects=res; 
    }) 
  } 

  isGoogleUser = false; 

  getUserInfo(user: firebase.User) { 
    console.log("hola", user) 
    if (user.providerData.length > 0 && user.providerData[0].providerId === 'google.com'){ 
      console.log("hol", user) 
      this.firestorageSerive.getDoc<Google>(`Users/${this.userId}`, this.userId).subscribe(res => { 
        console.log("holass", user) 
        this.userName = res.usuario; 
        this.isGoogleUser = true; 
        console.log("AQUI",this.userName) 
        console.log(this.userId) 
        console.log("hola") 
      }); 
    } else { 
      console.log('not a google user') 
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
  } 
}
