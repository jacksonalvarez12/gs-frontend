export type DbUser = {
    uid: string;
    displayName: string;
    email: string;
    accessToken?: string;
    tokensLastUpdated?: string;
    refreshToken?: string;
};
