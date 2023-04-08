import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';

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
    color: 'dark',
    weekdays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    monthPickerFormat: ['Ene', 'Feb', 'Mar', 'Abr', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  };
  AgregarFecha() {

    let n = [((new Date()).toDateString())]
    let a = moment().format('ddd MMM DD YYYY h:mm:ss a')
    console.log('a: ' + a)
    console.log('Date: ' + new Date())
    console.log('dateM: ' + this.dateMulti)
    this.dateMulti.map(e => {
      console.log('e: ' + e)
      console.log('e_d: ' + e['_d']);
      n.push('' + e['_d'])
    })
    this.dateMulti = n
    console.log(this.dateMulti)

  }

  OnChange(event) {
    this.dateMulti.map(e => {
      console.log(e)
    })
    /*let nuew = []
      this.dateMulti.map(e => {
        let a = (moment(e['_d']).format("ddd MMM DD YYYY"));
        //console.log((moment(e['_d']).format("ddd MMM DD YYYY")));
        //console.log(a);
        for (let index = 0; index < 17; index++) {
          let b = moment(a, "ddd MMM DD YYYY");        
          b.add((index * 7), 'days');
          b.format("ddd MMM DD YYYY");
          console.log(b)
          nuew.push(b)
          console.log(nuew) 
        }
        //console.log(b.format("ddd MMM DD YYYY"))
        this.dateMulti = nuew;
      })*/
  }

  constructor() { }
}
/*



*/