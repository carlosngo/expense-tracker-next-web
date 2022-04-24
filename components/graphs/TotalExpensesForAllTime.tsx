import { Transaction } from "../../interfaces/transaction";
import {LoadingOverlay, Text, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {toSgdCurrencyString} from "../../util/currency";

interface Props {
    isDataReady: boolean,
    expenses: Transaction[]
}

const TotalExpensesOfAllTime = ({isDataReady, expenses}: Props) => {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        populateData();
    }, [isDataReady]);

    const populateData = async () => {
        if (!isDataReady) return;

        let sumOfAllExpenses = expenses.length === 0 ? 0
            : expenses
                .map(transaction => transaction.amount)
                .reduce((previousAmount, currentAmount) => previousAmount + currentAmount);

        setTotalExpenses(sumOfAllExpenses);
        setLoading(false);
    };

    if (!isDataReady || isLoading) return <LoadingOverlay visible={true}/>
    return (
        <Text size='xl'>{toSgdCurrencyString(-totalExpenses)}</Text>
    );
}

export default TotalExpensesOfAllTime;