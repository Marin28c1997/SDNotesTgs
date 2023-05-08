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
  ac = (this.fecactual.substring(0, 3) != 'Sun') ?
    moment((moment(this.fecactual).endOf('week'))['_d']).format("ddd MMM DD YYYY") :
    this.fecactual
  wk = [];
  show = [];
  str = '';
  type: 'string';
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    weekdays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    monthPickerFormat: ['Ene', 'Feb', 'Mar', 'Abr', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekStart: 1

  };

  clacend() {
    this.show = [];
    this.str = '';
    this.wk = [];
    let ffin = moment(this.ac, "ddd MMM DD YYYY");
    if (this.fecactual.substring(0, 3) != 'Sun') {
      ffin.add(1, 'days');
    }
    let final = (moment(ffin['_d']).format("ddd MMM DD YYYY"));
    let au = true;
    for (let index = 0; index < 7; index++) {
      let b = moment(this.fecactual, "ddd MMM DD YYYY");
      b.add(index, 'days');
      b.format("ddd MMM DD YYYY");
      let c = (moment(b['_d']).format("ddd MMM DD YYYY"));
      if (c == final) {
        this.wk.push(b);
        au = false;
      } else {
        if (au) {
          this.wk.push(b);
        }
      }
    }
    let nuew = [];
    let i = 0;
    this.Subjects.map(e => {
      let a = moment(e.Datat.split('---')[1]);
      for (let index = 0; index < 17; index++) {
        let b = moment(a, "ddd MMM DD YYYY");
        b.add((index * 7), 'days');
        b.format("ddd MMM DD YYYY");
        nuew.push([i, b])
      }
      i += 1;
    })
    let newdate = [];
    this.wk.map(e => {
      let tt = (moment(e['_d']).format("ddd MMM DD YYYY"));
      nuew.map(el => {
        let te = (moment(el[1]['_d']).format("ddd MMM DD YYYY"));
        if (tt == te) {
          newdate.push(moment(tt))
          this.show.push(this.Subjects[el[0]]);
          this.str += '\n' + tt.substring(4, 0) + ' día:' + tt.substring(7, 10)
        }
      })
    })
    this.dateMulti = newdate;
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
            //console.log(this.Subjects)
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
    this.clacend();
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
