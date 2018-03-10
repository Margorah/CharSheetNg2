import { Component } from '@angular/core';
import { EditStatComponent } from '../edit-stat/edit-stat';

import { CharacterStat } from '../../app/models/stat-model';

import * as buttonUtils from '../../app/utilities/functions';
@Component({
  selector: 'stat-button-change',
  templateUrl: 'stat-button-change.html'
})
export class StatButtonChangeComponent extends EditStatComponent  {
  
  rangeClick(stat: CharacterStat, type: string) {
    if (type === 'PLUS') {
      this.rangeValue += 1;      
    } else {
      this.rangeValue -= 1;      
    }
    this.rangeChange(stat);    
  }

  showPlus(statMaximum: number, currentVal: number): boolean {
    return buttonUtils.showPlus(statMaximum, currentVal);
  }

  showMinus(statMaximum: number, currentVal: number): boolean {
    return buttonUtils.showMinus(statMaximum, currentVal);
  }
  
}
