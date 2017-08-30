import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, Navbar, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

/**
 * Generated class for the CreateStatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 const NORMALTITLE = 'Create A New Stat';
 const EDITTITLE = 'Edit Stat';

@IonicPage()
@Component({
  selector: 'page-create-stat',
  templateUrl: 'create-stat.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateStatPage {
  @ViewChild(Navbar) navBar: Navbar;

  private title: string;

  private statId: string;
  private stat: Observable<CharacterStat>;
  private statSub: Subscription;

  private name: FormControl;
  private value: FormControl;
  private maximum: FormControl;
  private type: FormControl;

  private addStatForm: FormGroup;

  constructor(public params: NavParams, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    if (this.params.data === 'EDITMODE') {
      this.title = EDITTITLE;
    } else {
      this.title = NORMALTITLE;
    }
    
    this.name = new FormControl('', Validators.required);
    this.value = new FormControl('', Validators.required);
    this.maximum = new FormControl('', Validators.required);
    this.type = new FormControl('', Validators.required);
    
    this.addStatForm = new FormGroup({
      name: this.name,
      value: this.value,
      maximum: this.maximum,
      type: this.type
    });

    this.statSub = this.store.select(fromRoot.getStat).subscribe((stat) => {
      if (stat) {
        this.statId = stat.id;
        let group = this.addStatForm;
        group.get('name').setValue(stat.name);
        group.get('value').setValue(stat.value);
        group.get('maximum').setValue(stat.maximum);
        group.get('type').setValue(stat.type); 
      }     
    });

    this.stat = this.store.select(fromRoot.getStat);
  }

  createStat() {
    let newStat = {
      name: this.name.value,
      value: this.value.value,
      maximum: this.maximum.value,
      type: this.type.value
    };
    if (this.title === NORMALTITLE) {
      this.store.dispatch(new StatActions.Add(newStat));      
    } else {
      this.store.dispatch(new StatActions.Update(Object.assign({}, newStat, {id: this.statId})));
      this.store.dispatch(new NavActions.Back());
    }
    // this.navCtrl.pop();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreateStatPage');
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.store.dispatch(new StatActions.Unselect());
      this.store.dispatch(new NavActions.Back());
    };
  }

  ngOnDestroy() {
    this.statSub.unsubscribe();
  }

}
