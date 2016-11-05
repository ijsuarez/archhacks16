import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Directive,HostBinding,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

@Directive({
  selector:'[layout]'
})
export class LayoutDirective{
  @Input() layout:string;
  @HostBinding('style.display') display = 'flex';

  @HostBinding('style.flex-direction')
  get direction(){
       return (this.layout === 'column') ? 'column':'row';
  }
}
@Directive({
  selector:'[flex]'
})
export class FlexDirective{
    @Input() shrink:number = 1;
    @Input() grow:number = 1;
    @Input() flex:string;

    @HostBinding('style.flex')
    get style(){
        return `${this.grow} ${this.shrink} ${this.flex === '' ? '0':this.flex}%`;
    }
}

export const firebaseConfig = {
  apiKey: 'AIzaSyCOzvWYnpyuR2k-_YqDg7xfIbsF-l-OQ7M',
  authDomain: 'dynamite-archhacks16.firebaseapp.com',
  databaseURL: 'https://dynamite-archhacks16.firebaseio.com',
  storageBucket: 'dynamite-archhacks16.appspot.com',
  messagingSenderId: '732923012553'
}

@NgModule({
  declarations: [
    AppComponent,
    FlexDirective,
    LayoutDirective
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
