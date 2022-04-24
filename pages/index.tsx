import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Transaction} from "../interfaces/transaction";
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import TransactionTable from "../components/transactions/TransactionTable";
import {Card, Text, Grid, LoadingOverlay, Space, Title, Divider, Container} from "@mantine/core";
import RunningTotalExpensesOfTheMonth from "../components/graphs/RunningTotalExpensesOfTheMonth";
import {db} from "../util/db";

const Home: NextPage = () => {
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
    <Layout title="Dashboard">
      <Title order={3}>Dashboard</Title>
      <Space h='xl' />
      <Grid>
        <Grid.Col span={8}>
          <Card>
            <Text size='lg'>Your Total Expenses Throughout the Month</Text>
            <Divider size='sm' my='sm' />
            <Container fluid style={{position: 'relative', height: '500px'}} mt='xl'>
              <RunningTotalExpensesOfTheMonth isDataReady={!isLoading} expenses={expensesList}/>
            </Container>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card style={{position: 'relative'}}>
            <LoadingOverlay visible={isLoading} />
          </Card>
        </Grid.Col>
        <Grid.Col span={8}>
          <Card style={{position: 'relative'}}>
            <LoadingOverlay visible={isLoading} />
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card style={{position: 'relative'}}>
            <LoadingOverlay visible={isLoading} />
          </Card>
        </Grid.Col>
      </Grid>


    </Layout>
  )
}

export default Home;

export async function getStaticProps() {
  return {
    props: {}
  }
}
