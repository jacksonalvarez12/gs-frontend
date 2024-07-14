import {DbService} from '@/services/firebase/db-service';
import {FunctionsService} from '@/services/firebase/functions-service';
import {SpotifyService} from '@/services/spotify-service';
import {DbUser} from '@/types/db-user';
import {SHA256} from 'crypto-js';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {images} from '../../public/images';
import {Button} from './inputs/button';

export type SpotifyInfoProps = {
    dbUser: DbUser | undefined;
    setDbUser: (newDbUser: DbUser | undefined) => void;
    routerState?: string;
    routerError?: string;
    routerCode?: string;
};

export const SpotifyInfo = (props: SpotifyInfoProps) => {
    const {dbUser, setDbUser, routerCode, routerState, routerError} = props;

    const router = useRouter();

    if (routerError) {
        console.log(`SpotifyInfo router error: ${routerError}`);
    }

    const encodedId: string = useMemo(
        () => SHA256(dbUser?.uid ?? '').toString(),
        [dbUser]
    );

    if (!dbUser) {
        console.log('No dbUser in SpotifyInfo');
        return null;
    }

    const renderAuthSpotifyButton = () => {
        return (
            <Button
                link={SpotifyService.getRequestAuthUrl(dbUser.uid)}
                text='Confirm your Spotify Account is Linked'
            />
        );
    };

    const renderHappyFlow = () => {
        return <p>{'Your Spotify account is successfully linked!'}</p>;
    };

    const renderLoadingFlow = () => {
        return (
            <div className='flex flex-row items-center gap-2'>
                <p>{'Linking Your Spotify Account'}</p>
                <Image
                    src={images.loadingGif}
                    alt='Loading Gif'
                    className='w-5 h-5'
                    priority
                />
            </div>
        );
    };

    return (
        <div className='flex lg:flex-row sm:flex-col items-center gap-4 w-full bg-gray-900 p-10'>
            {(() => {
                if (dbUser?.accessToken) {
                    // Spotify account is successfully linked
                    return renderHappyFlow();
                } else {
                    if (encodedId === routerState && routerCode) {
                        // Spotify account is authed, now we need to request an access token from the backend
                        FunctionsService.provideSpotifyAuthCode(routerCode)
                            .then(() => (router.query = {}))
                            .then(() => DbService.getUser(dbUser.uid))
                            .then(newDbUser => {
                                setDbUser(newDbUser);
                            });
                        return renderLoadingFlow();
                    } else {
                        // Need to auth to spotify
                        return renderAuthSpotifyButton();
                    }
                }
            })()}
        </div>
    );
};
