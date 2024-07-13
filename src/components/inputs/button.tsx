import Image from 'next/image';
import {images} from '../../../public/images';

export type ButtonProps = {
    text: string;
    onPress: () => unknown;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
};

export const Button = (props: ButtonProps) => {
    const {text, onPress, size, disabled, loading} = {
        size: 'md',
        disabled: false,
        loading: false,
        ...props,
    };

    const bg: string = loading
        ? 'bg-red-900'
        : disabled
        ? 'bg-gray-400'
        : 'bg-red-700';

    const loadingOpacity: string = loading ? 'opacity-0' : 'opacity-100';

    const onClick: () => unknown = disabled || loading ? () => {} : onPress;

    return (
        <button
            className={`${bg} font-bold py-2 px-4 rounded`}
            onClick={onClick}
            disabled={disabled || loading}>
            <div className='flex flex-col items-center justify-center'>
                <p className={`text-${size} text-white ${loadingOpacity}`}>
                    {text}
                </p>
                {loading && (
                    <Image
                        src={images.loadingGif}
                        alt='Loading Gif'
                        className='w-5 h-5 absolute'
                        priority
                    />
                )}
            </div>
        </button>
    );
};
