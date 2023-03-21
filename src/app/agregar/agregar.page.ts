import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  name: string;
  teacher: string;
  salon: number;
  lugar: string;
  credits: number;
  constructor(public firestorageService: FirestoreService) {}

  ngOnInit() {}

  guardarAsig() {
   
    const data = {
      name: this.name,
      teacher: this.teacher,
      salon: this.salon,
      lugar: this.lugar,
      credits: this.credits,
    };
     const path = '/Subjects';
     const id = '50';
    this.firestorageService.creatDoc(data, path,id)

    
  }
}
