import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage {

  notas = [
    { nota: null, porcentaje: null }
  ]; // Inicializamos la matriz de notas con un objeto vacío

  sumas = 0;
  pasar = "";

  agregarNota() {
    this.notas.push({ nota: "", porcentaje: "" });
  }
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

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (!user) {        
        this.navegacion.navigateRoot('login');
      }})
  }
  calcularNota() {
    let suma = 0;
    let porcentajeTotal = 0;

    
    if (
      this.notas[this.notas.length - 1].nota !== null &&
      (this.notas[this.notas.length - 1].nota > 5 ||
        this.notas[this.notas.length - 1].nota < 1)
    ) {
      this.presentAlert('Error', 'La nota debe estar entre 1 y 5');
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

    for (let nota of this.notas) {
      let valorNota = parseFloat(nota.nota || "0");
      let valorPorcentaje = (parseFloat(nota.porcentaje || "0")/100);
      suma += valorNota * valorPorcentaje;
    }

    this.sumas = suma

    if (this.sumas >= 3) {
      this.pasar = "😊 Pasaste con: " + (this.sumas+'').substr(0,4)
    } else {
      this.pasar = "😔 Necesitas un: " + ((3 - this.sumas)+'').substr(0,4)
    }
  }

  constructor(private alertController: AlertController,
    public navegacion: NavController,
    private afAuth: AngularFireAuth,) {

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
