import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CalendarModule } from 'ion2-calendar';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
/////////////////////////////////////////
//import { FCM } from '@ionic-native/fcm'


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserModule,
    IonicModule.forRoot(),
    CalendarModule,
    HttpClientModule,
    AngularFireModule,//Modulo 1 a importa
    AngularFireAuthModule // Modulo 2 a importar
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, GooglePlus],
  bootstrap: [AppComponent],
})
export class AppModule {}


