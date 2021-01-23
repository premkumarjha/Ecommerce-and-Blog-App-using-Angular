import { Product } from '../model/data.model';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import * as ProductActions from '../actions/product.action'


const initialState: Product = {
    name: 'laptop',
   
}

export function addProductReducer(state:Product[]=[initialState], action:ProductActions.Actions) {
    
  switch (action.type) {
    case ProductActions.ADD_PRODUCT:{
        console.log(action)
        return [...state, action.payload];
    }
        case ProductActions.REMOVE_PRODUCT:{
            console.log(state);
            console.log(action)
            const duplicateResult= state.filter(result=>result.name !==action.payload.name);
            return [...duplicateResult];
        }
    default:
        return state;
    }
}