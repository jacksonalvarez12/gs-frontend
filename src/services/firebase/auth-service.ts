import {
    Auth,
    GoogleAuthProvider,
    UserCredential,
    deleteUser,
    signInWithPopup,
    signOut,
} from '@firebase/auth';

export class AuthService {
    static signInWithGoogle = (
        auth: Auth | undefined,
        setGoogleUser: (user: UserCredential['user'] | undefined) => void
    ): void => {
        if (!auth) {
            console.log('No auth object in signInWithGoogle');
            return;
        }

        signInWithPopup(auth, new GoogleAuthProvider())
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

                setGoogleUser(result.user);
            })
            .catch(error => {
                console.log(
                    `Error while signing in with google: ${JSON.stringify(
                        error,
                        null,
                        2
                    )}`
                );

                return undefined;
            });
    };

    static signOut = (
        auth: Auth | undefined,
        setGoogleUser: (user: UserCredential['user'] | undefined) => void
    ): void => {
        if (!auth) {
            console.log('No auth object in signOut');
            return;
        }

        signOut(auth)
            .then(result => {
                console.log(
                    `Sign out result: ${JSON.stringify(result, null, 2)}`
                );

                setGoogleUser(undefined);
            })
            .catch(err => {
                console.log(`Sign out error: ${JSON.stringify(err, null, 2)}`);
            });
    };

    static deleteUser = (
        auth: Auth | undefined,
        setGoogleUser: (user: UserCredential['user'] | undefined) => void
    ): void => {
        if (!auth) {
            console.log('No auth object in deleteUser');
            return;
        }

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

                setGoogleUser(undefined);
            })
            .catch(err => {
                console.log(
                    `Delete user error: ${JSON.stringify(err, null, 2)}`
                );
            });
    };
}
