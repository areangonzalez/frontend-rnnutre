import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// fake backend provider
import { fakeBackendProvider } from "./shared/helpers/fake-backend";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CoreModule } from "./core/core.module";
import { AppLayoutComponent, SharedModule } from "./shared";


@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    // facke-backend providers
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
