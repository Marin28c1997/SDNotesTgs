import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service'; 

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  id: string;
  Name: string;
  Central: string;
  Teacher: string;
  Room: string;
  Credits:string;
  Notes:{
    Note: string,
    Porcent:string
  };

  private path = '/Subjects'; 

  constructor(private route: ActivatedRoute,
  private firestore: AngularFirestore,
  public firestoreService:FirestoreService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firestoreService.getDoc(this.path, this.id).subscribe(res => {
      if (res) {
        const params = this.route.snapshot.params;
        this.Name = res['Name'];
        this.Central = res['Central'];
        this.Teacher = res['Teacher'];
        this.Room = res['Room'];
        this.Credits = res['Credits'];
        this.Notes.Note= res['Note'];
        this.Notes.Porcent =res['Porcent'];
        console.log("AquieA",params['Notes.Note']);
      }
    });
    this.guardarAsig()
  }

  notas = [
    { nota: null, porcentaje: null }
  ];

  agregarNota() {

    this.notas.push({ nota: "", porcentaje: "" });
  }

  guardarAsig() {
    const data = {
      Name: this.Name,
      Central: this.Central,
      Teacher: this.Teacher,
      Room: this.Room,
      Credits: this.Credits,
      Notes: {
        Note:this.Notes.Note,
        Porcent: this.Notes.Porcent
      }
    };
    this.firestoreService.updateDoc(data, this.path, this.id)
      .then(() => {
        console.log('Documento actualizado exitosamente');
      })
      .catch(error => {
        console.log(error);
      });
    }

}
