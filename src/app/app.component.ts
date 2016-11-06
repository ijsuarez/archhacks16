import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'material2-app-app',
  templateUrl: './app.component.main.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submission: string = "";
  queries: string[] = [];
  savings: number = 0.00;

  af: AngularFire;
  items: FirebaseListObservable<any[]>;

  selectFirst: number;
  selectSecond: number;

  constructor(af: AngularFire) {
    this.af = af;
  }

  addQuery(event:any) {
    this.queries.push(this.submission);
    this.submission = "";
  }

  remove(idx: number) {
    this.queries.splice(idx, 1);
  }

  computeSavings(idx: number) {
    this.selectSecond = idx;
    this.savings = this.selectSecond - this.selectFirst;
  }

  findGenerics(idx: number) {
    this.selectFirst = idx;
    this.items = this.af.database.list('/drugs');
  }
}
