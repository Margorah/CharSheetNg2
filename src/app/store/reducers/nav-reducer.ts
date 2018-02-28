import { createSelector } from 'reselect';

import * as NavActions from '../actions/nav-actions';

import { PAGES } from '../../models/nav-model';

export interface State {
    pages: { [name: string]: any };
    root: string;
    stack: string;
};

const initialState: State = {
    pages: PAGES,
    root: 'charList',
    stack: null
};

export function reducer(state =  initialState, action: NavActions.All): State {
    switch(action.type) {
        case NavActions.ABOUT_MENU: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'about'
            };
        }
        case NavActions.ABOUT: {
            return {
                pages: state.pages,
                root: 'about',
                stack: null                
            }
        }
        case NavActions.LOGIN: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'login'
            };
        };
        case NavActions.CREATE_USER: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'createUser'
            };
        };
        case NavActions.CHARACTER_LIST: {
            return {
                pages: state.pages,
                root: 'charList',
                stack: null
            };
        };
        case NavActions.CREATE_CHARACTER: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'createChar'
            };
        };
        case NavActions.CHARACTER_SHEET: {
            return {
                pages: state.pages,
                root: 'charSheet',
                stack: null
            };
        };
        case NavActions.CREATE_STAT: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'createStat'
            };
        };
        case NavActions.BACK: {
            return {
                pages: state.pages,
                root: state.root,
                stack: null
            };
        }
        case NavActions.PREFERENCES: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'preferences'
            };
        }
        case NavActions.HELP_SLIDES: {
            return {
                pages: state.pages,
                root: 'helpSlide',
                stack: null
            };
        }
        case NavActions.HELP_SLIDES_MENU: {
            return {
                pages: state.pages,
                root: state.root,
                stack: 'helpSlide'
            };
        }
        default: {
            return state;
        }
    }
};

export const selectPages = (state: State) => state.pages;
export const selectRoot = (state: State) => state.root;
export const selectStack = (state: State) => state.stack;

export const getRootPage = createSelector(selectRoot, selectPages, (name, pages) => pages[name]);
export const getStackPage = createSelector(selectStack, selectPages, (name, pages) => pages[name]);
