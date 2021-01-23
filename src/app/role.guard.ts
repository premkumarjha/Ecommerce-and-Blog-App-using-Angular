import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';
import { MyserviceService } from './myservice.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  role:any;
  constructor(private authService:AuthserviceService,private router:Router,private myservice: MyserviceService){
    // this.myservice.getAdminRole().subscribe(data1=>{

    //   this.role=data1;
    // })
  }
  
  canActivate(route: ActivatedRouteSnapshot): boolean{
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    //console.log(route);
    
    const token = localStorage.getItem('token');
    //console.log(token)
    //|| 
   // tokenPayload.role !== expectedRole
   if (this.authService.isAdminLogin() && expectedRole=="ADMIN" ) {
    //debugger
    return true
  } else {

    this.router.navigate(['/admin']);
  return false
  }
  
}

  }
    
  
  
