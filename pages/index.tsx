import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Transaction} from "../interfaces/transaction";
import {useEffect, useState} from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  let [expensesList, setExpensesList] = useState([]);
  let [isLoading, setLoading] = useState(true);


  useEffect(() => {
    populateData();
    setLoading(false);
  });

  const populateData = () => {
    if (localStorage.expensesList === null) return;
    setExpensesList(JSON.parse(localStorage.expensesList));
  };

  return (
    <Layout title="Dashboard">

      <TransactionTable isLoading={isLoading} data={expensesList} />
    </Layout>
  )
}

export default Home;

export async function getStaticProps() {
  return {
    props: {}
  }
}
