import {AuthService} from '@/services/firebase/auth-service';
import {DBService} from '@/services/firebase/db-service';
import {FunctionsService} from '@/services/firebase/functions-service';
import '@/styles/globals.css';
import {DBUser} from '@/types/user';
import {FirebaseApp, initializeApp} from '@firebase/app';
import {UserCredential, getAuth, onAuthStateChanged} from '@firebase/auth';
import Image from 'next/image';
import {useMemo, useState} from 'react';
import {images} from '../../public/images';

export default function App() {
    const firebaseConfig = {
        apiKey: 'AIzaSyCdISQPxMkzxAMrMx-9Ep8YadXNwFdk6N4',
        authDomain: 'gs-backend-45c97.firebaseapp.com',
        projectId: 'gs-backend-45c97',
        storageBucket: 'gs-backend-45c97.appspot.com',
        messagingSenderId: '787677052387',
        appId: '1:787677052387:web:b7f0981c21448c768834d6',
        measurementId: 'G-89EQLS6BFK',
    };

    // Initialize Firebase
    const app: FirebaseApp = initializeApp(firebaseConfig);
    // const auth: Auth = getAuth(app);

    const [googleUser, setGoogleUser] = useState<
        UserCredential['user'] | undefined
    >(undefined);

    const [dbUser, setDbUser] = useState<DBUser | undefined>(undefined);

    // Auth logic
    onAuthStateChanged(getAuth(app), async user => {
        setGoogleUser(user ?? undefined);
    });

    // Control db user
    useMemo(async () => {
        const dbUser: DBUser | undefined = googleUser?.uid
            ? await DBService.getUser(googleUser.uid)
            : undefined;
        if (googleUser) {
            if (dbUser) {
                setDbUser(dbUser);
            } else {
                // Create Account Flow
                const newDbUser: DBUser | undefined =
                    await FunctionsService.createAccount(
                        googleUser.displayName || 'Empty Name',
                        googleUser.email || 'Empty Email'
                    );
                setDbUser(newDbUser);
            }
        } else {
            setDbUser(undefined);
        }
    }, [googleUser?.uid]);

    const renderContentByAuth = () => {
        if (!googleUser) {
            return (
                <div className='flex flex-row items-center justify-items-center border gap-2'>
                    <button onClick={() => AuthService.signInWithGoogle()}>
                        <p>{'Sign in with Google'}</p>
                    </button>
                </div>
            );
        } else {
            return (
                <div className='flex flex-col items-center border gap-2'>
                    <p>{`Hello ${googleUser.displayName}, email: ${googleUser.email}`}</p>
                    <div className='flex flex-row items-center justify-items-center gap-2'>
                        <button onClick={() => AuthService.signOut()}>
                            <p>{'Log Out'}</p>
                        </button>
                        <button
                            onClick={() => {
                                FunctionsService.deleteAccount().then(() => {
                                    console.log(
                                        `Deleted account, now deleting auth...`
                                    );
                                    AuthService.deleteUser();
                                });
                            }}>
                            <p>{'Delete My Account'}</p>
                        </button>
                    </div>
                    <p className='self-start mt-20'>{`DB user:\n${JSON.stringify(
                        dbUser,
                        null,
                        2
                    )}`}</p>
                    <p className='self-start mt-20'>{`Google user:\n${JSON.stringify(
                        googleUser,
                        null,
                        2
                    )}`}</p>
                </div>
            );
        }
    };

    return (
        <main className={`flex flex-col p-4 border`}>
            <div className='flex flex-row items-center justify-items-center border gap-2'>
                <Image
                    src={images.dawgs}
                    alt='Georgia football logo'
                    width={120}
                    priority
                />
                <p>{'By Jackson Alvarez'}</p>
            </div>
            <article>{renderContentByAuth()}</article>
        </main>
    );
}
