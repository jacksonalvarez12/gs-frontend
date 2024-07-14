import {constants} from '@/constants';
import sha256 from 'crypto-js/sha256';
import querystring from 'querystring';

export class SpotifyService {
    static getRequestAuthUrl(uid: string): string {
        return (
            'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: constants.spotifyClientId,
                scope: 'user-read-playback-state playlist-modify-public user-top-read user-read-recently-played user-read-private',
                redirect_uri: constants.redirectUrl,
                state: sha256(uid).toString(),
            })
        );
    }
}
