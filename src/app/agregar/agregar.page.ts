import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Subjects } from '../models';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  
  notas = [
    { nota: "", porcentaje: "" }
  ];

  agregarNota() {
    this.notas.push({ nota: "", porcentaje: "" });
  }

  newSubjects : Subjects = {
    Central: '',
    Credits: null,
    Name: '',
    Notes:{
      Note: null,
      Porcent: null
    },
    Room: null,
    Teacher: '',
  };

  private path = '/Subjects';


  constructor(public firestorageService: FirestoreService) {}

  ngOnInit() {}

  guardarAsig() {
     const id = this.firestorageService.getId();
    this.firestorageService.creatDoc(this.newSubjects, this.path,id)

    
  }
}
