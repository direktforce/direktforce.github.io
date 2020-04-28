import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <header>
    <nav>
      <div class="container">
        <a class="brand" [routerLink]="['/']">
          <img src="assets/logo.png" alt="Direkt Force"/>
        </a>
        <ul>
          <li><a [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active" [routerLink]="['/']">Home</a></li>
          <li><a routerLinkActive="active" [routerLink]="['/applications']">Applications</a></li>
          <li><a routerLinkActive="active" [routerLink]="['/products']">Products</a></li>
          <li><a routerLinkActive="active" [routerLink]="['/capabilities']">Capabilities</a></li>
          <li><a routerLinkActive="active" [routerLink]="['/careers']">Careers</a></li>
          <li><a routerLinkActive="active" [routerLink]="['/contact']">Contact</a></li>
        </ul>
      </div>
    </nav>
  </header>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent {}
