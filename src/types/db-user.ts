import {Timestamp} from '@firebase/firestore';

export type DbUser = {
    uid: string;
    displayName: string;
    email: string;
    accessToken?: string;
    tokensLastUpdated?: Timestamp;
    refreshToken?: string;
};
