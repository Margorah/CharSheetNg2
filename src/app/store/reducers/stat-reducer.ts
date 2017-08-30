import { createSelector } from 'reselect';
import shortid from 'shortid';

import * as StatActions from '../actions/stat-actions';
import { CharacterStat } from '../../models/stat-model';

export interface StatState {
    ids: string[];
    entities: { [id: string]: CharacterStat };
    selectedStatId: string | null;
};

const initialState: StatState = {
    ids: [],
    entities: {},
    selectedStatId: null,
};

const genNewStatState = (stats: CharacterStat[], selected?: string): StatState => {
    let newState = {
        ids: [],
        entities: {},
        selectedStatId: (selected) || null
    };
    stats.map((stat) => {
        newState.ids.push(stat.id);
        newState.entities[stat.id] = stat;
    });
    return newState;
};

export function reducer(state = initialState, action: StatActions.All): StatState {
    switch (action.type) {
        case StatActions.ADD: {
            const statId = shortid.generate();
            const newStat = {
                id: statId,
                name: action.payload.name,
                value: action.payload.value,
                maximum: action.payload.maximum,
                type: action.payload.type
            };

            return {
                ids: [...state.ids, statId],
                entities: Object.assign({}, state.entities, {[statId]: newStat}),
                selectedStatId: state.selectedStatId
            };
        }
        case StatActions.LOAD_MANY_SUCCESS: {
            return genNewStatState(action.payload.stats, action.payload.selected);
        }
        case StatActions.LOAD_MANY_NETWORK_SUCCESS: {
            return genNewStatState(action.payload);   
        }
        case StatActions.REMOVE: {
            const toRemove = action.payload;
            const selectedStatId = (toRemove === state.selectedStatId) ? null: state.selectedStatId;

            return {
                ids: state.ids.filter(id => id !== toRemove),
                entities: Object.assign({}, state.entities, {[toRemove]: undefined}),
                selectedStatId: selectedStatId
            };
        }
        case StatActions.LOGOUT:
        case StatActions.REMOVE_ALL: {
            return initialState;
        }
        case StatActions.UPDATE: {
            const updatedStat = action.payload;

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities, {[updatedStat.id]: updatedStat}),
                selectedStatId: null
            };
        }
        case StatActions.SELECT: {
            const newSelectId = state.ids[action.payload];

            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities),
                selectedStatId: newSelectId
            };
        }
        case StatActions.UNSELECT: {
            return {
                ids: [...state.ids],
                entities: Object.assign({}, state.entities),
                selectedStatId: null
            };
        }
        case StatActions.ADD_ERROR:
        case StatActions.ADD_NETWORK:
        case StatActions.ADD_NETWORK_ERROR:
        case StatActions.ADD_NETWORK_SUCCESS:
        case StatActions.SAVE_MANY:
        case StatActions.SAVE_MANY_ERROR:      
        case StatActions.LOAD_MANY:
        case StatActions.LOAD_MANY_ERROR:
        case StatActions.LOAD_MANY_SUCCESS:
        case StatActions.LOAD_MANY_NONE:
        case StatActions.LOAD_MANY_NETWORK:
        case StatActions.LOAD_MANY_NETWORK_ERROR:
        case StatActions.REMOVE_ERROR:
        case StatActions.REMOVE_NETWORK:
        case StatActions.REMOVE_NETWORK_ERROR:
        case StatActions.REMOVE_NETWORK_SUCCESS:
        case StatActions.REMOVE_ALL_ERROR:
        case StatActions.REMOVE_ALL_NETWORK:
        case StatActions.REMOVE_ALL_NETWORK_ERROR:
        case StatActions.REMOVE_ALL_NETWORK_SUCCESS:
        case StatActions.UPDATE_ERROR:
        case StatActions.UPDATE_NETWORK:
        case StatActions.UPDATE_NETWORK_ERROR:
        case StatActions.UPDATE_NETWORK_SUCCESS:
        case StatActions.SELECT_ERROR:
        default:
            return state;
    }
}

export const getIds        = (s: StatState) => s.ids;
export const getEntities   = (s: StatState) => s.entities;
export const getSelectedId = (s: StatState) => s.selectedStatId;
export const getLastAdded  = (s: StatState) => {    
    const lastElement = s.ids.length - 1;
    return s.entities[s.ids[lastElement]];  
};

export const getStat       = createSelector(getSelectedId, getEntities, (id, stats) => stats[id]);
export const getStats      = createSelector(getIds, getEntities, (ids, entities) => {
    return ids.map(id => entities[id]);
});
export const getMeta       = createSelector(getIds, getSelectedId, (ids, selectedId) => {
    return {ids, selectedId};
});
export const getLatestMeta = createSelector(getLastAdded, getMeta, (stat, meta) => {
    return {stat, meta};
});
