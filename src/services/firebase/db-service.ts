import {DbUser} from '@/types/user';
import {collection, doc, getDoc, getFirestore} from '@firebase/firestore';

export class DbService {
    static async getUser(uid: string): Promise<DbUser | undefined> {
        try {
            const snapshot = await getDoc(
                doc(collection(getFirestore(), 'users'), uid)
            );
            if (snapshot.exists()) {
                return snapshot.data() as DbUser;
            } else {
                console.log(`No user found with uid: ${uid}`);
                return undefined;
            }
        } catch (err) {
            console.log(
                `getUser threw, error: ${JSON.stringify(err, null, 2)}`
            );
            return undefined;
        }
    }
}
