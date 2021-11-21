import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { ToastrService } from './_services/toastr.service';
import { LoaderService } from './_services/loader.service';
import { ApiService } from   './_services/apiservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkerComponent } from './worker/worker.component';
import { ActionModelComponent } from './action-model/action-model.component';;
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from '../app/interceptors/loader.interceptor';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule],
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        LoginComponent,
        WorkerComponent ,
        ActionModelComponent ,
        LoaderComponent,
        ConfirmationComponent ],
    providers: [
        LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        ToastrService,
        ApiService,
       
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }