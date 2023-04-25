import { Component, OnInit } from '@angular/core'; 
import { Google, Subjects, User } from '../models'; 
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { FirestoreService } from '../services/firestore.service'; 
import firebase from 'firebase/compat/app'; 
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import * as moment from 'moment';


@Component({ 
  selector: 'app-asignatura', 
  templateUrl: 'asignatura.page.html', 
  styleUrls: ['asignatura.page.scss'] 
}) 
export class AsignaturaPage implements OnInit { 
  userId: string; 
  userName:string 
  Subjects: Subjects[] = []; 
  private path = '/Subjects'; 


  
  loading:any 
  constructor( 
    public firestorageSerive:FirestoreService, 
    private afAuth: AngularFireAuth,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public toastController:ToastController,
  ) { } 

  ngOnInit() { 
    this.afAuth.authState.subscribe(user => { 
      if (user) { 
        this.userName = user.displayName;
        this.getSubjects(); 
        this.userId = user.uid; 
        this.getUserInfo(user); 
        this.getSubjectsForSemester("Semester");
      } 
    }); 
  
  } 

  

  getSubjects(){ 
    if (this.userId) { // verifica si this.userId está definido
      this.firestorageSerive.getCollection<Subjects>(this.path, ref => ref.where('userId', '==', this.userId)).subscribe(res => { 
        this.Subjects=res;
        console.log(res)
      }); 
    }
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
          this.presentToast('No hay materias registradas para este semestre.');
          this.Subjects = []; 
        } else {
          this.Subjects = res.sort((a, b) => a.Semester.localeCompare(b.Semester));
          console.log(this.Subjects)
          let subdata = [];
          this.Subjects.map(mat => {
            let str = '';
            let data = mat.Datat;
            str += (moment(data)['_d']).toLocaleDateString('es-ES', {weekday:"long"}) + ' a las ' + data.split('T')[1]
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
              Datat: str,
            })
          })
          this.Subjects = subdata;
        }
      });
    } else {
      this.getSubjects();
    }
  }
}


  isGoogleUser = false; 

  getUserInfo(user: firebase.User) { 
    console.log("hola", user) 
    if (user.providerData.length > 0 && user.providerData[0].providerId === 'google.com'){ 
      console.log("hol", user) 
      this.firestorageSerive.getDoc<Google>(`Users/${this.userId}`, this.userId).subscribe(res => { 
        console.log("holass", user) 
        this.userName = res.usuario; 
        this.isGoogleUser = true; 
        console.log("AQUI",this.userName) 
        console.log(this.userId) 
        console.log("hola") 
      }); 
    } else { 
      console.log('not a google user') 
      this.firestorageSerive.getDoc<User>(`Users`, this.userId).subscribe(res => { 
        console.log('got user doc', res) 
        if (res && res.usuario) { 
          this.userName = res.usuario; 
        } else { 
          this.userName = "Usuario"; 
        } 
        console.log("AQUI",this.userName) 
      }, error => { 
        console.log('error getting user doc', error) 
      }); 
    } 
  } 

  async deleteSubject(id: string, path: string) {
    const Subjects =  this.Subjects.find(s => s.id === id);
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Está seguro que desea eliminar la asignatura <strong>"${Subjects.Name}</strong>"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.firestorageSerive.deleteDoc(path, id)
              .then(() => {
                this.presentToast('Asignatura eliminada exitosamente');
              }).catch((error) => {
                console.log('Error al eliminar asignatura', error);
                this.presentToast('Error al eliminar la asignatura');
              });
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async presentToast(msg: string){
    const toast = await this.toastController.create({
      message:msg,
      cssClass:'normal',
      duration:2000,
      color:"warning"
    });
    toast.present();
  }

}
