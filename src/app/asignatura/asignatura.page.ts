import { Component, OnInit } from '@angular/core';
import { Subjects, User } from '../models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-asignatura',
  templateUrl: 'asignatura.page.html',
  styleUrls: ['asignatura.page.scss']
})
export class AsignaturaPage implements OnInit {

  userId: string;
  user: any;

  Subjects: Subjects[] = [];
  private path = '/Subjects';
  constructor(
    public firesoreageSerive:FirestoreService,
    private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
       this.userId = user.uid;
        this.getSubjects();
        this.getUserInfo();
      }
    });
  }
  

  getSubjects(){
    this.firesoreageSerive.getCollection<Subjects>(this.path, ref => ref.where('userId', '==', this.userId)).subscribe(res => {
      this.Subjects=res;
    })
  }
  
  getUserInfo() {
    this.firesoreageSerive.getDoc<User>(`users/${this.userId}`, this.userId).subscribe(res => {
      this.user = res;
    });
  }
   
}
