import {useMemo, useState} from 'react';
import {Button} from './button';

export type JoinGroupInputProps = {
    onJoinGroup: (groupId: string) => void;
    loading: boolean;
};

export const JoinGroupInput = (props: JoinGroupInputProps) => {
    const {onJoinGroup, loading} = props;

    const [groupIdInput, setGroupIdInput] = useState<string>('');

    const groupIdTextColor: string = useMemo(() => {
        if (groupIdInput === '') {
            return 'text-gray-500';
        }
        return 'text-black';
    }, [groupIdInput]);

    const buttonDisabled: boolean = useMemo(() => {
        const disallowedChars: string[] = [
            ' ',
            '<',
            '>',
            '/',
            '\\',
            ':',
            '*',
            '?',
            '"',
            '|',
            '`',
            "'",
        ];

        if (typeof groupIdInput !== 'string') {
            return true;
        } else if (groupIdInput.trim() === '') {
            return true;
        } else if (disallowedChars.some(char => groupIdInput.includes(char))) {
            return true;
        } else {
            return false;
        }
    }, [groupIdInput]);

    return (
        <div className='flex flex-row items-center gap-4'>
            <label htmlFor={'group-id-input'}>{'Group ID'}</label>
            <input
                id={'group-id-input'}
                type={'text'}
                className={`${groupIdTextColor} px-2 w-50`}
                onChange={e => setGroupIdInput(e.target.value)}></input>
            <Button
                text={'Join Group'}
                disabled={buttonDisabled}
                loading={loading}
                onPress={
                    buttonDisabled
                        ? () => {}
                        : () => {
                              onJoinGroup(groupIdInput.trim());
                              (
                                  document.getElementById(
                                      'group-id-input'
                                  ) as HTMLInputElement
                              ).value = '';
                              setGroupIdInput('');
                          }
                }
            />
        </div>
    );
};
