import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyCOzvWYnpyuR2k-_YqDg7xfIbsF-l-OQ7M',
  authDomain: 'dynamite-archhacks16.firebaseapp.com',
  databaseURL: 'https://dynamite-archhacks16.firebaseio.com',
  storageBucket: 'dynamite-archhacks16.appspot.com',
  messagingSenderId: '732923012553'
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
