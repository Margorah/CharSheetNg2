import { createSelector } from 'reselect';

import * as fromUser from './user-reducer';
import * as fromChars from './character-reducer';
import * as fromStats from './stat-reducer';
import * as fromNav from './nav-reducer';
import * as fromPref from './preferences-reducer';
// import * as fromSync from './sync-reducer';

// Notes taken from this repo: https://github.com/ngrx/example-app

export interface State {
    user: fromUser.UserState;
    characters: fromChars.CharacterState;
    stats: fromStats.StatState;
    nav: fromNav.State;
    pref: fromPref.PreferenceState;
    // sync: fromSync.SyncState;
};

export const reducers = {
    user: fromUser.reducer,
    characters: fromChars.reducer,
    stats: fromStats.reducer,
    nav: fromNav.reducer,
    pref: fromPref.reducer,
    // sync: fromSync.reducer
};

export const getUserState = (state: State) => state.user;

export const getAuth        = createSelector(getUserState, fromUser.getAuth);
export const getUsername    = createSelector(getUserState, fromUser.getUsername);
export const getEmail       = createSelector(getUserState, fromUser.getEmail);
export const getUserId      = createSelector(getUserState, fromUser.getUserId);
export const getUser        = createSelector(getUserState, fromUser.getUser);

export const getCharState = (state: State) => state.characters;

export const getCharacters       = createSelector(getCharState, fromChars.getCharacters);
export const getCharacter        = createSelector(getCharState, fromChars.getCharacter);
export const getCharacterId      = createSelector(getCharState, fromChars.getSelectedId);
export const getLatestChar       = createSelector(getCharState, fromChars.getLastAdded);
export const getCharMeta         = createSelector(getCharState, fromChars.getMeta);
export const getCharLateMeta     = createSelector(getCharState, fromChars.getLatestMeta);

export const getStatState = (state: State) => state.stats;

export const getStats        = createSelector(getStatState, fromStats.getStats);
export const getStatId       = createSelector(getStatState, fromStats.getSelectedId);
export const getStat         = createSelector(getStatState, fromStats.getStat);
export const getLatestStat   = createSelector(getStatState, fromStats.getLastAdded);
export const getStatMeta     = createSelector(getStatState, fromStats.getMeta);
export const getStatAddedMeta = createSelector(getStatState, fromStats.getAddedMeta);

export const getStatMetaChar = createSelector(getCharacter, getStatMeta, (char, meta) => {
    return { char, meta };
});
export const getStatAddedChar = createSelector(getCharacter, getStatAddedMeta, (char, statMeta) => {
    return { char, stat: statMeta.stat, meta: statMeta.meta };
})

export const getNavState = (state: State) => state.nav;

export const getNavRootPage    = createSelector(getNavState, fromNav.getRootPage);
export const getNavStackPage   = createSelector(getNavState, fromNav.getStackPage);
export const getNav            = createSelector(getNavRootPage, getNavStackPage, (root, stack) =>  { return { root, stack }});

export const getPrefState = (state: State) => state.pref;

export const getPrefMode = createSelector(getPrefState, fromPref.getMode);
export const getPrefInterval = createSelector(getPrefState, fromPref.getInterval);
export const getPrefTheme = createSelector(getPrefState, fromPref.getTheme);
export const getPrefInit = createSelector(getPrefState, fromPref.getInit);

// export const getSyncState = (state: State) => state.sync;

// export const getLastSync = createSelector(getSyncState, fromSync.getLastSync);
// export const getCharSync = createSelector(getSyncState, fromSync.getCharSync);
// export const getStatSync = createSelector(getSyncState, fromSync.getStateSync);

export const getNetPref         = createSelector(getPrefMode, getPrefInterval, (mode, interval) => { return { mode, interval }});
export const getStatMetaCharNetPref = createSelector(getCharacter, getStatMeta, getNetPref, (char, meta, pref) => { return { char, meta, pref } });
export const getCharAuth        = createSelector(getAuth, getCharacter, (auth, char) => { return { auth, char }});
export const getUsernameAndChar = createSelector(getUsername, getCharacter, (user, char) => { return { user, char }});
export const getStatToRemove    =
    createSelector(getAuth, getCharacterId, getStat, (auth, char, stat) => { return { auth, char, stat} });