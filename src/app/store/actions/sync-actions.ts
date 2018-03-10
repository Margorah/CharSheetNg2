import { Action } from '@ngrx/store';
import { SyncState } from '../reducers/sync-reducer';

export const ADD_CHARACTER     = '[Sync] Add Character';
export const ADD_STAT          = '[Sync] Add Stat';

export const UPDATE_CHARACTER  = '[Sync] Update Character';
export const UPDATE_STAT       = '[Sync] Update Stat';

export const DELETE_CHARACTER  = '[Sync] Delete Character';
export const DELETE_STAT       = '[Sync] Delete Stat';

export const LOAD              = '[Sync] Load';
export const LOAD_SUCCESS      = '[Sync] Load Success';
export const LOAD_ERROR        = '[Sync] Load Error';

export const SAVE              = '[Sync] Save';
export const SAVE_ERROR        = '[Sync] Save Error';
export const SAVE_SUCCESS      = '[Sync] Save Success';

// Add Syncing, Syncing finish so it can alert player
export const SYNC              = '[Sync] Sync';
export const SYNC_DONE         = '[Sync] Sync Done';

export const SYNC_DOWN         = '[Sync] Down';
export const SYNC_DOWN_SUCCESS = '[Sync] Down Success';
export const SYNC_DOWN_ERROR   = '[Sync] Down Error';

export const SYNC_UP           = '[Sync] Up';
export const SYNC_UP_SUCCESS   = '[Sync] Up Success';
export const SYNC_UP_ERROR     = '[Sync] Up Error';

export class AddCharacter implements Action {
    readonly type = ADD_CHARACTER;

    constructor(public payload: string) { }
};

export class AddStat implements Action {
    readonly type = ADD_STAT;

    constructor(public payload: string) { }
};

export class UpdateCharacter implements Action {
    readonly type = UPDATE_CHARACTER;

    constructor(public payload: string) { }
};

export class UpdateStat implements Action {
    readonly type = UPDATE_STAT;

    constructor(public payload: string) { }
};

export class DeleteCharacter implements Action {
    readonly type = DELETE_CHARACTER;

    constructor(public payload: string) { }
};

export class DeleteStat implements Action {
    readonly type = DELETE_STAT;

    constructor(public payload: string) { }
};

export class Load implements Action {
    readonly type = LOAD;

    constructor() { }
};

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: SyncState) { }
};

export class LoadError implements Action {
    readonly type = LOAD_ERROR;

    constructor() { }
};

export class Save implements Action {
    readonly type = SAVE;

    constructor(public payload: SyncState) { }
};

export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor() { }
};

export class SaveError implements Action {
    readonly type = SAVE_ERROR;

    constructor() { }
};

export class Sync implements Action {
    readonly type = SYNC;

    constructor() { }
};

export class SyncDone implements Action {
    readonly type = SYNC_DONE;

    constructor() { }
};

export class SyncDown implements Action {
    readonly type = SYNC_DOWN;

    constructor() { }
};

export class SyncDownSuccess implements Action {
    readonly type = SYNC_DOWN_SUCCESS;

    constructor() { }
};

export class SyncDownError implements Action {
    readonly type = SYNC_DOWN_ERROR;

    constructor() { }
};

export class SyncUp implements Action {
    readonly type = SYNC_UP;

    constructor() { }
};

export class SyncUpSuccess implements Action {
    readonly type = SYNC_UP_SUCCESS;

    constructor() { }
};

export class SyncUpError implements Action {
    readonly type = SYNC_UP_ERROR;

    constructor() { }
};

export type All
    = AddCharacter
    | AddStat
    | UpdateCharacter
    | UpdateStat
    | DeleteCharacter
    | DeleteStat
    | Load
    | LoadSuccess
    | LoadError
    | Save
    | SaveError
    | SaveSuccess
    | Sync
    | SyncDone
    | SyncDown
    | SyncDownSuccess
    | SyncDownError
    | SyncUp
    | SyncUpSuccess
    | SyncUpError;
