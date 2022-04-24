import { Transaction } from "../../interfaces/transaction";
import {LoadingOverlay, Text, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {areTwoDatesEqualInYearAndMonth} from "../../util/date";
import {toSgdCurrencyString} from "../../util/currency";

interface Props {
    isDataReady: boolean,
    expenses: Transaction[]
}

const TotalExpensesOfTheMonth = ({isDataReady, expenses}: Props) => {
    const dateToday = new Date();
    const yearToday = dateToday.getFullYear();
    const monthToday = dateToday.getMonth();

    const [year, setYear] = useState(yearToday);
    const [month, setMonth] = useState(monthToday);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        populateData();
    }, [isDataReady, year, month]);

    const populateData = async () => {
        if (!isDataReady) return;

        const selectedMonthAndYear = new Date(year, month);
        let expensesForSelectedMonth = expenses
            .filter(transaction => areTwoDatesEqualInYearAndMonth(transaction.transactionDate, selectedMonthAndYear))
        let sumOfExpensesForSelectedMonth = expensesForSelectedMonth.length === 0 ? 0
            : expensesForSelectedMonth
                .map(transaction => transaction.amount)
                .reduce((previousAmount, currentAmount) => previousAmount + currentAmount);

        setTotalExpenses(sumOfExpensesForSelectedMonth);
        setLoading(false);
    };

    if (!isDataReady || isLoading) return <LoadingOverlay visible={true}/>
    return (
        <Text size='xl'>{toSgdCurrencyString(-totalExpenses)}</Text>
    );
}

export default TotalExpensesOfTheMonth;