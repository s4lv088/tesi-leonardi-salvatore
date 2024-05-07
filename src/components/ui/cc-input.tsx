import { Control } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input, InputProps } from './input';
import { HTMLInputTypeAttribute } from 'react';
import { cn } from '@/lib/utils';

interface CCInputProps {
    control: Control<any>;
    name: string;
    label: string;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    disabled?: boolean;
    description?: string;
    className?: string;
    inputProps?: InputProps;
}

export default function CCInput({
    control,
    name,
    label,
    placeholder,
    type,
    disabled,
    description,
    className,
    inputProps,
}: CCInputProps) {
    // const fieldState = control.getFieldState(name);
    return (
        <FormField
            control={control}
            name={name}
            disabled={disabled}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            type={type}
                            // className={cn(fieldState.invalid && 'border-destructive', className)} //ABILITARE SE SI VUOLE IL BORDO DELL'INPUT ROSSO IN CASO DI INVALID
                            className={cn(className)}
                            {...inputProps}
                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
