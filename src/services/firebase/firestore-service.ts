import {User} from '@firebase/auth';
import {Firestore, collection, doc, getDoc} from '@firebase/firestore';

export class DBService {
    static async getUser(
        firestore: Firestore,
        uid: string
    ): Promise<User | undefined> {
        try {
            const snapshot = await getDoc(
                doc(collection(firestore, 'users'), uid)
            );
            if (snapshot.exists()) {
                return snapshot.data() as User;
            } else {
                console.log(`No user found with uid: ${uid}`);
            }
        } catch (err) {
            console.log(
                `getUser threw, error: ${JSON.stringify(err, null, 2)}`
            );
        }
    }
}
