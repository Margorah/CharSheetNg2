import { Action } from '@ngrx/store';
import { Character } from '../../models/character-model';

export const ADD                        = '[Character] Add';
// export const ADD_ERROR                  = '[Character] Add Error';
// export const ADD_NETWORK                = '[Character] Add Network';
// export const ADD_NETWORK_SUCCESS        = '[Character] Add Network Success';
// export const ADD_NETWORK_ERROR          = '[Character] Add Network Error';

export const SAVE                       = '[Character] Save';
export const SAVE_ERROR                 = '[Character] Save Error';

export const SAVE_META                  = '[Character] Save Meta';
export const SAVE_META_ERROR            = '[Character] Save Meta Error';

export const SAVE_MANY                  = '[Character] Save Many';
export const SAVE_MANY_ERROR            = '[Character] Save Many Error';

export const LOAD_MANY                  = '[Character] Load Many';
export const LOAD_MANY_SUCCESS          = '[Character] Load Many Success'
export const LOAD_MANY_NONE             = '[Character] Load Many None';
// export const LOAD_MANY_ERROR            = '[Character] Load Many Error';
// export const LOAD_MANY_NETWORK          = '[Character] Load Many Network';
// export const LOAD_MANY_NETWORK_SUCCESS  = '[Character] Load Many Network Success';
// export const LOAD_MANY_NETWORK_ERROR    = '[Character] Load Many Network Error';

// export const LOGOUT                     = '[Character] Logout';

export const REMOVE                     = '[Character] Remove';
// export const REMOVE_ERROR               = '[Character] Remove Error';
// export const REMOVE_NETWORK             = '[Character] Remove Network';
// export const REMOVE_NETWORK_SUCCESS     = '[Character] Remove Network Success';
// export const REMOVE_NETWORK_ERROR       = '[Character] Remove Network Error';

export const REMOVE_ALL                 = '[Character] Remove All';
// export const REMOVE_ALL_ERROR           = '[Character] Remove All Error';
// export const REMOVE_ALL_NETWORK         = '[Character] Remove All Network';
// export const REMOVE_ALL_NETWORK_SUCCESS = '[Character] Remove All Network Success';
// export const REMOVE_ALL_NETWORK_ERROR   = '[Character] Remove All Network Error';

export const UPDATE                     = '[Character] Update';
// export const UPDATE_ERROR               = '[Character] Update Error';
// export const UPDATE_NETWORK             = '[Character] Update Network';
// export const UPDATE_NETWORK_SUCCESS     = '[Character] Update Network Success';
// export const UPDATE_NETWORK_ERROR       = '[Character] Update Network Error';

export const UPDATE_TIME                = '[Character] Update Time';

export const SELECT                     = '[Character] Select';
export const UNSELECT                   = '[Character] Unselect';
export const SELECT_ERROR               = '[Character] Select Error';

export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: string) { }
};

// export class AddError implements Action {
//     readonly type = ADD_ERROR;

//     constructor() { }
// };

// export class AddNetwork implements Action {
//     readonly type = ADD_NETWORK;

//     constructor(public payload: Character) { }
// };

// export class AddNetworkSuccess implements Action {
//     readonly type = ADD_NETWORK_SUCCESS;

//     constructor() { }
// };

// export class AddNetworkError implements Action {
//     readonly type = ADD_NETWORK_ERROR;

//     constructor() { }
// };

export class Save implements Action {
    readonly type = SAVE;

    constructor(public payload: Character) { }
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

    constructor(public payload: Character[]) { }
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

    constructor(public payload: {chars: any, selected: string}) { }
};

export class LoadManyNone implements Action {
    readonly type = LOAD_MANY_NONE;

    constructor() { }
};

// export class LoadManyError implements Action {
//     readonly type = LOAD_MANY_ERROR;

//     constructor() { }
// };

// export class LoadManyNetwork implements Action {
//     readonly type = LOAD_MANY_NETWORK;

//     constructor() { }
// };

// export class LoadManyNetworkSuccess implements Action {
//     readonly type = LOAD_MANY_NETWORK_SUCCESS;

//     constructor(public payload: Character[]) { }
// };

// export class LoadManyNetworkError implements Action {
//     readonly type = LOAD_MANY_NETWORK_ERROR;

//     constructor() { }
// };

// export class Logout implements Action {
//     readonly type = LOGOUT;

//     constructor() { }
// };

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
};

// export class RemoveError implements Action {
//     readonly type = REMOVE_ERROR;

//     constructor() { }
// };

// export class RemoveNetwork implements Action {
//     readonly type = REMOVE_NETWORK;

//     constructor(public payload: string) { }
// };

// export class RemoveNetworkSuccess implements Action {
//     readonly type = REMOVE_NETWORK_SUCCESS;

//     constructor() { }
// };

// export class RemoveNetworkError implements Action {
//     readonly type = REMOVE_NETWORK_ERROR;

//     constructor() { }
// };

export class RemoveAll implements Action {
    readonly type = REMOVE_ALL;

    constructor() { }
};

// export class RemoveAllError implements Action {
//     readonly type = REMOVE_ALL_ERROR;

//     constructor() { }
// };

// export class RemoveAllNetwork implements Action {
//     readonly type = REMOVE_ALL_NETWORK;

//     constructor() { }
// };

// export class RemoveAllNetworkSuccess implements Action {
//     readonly type = REMOVE_ALL_NETWORK_SUCCESS;

//     constructor() { }
// };

// export class RemoveAllNetworkError implements Action {
//     readonly type = REMOVE_ALL_NETWORK_ERROR;

//     constructor() { }
// };

export class Update implements Action {
    readonly type = UPDATE;

    constructor(public payload: Character) { }
};

// export class UpdateError implements Action {
//     readonly type = UPDATE_ERROR;

//     constructor() { }
// };

export class UpdateTime implements Action {
    readonly type = UPDATE_TIME;

    constructor(public payload: Character) { }
}

// export class UpdateNetwork implements Action {
//     readonly type = UPDATE_NETWORK

//     constructor(public payload: Character) { }
// };

// export class UpdateNetworkSuccess implements Action {
//     readonly type = UPDATE_NETWORK_SUCCESS;

//     constructor() { }
// };

// export class UpdateNetworkError implements Action {
//     readonly type = UPDATE_NETWORK_ERROR;

//     constructor() { }
// };

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: number) { }
};

export class Unselect implements Action {
    readonly type = UNSELECT;

    constructor() { }
};

export class SelectError implements Action {
    readonly type = SELECT_ERROR;

    constructor() { }
};

export type All
    = Add
    // | AddError
    // | AddNetwork
    // | AddNetworkSuccess
    // | AddNetworkError
    | Save
    | SaveError
    | SaveMeta
    | SaveMetaError
    | SaveMany
    | SaveManyError
    | LoadMany
    | LoadManySuccess
    | LoadManyNone
    // | LoadManyError
    // | LoadManyNetwork
    // | LoadManyNetworkSuccess
    // | LoadManyNetworkError
    // | Logout
    | Remove
    // | RemoveError
    // | RemoveNetwork
    // | RemoveNetworkSuccess
    // | RemoveNetworkError
    | RemoveAll
    // | RemoveAllError
    // | RemoveAllNetwork
    // | RemoveAllNetworkSuccess
    // | RemoveAllNetworkError
    | Update
    // | UpdateError
    | UpdateTime
    // | UpdateNetwork
    // | UpdateNetworkSuccess
    // | UpdateNetworkError
    | Select
    | Unselect
    | SelectError;
