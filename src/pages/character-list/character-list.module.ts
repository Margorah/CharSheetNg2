import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterListPage } from './character-list';

@NgModule({
  declarations: [
    CharacterListPage,
  ],
  entryComponents: [CharacterListPage],
  imports: [
    IonicPageModule.forChild(CharacterListPage),
  ],
})
export class CharacterListPageModule {}
