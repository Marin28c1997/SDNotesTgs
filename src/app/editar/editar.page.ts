import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service'; 
import { AlertController, NavController } from '@ionic/angular';

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
  Note:number[];
  Porcent:number[];
  Semester:string
  private path = '/Subjects'; 

  constructor(private route: ActivatedRoute,
  private firestore: AngularFirestore,
  public firestoreService:FirestoreService,
  private alertController: AlertController, public navegacion: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firestoreService.getDoc(this.path, this.id).subscribe(res => {
      if (res) {
        this.Name = res['Name'];
        this.Central = res['Central'];
        this.Teacher = res['Teacher'];
        this.Room = res['Room'];
        this.Credits = res['Credits'];
        this.Note = res['Note'];
        this.Porcent = res['Porcent'];
        console.log("hey",this.Note)
        console.log("hey",this.Porcent)
        this.Semester = res['Semester'];
      }
    });
  }

  notas = [
    { nota: null, porcentaje: null }
  ];

  async eliminarNota(i: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar nota',
      message: '¿Está seguro que desea eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.notas.splice(i, 1);
          }
        }
      ]
    });
    await alert.present();
  }

  
  agregarNota() {

    this.notas.push({ nota: "", porcentaje: "" });
  }
  guardarNotas() {
    this.Note = [];
    this.Porcent = [];
  
    this.notas.forEach(nota => {
      if (nota.nota !== null && nota.porcentaje !== null) {
        this.Note.push(nota.nota);
        this.Porcent.push(nota.porcentaje);
      }
    });
  }

  guardarAsig() {
    const data = {
      Name: this.Name,
      Central: this.Central,
      Teacher: this.Teacher,
      Room: this.Room,
      Credits: this.Credits,
      Semester: this.Semester,
      Note:this.Note,
      Porcent:this.Porcent
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
