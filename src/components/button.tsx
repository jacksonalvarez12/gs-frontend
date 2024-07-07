export type ButtonProps = {
    text: string;
    onPress: () => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
};

export const Button = (props: ButtonProps) => {
    const {text, onPress, size, disabled} = {
        size: 'md',
        disabled: false,
        ...props,
    };

    const bg: string = disabled ? 'bg-gray-400' : 'bg-red-700';
    const hover: string = disabled ? 'bg-gray-400' : 'bg-red-900';

    const onClick: () => void = disabled ? () => {} : onPress;

    return (
        <button
            className={`${bg} hover:${hover} text-white font-bold py-2 px-4 rounded ${
                size === 'sm'
                    ? 'text-sm'
                    : size === 'md'
                    ? 'text-md'
                    : 'text-lg'
            }`}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </button>
    );
};
