import {Transaction} from "../../interfaces/transaction";
import {useEffect, useState} from "react";
import {db} from "../../util/db";
import {toReadableDateString} from "../../util/date";
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import {Group, LoadingOverlay, Space, Title, Text} from "@mantine/core";
import TransactionDetail from "../../components/transactions/TransactionDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft} from '@fortawesome/free-solid-svg-icons'

interface Props {
    id: string
}

const TransactionPage = ({ id }: Props) => {
    const [expense, setExpense] = useState({} as Transaction);

    const router = useRouter()

    useEffect(() => {
        getExpense();
    });

    const getExpense = async () => {
        try {
            setExpense(await db.transactions.where('id').equals(Number(id)).first() ?? {} as Transaction);
        } catch {}
    }

    const actualComponent = (
        <>
            <Group align='end'>
                <Group>
                    <FontAwesomeIcon icon={faRightLeft} />
                    <Title order={3}>Transactions</Title>
                </Group>
                <Text weight={300}>Expense: &quot;{expense.description}&quot;</Text>
            </Group>
            <Space h='md' />
            <TransactionDetail transaction={expense}/>
        </>
    );

    return (
        <Layout>
            <LoadingOverlay visible={router.isFallback} />
            {!router.isFallback && actualComponent}
        </Layout>
    );
}

export default TransactionPage;

export async function getStaticPaths() {
    return {paths: [], fallback: true};
}

export async function getStaticProps({params}: any) {
    return {
        props: {id: params.id}
    }
}