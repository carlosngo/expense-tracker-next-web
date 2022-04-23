import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Transaction} from "../interfaces/transaction";
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import TransactionTable from "../components/transactions/TransactionTable";
import {Container, LoadingOverlay, Title} from "@mantine/core";

const Home: NextPage = () => {
  let [expensesList, setExpensesList] = useState([] as Transaction[]);
  let [isLoading, setLoading] = useState(true);


  useEffect(() => {
    populateData();
    setLoading(false);
  }, []);

  const populateData = () => {
    if (localStorage.transactions === undefined) return;
    const transactionsArr: Transaction[] = JSON.parse(localStorage.transactions);
    setExpensesList(transactionsArr);
  };

  return (
    <Layout title="Dashboard">
      <Title order={3}>Dashboard</Title>
      <Container>
        <LoadingOverlay visible={isLoading} />
      </Container>
    </Layout>
  )
}

export default Home;

export async function getStaticProps() {
  return {
    props: {}
  }
}
