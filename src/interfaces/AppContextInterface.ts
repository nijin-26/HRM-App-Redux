import { ReactNode } from 'react';
import { MultiValue } from 'react-select';
import { IReactSelectOption } from './common';

export interface IAppContextState {
    skills: IReactSelectOption[];
    roles: IReactSelectOption[];
    departments: IReactSelectOption[];
    employeeNameFilter: string;
    skillsFilter: MultiValue<IReactSelectOption>;
}

export interface IAppContext {
    appState: IAppContextState;
    handleAppState: (payload: IAppContextState) => void;
}

export interface IAppContextProvider {
    children: ReactNode;
}

export interface ISetAppState {
    setAppState: React.Dispatch<React.SetStateAction<IAppContextState>>;
}
