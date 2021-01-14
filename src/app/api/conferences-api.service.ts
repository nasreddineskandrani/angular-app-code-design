import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

///

import { mockConferences } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class ConferencesApiService {
  constructor() {}

  get(startDate: Date, endDate: Date): Observable<any[]> {
    console.log(startDate, endDate);
    const result = {
      ...mockConferences,
      data: mockConferences.data.filter(item => {
        const d = new Date(item.date);
        if (
          startDate.getTime() <= d.getTime() &&
          d.getTime() <= endDate.getTime()
        ) {
          return true;
        }

        return false;
      })
    };
    return of(result.data);
  }
}
