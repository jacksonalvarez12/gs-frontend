import { AuthService } from '@/services/firebase/auth-service';
import '@/styles/globals.css';
import { FirebaseApp, initializeApp } from '@firebase/app';
import { Auth, UserCredential, getAuth } from '@firebase/auth';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { images } from '../../public/images';

export default function App() {
    console.log('Initializing firebase app');

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
    const auth: Auth = getAuth(app);
    console.log(`Initialized Firebase app`);

    // Deal with google user
    const [googleUser, setGoogleUser] = useState<
        UserCredential['user'] | undefined
    >(undefined);

    const renderContentByAuth = () => {
        if (!googleUser) {
            return (
                <div className='flex flex-row items-center justify-items-center border gap-2'>
                    <button
                        onClick={() =>
                            AuthService.signInWithGoogle(auth, setGoogleUser)
                        }>
                        <p>{'Sign in with Google'}</p>
                    </button>
                </div>
            );
        } else {
            return (
                <div className='flex flex-col items-center border gap-2'>
                    <p>{`Hello ${googleUser.displayName}, email: ${googleUser.email}`}</p>
                    <div className='flex flex-row items-center justify-items-center gap-2'>
                        <button
                            onClick={() =>
                                AuthService.signOut(auth, setGoogleUser)
                            }>
                            <p>{'Log Out'}</p>
                        </button>
                        <button
                            onClick={() =>
                                AuthService.deleteUser(auth, setGoogleUser)
                            }>
                            <p>{'Delete My Account'}</p>
                        </button>
                    </div>
                    <p className='self-start mt-20'>{`Google user:\n${JSON.stringify(
                        googleUser,
                        null,
                        2
                    )}`}</p>
                </div>
            );
        }
    };

    const uid: string = useMemo(() => {
        return googleUser?.uid ?? '';
    }, [googleUser]);

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
