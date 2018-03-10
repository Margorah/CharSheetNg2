import { Action } from '@ngrx/store';
import { PreferenceState } from '../reducers/preferences-reducer';

export const LOAD         = '[Preferences] Load';
export const LOAD_SUCCESS = '[Preferences] Load Success';
export const LOAD_ERROR   = '[Preferences] Load Error';

export const CLOSE_SPLASH = '[Preferences] Close Splash';

export const SAVE         = '[Preferences] Save';
export const SAVE_ERROR   = '[Preferences] Save Error';
export const SAVE_SUCCESS = '[Preferences] Save Success'

export const CHANGE_MODE  = '[Preferences] Change Mode';
export const CHANGE_THEME = '[Preferences] Change Theme';
export const CHANGE_TIMER = '[Preferences] Change Timer';
export const CHANGE_INIT  = '[Preferences] Change Init';
export class Load implements Action {
    readonly type = LOAD;

    constructor() { }
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: PreferenceState) { }
}

export class LoadError implements Action {
    readonly type = LOAD_ERROR;

    constructor() { }
}

export class CloseSplash implements Action {
    readonly type = CLOSE_SPLASH;

    constructor() { }
}

export class Save implements Action {
    readonly type = SAVE;

    constructor() { }
}

export class SaveSuccess implements Action {
    readonly type = SAVE_SUCCESS;

    constructor() { }
}

export class SaveError implements Action {
    readonly type = SAVE_ERROR;

    constructor() { }
}

export class ChangeMode implements Action {
    readonly type = CHANGE_MODE;

    constructor(public payload: string) { }
}

export class ChangeTheme implements Action {
    readonly type = CHANGE_THEME;

    constructor(public payload: string) { }
}

export class ChangeTimer implements Action {
    readonly type = CHANGE_TIMER;

    constructor(public payload: number) { }
}

export class ChangeInit implements Action {
    readonly type = CHANGE_INIT;

    constructor(public payload: boolean) { }
}

export type All
    = Load
    | LoadSuccess
    | LoadError
    | CloseSplash
    | Save
    | SaveSuccess
    | SaveError
    | ChangeInit
    | ChangeMode
    | ChangeTheme
    | ChangeTimer;
