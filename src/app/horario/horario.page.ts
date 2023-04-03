import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage {
  dateMulti: string[];
  type: 'string';
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    color: 'danger',
  };

  AgregarFecha() {
    console.log(this.dateMulti)
    this.dateMulti=[((new Date()).toDateString())]
  }
  constructor() { }
}
