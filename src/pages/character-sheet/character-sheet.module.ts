import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterSheetPage } from './character-sheet';
import { StatComponent } from '../../components/stat/stat';
import { EditStatComponent } from '../../components/edit-stat/edit-stat';
import { StatFormChangeComponent } from '../../components/stat-form-change/stat-form-change';
import { StatSliderChangeComponent } from '../../components/stat-slider-change/stat-slider-change';
import { StatButtonChangeComponent } from '../../components/stat-button-change/stat-button-change';

@NgModule({
  declarations: [
    CharacterSheetPage,
    StatComponent,
    EditStatComponent,
    StatFormChangeComponent,
    StatSliderChangeComponent,
    StatButtonChangeComponent
  ],
  entryComponents: [CharacterSheetPage, StatComponent, EditStatComponent, StatFormChangeComponent, StatSliderChangeComponent, StatButtonChangeComponent],
  imports: [
    IonicPageModule.forChild(CharacterSheetPage)
  ],
})
export class CharacterSheetPageModule {}
