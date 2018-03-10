import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as UserActions from '../../app/store/actions/user-actions';
import * as NavActions from '../../app/store/actions/nav-actions';
import * as fromRoot from '../../app/store/reducers';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-user',
  templateUrl: 'login-user.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginUserPage {
  private title = 'User Login';
  private email: FormControl;
  private password: FormControl;
  private loginForm: FormGroup;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  login() {
    this.store.dispatch(new UserActions.Login({email: this.email.value, password: this.password.value}));
  }

  create() {
    this.store.dispatch(new NavActions.CreateUser());
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Login');
  }
}
