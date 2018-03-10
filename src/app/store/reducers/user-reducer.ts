import * as UserActions from '../actions/user-actions';
import { User } from '../../models/user-model';

export interface UserState extends User {
    authToken: string;
    id: string;
    name: string;
    email: string;
};

const initialState: UserState = {
    authToken: '',
    id: '',
    name: '',
    email: '',
};

export function reducer(state = initialState, action: UserActions.All): UserState {
    switch (action.type) {
        case UserActions.LOAD_SUCCESS:
        case UserActions.LOGIN_SUCCESS:
        case UserActions.CREATE_SUCCESS: {
            const newUser = action.payload;

            return {
                authToken: newUser.authToken,
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };
        };
        case UserActions.LOGOUT_SUCCESS: {
            return initialState;
        };
        case UserActions.SAVE:
        case UserActions.SAVE_ERROR:
        case UserActions.LOAD:
        case UserActions.LOAD_ERROR:
        case UserActions.LOAD_NONE:       
        case UserActions.CREATE:
        case UserActions.LOGOUT:
        case UserActions.LOGIN:
        default:
            return state;
    }
}

export const getUsername    = (state: UserState) => state.name;
export const getEmail       = (state: UserState) => state.email;
export const getUserId      = (state: UserState) => state.id;
export const getAuth        = (state: UserState) => state.authToken;
export const getUser        = (state: UserState): UserState => {
    return {
        authToken: state.authToken,
        id: state.id,
        name: state.name,
        email: state.email
    };
}
