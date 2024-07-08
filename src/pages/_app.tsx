import {GroupInfo} from '@/components/group-info';
import {Button} from '@/components/inputs/button';
import {DeleteAcctButton} from '@/components/inputs/delete-acct-button';
import {AuthService} from '@/services/firebase/auth-service';
import {DbService} from '@/services/firebase/db-service';
import {FunctionsService} from '@/services/firebase/functions-service';
import '@/styles/globals.css';
import {DbUser} from '@/types/db-user';
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

    const [dbUser, setDbUser] = useState<DbUser | undefined>(undefined);

    // Auth logic
    onAuthStateChanged(getAuth(app), async user => {
        setGoogleUser(user ?? undefined);
    });

    // Control db user
    useMemo(async () => {
        const dbUser: DbUser | undefined = googleUser?.uid
            ? await DbService.getUser(googleUser.uid)
            : undefined;
        if (googleUser) {
            if (dbUser) {
                setDbUser(dbUser);
            } else {
                // Create Account Flow
                const newDbUser: DbUser | undefined =
                    await FunctionsService.createAccount(
                        googleUser.displayName || 'Empty Name',
                        googleUser.email || 'Empty Email'
                    );
                setDbUser(newDbUser);
            }
        } else {
            setDbUser(undefined);
        }
    }, [googleUser]);

    const renderUserContent = () => {
        if (!googleUser) {
            console.log(`No user in renderUserContent, returning null...`);
            return null;
        }

        return (
            <section className='flex flex-col items-center gap-6 w-full p-10'>
                {/* Account Info */}
                <div className='flex flex-row items-center gap-4 w-full bg-gray-900 p-10'>
                    <p className='font-bold'>{googleUser.displayName}</p>
                    <div className='flex flex-grow flex-row items-center justify-end gap-4'>
                        <DeleteAcctButton />
                        <Button
                            onPress={AuthService.signOut}
                            text={'Sign Out'}
                        />
                    </div>
                </div>
                <GroupInfo dbUser={dbUser} />
            </section>
        );
    };

    return (
        <main
            className={`sm:px-[5%] md:px-[10%], lg:px-[17%] flex flex-col items-center mt-10`}>
            <header className='flex flex-col items-center'>
                <Image
                    src={images.dawgs}
                    alt='Georgia football logo'
                    className='sm:w-[50%] md:w-[30%] lg:w-[20%]'
                    priority
                />
                <span className='text-2xl mt-10 font-bold'>
                    {'Spotify Groups'}
                </span>
                <p className='text-sm mt-4 mb-4'>{'By Jackson Alvarez'}</p>
            </header>
            {googleUser ? (
                renderUserContent()
            ) : (
                <div className='mt-10'>
                    <Button
                        onPress={AuthService.signInWithGoogle}
                        text={'Sign in with Google'}
                        size='lg'
                    />
                </div>
            )}
        </main>
    );
}
