import { createSelector } from 'reselect';
import shortid from 'shortid';

import * as CharacterActions from '../actions/character-actions';
import { Character } from '../../models/character-model';

export interface CharacterState {
    ids: string[];
    entities: { [id: string]: Character};
    selectedCharId: string | null;
};

const initialState: CharacterState = {
    ids: [],
    entities: {},
    selectedCharId: null,
};

const genNewCharState = (stats: any, selected?: string): CharacterState => {
    let newState = {
        ids: [],
        entities: {},
        selectedCharId: (selected) || null
    };
    stats.map((stat) => {
        newState.ids.push(stat.id);
        newState.entities[stat.id] = stat;
    });
    return newState;
};

export function reducer(state = initialState, action: CharacterActions.All): CharacterState {
    switch (action.type) {
        case CharacterActions.ADD: {
            const newId = shortid.generate();
            const newUpdated = Date.now();
            const newChar: Character = {
                id: newId,
                name: action.payload,
                updated: newUpdated
            };
            const newState = {
                ids: [...state.ids, newId],
                entities: Object.assign({}, state.entities, {[newId]: newChar}),
                selectedCharId: state.selectedCharId
            }
            return newState;
        }
        case CharacterActions.LOAD_MANY_SUCCESS: {
            return genNewCharState(action.payload.chars, action.payload.selected);
        }
        // case CharacterActions.LOAD_MANY_NETWORK_SUCCESS: {
        //     return genNewCharState(action.payload);
        // }
        case CharacterActions.REMOVE: {
            const toRemoveId = action.payload;
            const selectedCharId = (toRemoveId === state.selectedCharId) ? null : state.selectedCharId;

            return {
                ids: state.ids.filter(id => id !== toRemoveId),
                entities: Object.assign({}, state.entities, {[toRemoveId]: undefined}),
                selectedCharId: selectedCharId
            };
        }
        // case CharacterActions.LOGOUT:
        case CharacterActions.REMOVE_ALL: {
            return initialState;
        }
        case CharacterActions.UPDATE_TIME:
        case CharacterActions.UPDATE: {
            const updatedChar = action.payload;

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[updatedChar.id]: updatedChar}),
                selectedCharId: state.selectedCharId
            }
        }
        case CharacterActions.SELECT: {
            const newSelectId = state.ids[action.payload];               

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities),
                selectedCharId: newSelectId
            };
        }
        case CharacterActions.UNSELECT: {
            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities),
                selectedCharId: null
            };
        }
        // case CharacterActions.ADD_ERROR:
        // case CharacterActions.ADD_NETWORK:
        // case CharacterActions.ADD_NETWORK_SUCCESS:
        // case CharacterActions.ADD_NETWORK_ERROR:
        case CharacterActions.SAVE:
        case CharacterActions.SAVE_ERROR:
        case CharacterActions.SAVE_META:
        case CharacterActions.SAVE_META_ERROR:        
        case CharacterActions.SAVE_MANY:
        case CharacterActions.SAVE_MANY_ERROR:
        case CharacterActions.LOAD_MANY:
        // case CharacterActions.LOAD_MANY_ERROR:
        // case CharacterActions.LOAD_MANY_NETWORK:
        // case CharacterActions.LOAD_MANY_NETWORK_ERROR:
        case CharacterActions.LOAD_MANY_NONE:
        // case CharacterActions.REMOVE_ERROR:
        // case CharacterActions.REMOVE_NETWORK:
        // case CharacterActions.REMOVE_NETWORK_SUCCESS:
        // case CharacterActions.REMOVE_NETWORK_ERROR:
        // case CharacterActions.REMOVE_ALL_ERROR:
        // case CharacterActions.REMOVE_ALL_NETWORK:
        // case CharacterActions.REMOVE_ALL_NETWORK_SUCCESS:
        // case CharacterActions.REMOVE_ALL_NETWORK_ERROR:
        // case CharacterActions.UPDATE_ERROR:
        // case CharacterActions.UPDATE_NETWORK:
        // case CharacterActions.UPDATE_NETWORK_SUCCESS:
        // case CharacterActions.UPDATE_NETWORK_ERROR:
        case CharacterActions.SELECT_ERROR:
        default:
            return state;
    }
};

export const getEntities   = (s: CharacterState) => s.entities;
export const getIds        = (s: CharacterState) => s.ids;
export const getSelectedId = (s: CharacterState) => s.selectedCharId;
export const getLastAdded  = (s: CharacterState) => {
    const lastElement = s.ids.length - 1;
    return s.entities[s.ids[lastElement]];
};

export const getCharacters = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]);
});
export const getCharacter  = createSelector(getSelectedId, getEntities,
    (id, characters) => characters[id]);
export const getMeta       = createSelector(getIds, getSelectedId, (ids, selectedId) => {
    return {ids, selectedId};
});
export const getLatestMeta = createSelector(getLastAdded, getMeta, (char, meta) => {
    return {char, meta};
});
