import { ActionType } from './actions';

interface IRequest {
    name: string;
    inProgress: boolean;
    error: Error | null;
}

interface IRequestReducer {
    requests: IRequest[];
}

const initialState: IRequestReducer = {
    requests: [],
};

export const requestsRecuder = (
    state = initialState,
    action: ActionType
): IRequestReducer => {
    const requests = state.requests;
    const newRequestName = action.payload?.name;

    switch (action.type) {
        case 'REQUEST_STARTED': {
            const exisitingCall = requests.find(
                (request) => request.name === newRequestName
            );

            if (exisitingCall) {
                return {
                    ...state,
                    requests: requests.map((request) =>
                        request.name === newRequestName
                            ? { ...request, inProgress: true, error: null }
                            : request
                    ),
                };
            }

            return {
                ...state,
                requests: [
                    ...requests,
                    {
                        name: newRequestName,
                        inProgress: true,
                        error: null,
                    },
                ],
            };
        }
        case 'REQUEST_FINISHED':
            return {
                ...state,
                requests: requests.filter(
                    (request) => request.name !== newRequestName
                ),
            };
        case 'REQUEST_FAILED':
            return {
                ...state,
                requests: requests.map((request) =>
                    request.name === newRequestName
                        ? {
                              ...request,
                              inProgress: false,
                              error: action.payload.error,
                          }
                        : request
                ),
            };
        default:
            return state;
    }
};
