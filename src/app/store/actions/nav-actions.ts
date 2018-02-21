import { Action } from '@ngrx/store';

// export const CREATE_USER      = '[Nav] Create User';
// export const LOGIN            = '[Nav] Login';
export const CHARACTER_LIST   = '[Nav] Character List';
export const CREATE_CHARACTER = '[Nav] Create Character';
export const CHARACTER_SHEET  = '[Nav] Character Sheet';
export const CREATE_STAT      = '[Nav] Create Stat';
export const BACK             = '[Nav] Back';
export const PREFERENCES      = '[Nav] Preferences';
export const HELP_SLIDES      = '[Nav] Help Slides';
export const HELP_SLIDES_MENU = '[Nav] Help Slides Menu';

// export class CreateUser implements Action {
//     readonly type = CREATE_USER;
//     constructor() { }
// }

// export class Login implements Action {
//     readonly type = LOGIN;
//     constructor() { }
// }

export class CharacterList implements Action {
    readonly type = CHARACTER_LIST;
    constructor() { }
}

export class CreateCharacter implements Action {
    readonly type = CREATE_CHARACTER;
    constructor() { }
}

export class CharacterSheet implements Action {
    readonly type = CHARACTER_SHEET;
    constructor() { }
}

export class CreateStat implements Action {
    readonly type = CREATE_STAT;
    constructor(public payload?: string) { }
}

export class Back implements Action {
    readonly type = BACK;
    constructor() { }
}

export class Preferences implements Action {
    readonly type = PREFERENCES;
    constructor() { }
}

export class HelpSlides implements Action {
    readonly type = HELP_SLIDES;
    constructor() { }
}

export class HelpSlidesMenu implements Action {
    readonly type = HELP_SLIDES_MENU;
    constructor() { }
}


export type All
    // = CreateUser
    // | Login
    = CharacterList
    | CreateCharacter
    | CharacterSheet
    | CreateStat
    | Back
    | Preferences
    | HelpSlides
    | HelpSlidesMenu;
