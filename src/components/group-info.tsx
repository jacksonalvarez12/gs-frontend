import {DbService} from '@/services/firebase/db-service';
import {FunctionsService} from '@/services/firebase/functions-service';
import {DbUser} from '@/types/db-user';
import {Group} from '@/types/group';
import {useEffect, useState} from 'react';
import {Button} from './inputs/button';
import {JoinGroupInput} from './inputs/join-group-input';

export type GroupInfoProps = {
    dbUser?: DbUser;
};

export const GroupInfo = (props: GroupInfoProps) => {
    const {dbUser} = props;

    // Control groups
    const [groups, setGroups] = useState<Group[]>([]);
    const refreshGroups: () => Promise<void> = async () => {
        if (!dbUser?.uid) {
            return Promise.resolve();
        } else {
            return DbService.getCurrentGroups(dbUser.uid)
                .then(groups => {
                    console.log(
                        `Refreshed groups: ${JSON.stringify(groups, null, 2)}`
                    );
                    setGroups(groups);
                })
                .catch(err =>
                    console.log(
                        `getCurrentGroups error: ${JSON.stringify(
                            err,
                            null,
                            2
                        )}`
                    )
                );
        }
    };

    useEffect(() => {
        refreshGroups();
    }, [dbUser]);

    const [joinLoading, setJoinLoading] = useState<boolean>(false);
    const [leaveLoading, setLeaveLoading] = useState<boolean>(false);

    if (!dbUser) {
        console.log('No dbUser in GroupInfo');
        return null;
    }

    const divider = (marginV: number, smallOnly?: boolean) => {
        return (
            <div
                className={`w-full h-0.5 bg-gray-500 my-${marginV ?? 0} ${
                    smallOnly ? 'lg:hidden' : ''
                }`}></div>
        );
    };

    return (
        <div className='flex flex-col items-start gap-4 w-full bg-gray-900 p-10'>
            <div className='flex sm:flex-col lg:flex-row items-center justify-between w-full'>
                <p className='text-lg font-bold sm:mb-4 lg:mb-0'>{`My Groups`}</p>
                {divider(0, true)}
                <JoinGroupInput
                    onJoinGroup={groupIdInput => {
                        setJoinLoading(true);
                        FunctionsService.joinGroup(groupIdInput)
                            .then(refreshGroups)
                            .finally(() => setJoinLoading(false));
                    }}
                    loading={joinLoading}
                />
            </div>
            {groups.length > 0 ? (
                groups.flatMap((group, i) => (
                    <div
                        key={group.groupId}
                        className='flex flex-col w-full gap-4'>
                        {divider(i === 0 ? 2 : 0)}
                        <div className='flex flex-row items-center justify-between w-full'>
                            <p className='mr-2'>{group.groupTitle}</p>
                            <Button
                                size='sm'
                                text='Leave Group'
                                onPress={() => {
                                    setLeaveLoading(true);
                                    FunctionsService.leaveGroup(group.groupId)
                                        .then(refreshGroups)
                                        .finally(() => setLeaveLoading(false));
                                }}
                                loading={leaveLoading}
                                style={'ml-2'}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <div className='flex flex-col items-start'>
                    <p>{'You are not in any groups.'}</p>
                    <p>{'Join one now!'}</p>
                </div>
            )}
        </div>
    );
};
