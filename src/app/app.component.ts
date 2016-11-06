import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

export class Drug {
  name: string;
  cost: number;
  img: string;
  isBrand: boolean;
  iupac: string;

}

export function drugCompare(drug1: Drug, drug2: Drug) {
  if (drug1.cost < drug2.cost) {
    return -1;
  }
  if (drug1.cost > drug2.cost) {
    return 1;
  }
  return 0;
}


export function drugEquals(drug1: Drug, drug2: Drug) {
  return (drug1.name == drug2.name) && (drug1.cost == drug2.cost) &&
         (drug1.img == drug2.img) && (drug1.isBrand == drug2.isBrand) &&
         (drug1.iupac == drug2.iupac);
}


@Component({
  selector: 'material2-app-app',
  templateUrl: './app.component.main.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  drugQueries: Drug[] = [];
  drugResults: Drug[] = [];

  submission: string = "";
  savings: number = 0.00;

  af: AngularFire;
  items: FirebaseListObservable<any[]>;

  selectFirst: number = -1;
  selectSecond: number = -1;

  constructor(af: AngularFire) {
    this.af = af;
  }

  addQuery() {
    this.af.database.object('/drugs/'.concat(this.submission), {preserveSnapshot: true})
      .subscribe(snapshot=>{
          var drug: Drug = {
            name: snapshot.key,
            cost: snapshot.val().cost,
            img: snapshot.val().img,
            isBrand: snapshot.val().brand,
            iupac: snapshot.val().iupac
          };
          var duplicate = false;
          for (var query of this.drugQueries) {
            if (drugEquals(query, drug)) {
              duplicate = true;
              break;
            }
          }
          if (!duplicate) {
            this.drugQueries.push(drug);
          }
      })

    this.submission = "";
  }

  remove(idx: number) {
    if (this.selectFirst == idx) {
      this.selectFirst = -1;
      this.selectSecond = -1;
      this.drugResults = [];
    } else if (this.selectFirst > idx) {
      this.selectFirst = this.selectFirst - 1;
    }
    this.drugQueries.splice(idx, 1);
  }

  computeSavings(idx: number) {
    this.selectSecond = idx;
    this.savings = this.drugQueries[this.selectFirst].cost - this.drugResults[this.selectSecond].cost;
  }

  findGenerics(idx: number) {
    this.drugResults = [];

    this.selectFirst = idx;
    this.selectSecond = -1;
    var activeIngredient = this.drugQueries[idx].iupac;

    this.af.database.list('/drugs', {preserveSnapshot: true})
      .subscribe(snapshots=>{
        snapshots.forEach(snapshot=>{
          if (snapshot.val().iupac == activeIngredient) {
            var drug: Drug = {
              name: snapshot.key,
              cost: snapshot.val().cost,
              img: snapshot.val().img,
              isBrand: snapshot.val().brand,
              iupac: snapshot.val().iupac
            };
            var duplicate = false;
            for (var result of this.drugResults) {
              if (drugEquals(result, drug)) {
                duplicate = true;
                break;
              }
            }
            if (!duplicate) {
              this.drugResults.push(drug);
            }
          }
        });
        for (var i = 0; i < this.drugResults.length; i++) {
          if (drugEquals(this.drugResults[i], this.drugQueries[this.selectFirst])) {
            this.drugResults.splice(i, 1);
            break;
          }
        }
        this.drugResults.sort(drugCompare);
      })
  }


}
