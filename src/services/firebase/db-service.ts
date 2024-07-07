import {paths} from '@/constants';
import {DbUser} from '@/types/db-user';
import {Group} from '@/types/group';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
} from '@firebase/firestore';

export class DbService {
    static async getUser(uid: string): Promise<DbUser | undefined> {
        try {
            const snapshot = await getDoc(
                doc(collection(getFirestore(), paths.usersCollection), uid)
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

    static async getCurrentGroups(uid: string): Promise<Group[]> {
        try {
            const querySnapshot = await getDocs(
                collection(getFirestore(), paths.groupsCollection)
            );

            const currentGroups: Group[] = [];
            querySnapshot.forEach(doc => {
                const group = doc.data() as Group;
                if (group.members.includes(uid)) {
                    currentGroups.push(group);
                }
            });
            return currentGroups;
        } catch (err) {
            console.log(
                `getCurrentGroups threw, error: ${JSON.stringify(err, null, 2)}`
            );
            return [];
        }
    }
}
