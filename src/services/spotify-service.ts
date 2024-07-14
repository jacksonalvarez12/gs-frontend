import sha256 from 'crypto-js/sha256';
import querystring from 'querystring';

export class SpotifyService {
    static getRequestAuthUrl(uid: string): string {
        return (
            'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: '520783e7b2cb40fc870b91e3761d960f',
                scope: 'user-read-playback-state playlist-modify-public user-top-read user-read-recently-played user-read-private',
                redirect_uri: 'http://localhost:3000/',
                state: sha256(uid).toString(),
            })
        );
    }
}
