import * as PreferenceActions from '../actions/preferences-actions';
import * as PREFERENCES from '../../models/preferences-model';

export interface PreferenceState {
    mode: string;
    interval: number;
    theme: string;
}

const initialState: PreferenceState = {
    mode: PREFERENCES.MODE.OFFLINE,
    interval: PREFERENCES.INTERVAL.FIVE_MINUTES,
    theme: PREFERENCES.THEME.NORMAL
};

export function reducer(state = initialState, action: PreferenceActions.All): PreferenceState {
    switch (action.type) {
        case PreferenceActions.LOAD_SUCCESS: {
            const newPreferences = action.payload;

            return {
                mode: newPreferences.mode,
                interval: newPreferences.interval,
                theme: newPreferences.theme
            };
        }
        case PreferenceActions.CHANGE_MODE: {
            return {
                mode: action.payload,
                interval: state.interval,
                theme: state.theme
            };
        }
        case PreferenceActions.CHANGE_THEME: {
            return {
                mode: state.mode,
                interval: state.interval,
                theme: action.payload
            };
        }
        case PreferenceActions.CHANGE_TIMER: {
            return {
                mode: state.mode,
                interval: action.payload,
                theme: state.theme
            };
        }
        case PreferenceActions.CLOSE_SPLASH:
        case PreferenceActions.SAVE:
        case PreferenceActions.SAVE_ERROR:
        case PreferenceActions.SAVE_SUCCESS:
        case PreferenceActions.LOAD_ERROR:
        case PreferenceActions.LOAD:
        default:
            return state;
    }
}

export const getPreferences = (state: PreferenceState): PreferenceState => state;
export const getMode        = (state: PreferenceState) => state.mode;
export const getInterval    = (state: PreferenceState) => state.interval;
export const getTheme       = (state: PreferenceState) => state.theme;