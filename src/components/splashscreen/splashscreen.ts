import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';

import { ActionsSubject } from '@ngrx/store';

import 'rxjs/add/operator/filter';

// https://stackoverflow.com/questions/44938803/error-with-actions-observable-in-ngrx-effects-using-typescript-2-4-1
// Actions Subject was returning R instead of the needed action. Moddified interface to correct this.
declare module "@ngrx/store/src/actions_subject" {
  interface ActionsSubject {
    lift<Action>(operator: Operator<Action, any>): Observable<Action>;
  }
}

const SPLASHDELAYTIMER = 1250;

@Component({
  selector: 'splashscreen',
  templateUrl: 'splashscreen.html'
})
export class SplashscreenComponent {
  splashToggle = false;
  actionSub: Subscription;

  constructor(private dispatcher: ActionsSubject) {
  }

  ngOnInit() {
    // listen to the dispatcher directly to circumvent using more selectors and members for an event that happens once per application launch
    this.actionSub = this.dispatcher.filter(action => action.type === '[Preferences] Close Splash').subscribe(() => {
      setTimeout(() => {
        this.splashToggle = true;
        this.actionSub.unsubscribe();
      }, SPLASHDELAYTIMER);
    });
  }
}
