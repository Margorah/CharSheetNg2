import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IonicPage } from 'ionic-angular';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import { Character } from '../../app/models/character-model';

import * as fromRoot from '../../app/store/reducers';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as NavActions from '../../app/store/actions/nav-actions';

const RANGETIMEOUT = 1752;
const EVENTDEBOUNCE = 1752 / 4;

@IonicPage()
@Component({
  selector: 'page-character-sheet',
  templateUrl: 'character-sheet.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSheetPage {
  @ViewChild('inputFocus') inputFoc: ElementRef;
  private character: Observable<Character>;
  private stats: Observable<CharacterStat[]>;
  private currentStat: Observable<CharacterStat>;
  private statSub: Subscription;

  private timeoutRef;
  private rangeValue: number;
  private rangeMax: number;

  private editStatForm: FormGroup;
  private formValue: FormControl; 

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.formValue = new FormControl('', Validators.required);

    this.editStatForm = new FormGroup({
      value: this.formValue
    });

    this.statSub = this.store.select(fromRoot.getStat).subscribe((stat) => {
      if (stat) {
        this.calcRange(stat);
        if (stat.maximum < 1) {
          // Seems Jank
          setTimeout(() => {
            this.inputFoc.nativeElement.focus();
          },150);
        }
      }
    });

    this.character = this.store.select(fromRoot.getCharacter);
    this.stats = this.store.select(fromRoot.getStats);
    this.currentStat = this.store.select(fromRoot.getStat);
  }

  selectStat(stat: CharacterStat, index: number) {
    this.store.dispatch(new StatActions.Select(index));
    this.calcRange(stat);    
  }

  unselectStat() {
    this.store.dispatch(new StatActions.Unselect());
    // this.rangeValue = 0;
  }

  calcRange(stat: CharacterStat) {
    this.rangeMax = stat.maximum;
    this.rangeValue = stat.value;
  }

  rangeChange(stat: CharacterStat) {
    clearInterval(this.timeoutRef);
    this.timeoutRef = setInterval(() => {
      this.rangeEnd(stat);
    }, RANGETIMEOUT);
  }

  rangeEnd(stat: CharacterStat) {
    clearInterval(this.timeoutRef);   
    this.store.dispatch(new StatActions.Update({id: stat.id, name: stat.name, value: this.rangeValue, maximum: stat.maximum, type: stat.type}));
  }

  removeStat(stat: CharacterStat) {
    const toRemove = stat.id;
    this.store.dispatch(new StatActions.Remove(toRemove));
  }

  createStat() {
    this.store.dispatch(new NavActions.CreateStat());
  }

  ionViewDidLoad() { }

  getVis(value: number, maximum: number) {
    if (maximum < 1) {
      return false;
    } else if (value >= maximum) {
      return false;
    } else {
      return true;
    }
  }

  refresh(stat: CharacterStat) {
      this.store.dispatch(new StatActions.Update({
        id: stat.id,
        name: stat.name,
        value: stat.maximum,
        maximum: stat.maximum,
        type: stat.type
      }));
  }

  rangeClick(stat: CharacterStat, type: string) {
    if (type === 'PLUS') {
      this.rangeValue += 1;      
    } else {
      this.rangeValue -= 1;      
    }
    this.rangeChange(stat);    
  }

  formChange(stat: CharacterStat, type: string, evt: Event) {
    evt.preventDefault();
    let newValue;
    let subNum = this.editStatForm.get('value').value;
    if (type === 'PLUS') {
      newValue = stat.value + subNum;      
    } else {
      newValue = stat.value - subNum;
    }
    this.store.dispatch(new StatActions.Update({id: stat.id, name: stat.name, value: newValue, maximum: stat.maximum, type: stat.type}));    
    this.formValue.setValue('');
  }

  ngOnDestroy() {
    this.statSub.unsubscribe();
  }

  editStat() {
    this.store.dispatch(new NavActions.CreateStat('EDITMODE'));
  }

}
