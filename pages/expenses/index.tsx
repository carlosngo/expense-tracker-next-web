import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Transaction} from "../../interfaces/transaction";
import {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import TransactionTable from "../../components/transactions/TransactionTable";
import {Container, LoadingOverlay, Space, Title} from "@mantine/core";
import {db} from "../../util/db";

const Expenses: NextPage = () => {
    let [expensesList, setExpensesList] = useState([] as Transaction[]);
    let [isLoading, setLoading] = useState(true);


    useEffect(() => {
        populateData();
    }, []);

    const populateData = async () => {
        const expenses = await db.transactions.where('amount').below(0).toArray()
        setExpensesList(expenses);
        setLoading(false);
    };

    return (
        <Layout title="Expenses">
            <Title order={3}>Expenses</Title>
            <Space h='lg' />
            <TransactionTable data={expensesList} isLoading={isLoading} />
        </Layout>
    )
}

export default Expenses;

export async function getStaticProps() {
    return {
        props: {}
    }
}
