import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateStatPage } from './create-stat';

@NgModule({
  declarations: [
    CreateStatPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateStatPage),
  ],
})
export class CreateStatPageModule {}
