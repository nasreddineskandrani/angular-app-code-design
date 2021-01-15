import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

///

import { mockSales } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class SalesApiService {
  constructor() {}

  get(startDate: Date, endDate: Date): Observable<any[]> {
    console.log(startDate, endDate);
    let finalDatachunk = mockSales.data;
    const newData = localStorage.getItem('fakeNewData');
    if (newData) {
      finalDatachunk = [...finalDatachunk, ...JSON.parse(newData)];
    }
    const result = finalDatachunk.filter(item => {
        const d = new Date(item.date);
        if (
          startDate.getTime() <= d.getTime() &&
          d.getTime() <= endDate.getTime()
        ) {
          return true;
        }

        return false;
      });
    return of(result);
  }
}
