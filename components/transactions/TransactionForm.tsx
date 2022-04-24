import {FormEvent, useState} from "react";
import {useForm, joiResolver} from "@mantine/form";
import {
    Button,
    Text,
    Card,
    Group,
    LoadingOverlay,
    NumberInput,
    Stack,
    TextInput,
    Title, Divider
} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import {showNotification} from "@mantine/notifications";
import {useRouter} from "next/router";
import Joi from 'joi';

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

    const schema = Joi.object({
        transactionDescription: Joi.string().required().min(1).message('Description should have at least 1 letter'),
        transactionAmount: Joi.number().required().min(1).message('Amount should be a positive number'),
        transactionDate: Joi.date().required().max('now').message('Transaction date must not be in the future'),
    });

    const form = useForm({
        schema: joiResolver(schema),
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
        const validationResult = form.validate();
        if (validationResult.hasErrors) return showNotification(
            {autoClose: 5000, color: 'red', title: 'Error', message: 'One or more fields is invalid.'});
        setLoading(true);
        try {
            form.onSubmit(handleSubmit)(e);
            showNotification({autoClose: 5000, color: 'green', title: 'Success', message: successText});
        } catch (e) {
            showNotification({autoClose: 5000, color: 'red', title: 'Error', message: 'Something went wrong in the server.'});
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <>
            <Title order={3} mb="lg">{title}</Title>
            <Card style={{position: 'relative'}}>
                <Text size='lg'>Transaction Information</Text>
                <Divider size='sm' my='sm' />
                <form onSubmit={onSubmit}>
                    <LoadingOverlay visible={isLoading} />
                    <Stack spacing="lg">
                        <TextInput
                            {...form.getInputProps('transactionDescription')}
                            label='Description' placeholder={descriptionPlaceholder} />
                        <NumberInput hideControls
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value ?? ''))
                                    ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    : '$ '
                            }
                            {...form.getInputProps('transactionAmount')} label='Amount (SGD)' />
                        <DatePicker
                            {...form.getInputProps('transactionDate')} label='Date' maxDate={new Date()} />
                    </Stack>
                    <Group mt="xl">
                        <Button type="submit">{confirmButtonText}</Button>
                        <Button onClick={() => router.back()} variant='subtle'>Cancel</Button>
                    </Group>
                </form>
            </Card>
        </>
    );
}