import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter } from 'rxjs/operators';

@Injectable()
export class AppEffects {

    globalHttpErrorHandling$ = createEffect(() => {
        return this.actions$.pipe(
            filter(a => {
                if (a.type.includes('ERROR')) {
                    alert('ERROR');
                    return true;
                }
                return false;
            })
        );
    }, { dispatch: false });

    constructor(private actions$: Actions) {}
}
