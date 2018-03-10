import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, Navbar, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

@IonicPage()
@Component({
  selector: 'page-create-stat',
  templateUrl: 'create-stat.html',
})
export class CreateStatPage {
  @ViewChild(Navbar) navBar: Navbar;

  private statHasAMax = true;
  private statHasAType = true;

  private statId: string;
  private stat: Observable<CharacterStat>;
  private statSub: Subscription;

  private name: FormControl;
  private value: FormControl;
  private maximum: FormControl;
  private type: FormControl;
  private component: FormControl;

  private addStatForm: FormGroup;

  constructor(public params: NavParams, private store: Store<fromRoot.State>) { }

  ngOnInit() {   
    this.name = new FormControl('', Validators.required);
    this.maximum = new FormControl('', Validators.required);
    this.type = new FormControl('', Validators.required);
    this.component = new FormControl('', Validators.required);
    this.value = new FormControl('', Validators.required);
    
    this.addStatForm = new FormGroup({
      name: this.name,
      value: this.value,
      maximum: this.maximum,
      type: this.type,
      component: this.component
    }, Validators.compose([Validators.required, this.valueAboveBounds.bind(this), this.valueBelowBounds.bind(this)]));

    this.statSub = this.store.select(fromRoot.getStat).subscribe((stat) => {   
      if (this.params.data === 'EDITMODE' && stat) {

        this.statId = stat.id;

        this.name.setValue(stat.name);
        this.value.setValue(stat.value);
        this.maximum.setValue(stat.maximum);
        this.type.setValue(stat.type); 
        this.component.setValue(stat.component);

        // Make sure form displays correctly when loading in EDITMODE
        if (stat.maximum === 0) {
          this.statHasAMax = false;
        }
        if (stat.type === 'NOTYPE') {
          this.statHasAType = false;
        }
      }
    });

    this.stat = this.store.select(fromRoot.getStat);
  }

  createStat() {
    let newStat = {
      name: this.name.value,
      value: +this.value.value,
      maximum: +this.maximum.value,
      type: this.type.value,
      component: this.component.value
    };
    if (this.params.data === 'EDITMODE') {
      this.store.dispatch(new StatActions.Update(Object.assign({}, newStat, {id: this.statId})));
      this.store.dispatch(new NavActions.Back());
    } else {
      this.store.dispatch(new StatActions.Add(newStat));      
    }
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.store.dispatch(new StatActions.Unselect());
      this.store.dispatch(new NavActions.Back());
    };
  }

  toggleMax() {
    if (this.statHasAMax == false) {
      this.maximum.markAsUntouched();

      this.statHasAMax = !this.statHasAMax;
      this.maximum.setValue('');
    } else {
      this.statHasAMax = !this.statHasAMax;

      this.maximum.setValue(0);
      this.component.setValue('');
    }
  }

  toggleType() {
    if (this.statHasAType == true) {
      this.type.setValue('NOTYPE');
    } else {
      this.type.setValue('');
      this.type.markAsUntouched();
    }
    this.statHasAType = !this.statHasAType;
  }

  ngOnDestroy() {
    this.statSub.unsubscribe();
  }

  valueAboveBounds(group: FormGroup): {[s: string]: boolean} {
    const ctrlValue = group.get('value');
    const ctrlMaximum = group.get('maximum');
    if (this.statHasAMax == true && +ctrlValue.value > +ctrlMaximum.value) {
      return {'valueAboveMax': true}
    }
  }

  valueBelowBounds(group: FormGroup): {[s: string]: boolean} {
    const ctrlValue = group.get('value');
    if (this.statHasAMax == true && +ctrlValue.value < 0) {
      return {'valueBelowZero': true};
    } 
  }
}
