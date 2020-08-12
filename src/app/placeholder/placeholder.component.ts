import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-placeholder',
  template: `<ng-template></ng-template>`,
  styleUrls: ['./placeholder.component.scss'],
})
export class PlaceholderComponent implements OnInit {
  @ViewChild(TemplateRef, { read: ViewContainerRef })
  templateViewContainerRef: ViewContainerRef;

  constructor(public componentFactoryResolver: ComponentFactoryResolver) {}

  async ngOnInit(): Promise<void> {
    console.log('init');
    const {ViewComponent: component} = await import('../view/view.component');
    this.templateViewContainerRef.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.templateViewContainerRef.createComponent(factory);
  }
}
