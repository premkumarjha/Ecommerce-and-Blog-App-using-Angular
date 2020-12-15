import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TrainingComponent } from './training/training.component';
import { EducatorComponent } from './educator/educator.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { EducatorsecurityComponent } from './educatorsecurity/educatorsecurity.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { AddtrainingeventComponent } from './addtrainingevent/addtrainingevent.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ListtrainingcourseComponent } from './listtrainingcourse/listtrainingcourse.component';
import { AddtrainingcourseComponent } from './addtrainingcourse/addtrainingcourse.component';
import { EdittrainingcourseComponent } from './edittrainingcourse/edittrainingcourse.component';
import { DeletetrainingcourseComponent } from './deletetrainingcourse/deletetrainingcourse.component';
import { ActiondialogComponent } from './actiondialog/actiondialog.component';
import { CsvuploaddownloadComponent } from './csvuploaddownload/csvuploaddownload.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ChangestatusComponent } from './changestatus/changestatus.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginlogoutComponent } from './loginlogout/loginlogout.component';
import {MatMenuModule} from '@angular/material/menu';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SignupComponent } from './signup/signup.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import {MatCardModule} from '@angular/material/card';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { StripeComponent } from './stripe/stripe.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ProductlistComponent } from './productlist/productlist.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
//import {MatSelectModule} from '@angular/material/select';
//import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    NavbarComponent,
    TrainingComponent,
    EducatorComponent,
    LandingpageComponent,
    EducatorsecurityComponent,
    DialogboxComponent,
    AddtrainingeventComponent,
    ListtrainingcourseComponent,
    AddtrainingcourseComponent,
    EdittrainingcourseComponent,
    DeletetrainingcourseComponent,
    ActiondialogComponent,
    CsvuploaddownloadComponent,
    ChangestatusComponent,
    LoginlogoutComponent,
    AdminloginComponent,
    ForgotpasswordComponent,
    SignupComponent,
    ResetpasswordComponent,
    CheckoutComponent,
    CartComponent,
    StripeComponent,
    ProductlistComponent,
    AdminpageComponent,
    SuccessComponent,
    FailureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
     NativeDateModule,
     MatProgressBarModule,
     MatExpansionModule,
     MatCheckboxModule,
     FlexLayoutModule,
     MatMenuModule,
     MatCardModule,
     MatSelectModule,
     FormsModule,
     MatBadgeModule,
     //AuthModule,
     
     AuthModule.forRoot({
      domain: 'dev-zh9gbzcl.us.auth0.com',
      clientId: 'ithPwaU9sxlZeBJ14jOud4ot34OjMoxZ'
    }),
  
  ],
  
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
