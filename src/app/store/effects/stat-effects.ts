import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/flatMap';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

// import { HttpService } from '../../services/http.service';
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
        .withLatestFrom(this.store$.select(fromRoot.getStatAddedChar), (action, state) => state)
        // .map((state) => this.storage.addStat(
        //     state.charId, state.meta.ids, state.meta.selectedId, state.stat))
        .withLatestFrom(this.store$.select(fromRoot.getNetPref), (state, pref) => {return {state, pref}})    
        .mergeMap((meta)  => {
            meta.state.char.updated = Date.now();

            let merge: Action[] = [
                new StatActions.Save(meta.state.stat),
                new StatActions.SaveMeta(),
                new CharacterActions.UpdateTime(meta.state.char),
            ];
            // Check for Error and dispatch here?
            // TODO: CHECK TIMER UP?
            if (meta.pref.mode === PREFERENCES.MODE.ONLINE) {
                merge.push(new StatActions.AddNetwork({stat: meta.state.stat, char: meta.state.char}));
            }

            merge.push(new NavActions.Back());
            return merge;
        });

    // @Effect()
    // addNetwork$: Observable<Action> = this.actions$.ofType(StatActions.ADD_NETWORK)
    //     .map(toPayload)
    //     .withLatestFrom(this.store$.select(fromRoot.getAuth), (payload, token) => {
    //         return {
    //             auth: token,
    //             char: payload.char,
    //             stat: payload.stat
    //         };            
    //     })
    //     .switchMap((result) => this.http.createCharacterStat(result.auth, result.char, result.stat))
    //     .map((stat) => new StatActions.AddNetworkSuccess());

    @Effect({dispatch: false})
    save$: Observable<Action> = this.actions$.ofType(StatActions.SAVE)
        .map(toPayload)
        .map((stat) => {
            this.storage.setStat(stat);               
            return null;
        });

    @Effect({dispatch: false})
    saveMeta$: Observable<Action> = this.actions$.ofType(StatActions.SAVE)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaChar) , (action, payload) => payload)
        .map((state) => {
            this.storage.setStatMetaState(state.char.id, state.meta.ids, state.meta.selectedId);          
            return null;
        });
    
    @Effect({dispatch: false})
    saveMany: Observable<Action> = this.actions$.ofType(StatActions.SAVE_MANY)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaChar), (stats, meta) => {
            return {
                stats,
                state: meta.meta,
                char: meta.char
            };
        })
        .map((payload) => {
            this.storage.setStatMetaState(payload.char.id, payload.state.ids, payload.state.selectedId);
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
                // Check For newer here
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

    // @Effect()
    // loadManyNet$: Observable<Action> = this.actions$.ofType(StatActions.LOAD_MANY_NETWORK)
    //     .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (action, payload) => payload)
    //     .switchMap((payload) => this.http.getCharacterStats(payload.auth, payload.char.id))
    //     .mergeMap((result) =>  {
    //         let merge: Action[] = [
    //             new StatActions.LoadManyNetworkSuccess(result)
    //         ];
    //         if (result.length > 0 ) {
    //             merge.push(new StatActions.SaveMany(result))
    //         }
    //         return merge;
    //         // Save Dispatched Here?
    //     });
    
    @Effect({dispatch: false})
    removeAll$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_ALL)
        .map(toPayload)
        .map((charId) => {
            this.storage.remStats(charId);
            return null;
        });

    // @Effect()
    // removeAllNet$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_ALL_NETWORK)
    //     .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (action, payload) => payload)
    //     // Need to Add Delete All Character Stats
    //     .switchMap((payload) => this.http.deleteCharacterStats(payload.auth, payload.char.id))
    //     .map((res) => new StatActions.RemoveAllNetworkSuccess());

    @Effect()
    remove$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaCharNetPref), (payload, meta) => {
            return {
                char: meta.char,
                ids: meta.meta.ids,
                selected: meta.meta.selectedId,
                statId: payload,
                pref: meta.pref
            };
        })
        .mergeMap((payload) => {
            this.storage.remStat(payload.char.id, payload.ids, payload.selected, payload.statId);
            let char = payload.char;
            char.updated = Date.now();
            let merge: Action[] = [
                new CharacterActions.UpdateTime(char)
            ];
            //TODO: CHECK TIMER?
            if (payload.pref.mode === PREFERENCES.MODE.ONLINE) {
                merge.push(new StatActions.RemoveNetwork(payload.statId));
            }
            return merge;
        });

    // @Effect()
    // removeNet$: Observable<Action> = this.actions$.ofType(StatActions.REMOVE_NETWORK)
    //     .map(toPayload)
    //     .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (payload, charAuth) => {
    //         return {
    //             auth: charAuth.auth,
    //             charId: charAuth.char.id,
    //             statId: payload
    //         };        
    //     })
    //     .switchMap((payload) => this.http.deleteCharacterStat(payload.auth, payload.charId, payload.statId))
    //     .map((res) => new StatActions.RemoveNetworkSuccess());  
  
    @Effect()
    update$: Observable<Action> = this.actions$.ofType(StatActions.UPDATE)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaCharNetPref), (stat, state) => {
            return {
                char: state.char,
                stat: stat,
                meta: state.meta,
                pref: state.pref
            };
        })      
        .mergeMap((state) => {
            let char = state.char;
            char.updated = Date.now()
            let merge: Action[] = [
                new CharacterActions.UpdateTime(char),
                new StatActions.Save(state.stat)
                // new StatActions.SaveMeta()  // because update does not change state.ids or state.selected meta does not need to be saved
            ];

            //TODO: CHECK TIMER?
            if (state.pref.mode === PREFERENCES.MODE.ONLINE) {
                merge.push(new StatActions.UpdateNetwork(state.stat));
            }
            return merge;
        });

    // @Effect()
    // updateNet$: Observable<Action> = this.actions$.ofType(StatActions.UPDATE_NETWORK)
    //     .map(toPayload)
    //     .withLatestFrom(this.store$.select(fromRoot.getCharAuth), (payload, charAuth) => {
    //         return {
    //             auth: charAuth.auth,
    //             char: charAuth.char,
    //             stat: payload
    //         };
    //     })
    //     .switchMap((payload) => this.http.patchCharacterStat(payload.auth, payload.char.id, payload.char.updated, payload.stat))
    //     .map(() => new StatActions.UpdateNetworkSuccess());

    @Effect({dispatch: false})
    select$: Observable<Action> = this.actions$.ofType(StatActions.SELECT)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaChar), (action, state) => state)
        .map((state) => {
            this.storage.setStatMetaState(state.char.id, state.meta.ids, state.meta.selectedId);
            return null;
        });

    @Effect({dispatch: false})
    unselect$: Observable<Action> = this.actions$.ofType(StatActions.UNSELECT)
        .withLatestFrom(this.store$.select(fromRoot.getStatMetaChar), (action, state) => state)
        .map((state) => {
            this.storage.setStatMetaState(state.char.id, state.meta.ids, state.meta.selectedId);
            return null;
        });    

    constructor(
        // private http: HttpService,
                private actions$: Actions,
                private store$: Store<fromRoot.State>,
                private storage: StorageService) { }
};
