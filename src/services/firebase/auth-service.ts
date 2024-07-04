import {
    Auth,
    GoogleAuthProvider,
    deleteUser,
    getAuth,
    signInWithPopup,
    signOut,
} from '@firebase/auth';

export class AuthService {
    static signInWithGoogle = (): void => {
        signInWithPopup(getAuth(), new GoogleAuthProvider())
            .then(result => {
                if (!result?.user) {
                    throw Error(
                        `No user found in result, result: ${JSON.stringify(
                            result,
                            null,
                            2
                        )}`
                    );
                }
            })
            .catch(error => {
                console.log(
                    `Error while signing in with google: ${JSON.stringify(
                        error,
                        null,
                        2
                    )}`
                );
            });
    };

    static signOut = (): void => {
        signOut(getAuth())
            .then(result => {
                console.log(
                    `Sign out result: ${JSON.stringify(result, null, 2)}`
                );
            })
            .catch(err => {
                console.log(`Sign out error: ${JSON.stringify(err, null, 2)}`);
            });
    };

    static deleteUser = (): void => {
        const auth: Auth = getAuth();

        if (!auth.currentUser) {
            console.log(
                `No current user in auth object!, auth: ${JSON.stringify(
                    auth,
                    null,
                    2
                )}`
            );
            return;
        }

        deleteUser(auth.currentUser)
            .then(result => {
                console.log(
                    `Delete user result: ${JSON.stringify(result, null, 2)}`
                );
            })
            .catch(err => {
                console.log(
                    `Delete user error: ${JSON.stringify(err, null, 2)}`
                );
            });
    };
}
