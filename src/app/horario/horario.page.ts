import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';
import { Subjects } from '../models';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  userId: string;
  Subjects: Subjects[] = [];
  private path = '/Subjects';
  dateMulti: string[];
  fecactual = moment().format('ddd MMM DD YYYY');
  ac = moment((moment(this.fecactual).endOf('week'))['_d']).format("ddd MMM DD YYYY");
  wk = [];
  show = [];
  str = '';
  type: 'string';
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    weekdays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    monthPickerFormat: ['Ene', 'Feb', 'Mar', 'Abr', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  };
  t = ((new Date()).toDateString())

  AgregarFecha() {
    /*console.log('ev: '+event.format('ddd MMM DD YYYY h:mm:ss a'))
    let n = [((new Date()).toDateString())]
    let a = moment().format('ddd MMM DD YYYY h:mm:ss a')
    console.log('a: '+a)
    console.log('Date: '+new Date())
    console.log('dateM: '+this.dateMulti)
    this.dateMulti.map(e => {
      console.log('e: '+e)
      console.log('e_d: '+e['_d']);
      n.push(''+e['_d'])
    })
    this.dateMulti = n
    console.log(this.dateMulti)*/
    this.clacend();

  }

  clacend() {
    this.show = [];
    this.str = '';
    this.wk = [];
    let a = moment(this.ac, "ddd MMM DD YYYY");
    a.add(1, 'days');
    let as = (moment(a['_d']).format("ddd MMM DD YYYY"));
    let au = true;
    for (let index = 0; index < 7; index++) {
      let b = moment(this.fecactual, "ddd MMM DD YYYY");
      b.add(index, 'days');
      b.format("ddd MMM DD YYYY");
      let c = (moment(b['_d']).format("ddd MMM DD YYYY"));
      if (c == as) {
        this.wk.push(b);
        au = false;
      } else {
        if (au) {
          this.wk.push(b);
        }
      }
    }
    //console.log('||||||||||||||||||||||||')
    let newdate = [];
    this.wk.map(e => {
      let tt = (moment(e['_d']).format("ddd MMM DD YYYY"));
      this.Subjects.map(el => {
        let te = (el.Datat.split('---')[1]);
        if (tt == te) {
          newdate.push(moment(tt))
          this.show.push(el);
          this.str += '\n' + tt.substring(4, 0) + ' día:' + tt.substring(7, 10)
        }
      })
      //console.log('- '+tt);
      //console.log('-- '+this.str)
    })
    console.log(this.str)
    this.dateMulti = newdate;
    /*let nuew = []
    this.dateMulti.map(e => {
      let a = (moment(e['_d']).format("ddd MMM DD YYYY"));
      for (let index = 0; index < 17; index++) {
        let b = moment(a, "ddd MMM DD YYYY");
        b.add((index * 7), 'days');
        b.format("ddd MMM DD YYYY");
        nuew.push(b)
      }
    })
    this.dateMulti = nuew;*/

    //console.log('||||||||||||||||||||||||')
  }



  getSubjectsForSemester(selectedSemester: string) {
    if (this.userId) { // verifica si this.userId está definido
      if (selectedSemester !== '') {
        this.firestorageSerive.getCollection<Subjects>(
          this.path,
          (ref) =>
            ref.where('userId', '==', this.userId).where('Semester', '==', selectedSemester),
        ).subscribe((res) => {
          if (res.length === 0) {
            // this.presentToast('No hay materias registradas para este semestre.');
            this.Subjects = [];
          } else {
            this.Subjects = res.sort((a, b) => a.Semester.localeCompare(b.Semester));
            console.log(this.Subjects)
            let subdata = [];
            this.Subjects.map(mat => {
              let str = '';
              let data = mat.Datat;
              str += (moment(data)['_d']).toLocaleDateString('es-ES', { weekday: "long" }) + ' a las ' + data.split('T')[1]
              //console.log((moment(data)['_d']).toLocaleDateString('es-ES', {weekday:"long"}))
              subdata.push({
                Note: mat.Note,
                Porcent: mat.Porcent,
                Central: mat.Central,
                Credits: mat.Credits,
                Name: mat.Name,
                Room: mat.Room,
                Teacher: mat.Teacher,
                userId: mat.userId,
                id: mat.id,
                Semester: mat.Semester,
                Datat: str + '---' + moment(mat.Datat).format("ddd MMM DD YYYY"),
              })
            })
            this.Subjects = subdata;
            this.clacend();
          }
        });
      }
    }
  }

  OnChange() {
    //console.log('JIR')
    this.clacend();
    /*this.dateMulti.map(e => {
      console.log(e)
    })*/
    /*console.log('.....')
    console.log(this.fecactual)
    console.log(this.ac)
    console.log('.....')
    let nuew = [];
    console.log("///////////////////")
    this.dateMulti.map(e => {
      let a = (moment(e['_d']).format("ddd MMM DD YYYY"));
      //console.log('a: '+ a)
      //for (let index = 0; index < 7; index++) {
      let b = moment(a, "ddd MMM DD YYYY");
      //b.add(index, 'days');
      let c = (moment(b['_d']).format("ddd MMM DD YYYY"));
      b.format("ddd MMM DD YYYY");
      this.wk.map(el => {
        let d = (moment(el['_d']).format("ddd MMM DD YYYY"));
        //console.log('a: '+ a)
        //for (let index = 0; index < 7; index++) {
        let e = moment(d, "ddd MMM DD YYYY");
        //b.add(index, 'days');
        let f = (moment(e['_d']).format("ddd MMM DD YYYY"));
        if (f==c) {
          console.log(f);
        }
      })
      //nuew.push(b)
      //}
      //console.log(nuew)
      ///let a = (moment(e['_d']).format("ddd MMM DD YYYY"));
      //console.log((moment(e['_d']).format("ddd MMM DD YYYY")));
      //console.log(a);
      ///console.log(e)
      ///console.log(e['_d'])
      ///console.log(moment((moment(a).endOf('week'))['_d']).format("ddd MMM DD YYYY"))
      /*for (let index = 0; index < 17; index++) {
        let b = moment(a, "ddd MMM DD YYYY");        
        b.add((index * 7), 'days');
        b.format("ddd MMM DD YYYY");
        console.log(b)
        nuew.push(b)
        console.log(nuew) 
      }*/
    //console.log(b.format("ddd MMM DD YYYY"))
    //this.dateMulti = nuew;
    //})*/
    //console.log("///////////////////")
  }

  constructor(
    public firestorageSerive: FirestoreService,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.getSubjectsForSemester("Semester");
      }
    });

  }
}
