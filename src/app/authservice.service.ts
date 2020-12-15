import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }

  isLoggedIn(){

    return localStorage.getItem('token')
  }

  isAdminLogin(){
    return localStorage.getItem('token')

  }
}
