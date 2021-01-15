import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UploadedSalesNewData } from '../+state/sales.actions';
import { GamesState } from '../../+state/games.reducer';

function isDate(date: string): boolean {
  const regExp = new RegExp(
    '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])?$'
  );
  return regExp.test(date);
}

@Component({
  selector: 'app-sales-upload',
  templateUrl: './sales-upload.component.html'
})
export class SalesUploadComponent {
  showUploadSection = false;

  constructor(private store: Store<GamesState>) {}

  toggleUploadSection(): void {
    this.showUploadSection = !this.showUploadSection;
  }

  onNewInput(e: any): void {
    console.log('onNewInput', e.target.value);
    if (!isDate(e.target.value)) {
      alert('you did not enter a valid date');
      return;
    }

    // fake backend call and just save to locale storage
    const dataStorageStr = localStorage.getItem('fakeNewData');
    let fakeData = [];
    if (dataStorageStr) {
      fakeData = JSON.parse(dataStorageStr);
    }
    fakeData.push({
      date: e.target.value,
      cash: '1532',
      nb: 30
    });
    localStorage.setItem('fakeNewData', JSON.stringify(fakeData));

    this.store.dispatch(UploadedSalesNewData());
  }
}
