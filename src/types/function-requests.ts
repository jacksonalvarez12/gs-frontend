import {DbUser} from './db-user';

export type DefaultRes = {
    errorMsg?: string;
};

export type CreateAccountReq = {
    // uid is in auth obj
    displayName: string;
    email: string;
};

export type CreateAccountRes = {
    user?: DbUser;
    errorMsg?: string;
};

export type JoinGroupReq = {
    groupId: string;
};

export type LeaveGroupReq = {
    groupId: string;
};
