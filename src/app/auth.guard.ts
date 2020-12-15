import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';
import { MyserviceService } from './myservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
role:any
constructor(private authService:AuthserviceService,private router:Router,private myservice: MyserviceService){
// this.myservice.getAdminRole().subscribe(data=>{

//   this.role=data;
// })
}


  // canActivate(
  //   // next: ActivatedRouteSnapshot,
  //    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   //return true;
  // }


  canActivate(): boolean {

    

    if (this.authService.isLoggedIn()) {
      console.log(this.role)
      //debugger
      return true
    } else {
      this.router.navigate(['/login']);
      return false
    }
   
  }

}
