import {Transaction} from "../../../interfaces/transaction";
import {useEffect, useState} from "react";
import {db} from "../../../util/db";
import {toReadableDateString} from "../../../util/date";
import Layout from "../../../components/Layout";
import {useRouter} from "next/router";
import {Group, LoadingOverlay, Space, Title, Text} from "@mantine/core";
import TransactionDetail from "../../../components/transactions/TransactionDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft} from '@fortawesome/free-solid-svg-icons'
import {TransactionForm, TransactionFormFields} from "../../../components/transactions/TransactionForm";

interface Props {
    id: number
}

const UpdateExpensePage = ({ id }: Props) => {
    const [transaction, setTransaction] = useState({} as Transaction);
    const [isLoading, setLoading] = useState(true);

    const router = useRouter()

    useEffect(() => {
        getTransaction();
    });

    const getTransaction = async () => {
        try {
            setTransaction(await db.transactions.where('id').equals(Number(id)).first() ?? {} as Transaction);
            setLoading(false);
        } catch {}
    }

    const handleSubmit = async (values: TransactionFormFields) => {
        const updatedTransaction: Transaction = {
            id: id,
            description: values.transactionDescription,
            amount: -values.transactionAmount,
            transactionDate: values.transactionDate
        }
        await db.transactions.update(id, updatedTransaction);
    }

    return (
        <Layout>
            <LoadingOverlay visible={router.isFallback && isLoading} />
            {!router.isFallback && !isLoading &&
                <TransactionForm editMode='update' transactionType='withdrawal' handleSubmit={handleSubmit}
                                 initialValues={{
                                    transactionDescription: transaction.description,
                                    transactionAmount: -transaction.amount,
                                    transactionDate: transaction.transactionDate,
                                }}/>}
        </Layout>
    );
}

export default UpdateExpensePage;

export async function getStaticPaths() {
    return {paths: [], fallback: true};
}

export async function getStaticProps({params}: any) {
    return {
        props: {id: parseInt(params.id)}
    }
}