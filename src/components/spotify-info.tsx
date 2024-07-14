import {SpotifyService} from '@/services/spotify-service';
import {DbUser} from '@/types/db-user';
import {SHA256} from 'crypto-js';
import {useMemo} from 'react';
import {Button} from './inputs/button';

export type SpotifyInfoProps = {
    dbUser: DbUser | undefined;
    routerState?: string;
    routerError?: string;
    routerCode?: string;
};

export const SpotifyInfo = (props: SpotifyInfoProps) => {
    const {dbUser, routerCode, routerError, routerState} = props;

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

    return (
        <div className='flex lg:flex-row sm:flex-col items-center gap-4 w-full bg-gray-900 p-10'>
            {(() => {
                if (dbUser?.accessToken) {
                    // Spotify account is successfully linked
                    return renderHappyFlow();
                } else {
                    if (encodedId === routerState && routerCode) {
                        // We just authed with spotify, need to get access token on backend
                        return renderHappyFlow();
                    } else {
                        // Need to auth to spotify
                        return renderAuthSpotifyButton();
                    }
                }
            })()}
        </div>
    );
};
