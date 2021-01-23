import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Product } from '../model/data.model';

export const ADD_PRODUCT  = '[Product] Add'
export const REMOVE_PRODUCT = '[Product] Remove'

// Section 3
export class AddProduct implements Action {
    readonly type = ADD_PRODUCT

    constructor(public payload: Product) {}
}

export class RemoveProduct implements Action {
    readonly type = REMOVE_PRODUCT

    constructor(public payload:Product ) {}
}

// Section 4
export type Actions = AddProduct | RemoveProduct