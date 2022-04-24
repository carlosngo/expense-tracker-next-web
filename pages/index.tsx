import type { NextPage } from 'next'
import {Transaction} from "../interfaces/transaction";
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import {Card, Text, Grid, Button, Space, Title, Divider, Container, Stack} from "@mantine/core";
import RunningTotalExpensesOfTheMonth from "../components/graphs/RunningTotalExpensesOfTheMonth";
import {db} from "../util/db";
import TotalExpensesOfTheMonth from "../components/graphs/TotalExpensesOfTheMonth";
import TotalExpensesForAllTime from "../components/graphs/TotalExpensesForAllTime";
import Link from "next/link";
import MostExpensiveExpensesOfTheMonth from "../components/graphs/MostExpensiveExpensesOfTheMonth";

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
            <Divider size='xs' my='sm' />
            <Link href='/expenses' passHref>
              <Button component='a' variant='light'>View your expenses</Button>
            </Link>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <Card style={{position: 'relative'}}>
              <Text size='lg'>Your Total Expenses for the Month</Text>
              <Divider size='sm' my='sm' />
              <TotalExpensesOfTheMonth isDataReady={!isLoading} expenses={expensesList} />
            </Card>
            <Card style={{position: 'relative'}}>
              <Text size='lg'>Your Total Expenses for all time</Text>
              <Divider size='sm' my='sm' />
              <TotalExpensesForAllTime isDataReady={!isLoading} expenses={expensesList} />
            </Card>
            <Card>
              <Text size='lg'>Your 5 Most Expensive Expenses for the Month</Text>
              <Divider size='sm' my='sm' />
              <MostExpensiveExpensesOfTheMonth isDataReady={!isLoading} expenses={expensesList} />
            </Card>
          </Stack>
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
