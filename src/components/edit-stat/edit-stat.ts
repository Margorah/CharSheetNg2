import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { CharacterStat } from '../../app/models/stat-model';
import * as StatActions from '../../app/store/actions/stat-actions';
import * as fromRoot from '../../app/store/reducers';

const RANGETIMEOUT = 1250;

@Component({
  selector: 'edit-stat',
  templateUrl: 'edit-stat.html'
})
export class EditStatComponent {
  @Input() stat: CharacterStat;

  protected timeoutRef;
  protected rangeValue: number;
  protected rangeMax: number;

  constructor(protected store: Store<fromRoot.State>) {
  }
  
  ngOnInit() {
    this.calcRange(this.stat);
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
    const newStat =  {id: stat.id, name: stat.name, value: this.rangeValue, maximum: stat.maximum, type: stat.type, component: stat.component};
    this.store.dispatch(new StatActions.Update(newStat));
  }

}
