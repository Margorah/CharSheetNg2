import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as buttonUtils from '../../app/utilities/functions';

@Component({
  selector: 'stat-form-change',
  templateUrl: 'stat-form-change.html'
})
export class StatFormChangeComponent {
  @Input() stat: CharacterStat;
  @ViewChild('inputFocus') inputFoc: ElementRef;

  private editStatForm: FormGroup;
  private formValue: FormControl; 

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.formValue = new FormControl('', Validators.required);

    this.editStatForm = new FormGroup({
      value: this.formValue
    });
  }

  ngAfterViewInit() {
    this.inputFoc.nativeElement.focus();
  }

  formChange(stat: CharacterStat, type: string, evt: Event) {
    evt.preventDefault();
    let newValue: number;
    let subNum = +this.editStatForm.get('value').value;

    if (type === 'PLUS') {
      newValue = stat.value + subNum;      
    } else {
      newValue = stat.value - subNum;
    }

    // If a maximum has been set, we also have a minimum of zero. Get the value in bounded
    if (stat.maximum > 0 ) {
      newValue = (newValue < stat.maximum) ? newValue : stat.maximum;
      newValue = (newValue > 0) ? newValue : 0;
    }    

    this.store.dispatch(new StatActions.Update({id: stat.id, name: stat.name, value: newValue, maximum: stat.maximum, type: stat.type, component: stat.component}));    
    this.formValue.setValue('');
  }

  showPlus(statMaximum: number, currentVal: number): boolean {
    return buttonUtils.showPlus(statMaximum, currentVal);
  }

  showMinus(statMaximum: number, currentVal: number): boolean {
    return buttonUtils.showMinus(statMaximum, currentVal);
  }

}
