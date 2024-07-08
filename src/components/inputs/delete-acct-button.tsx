import {AuthService} from '@/services/firebase/auth-service';
import {FunctionsService} from '@/services/firebase/functions-service';
import {useMemo, useState} from 'react';
import {Button} from './button';

export const DeleteAcctButton = () => {
    const [deleteAcctCount, setDeleteAcctCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const text: string = useMemo(() => {
        if (deleteAcctCount !== 1) {
            return 'Delete My Account';
        } else {
            return 'I am POSITIVE that I want to delete my account';
        }
    }, [deleteAcctCount]);

    const onPress: () => void = useMemo(() => {
        if (deleteAcctCount === 0) {
            return () => setDeleteAcctCount(1);
        } else if (deleteAcctCount === 1) {
            return () => {
                console.log(`Deleting account...`);
                setLoading(true);
                FunctionsService.deleteAccount().then(() => {
                    console.log(`Deleted account, now deleting auth...`);
                    AuthService.deleteUser();
                    setDeleteAcctCount(2);
                    setLoading(false);
                });
            };
        } else {
            return () => {};
        }
    }, [deleteAcctCount]);

    return (
        <Button
            onPress={onPress}
            text={text}
            disabled={deleteAcctCount > 1}
            loading={loading}
        />
    );
};
