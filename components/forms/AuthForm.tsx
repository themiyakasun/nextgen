"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn} from "react-hook-form"
import {ZodType} from "zod";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Button from "@/components/shared/Button";
import {FIELD_NAMES, FIELD_TYPES} from "@/constants";

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean, error?:string }>
    type: 'SIGN_IN' | 'SIGN_UP';
};

const AuthForm = <T extends FieldValues>({type, schema, defaultValues, onSubmit}: Props<T>) => {

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
    })

    const isSignedin = type === 'SIGN_IN';

    const handleSubmit: SubmitHandler<T> =  async (data) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(data)
    }

    return (
        <div className='bg-accent-1 md:p-10 p-5'>
            <h2 className='sub-title'>{isSignedin ? 'Sign In Customer' : 'Register Customer'}</h2>
            <p className='md:text-sm text-xs font-light py-5'>If you don&#39;t have an account, register with your email address.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
                    {Object.keys(defaultValues).map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as Path<T>}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='md:text-[13px] text-[11px] font-semibold'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                                    <FormControl>
                                        <Input required placeholder={FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]} type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <div className='flex items-center gap-5'>
                        <div>
                            <Button type="submit" variant={'primary'} text={isSignedin ? 'Sign In' : 'Register'} color={'default'} />

                        </div>
                        {isSignedin && (
                            <Link href='/forgot-password' className='md:text-sm text-[11px] text-primary-custom'>Forgot Your Password?</Link>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
};
export default AuthForm;
