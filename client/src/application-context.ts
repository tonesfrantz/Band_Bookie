import React, { Reducer } from 'react';

// TODO: move this type somewhere
export interface User {
    id: number;
    username: string;
}

export enum ActionType {
    LOGIN = 'login',
    LOGOUT = 'logout',
}

export interface ApplicationState {
    currentUser: null | User;
    theme: 'light' | 'dark';
    settings: object;
}

export const DefaultApplicationState: ApplicationState = {
    currentUser: null,
    theme: 'light',
    settings: {},
};

export type ApplicationAction = LoginAction | LogoutAction;

export interface LoginAction {
    type: ActionType.LOGIN;
    payload: {
        user: User;
    };
}

export interface LogoutAction {
    type: ActionType.LOGOUT;
}

export const ApplicationContextReducer: Reducer<
    ApplicationState,
    ApplicationAction
> = (state, action) => {
    console.log({ state, action });
    switch (action.type) {
        case ActionType.LOGIN:
            return {
                ...state,
                currentUser: action.payload.user,
                theme: 'dark',
            };
        case ActionType.LOGOUT:
            return {
                ...state,
                currentUser: null,
                theme: 'light',
            };
    }
};

export const ApplicationContext = React.createContext<
    [ApplicationState, React.Dispatch<ApplicationAction>]
>([DefaultApplicationState, () => {}]);
