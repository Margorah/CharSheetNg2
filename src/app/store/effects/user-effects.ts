import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';

import * as UserActions from '../actions/user-actions';
import * as NavActions from '../actions/nav-actions';
import * as CharacterActions from '../actions/character-actions';
import * as StatActions from '../actions/stat-actions';
import * as PrefActions from '../actions/preferences-actions';
import * as fromRoot from '../reducers';

import * as PREFERENCES from '../../models/preferences-model';

@Injectable()
export class UserEffects {
    @Effect()
    $create: Observable<Action> = this.actions$.ofType(UserActions.CREATE)
        .map(toPayload)
        .switchMap(payload => this.http.createUser(payload.name, payload.email, payload.password))
        .mergeMap((user) => {
            // Do we go to loadMany and let it decide for network or do it here?
            let mergeActions = [
                new UserActions.CreateSuccess(user),
                new UserActions.Save(user),
                new PrefActions.ChangeMode(PREFERENCES.MODE.ONLINE),
                new NavActions.CharacterList()
            ];
            return mergeActions;
        });

    @Effect()
    // Login Can be from anywhere now. Will likely have to change which page should be navigated to after successful login
    login$: Observable<Action> = this.actions$.ofType(UserActions.LOGIN)
        .map(toPayload)
        .switchMap(payload => {
            return this.http.login(payload.email, payload.password);
        })
        .mergeMap((user) => {
            // Do we go to loadMany and let it decide for network or do it here?
            let mergeActions = [
                new UserActions.LoginSuccess(user),
                new UserActions.Save(user),
                new PrefActions.ChangeMode(PREFERENCES.MODE.ONLINE),
                new NavActions.Back(),               
                new CharacterActions.LoadMany()
            ];
            return mergeActions;
        });

    @Effect()
    logout$: Observable<Action> = this.actions$.ofType(UserActions.LOGOUT)
        .withLatestFrom(this.store$.select(fromRoot.getAuth), (action, token) => token)
        .switchMap((authToken) => this.http.logout(authToken))
        .mergeMap((res) => {
            let mergeActions: Action[] = [];
            if (res) {
                // Clear DB or clear specific sections?
                this.storage.clearDB();
                mergeActions.push(new PrefActions.ChangeMode(PREFERENCES.MODE.OFFLINE));
                mergeActions.push(new UserActions.LogoutSuccess());
                mergeActions.push(new CharacterActions.Logout());
                mergeActions.push(new StatActions.Logout());
                mergeActions.push(new NavActions.CharacterList());
            } else {
                // Need action for logout error!!!
                mergeActions.push(new UserActions.LoadError());
            }
            return mergeActions;
        });  
    
    @Effect()
    load$: Observable<Action> = this.actions$.ofType(UserActions.LOAD)
        .mergeMap(() => this.storage.getUserState())
        // Is there a case where Preference Mode needs to be checked?
        .mergeMap((userState) => {
            let newAction: Action[] = [];
            if (userState === null) {
                newAction.push(new UserActions.LoadNone());
            } else {
                newAction.push(new UserActions.LoadSuccess(userState));
            }
            newAction.push(new CharacterActions.LoadMany());            
            return newAction;
        });

    
    @Effect({dispatch: false})
    save$: Observable<Action> = this.actions$.ofType(UserActions.SAVE)
        .map(toPayload)
        .map((userState) => {
            this.storage.setUserState(userState);
            return null;
        });  

    constructor(private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private storage: StorageService) { }
};
