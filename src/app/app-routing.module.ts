import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { ApplicationsPageComponent } from './applications-page/applications-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { CapabilitiesPageComponent } from './capabilities-page/capabilities-page.component';
import { CareersPageComponent } from './careers-page/careers-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'applications', component: ApplicationsPageComponent},
  {path: 'products', component: ProductsPageComponent},
  {path: 'capabilities', component: CapabilitiesPageComponent},
  {path: 'careers', component: CareersPageComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
