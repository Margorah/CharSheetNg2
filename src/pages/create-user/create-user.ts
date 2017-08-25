import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, Navbar } from 'ionic-angular';

import { CharacterListPage } from '../character-list/character-list';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as UserActions from '../../app/store/actions/user-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

/**
 * Generated class for the CreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const _PW_MIN_LENGTH = 6;

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {
  @ViewChild(Navbar) navBar: Navbar; 
  private title = 'Create User';
  
  private createForm: FormGroup;
  private name: FormControl;
  private email: FormControl;
  private password1: FormControl;
  private password2: FormControl;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password1 = new FormControl('', [Validators.required, Validators.minLength(_PW_MIN_LENGTH)]);
    this.password2 = new FormControl('', [Validators.required, Validators.minLength(_PW_MIN_LENGTH)]);

    this.createForm = new FormGroup({
      name: this.name,
      email: this.email,
      passwords: new FormGroup({
        password1: this.password1,
        password2: this.password2
      }, this.areEqual.bind(this))
    });
  }

  areEqual(group: FormGroup): {[s: string]: boolean} {
    if (this.password1.value !== this.password2.value) {
      return {'passesNotSame': true};
    }
  }

  create() {
    this.store.dispatch(new UserActions.Create({name: this.name.value, email: this.email.value, password: this.password1.value}));
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.store.dispatch(new NavActions.Back());
    };
  }
}
