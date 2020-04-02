import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SwappingSquaresSpinnerModule } from "angular-epic-spinners";


// fake backend provider
import { fakeBackendProvider } from "./shared/helpers/fake-backend";
import { ErrorInterceptor } from "./shared/helpers/error-interceptor";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CoreModule } from "./core/core.module";
import { AppLayoutComponent, MensajeComponent, SharedModule, LoaderComponent } from "./shared";
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    MensajeComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    SwappingSquaresSpinnerModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // facke-backend providers
    fakeBackendProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
