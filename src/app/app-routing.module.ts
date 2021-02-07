import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { TrainingComponent } from './training/training.component';
import { EducatorsecurityComponent } from './abcsecurity/educatorsecurity.component';
import { CsvuploaddownloadComponent } from './csvuploaddownload/csvuploaddownload.component';
import { AppComponent } from './app.component';
import { LoginlogoutComponent } from './loginlogout/loginlogout.component';
import {AuthGuard} from './auth.guard';
import {RoleGuard} from './role.guard'
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CartComponent } from './cart/cart.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StripeComponent } from './stripe/stripe.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { PassportloginComponent } from './passportlogin/passportlogin.component';
import { NgrxComponent } from './ngrx/ngrx.component';
import { PracticeComponent } from './practice/practice.component';
import { BlogComponent } from './blog/blog.component';
//import { AuthorComponent } from './author/author.component';
import { BlogAuthorComponent } from './addblog/blog-author.component';
import { BlogLoginComponent } from './blog-author-login/blog-login.component';
import { BlogpageComponent } from './authorsignup/blogpage.component';
import { AuthorComponent } from './author/author.component';
const routes: Routes = [
  
   { 
    path: 'login', 
    component: LoginlogoutComponent
   },
  {path: 'educator' , component: LandingpageComponent},

  {path: 'training' , component: TrainingComponent, canActivate:[AuthGuard]
  },

  {path: 'educatorsecurity' , component: EducatorsecurityComponent},

  {path: 'upload' , component: CsvuploaddownloadComponent,
  canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'ADMIN'
  }},

  {path: 'admin' , component: AdminloginComponent,
  
 },
 {path: 'signup' , component: SignupComponent},

 {path: 'reset' , component: ResetpasswordComponent},

 {path: 'update/:id' , component: ForgotpasswordComponent},

 {path: 'cart' , component: CartComponent},
 
 {path: 'productlist' , component: ProductlistComponent},

 {path: 'checkout' , component: CheckoutComponent},

 {path: 'stripe' , component: StripeComponent},
 
 {path: 'success' , component: SuccessComponent},

 {path: 'failure' , component: FailureComponent},

 {path: 'passportlogin' , component: PassportloginComponent},
 
 {path: 'ngrx' , component: NgrxComponent},

 {path: 'practice' , component: PracticeComponent},
 { 
  path: '', 
  redirectTo: 'productlist', 
  pathMatch: 'full'
 },
 {path: 'blog' , component: BlogComponent},

 {path: 'postblog' , component: BlogAuthorComponent},

 {path: 'authorlogin' , component: BlogLoginComponent},
 
 {path: 'authorsignup' , component: BlogpageComponent},

 {path: 'author/:id' , component: AuthorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
