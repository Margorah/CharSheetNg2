import { Action } from '@ngrx/store';
import { CharacterStat } from '../../models/stat-model';
import { Character } from '../../models/character-model';

export const ADD                        = '[Character-Stat] Add';
// export const ADD_ERROR                  = '[Character-Stat] Add Error'
export const ADD_NETWORK                = '[Character-Stat] Add Network'
export const ADD_NETWORK_SUCCESS        = '[Character-Stat] Add Network Success';
export const ADD_NETWORK_ERROR          = '[Character-Stat] Add Network Error';

export const SAVE                       = '[Character-Stat] Save';
export const SAVE_ERROR                 = '[Character-Stat] Save Error';

export const SAVE_META                  = '[Character-Stat] Save Meta';
export const SAVE_META_ERROR            = '[Character-Stat] Save Meta Error';

export const SAVE_MANY                  = '[Character-Stat] Save Many';
export const SAVE_MANY_ERROR            = '[Character-Stat] Save Many Error';

export const LOAD_MANY                  = '[Character-Stat] Load Many';
export const LOAD_MANY_SUCCESS          = '[Character-Stat] Load Many Success';
export const LOAD_MANY_NONE             = '[Character-Stat] Load Many None';
export const LOAD_MANY_ERROR            = '[Character-Stat] Load Many Error';
export const LOAD_MANY_NETWORK          = '[Character-Stat] Load Many Network';
export const LOAD_MANY_NETWORK_SUCCESS  = '[Character-Stat] Load Many Network Success';
export const LOAD_MANY_NETWORK_ERROR    = '[Character-Stat] Load Many Network Error';

export const LOGOUT                     = '[Character-Stat] Logout';

export const REMOVE                     = '[Character-Stat] Remove';
// export const REMOVE_ERROR               = '[Character-Stat] Remove Error';
export const REMOVE_NETWORK             = '[Character-Stat] Remove Network';
export const REMOVE_NETWORK_SUCCESS     = '[Character-Stat] Remove Network Success';
export const REMOVE_NETWORK_ERROR       = '[Character-Stat] Remove Network Error';

export const REMOVE_ALL                 = '[Character-Stat] Remove All';
export const REMOVE_ALL_ERROR           = '[Character-Stat] Remove All Error';
export const REMOVE_ALL_NETWORK         = '[Character-Stat] Remove All Network';
export const REMOVE_ALL_NETWORK_SUCCESS = '[Character-Stat] Remove All Network Success';
export const REMOVE_ALL_NETWORK_ERROR   = '[Character-Stat] Remove All Network Error';

export const UPDATE                     = '[Character-Stat] Update';
// export const UPDATE_ERROR               = '[Character-Stat] Update Error';
export const UPDATE_NETWORK             = '[Character-Stat] Update Network';
export const UPDATE_NETWORK_SUCCESS     = '[Character-Stat] Update Network Success';
export const UPDATE_NETWORK_ERROR       = '[Character-Stat] Update Network Error';

export const REORDER                    = '[Character-Stat] Reorder';
//Add Update All Network?

export const SELECT                     = '[Character-Stat] Select';
export const UNSELECT                   = '[Character-Stat] Unselect';
// export const SELECT_ERROR               = '[Character-Stat] Select Error';

export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: {name: string,  value: number, maximum: number, type: string, component: string}) { }
};

// export class AddError implements Action {
//     readonly type = ADD_ERROR;

//     constructor() { }
// };

export class AddNetwork implements Action {
    readonly type = ADD_NETWORK;

    constructor(public payload: {stat: CharacterStat, char: Character}) { }
};

export class AddNetworkSuccess implements Action {
    readonly type = ADD_NETWORK_SUCCESS;

    constructor() { }
};

export class AddNetworkError implements Action {
    readonly type = ADD_NETWORK_ERROR;

    constructor() { }
};

export class Save implements Action {
    readonly type = SAVE;

    constructor(public payload: CharacterStat) { }
};

export class SaveError implements Action {
    readonly type = SAVE_ERROR;

    constructor() { }
};

export class SaveMeta implements Action {
    readonly type = SAVE_META;

    constructor() { }
};

export class SaveMetaError implements Action {
    readonly type = SAVE_META_ERROR;

    constructor() { }
};

export class SaveMany implements Action {
    readonly type = SAVE_MANY;

    constructor(public payload: CharacterStat[]) { }
};

export class SaveManyError implements Action {
    readonly type = SAVE_MANY_ERROR;

    constructor() { }
};

export class LoadMany implements Action {
    readonly type = LOAD_MANY;

    constructor() { }
};

export class LoadManySuccess implements Action {
    readonly type = LOAD_MANY_SUCCESS;

    constructor(public payload: {stats: any, selected: string}) { }
};

export class LoadManyError implements Action {
    readonly type = LOAD_MANY_ERROR;

    constructor() { }
};

export class LoadManyNone implements Action {
    readonly type = LOAD_MANY_NONE;

    constructor() { }
};

export class LoadManyNetwork implements Action {
    readonly type = LOAD_MANY_NETWORK;

    constructor() { }
};

export class LoadManyNetworkSuccess implements Action {
    readonly type = LOAD_MANY_NETWORK_SUCCESS;

    constructor(public payload: CharacterStat[]) { }
};

export class LoadManyNetworkError implements Action {
    readonly type = LOAD_MANY_NETWORK_ERROR;

    constructor() { }
};

export class Logout implements Action {
    readonly type = LOGOUT;

    constructor() { }
};

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
};

// export class RemoveError implements Action {
//     readonly type = REMOVE_ERROR;

//     constructor() { }
// };

export class RemoveNetwork implements Action {
    readonly type = REMOVE_NETWORK;

    constructor(public payload: string) { }
};

export class RemoveNetworkSuccess implements Action {
    readonly type = REMOVE_NETWORK_SUCCESS;

    constructor() { }
};

export class RemoveNetworkError implements Action {
    readonly type = REMOVE_NETWORK_ERROR;

    constructor() { }
};

export class RemoveAll implements Action {
    readonly type = REMOVE_ALL;

    constructor(public payload: string) { }
};

export class RemoveAllError implements Action {
    readonly type = REMOVE_ALL_ERROR;

    constructor() { }
};

export class RemoveAllNetwork implements Action {
    readonly type = REMOVE_ALL_NETWORK;

    constructor() { }
};

export class RemoveAllNetworkSuccess implements Action {
    readonly type = REMOVE_ALL_NETWORK_SUCCESS;

    constructor() { }
};

export class RemoveAllNetworkError implements Action {
    readonly type = REMOVE_ALL_NETWORK_ERROR;

    constructor() { }
};

export class Update implements Action {
    readonly type = UPDATE;

    constructor(public payload: {id: string, name: string,  value: number, maximum: number, type: string, component: string}) { }
};

// export class UpdateError implements Action {
//     readonly type = UPDATE_ERROR;

//     constructor() { }
// };

export class UpdateNetwork implements Action {
    readonly type = UPDATE_NETWORK;

    constructor(public payload: CharacterStat) { }
};

export class UpdateNetworkSuccess implements Action {
    readonly type = UPDATE_NETWORK_SUCCESS;

    constructor() { }
};

export class UpdateNetworkError implements Action {
    readonly type = UPDATE_NETWORK_ERROR;

    constructor() { }
};

export class Reorder implements Action {
    readonly type = REORDER;

    constructor(public payload:{from: number, to: number}) { }
}

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: number) { }
};

export class Unselect implements Action {
    readonly type = UNSELECT;

    constructor() { }
};

// export class SelectError implements Action {
//     readonly type = SELECT_ERROR;

//     constructor() { }
// };

export type All
    = Add
    // | AddError
    | AddNetwork
    | AddNetworkSuccess
    | AddNetworkError
    | Save
    | SaveError
    | SaveMeta
    | SaveMetaError
    | SaveMany
    | SaveManyError
    | LoadMany
    | LoadManySuccess
    | LoadManyError
    | LoadManyNone  
    | LoadManyNetwork
    | LoadManyNetworkSuccess
    | LoadManyNetworkError
    | Logout
    | Remove
    // | RemoveError
    | RemoveNetwork
    | RemoveNetworkSuccess
    | RemoveNetworkError
    | RemoveAll
    | RemoveAllError
    | RemoveAllNetwork
    | RemoveAllNetworkSuccess
    | RemoveAllNetworkError
    | Update
    // | UpdateError
    | UpdateNetwork
    | UpdateNetworkSuccess
    | UpdateNetworkError
    | Reorder
    | Select
    | Unselect
    // | SelectError;
