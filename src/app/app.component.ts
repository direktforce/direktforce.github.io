import { Component, ViewChild, TemplateRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(TemplateRef, { read: ViewContainerRef })
  templateViewContainerRef: ViewContainerRef;

  constructor(public componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
