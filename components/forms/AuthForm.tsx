"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {DefaultValues, FieldValues, SubmitHandler, useForm, UseFormReturn} from "react-hook-form"
import {ZodType} from "zod";

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

    const handleSubmit: SubmitHandler<T> =  async (data) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div>AuthForm</div>
    );
};
export default AuthForm;
