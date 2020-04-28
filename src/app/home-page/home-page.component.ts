import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
  <header class="showcase">
    <div class="container">
      <div class="text-group">
        <h4>We design & manufacture specialized</h4>
        <h1 class="accent">Hydraulic Cylinders & Valves</h1>
        <p>For the past 15 years, our focus has been developing great OEM relationships by providing quality solutions at cost-effective rates leveraging our innovative designs.</p>
      </div>
    </div>
  </header>
  <section>
    <div class="container">
      <h1>What we do</h1>
      <h4>We have over 15 years of experience <strong>designing, prototyping and manufacturing</strong> premium cost-effective hydraulic solutions. We have an experienced team committed to creating longlasting relationships.</h4>
      <div class="grid">
        <div>
          <img/>
          <h2>Applications</h2>
          <p>Learn more about the many applications that use our solutions.</p>
        </div>
        <div>
          <img/>
          <h2>Products</h2>
          <p>View our wide range of specialized hydraulic and pneumatic solutions.</p>
        </div>
        <div>
          <img/>
          <h2>Capabilities</h2>
          <p>We take pride in our innovative designs and unique manufacturing capabilities.</p>
        </div>
      </div>
    </div>
  </section>
  `,
  styleUrls: ['../showcase.scss', './home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
