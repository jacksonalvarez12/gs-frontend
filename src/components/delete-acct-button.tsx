import {AuthService} from '@/services/firebase/auth-service';
import {FunctionsService} from '@/services/firebase/functions-service';
import {useMemo, useState} from 'react';
import {Button} from './button';

export const DeleteAcctButton = () => {
    console.log(`Rendering DeleteAcctButton...`);

    const [deleteAcctCount, setDeleteAcctCount] = useState<number>(0);

    const text: string = useMemo(() => {
        if (deleteAcctCount !== 1) {
            return 'Delete My Account';
        } else {
            return 'I am POSITIVE that I want to delete my account';
        }
    }, [deleteAcctCount]);

    const onPress: () => void = () => {
        if (deleteAcctCount === 0) {
            setDeleteAcctCount(1);
        } else if (deleteAcctCount === 1) {
            console.log(`Deleting account...`);
            FunctionsService.deleteAccount().then(() => {
                console.log(`Deleted account, now deleting auth...`);
                AuthService.deleteUser();
            });
            setDeleteAcctCount(2);
        }
    };

    return (
        <Button onPress={onPress} text={text} disabled={deleteAcctCount > 1} />
    );
};
