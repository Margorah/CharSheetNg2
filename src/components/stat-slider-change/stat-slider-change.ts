import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { EditStatComponent } from '../edit-stat/edit-stat';
import { CharacterStat } from '../../app/models/stat-model';

const RANGETIMEOUT = 1750;
const EVENTDEBOUNCE = RANGETIMEOUT / 3;

@Component({
  selector: 'stat-slider-change',
  templateUrl: 'stat-slider-change.html'
})
export class StatSliderChangeComponent extends EditStatComponent {
  rngValue: Subject<number> = new Subject();
  
  rangeChange(stat: CharacterStat) {
    super.rangeChange(stat);
    this.rngValue.next(this.rangeValue);
  }

}
