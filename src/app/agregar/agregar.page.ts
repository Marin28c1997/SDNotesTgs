import { Component, OnInit } from '@angular/core';
import { FirestorageService } from '../services/firestorage.service';

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
  constructor(public firestorageService: FirestorageService) {}

  ngOnInit() {}

  guardarAsig() {
   
    const data = {
      name: this.name,
      teacher: this.teacher,
      salon: this.salon,
      lugar: this.lugar,
      credits: this.credits,
    };
     const path = 'Prueba';
     const id = '011';
    this.firestorageService.creatDoc(data, path,id)
  }
}
