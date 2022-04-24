import { Transaction } from "../../interfaces/transaction";
import {LoadingOverlay, Text, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {areTwoDatesEqualInYearAndMonth} from "../../util/date";
import {toSgdCurrencyString} from "../../util/currency";
import TransactionTable from "../transactions/TransactionTable";

interface Props {
    isDataReady: boolean,
    expenses: Transaction[]
}

const MostExpensiveExpensesOfTheMonth = ({isDataReady, expenses}: Props) => {
    const dateToday = new Date();
    const yearToday = dateToday.getFullYear();
    const monthToday = dateToday.getMonth();

    const [year, setYear] = useState(yearToday);
    const [month, setMonth] = useState(monthToday);
    const [orderedExpenses, setOrderedExpenses] = useState([] as Transaction[]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        populateData();
    }, [isDataReady, year, month]);

    const populateData = async () => {
        if (!isDataReady) return;

        const selectedMonthAndYear = new Date(year, month);
        let fiveMostExpensiveExpensesOfTheMonth = expenses
            .filter(transaction => areTwoDatesEqualInYearAndMonth(transaction.transactionDate, selectedMonthAndYear))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5);

        setOrderedExpenses(fiveMostExpensiveExpensesOfTheMonth);
        setLoading(false);
    };

    if (!isDataReady || isLoading) return <LoadingOverlay visible={true}/>
    return (
        <TransactionTable data={orderedExpenses} isLoading={isLoading} />
    );
}

export default MostExpensiveExpensesOfTheMonth;