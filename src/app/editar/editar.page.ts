import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';

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
  Room:number;
  Credits: number;
  Note: number[];
  Porcent: number[];
  Semester: string;
  Datat: string;

  private path = '/Subjects';
  loading: any;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public firestoreService: FirestoreService,
    private alertController: AlertController,
    public navegacion: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firestoreService.getDoc(this.path, this.id).subscribe((res) => {
      if (res) {
        this.Name = res['Name'];
        this.Central = res['Central'];
        this.Teacher = res['Teacher'];
        this.Room = res['Room'];
        this.Credits = res['Credits'];
        this.Note = res['Note'];
        this.Porcent = res['Porcent'];
        console.log('hey', this.Note);
        console.log('hey', this.Porcent);
        this.Semester = res['Semester'];
        this.Datat = res['Datat'];
      }
    });
  }

  notas = [{ nota: null, porcentaje: null }];

  async eliminarNota(i: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar nota',
      message: '¿Está seguro que desea eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.notas.splice(i, 1);
          },
        },
      ],
    });
    await alert.present();
  }

  agregarNota() {
    this.notas.push({ nota: '', porcentaje: '' });
  }
  guardarNotas() {
    this.Note = [];
    this.Porcent = [];

    this.notas.forEach((nota) => {
      if (nota.nota !== null && nota.porcentaje !== null) {
        this.Note.push(nota.nota);
        this.Porcent.push(nota.porcentaje);
      }
    });
  }

  async guardarAsig() {
    // Verificar si los campos obligatorios están completos
    if (
      !this.Name ||
      !this.Teacher ||
      !this.Semester
    ) {
      this.presentAlert(
        'Error',
        'Por favor complete todos los campos obligatorios marcados con *.'
      );
      return;
    }

    // Validar que el porcentaje no sea mayor a 100 si se ha ingresado
    if (
      this.notas[this.notas.length - 1].porcentaje !== null &&
      (this.notas[this.notas.length - 1].porcentaje > 100 ||
        this.notas[this.notas.length - 1].porcentaje < 1)
    ) {
      this.presentAlert('Error', 'El porcentaje debe estar entre 1 y 100');
      return;
    }

    // Validar que la nota no sea mayor a 5 ni menor a 1 si se ha ingresado
    if (
      this.notas[this.notas.length - 1].nota !== null &&
      (this.notas[this.notas.length - 1].nota > 5 ||
        this.notas[this.notas.length - 1].nota < 1)
    ) {
      this.presentAlert('Error', 'La nota debe estar entre 1 y 5');
      return;
    }

    // Validar que los créditos estén entre 1 y 7 si se han ingresado
    if (
      this.Credits !== null &&
      (this.Credits > 7 || this.Credits < 1)
    ) {
      this.presentAlert('Error', 'Los créditos deben estar entre 1 y 7');
      return;
    }

    // Validar que el salón esté entre 1 y 17 si se ha ingresado
    if (
      this.Room !== null &&
      (this.Room > 17 || this.Room < 1)
    ) {
      this.presentAlert('Error', 'El salón debe estar entre 1 y 17');
      return;
    }

    this.guardarNotas();

    const data = {
      Name: this.Name,
      Central: this.Central,
      Teacher: this.Teacher,
      Room: this.Room,
      Credits: this.Credits,
      Semester: this.Semester,
      Note: this.Note,
      Porcent: this.Porcent,
      Datat: this.Datat,
    };
    try {
      await this.firestoreService.updateDoc(data, this.path, this.id);
      this.presentLoading();
      this.navegacion.navigateRoot('tabs');
    } catch (error) {
      console.log(error);
      this.presentToast('La asignatura no se pudo actualizar exitosamente');
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'secondary',
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      duration: 2000,
      message: 'Guardando',
    });
    await this.loading.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
