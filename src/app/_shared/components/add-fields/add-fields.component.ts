import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { keyPairValidator } from '../../validators/keyvalue.validator';
import { disallowValidator } from '../../validators/disallow.validator';
import { Subscription, Observable, Subject } from 'rxjs';
import { MarkFormGroupTouched } from '../../utils';
import { Label } from 'src/app/_models/monitors';
import { EnvironmentConfig } from 'src/app/_services/featureConfig/environmentConfig.service';

@Component({
  selector: 'app-add-fields',
  templateUrl: './add-fields.component.html',
  styleUrls: ['./add-fields.component.scss']
})
export class AddFieldsComponent implements OnInit, OnChanges {
  constructor(
    private fb: FormBuilder,
    private env: EnvironmentConfig) { }
  @Input()
  initialData: { [key: string]: any };
  @Input()
  validateForm: Observable<void>;

  // this functionality will disallow editing on any field containing
  // the string "agent_" environment.resources.disallowLabelEdit
  @Input()
  labelContraints: boolean;

  // list of keys to create dropdown list on txtKey input
  @Input()
  listOfKeys: [];

  // list of values to create dropdown list on txtValue input
  @Input()
  listOfValues: [];

  // disable input fields
  @Input()
  disable: boolean;

  @Input()
  resetLabelSubject: Subject<Label> = new Subject<Label>();


  // Output emitters will update the components as to changes in the form
  // and whether they are valid
  @Output()
  public formValuesChanged = new EventEmitter<Label>();

  @Output()
  public formValid = new EventEmitter<boolean>();


  // manage subscriptions
  subManager = new Subscription();

  public keyValueForm: FormGroup;
  private addArray = [];


  ngOnInit() {
    // Begin by pushing all intialData key pairs to the form and
    // pushing one empty set of inputs with appropriate validators
    const sets = [];
    const keyValidators = [
      ...(this.labelContraints ? [disallowValidator] : [])
    ];

    sets.push(
      ...this.addArray,
      this.fb.group({
      key: new FormControl('', keyValidators),
      value: new FormControl('')
    }, { validator: keyPairValidator }));

    // finalize the form and push the fields to the FormArray
    this.keyValueForm = this.fb.group({
      keysandvalues: this.fb.array(sets)
    });

    // When changes are being made emit them via (formValuesChanged) of the component
    let keyValueFormSub = this.keyValueForm.valueChanges.subscribe((meta) => {
      this.formValuesChanged.emit(meta);
    });

    // When the parent component wants to know if the form is valid this will
    // check and emit the results via (formValid)
    let formValidSub = this.validateForm.subscribe(() => {
        let valid = this.keyValueForm.valid;
        this.markFormGroupTouched();
        this.formValid.emit(valid);
    });

    let resetFormData = this.resetLabelSubject.subscribe(res => {
      if (res) {
        this.resetLabelForm(res);
      }
    })

    // add all subsciptions to one manager
    this.subManager.add(keyValueFormSub);
    this.subManager.add(formValidSub);
    this.subManager.add(resetFormData);
  }

  /**
   * @description used here to get the formarray and add inputs to it
   * @returns FormArray
   */
  get metaPairs(): FormArray {
    return this.keyValueForm.get('keysandvalues') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // gets the initial data and watches for changes
    if (changes['initialData']?.currentValue) {
      this.resetLabelForm(changes['initialData'].currentValue);
    }
  }

  resetLabelForm(data: any) {
    Object.keys(data).map(key => {
      let value = data[key];
      let disabled = key.startsWith(this.env.resources.disallowLabelEdit) && this.labelContraints;
      this.addArray.push(this.fb.group({
        key: new FormControl({value: key, disabled},
          (this.labelContraints && [disallowValidator])),
        value: new FormControl({value, disabled})
      }, { validator: keyPairValidator }));
    });
  }

  /**
   * @description Add a new Row
   */
  addRow(): void {
    this.metaPairs.push(this.createItem());
  }

  /**
   * @description Removes the row
   * @param index number
   */
  removeRow(index:number): void {
    this.metaPairs.removeAt(index);
  }

  /**
   * @description Creates a new pair of fields for the form
   */
    createItem(): FormGroup {
    let frmCtrl=  this.labelContraints ? new FormControl('', ...([disallowValidator])) : new FormControl('');
    return this.fb.group({
      key: frmCtrl,
      value: []
    }, { validator: keyPairValidator });
  }

  /**
   * Returns the total of pairs
   * @returns number
   */
  totalItems(): number {
    return this.metaPairs.length;
  }

  /**
   * @description Marks all form fields as touched to show validation upon submission
   * @param formGroup FormGroup
   */
  private markFormGroupTouched() {
    (<FormArray>this.keyValueForm.get('keysandvalues')).controls.forEach((group: FormGroup) => {
      MarkFormGroupTouched(group);
    });
  }

  /**
   * @description Returns the specific control referenced
   * @param index number
   * @param fieldName string
   * @returns AbstractControl
   */
  getGroupControl(index:number, fieldName:string): AbstractControl {
    return (<FormArray>this.keyValueForm.get('keysandvalues')).at(index).get(fieldName);
  }

  ngOnDestroy() {
    this.subManager.unsubscribe();
  }
}
