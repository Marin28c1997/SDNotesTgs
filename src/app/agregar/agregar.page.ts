import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Subjects } from '../models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  
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

  newSubjects : Subjects = {
    Central: '',
    Credits: null,
    Room: null,
    Name: '',
    Teacher: '',
    userId: null,
    Semester: null,
    id: this.firestorageService.getId(),
    Note: [],
    Porcent:[]
  };

  private path = '/Subjects';

  constructor(public firestorageService: FirestoreService,
    private afAuth: AngularFireAuth,
    private alertController: AlertController, public navegacion: NavController) {}

  ngOnInit() {}


  guardarNotas() {
    this.newSubjects.Note = [];
    this.newSubjects.Porcent = [];
  
    this.notas.forEach(nota => {
      if (nota.nota !== null && nota.porcentaje !== null) {
        this.newSubjects.Note.push(nota.nota);
        this.newSubjects.Porcent.push(nota.porcentaje);
      }
    });
  }

  
  async guardarAsig() {

    // Verificar si los campos obligatorios están completos
    if (!this.newSubjects.Name || !this.newSubjects.Teacher || !this.newSubjects.Semester) {
      this.presentAlert('Error', 'Por favor complete todos los campos obligatorios marcados con *.');
      return;
    }
  
    // Validar que el porcentaje no sea mayor a 100 si se ha ingresado
    if (this.notas[this.notas.length - 1].porcentaje !== null && (this.notas[this.notas.length - 1].porcentaje > 100 || this.notas[this.notas.length - 1].porcentaje < 1)) {
      this.presentAlert('Error', 'El porcentaje debe estar entre 1 y 100');
      return;
    }
  
    // Validar que la nota no sea mayor a 5 ni menor a 1 si se ha ingresado
    if (this.notas[this.notas.length - 1].nota !== null && (this.notas[this.notas.length - 1].nota > 5 || this.notas[this.notas.length - 1].nota < 1)) {
      this.presentAlert('Error', 'La nota debe estar entre 1 y 5');
      return;
    }
  
    // Validar que los créditos estén entre 1 y 7 si se han ingresado
    if (this.newSubjects.Credits !== null && (this.newSubjects.Credits > 7 || this.newSubjects.Credits < 1)) {
      this.presentAlert('Error', 'Los créditos deben estar entre 1 y 7');
      return;
    }
  
    // Validar que el salón esté entre 1 y 17 si se ha ingresado
    if (this.newSubjects.Room !== null && (this.newSubjects.Room > 17 || this.newSubjects.Room < 1)) {
      this.presentAlert('Error', 'El salón debe estar entre 1 y 17');
      return;
    }
  
    this.guardarNotas();
    this.afAuth.authState.subscribe(user => { // obtener usuario actual
      if (user) {
        const id = this.firestorageService.getId();
        this.newSubjects.userId = user.uid; // establecer campo userId
        
        this.firestorageService.creatDoc(this.newSubjects, this.path, this.newSubjects.id)
          .then(() => {
            this.presentAlertConfirm('Agregar más', '¿Desea agregar más asignaturas?', 'Sí', 'No');
            this.presentAlert('Éxito', 'La asignatura se ha guardado correctamente.');
           
          })
          .catch(error => {
            this.presentAlert('Error', 'Ha ocurrido un error al guardar la asignatura: ' + error);
          });
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentAlertConfirm(header: string, message: string, yesText: string, noText: string) {
    const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [
            {
                text: noText,
                role: 'cancel',
                handler: () => {
                  this.navegacion.navigateRoot('tabs');
                  }
            },
            {
                text: yesText,
                handler: () => {
                    // Limpiar los campos o agregar lógica adicional para agregar más asignaturas
                    this.newSubjects = {
                        Central: '',
                        Credits: null,
                        Name: '',
                        Room: null,
                        Teacher: '',
                        userId: null,
                        Semester:null,
                        id:this.firestorageService.getId(),  
                        Note: [],
                        Porcent: []
                        // Continuar con los campos restantes
                    };
                    this.guardarAsig(); 
                }
            }
        ]
    });

    await alert.present();
}

}
