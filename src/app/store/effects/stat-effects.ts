import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/flatMap';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';

import * as StatActions from '../actions/stat-actions';
import * as CharacterActions from '../actions/character-actions';
import * as NavActions from '../actions/nav-actions';
import * as fromRoot from '../reducers';

import * as PREFERENCES from '../../models/preferences-model';

@Injectable()
export class StatEffects {
    @Effect()
    add$: Observable<Action> = this.actions$.ofType(StatActions.ADD)
    .withLatestFrom(this.store$.select(fromRoot.getStatAddedCharId), (action, state) => state)
    .map((state) => this.storage.addStat(
        state.charId, state.meta.ids, state.meta.selectedId, state.stat))
    .withLatestFrom(this.store$.select(fromRoot.getNetPref), (stat, pref) => {return {stat, pref}})    
    .mergeMap((meta)  => {
            let merge: Action[] = [];
            // Check for Error and dispatch here?
            // TODO: CHECK TIMER UP?
            if (meta.pref.mode === PREFERENCES.MODE.ONLINE) {
                merge.push(new StatActions.AddNetwork(meta.stat));
            }

            merge.push(new NavActions.Back());
            return merge;
        });

    @Effect()
    addNetwork$: Observable<Action> = this.actions$.ofType(StatActions.ADD_NETWORK)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (payload, token) => {
            return {
                auth: token.auth,
                charId: token.charId,
                stat: payload
            };            
        })
        .switchMap((result) => this.http.createCharacterStat(result.auth, result.charId, result.stat))
        .map((stat) => new StatActions.AddNetworkSuccess());
    
    @Effect({dispatch: false})
    saveMany: Observable<Action> = this.actions$.ofType(StatActions.SAVE_MANY)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaCharId), (stats, meta) => {
            return {
                stats,
                state: meta.meta,
                charId: meta.charId
            };
        })
        .map((payload) => {
            this.storage.setStatMetaState(payload.charId, payload.state.ids, payload.state.selectedId);
            this.storage.setStats(payload.stats);
            return null;
        })

    @Effect()
    loadMany$: Observable<Action> = this.actions$.ofType(StatActions.LOAD_MANY)
        .withLatestFrom(this.store$.select(fromRoot.getCharacterId), (action, charId) => charId)
        .mergeMap((charId) => this.storage.getStats(charId))
        .withLatestFrom(this.store$.select(fromRoot.getNetPref), (stat, pref) => {return {stat, pref}})
        .mergeMap((meta) => {
            let newAction: Action[] =[];

            if (meta.pref.mode === PREFERENCES.MODE.ONLINE) {
                newAction.push(new StatActions.LoadManyNetwork());
            } else {
                if (meta.stat !== null) {
                    newAction.push(new StatActions.LoadManySuccess(meta.stat));                   
                } else {
                    newAction.push(new StatActions.LoadManyNone());                    
                }
            }
            newAction.push(new NavActions.CharacterSheet());

            return newAction;
        });

    @Effect()
    loadManyNet$: Observable<Action> = this.actions$.ofType(StatActions.LOAD_MANY_NETWORK)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (action, payload) => payload)
        .switchMap((payload) => this.http.getCharacterStats(payload.auth, payload.charId))
        .mergeMap((result) =>  {
            let merge: Action[] = [
                new StatActions.LoadManyNetworkSuccess(result)
            ];
            if (result.length > 0 ) {
                merge.push(new StatActions.SaveMany(result))
            }
            return merge;
            // Save Dispatched Here?
        });
    
    @Effect()
    removeAll$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_ALL)
        .withLatestFrom(this.store$.select(fromRoot.getCharacterId), (action, charId) => charId)
        .map((charId) => {
            this.storage.remStats(charId);
            return new CharacterActions.RemoveAll();
        });

    @Effect()
    removeAllNet$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_ALL_NETWORK)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (action, payload) => payload)
        // Need to Add Delete All Character Stats
        .switchMap((payload) => this.http.deleteCharacterStats(payload.auth, payload.charId))
        .map((res) => new StatActions.RemoveAllNetworkSuccess());

    @Effect()
    remove$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaCharIdNetPref), (payload, meta) => {
            return {
                charId: meta.charId,
                ids: meta.meta.ids,
                selected: meta.meta.selectedId,
                statId: payload,
                pref: meta.pref
            };
        })
        .map((payload) => {
            this.storage.remStat(payload.charId, payload.ids, payload.selected, payload.statId);
            //TODO: CHECK TIMER?
            if (payload.pref.mode === PREFERENCES.MODE.ONLINE) {
                return new StatActions.RemoveNetwork(payload.statId);                
            } else {
                // Create RemoveSuccess
                return new StatActions.RemoveError();
            }
        });

    @Effect()
    removeNet$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_NETWORK)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (payload, char) => {
            return {
                auth: char.auth,
                charId: char.charId,
                statId: payload
            };        
        })
        .switchMap((payload) => this.http.deleteCharacterStat(payload.auth, payload.charId, payload.statId))
        .map((res) => new StatActions.RemoveNetworkSuccess());  
  
    @Effect()
    update$: Observable<Action> = this.actions$.ofType(StatActions.UPDATE)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaCharIdNetPref), (stat, state) => {
            return {
                charId: state.charId,
                stat: stat,
                meta: state.meta,
                pref: state.pref
            };
        })      
        .map((state) => {
            this.storage.setStat(state.stat)
            this.storage.setStatMetaState(state.charId, state.meta.ids, state.meta.selectedId);
            //TODO: CHECK TIMER?
            if (state.pref.mode === PREFERENCES.MODE.ONLINE) {
                return new StatActions.UpdateNetwork(state.stat);                
            } else {
                // Create Update Success
                return new StatActions.UpdateError();
            }
        });

    @Effect()
    updateNet$: Observable<Action> = this.actions$.ofType(StatActions.UPDATE_NETWORK)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (payload, charId) => {
            return {
                auth: charId.auth,
                char: charId.charId,
                stat: payload
            };
        })
        .switchMap((payload) => this.http.patchCharacterStat(payload.auth, payload.char, payload.stat))
        .map(() => new StatActions.UpdateNetworkSuccess());

    @Effect({dispatch: false})
    select$: Observable<Action> = this.actions$.ofType(StatActions.SELECT)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaCharId), (action, state) => state)
        .map((state) => {
            this.storage.setStatMetaState(state.charId, state.meta.ids, state.meta.selectedId);
            return null;
        });

    @Effect({dispatch: false})
    unselect$: Observable<Action> = this.actions$.ofType(StatActions.UNSELECT)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaCharId), (action, state) => state)
        .map((state) => {
            this.storage.setStatMetaState(state.charId, state.meta.ids, state.meta.selectedId);
            return null;
        });    

    constructor(private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private storage: StorageService) { }
};
