import { RotateCwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

enum ButtonPositions {
    left = 'left',
    right = 'right',
}

type ButtonLoadingProps = {
    text?: string;
    //one of ButtonPosions
    iconPosition?: keyof typeof ButtonPositions;
};

export function ButtonLoading({ text = 'Attendere...', iconPosition = ButtonPositions.left }: ButtonLoadingProps) {
    return (
        <Button disabled>
            {iconPosition === ButtonPositions.left && <RotateCwIcon className="mr-2 h-4 w-4 animate-spin" />}
            {text}
            {iconPosition === ButtonPositions.right && <RotateCwIcon className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
    );
}
