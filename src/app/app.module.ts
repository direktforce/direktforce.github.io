import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationsPageComponent } from './applications-page/applications-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { CapabilitiesPageComponent } from './capabilities-page/capabilities-page.component';
import { CareersPageComponent } from './careers-page/careers-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationsPageComponent,
    HomePageComponent,
    ProductsPageComponent,
    CapabilitiesPageComponent,
    CareersPageComponent,
    ContactPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
