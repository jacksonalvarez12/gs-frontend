import {DbUser} from '@/types/db-user';
import {
    CreateAccountReq,
    CreateAccountRes,
    DefaultRes,
    JoinGroupReq,
    LeaveGroupReq,
    ProvideSpotifyAuthCodeReq,
} from '@/types/function-requests';
import {getFunctions, httpsCallable} from '@firebase/functions';

export class FunctionsService {
    static async createAccount(
        displayName: string,
        email: string
    ): Promise<DbUser | undefined> {
        const request: CreateAccountReq = {displayName, email};

        return httpsCallable(
            getFunctions(),
            'createAccount'
        )(request)
            .then(result => {
                const response = result.data as CreateAccountRes;
                console.log(
                    `Create account result: ${JSON.stringify(result, null, 2)}`
                );
                return response.user;
            })
            .catch(err => {
                console.log(
                    `Create account error: ${JSON.stringify(err, null, 2)}`
                );
                return undefined;
            });
    }

    static async deleteAccount(): Promise<DefaultRes> {
        return httpsCallable(getFunctions(), 'deleteAccount')()
            .then(result => {
                const response = result.data as DefaultRes;
                console.log(
                    `Delete account result: ${JSON.stringify(
                        response,
                        null,
                        2
                    )}`
                );
                return response;
            })
            .catch(err => {
                const errorMsg: string = `Delete account error: ${JSON.stringify(
                    err,
                    null,
                    2
                )}`;

                console.log(errorMsg);
                return {errorMsg};
            });
    }

    static async joinGroup(groupId: string): Promise<DefaultRes> {
        const request: JoinGroupReq = {groupId};

        return httpsCallable(
            getFunctions(),
            'joinGroup'
        )(request)
            .then(result => {
                const response = result.data as DefaultRes;
                console.log(
                    `Join group result: ${JSON.stringify(response, null, 2)}`
                );
                return response;
            })
            .catch(err => {
                const errorMsg: string = `Join group error: ${JSON.stringify(
                    err,
                    null,
                    2
                )}`;

                console.log(errorMsg);
                return {errorMsg};
            });
    }

    static async leaveGroup(groupId: string): Promise<DefaultRes> {
        const request: LeaveGroupReq = {groupId};

        return httpsCallable(
            getFunctions(),
            'leaveGroup'
        )(request)
            .then(result => {
                const response = result.data as DefaultRes;
                console.log(
                    `Leave group result: ${JSON.stringify(response, null, 2)}`
                );
                return response;
            })
            .catch(err => {
                const errorMsg: string = `Leave group error: ${JSON.stringify(
                    err,
                    null,
                    2
                )}`;

                console.log(errorMsg);
                return {errorMsg};
            });
    }

    static async provideSpotifyAuthCode(authCode: string): Promise<DefaultRes> {
        const request: ProvideSpotifyAuthCodeReq = {authCode};

        return httpsCallable(
            getFunctions(),
            'provideSpotifyAuthCode'
        )(request)
            .then(result => {
                const response = result.data as DefaultRes;
                console.log(
                    `Provide spotify auth code result: ${JSON.stringify(
                        response,
                        null,
                        2
                    )}`
                );
                return response;
            })
            .catch(err => {
                const errorMsg: string = `Provide spotify auth code error: ${JSON.stringify(
                    err,
                    null,
                    2
                )}`;

                console.log(errorMsg);
                return {errorMsg};
            });
    }
}
