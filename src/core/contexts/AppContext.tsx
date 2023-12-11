import { createContext, useContext, useState, useEffect } from 'react';
import useApi from '../api/useApi';
import {
    IAppContext,
    IAppContextState,
    IAppContextProvider,
} from '../../interfaces/AppContextInterface';
import {
    IApiDepartment,
    IApiRole,
    IApiFetchSkill,
} from '../../interfaces/ApiDataInterface';
import { modifySelectOptionsArray } from '../../utils';
import { toast } from 'react-toastify';

const initialState: IAppContextState = {
    roles: [],
    skills: [],
    departments: [],
    employeeNameFilter: '',
    skillsFilter: [],
};

const AppContext = createContext<IAppContext>({
    appState: initialState,
    handleAppState: () => {},
});

const AppContextProvider: React.FC<IAppContextProvider> = ({ children }) => {
    const [appState, setAppState] = useState(initialState);

    const handleAppState = (payload: IAppContextState) => setAppState(payload);
    const value = { appState, handleAppState };

    const {
        response: skillsFetchResponse,
        error: skillsFetchError,
        loading: skillsFetchLoading,
    } = useApi<IApiFetchSkill>('GET', '/skills');
    useEffect(() => {
        if (skillsFetchError) {
            toast.error(
                'Could not fetch skills list. Please try reloading the page.'
            );
        }

        if (skillsFetchResponse) {
            const skillOptions = skillsFetchResponse.data;
            setAppState((appState) => ({
                ...appState,
                skills: modifySelectOptionsArray(skillOptions, 'skill'),
            }));
        }
    }, [skillsFetchLoading]);

    const {
        response: rolesFetchResponse,
        error: rolesFetchError,
        loading: rolesFetchLoading,
    } = useApi<IApiRole>('GET', '/roles');
    useEffect(() => {
        if (rolesFetchError) {
            toast.error(
                'Could not fetch roles list. Please try reloading the page.'
            );
        }

        if (rolesFetchResponse) {
            const roleOptions = rolesFetchResponse;
            setAppState((appState) => ({
                ...appState,
                roles: modifySelectOptionsArray(roleOptions, 'role'),
            }));
        }
    }, [rolesFetchLoading]);

    const {
        response: departmentsFetchResponse,
        error: departmentsFetchError,
        loading: departmentsFetchLoading,
    } = useApi<IApiDepartment>('GET', '/departments');
    useEffect(() => {
        if (departmentsFetchError) {
            toast.error(
                'Could not fetch departments list. Please try reloading the page.'
            );
        }

        if (departmentsFetchResponse) {
            const departmentOptions = departmentsFetchResponse;
            setAppState((appState) => ({
                ...appState,
                departments: modifySelectOptionsArray(
                    departmentOptions,
                    'department'
                ),
            }));
        }
    }, [departmentsFetchLoading]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider');
    }
    return context;
};

export { AppContextProvider, useAppContext };
