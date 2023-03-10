import { Component } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage {

  schedule = [
    { day: 'Lunes',  class: 'Matemáticas' },
    { day: 'Martes',  class: 'Historia' },
    { day: 'Miércoles',  class: 'Inglés' },
    { day: 'Jueves',  class: 'Ciencias' },
    { day: 'Viernes',  class: 'Educación Física' }
  ];

  constructor() { }

}
