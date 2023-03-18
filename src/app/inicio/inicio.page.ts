import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage {

  notas = [
    { nota: "", porcentaje: "" },
    { nota: "", porcentaje: "" }
  ]; // Inicializamos la matriz de notas con un objeto vacío

  sumas =0;
  pasar="";

  agregarNota() {
    this.notas.push({ nota: "", porcentaje: "" });
  }

  calcularNota() {
    let suma = 0;
    let porcentajeTotal = 0;
  
    for (let nota of this.notas) {
      let valorNota = parseFloat(nota.nota || "0");
      let valorPorcentaje = parseFloat(nota.porcentaje || "0");
      suma += valorNota * valorPorcentaje;
      porcentajeTotal += valorPorcentaje;
    }

    this.sumas = suma/porcentajeTotal
    
    if(this.sumas >= 3){
      this.pasar = "Felicidades pasaste con una nota de: " + this.sumas
    }else{
      this.pasar = "Aún le falta para pasar, echale ganas compa te falta: " + (3 - this.sumas)
    }
  }
  

  constructor() {

  }

}
