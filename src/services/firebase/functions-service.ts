import {CreateAccountReq} from '@/types/function-requests';
import {Functions, httpsCallable} from '@firebase/functions';

export class FunctionsService {
    static async createAccount(
        functions: Functions,
        displayName: string,
        email: string
    ): Promise<void> {
        const request: CreateAccountReq = {displayName, email};

        return httpsCallable(
            functions,
            'createAccount'
        )(request)
            .then(result => {
                console.log(
                    `Create account result: ${JSON.stringify(result, null, 2)}`
                );
            })
            .catch(err => {
                console.log(
                    `Create account error: ${JSON.stringify(err, null, 2)}`
                );
            });
    }

    static async deleteAccount(functions: Functions): Promise<void> {
        return httpsCallable(functions, 'deleteAccount')()
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
