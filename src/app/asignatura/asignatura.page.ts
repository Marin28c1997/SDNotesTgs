import { Component, OnInit } from '@angular/core';
import { Subjects } from '../models';

import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-asignatura',
  templateUrl: 'asignatura.page.html',
  styleUrls: ['asignatura.page.scss']
})
export class AsignaturaPage implements OnInit {

  Subjects: Subjects[] = [];
  private path = '/Subjects';
  constructor(
    public firesoreageSerive:FirestoreService) {
  }

  ngOnInit() {
    this.getSubjects()
  }

  getSubjects(){
    this.firesoreageSerive.getCollection<Subjects>(this.path).subscribe( res =>
      {
        this.Subjects=res;
      })
  }
}
