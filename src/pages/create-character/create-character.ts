import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, Navbar } from 'ionic-angular';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../app/store/reducers';
import * as CharacterActions from '../../app/store/actions/character-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

@IonicPage()
@Component({
  selector: 'page-create-character',
  templateUrl: 'create-character.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterPage {
  @ViewChild(Navbar) navBar: Navbar;
  private addCharForm: FormGroup;
  private name: FormControl;
  
  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.addCharForm = new FormGroup({
      name: this.name
    });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.store.dispatch(new NavActions.Back());
    };
  }

  addCharacter() {
    this.store.dispatch(new CharacterActions.Add(this.name.value));
  }

}
