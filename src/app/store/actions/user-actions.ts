import { Action } from '@ngrx/store';
import { UserState } from '../reducers/user-reducer';

export const CREATE         = '[User] Create';
export const CREATE_SUCCESS = '[User] Create Success';

export const LOGOUT         = '[User] Logout';
export const LOGOUT_SUCCESS = '[User] Logout Success';

export const LOGIN          = '[User] Login';
export const LOGIN_SUCCESS  = '[User] Login Success';

export const LOAD           = '[User] Load';
export const LOAD_SUCCESS   = '[User] Load Success';
export const LOAD_ERROR     = '[User] Load Error';
export const LOAD_NONE      = '[User] Load None';

export const SAVE           = '[User] Save';
export const SAVE_ERROR     = '[User] Save Error';

export class Create implements Action {
    readonly type = CREATE;

    constructor(public payload: {name: string, email: string, password: string}) { }
};

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: UserState) { }
};

export class Logout implements Action {
    readonly type = LOGOUT;

    constructor() { }
}

export class LogoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;

    constructor() { }
};

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: {email: string, password: string}) { }
};

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: UserState) { }
};

export class Load implements Action {
    readonly type = LOAD;

    constructor() { }
};

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: UserState) { }
};

export class LoadError implements Action {
    readonly type = LOAD_ERROR;

    constructor() { }
};

export class LoadNone implements Action {
    readonly type = LOAD_NONE;

    constructor() { }
};

export class Save implements Action {
    readonly type = SAVE;

    constructor(public payload: UserState) { }
};

export class SaveError implements Action {
    readonly type = SAVE_ERROR;

    constructor() { }
};

export type All
    = Create
    | CreateSuccess
    | Logout
    | LogoutSuccess
    | Login
    | LoginSuccess
    | Load
    | LoadSuccess
    | LoadError  
    | LoadNone
    | Save
    | SaveError;
