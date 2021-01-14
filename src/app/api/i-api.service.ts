import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IApiService {
  get(start: Date, end: Date): Observable<any[]>;
}

export const HISTORY_API_SERVICE = new InjectionToken<IApiService>(
  'HISTORY_API_SERVICE'
);
