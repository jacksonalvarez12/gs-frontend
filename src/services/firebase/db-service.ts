import {DBUser} from '@/types/user';
import {collection, doc, getDoc, getFirestore} from '@firebase/firestore';

export class DBService {
    static async getUser(uid: string): Promise<DBUser | undefined> {
        try {
            const snapshot = await getDoc(
                doc(collection(getFirestore(), 'users'), uid)
            );
            if (snapshot.exists()) {
                return snapshot.data() as DBUser;
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
