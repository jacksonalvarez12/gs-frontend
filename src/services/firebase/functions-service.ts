import {CreateAccountReq, CreateAccountRes} from '@/types/function-requests';
import {DbUser} from '@/types/user';
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

    static async deleteAccount(): Promise<void> {
        return httpsCallable(getFunctions(), 'deleteAccount')()
            .then(result => {
                console.log(
                    `Delete account result: ${JSON.stringify(result, null, 2)}`
                );
            })
            .catch(err => {
                console.log(
                    `Delete account error: ${JSON.stringify(err, null, 2)}`
                );
            });
    }
}
