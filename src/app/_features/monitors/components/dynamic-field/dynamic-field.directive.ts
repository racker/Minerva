import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef,
  OnChanges,
  SimpleChanges
  } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../interfaces/field.interface";
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';

const componentMapper = {
  input: InputComponent,
  select: SelectComponent,
  checkbox: CheckboxComponent
};

@Directive({
  selector: '[monitorDynamicField]'
})
export class DynamicFieldDirective implements OnChanges {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;

  componentRef: any;

  constructor(private resolver: ComponentFactoryResolver,
private container: ViewContainerRef) { }


  /**
   * @description creates components when called
   */
  composeComponent(): void {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.config.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.config = this.config;
    this.componentRef.instance.group = this.group;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config) {
      this.container.clear();
      this.composeComponent();
    }
  }
}
