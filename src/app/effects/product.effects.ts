import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ProductActions from '../actions/product.action'
import 'rxjs/add/operator/do';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MyserviceService } from '../myservice.service';

@Injectable()

export class ProductEffects {

  constructor(private actions$: Actions,private myservice: MyserviceService) {}      

  @Effect() 
  loadProducts$= this.actions$.pipe(
    ofType(ProductActions.GET_PRODUCT),
    mergeMap(() =>
      this.myservice.getNgrxData().pipe(
        map(data => new ProductActions.GetProduct(data)),
        //catchError(error => of(new `GetCustomersFailed`(error)))
      )
    )
  );
}