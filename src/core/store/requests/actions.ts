import { AppDispatch } from '..';

//Action Definitions
export interface IREQUEST_STARTED {
    type: 'REQUEST_STARTED';
    payload: {
        name: string;
    };
}

export interface IREQUEST_FINISHED {
    type: 'REQUEST_FINISHED';
    payload: {
        name: string;
    };
}

export interface IREQUEST_FAILED {
    type: 'REQUEST_FAILED';
    payload: {
        name: string;
        error: Error;
    };
}

export type ActionType = IREQUEST_STARTED | IREQUEST_FINISHED | IREQUEST_FAILED;

//Action creators
export const requestStarted = (requestName: string): IREQUEST_STARTED => {
    return {
        type: 'REQUEST_STARTED',
        payload: {
            name: requestName,
        },
    };
};

export const requestFinished = (requestName: string): IREQUEST_FINISHED => {
    return {
        type: 'REQUEST_FINISHED',
        payload: {
            name: requestName,
        },
    };
};

export const requestFailed = (
    requestName: string,
    requestError: Error
): IREQUEST_FAILED => {
    return {
        type: 'REQUEST_FAILED',
        payload: {
            name: requestName,
            error: requestError,
        },
    };
};

export const requestHelper = async <T>(
    dispatch: AppDispatch,
    requestName: string,
    request: () => Promise<T>
) => {
    dispatch(requestStarted(requestName));

    try {
        const response = await request();
        dispatch(requestFinished(requestName));
        return response;
    } catch (error) {
        dispatch(requestFailed(requestName, error as Error));
        throw error;
    }
};
