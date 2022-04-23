import {FormEvent, useState} from "react";
import {useForm} from "@mantine/form";
import Link from 'next/link';
import {Button, Container, Group, LoadingOverlay, NumberInput, Space, Stack, TextInput, Title} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";

interface Props {
    editMode: 'create' | 'update';
    transactionType: 'withdrawal' | 'deposit';
    initialValues?: TransactionFormFields;
    handleSubmit: (values: TransactionFormFields) => void;
}

export interface TransactionFormFields {
    transactionDescription: string,
    transactionAmount: number,
    transactionDate: Date,
}

export const TransactionForm = ({editMode, transactionType, initialValues, handleSubmit}: Props) => {
    initialValues ??= {
        transactionDescription: '',
        transactionAmount: 0,
        transactionDate: new Date(),
    };

    const form = useForm({
        initialValues: initialValues
    })

    const router = useRouter();

    const [isLoading, setLoading] = useState(false);

    const title = editMode === 'create'
        ? `Create a new ${transactionType}`
        : `Update ${transactionType}`;

    const descriptionPlaceholder = `A short description of the ${transactionType}`;
    const confirmButtonText = `${editMode === 'create' ? 'Create' : 'Update'} ${transactionType}`;
    const successText = `The ${transactionType} was successfully ${editMode}d.`;

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            form.onSubmit(handleSubmit)(e);
            console.log('success');
            showNotification({autoClose: 5000, color: 'green', title: 'Success', message: successText});
            form.reset();
        } catch (e) {
            showNotification({autoClose: 5000, color: 'red', title: 'Error', message: 'Something went wrong.'});
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <>
            <Title order={3} mb="lg">{title}</Title>
            <form onSubmit={onSubmit}>
                <LoadingOverlay visible={isLoading} />
                <Stack spacing="lg">
                    <TextInput
                        {...form.getInputProps('transactionDescription')}
                        label='Description' placeholder={descriptionPlaceholder} required />
                    <NumberInput
                        {...form.getInputProps('transactionAmount')} label='Amount (SGD)' required/>
                    <DatePicker
                        {...form.getInputProps('transactionDate')} label='Date' required />
                </Stack>
                <Group mt="xl">
                    <Button type="submit">{confirmButtonText}</Button>
                    <Button onClick={() => router.back()} variant='subtle'>Cancel</Button>
                </Group>
            </form>
        </>
    );
}