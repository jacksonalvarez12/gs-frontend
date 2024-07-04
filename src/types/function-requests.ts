import {DBUser} from './user';

export type DefaultRes = {
    errorMsg?: string;
};

export type CreateAccountReq = {
    // uid is in auth obj
    displayName: string;
    email: string;
};

export type CreateAccountRes = {
    user?: DBUser;
    errorMsg?: string;
};
