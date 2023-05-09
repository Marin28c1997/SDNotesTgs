import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage {

  notas = [
    { nota: "", porcentaje: "" }
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


  calcularNota() {
    let suma = 0;
    let porcentajeTotal = 0;

    for (let nota of this.notas) {
      let valorNota = parseFloat(nota.nota || "0");
      let valorPorcentaje = (parseFloat(nota.porcentaje || "0")/100);
      suma += valorNota * valorPorcentaje;
    }

    this.sumas = suma

    if (this.sumas >= 3) {
      this.pasar = "😊 Pasaste con: " + (this.sumas+'').substr(0,4)
    } else {
      this.pasar = "😔 Te falta para pasar: " + ((3 - this.sumas)+'').substr(0,4)
    }
  }

  constructor(private alertController: AlertController,
    public navegacion: NavController) {

  }

}
