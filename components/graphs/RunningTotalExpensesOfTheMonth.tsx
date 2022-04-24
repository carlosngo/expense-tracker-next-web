import { Transaction } from "../../interfaces/transaction";
import {LoadingOverlay} from "@mantine/core";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import {areTwoDatesEqualWithoutTimestamp, getStartAndEndDateOfMonth} from "../../util/date";
import dayjs from "dayjs";
import {toSgdCurrencyString} from "../../util/currency";

interface Props {
    isDataReady: boolean,
    expenses: Transaction[]
}

interface DataPoint {
    totalExpenses: number,
    monthAndYear: Date
}

const RunningTotalExpensesOfTheMonth = ({isDataReady, expenses}: Props) => {
    const dateToday = new Date();
    const yearToday = dateToday.getFullYear();
    const monthToday = dateToday.getMonth();
    const startAndEndDateOfThisMonth = getStartAndEndDateOfMonth(yearToday, monthToday);

    const [year, setYear] = useState(yearToday);
    const [month, setMonth] = useState(monthToday);
    const [startDate, setStartDate] = useState(startAndEndDateOfThisMonth.startDate);
    const [endDate, setEndDate] = useState(startAndEndDateOfThisMonth.endDate);
    const [data, setData] = useState([] as DataPoint[]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        populateData();
    }, [isDataReady, year, month]);

    const populateData = async () => {
        if (!isDataReady) return;
        const startAndEndDateOfSelectedMonth = getStartAndEndDateOfMonth(year, month);
        const startDateOfSelectedMonth = startAndEndDateOfSelectedMonth.startDate;
        const endDateOfSelectedMonth = startAndEndDateOfSelectedMonth.endDate;

        let expensesBeforeSelectedMonth = expenses
            .filter(transaction => transaction.transactionDate < startDateOfSelectedMonth)
        let sumOfExpensesBeforeSelectedMonth = expensesBeforeSelectedMonth.length === 0 ? 0
            : expensesBeforeSelectedMonth
                .map(transaction => transaction.amount)
                .reduce((previousAmount, currentAmount) => previousAmount + currentAmount);

        let dataPoints: DataPoint[] = [];
        let runningTotalExpenses = -sumOfExpensesBeforeSelectedMonth;

        for (let currentDay = 1; currentDay <= endDateOfSelectedMonth.getDate(); currentDay++) {
            let currentDate = new Date(year, month, currentDay);
            let expensesFromCurrentDay = expenses
                .filter(transaction => areTwoDatesEqualWithoutTimestamp(transaction.transactionDate, currentDate))
            let sumOfExpensesFromCurrentDay = expensesFromCurrentDay.length === 0 ? 0
                : expensesFromCurrentDay
                    .map(transaction => transaction.amount)
                    .reduce((previousAmount, currentAmount) => previousAmount + currentAmount)

            runningTotalExpenses += -sumOfExpensesFromCurrentDay;

            dataPoints.push({
                monthAndYear: currentDate,
                totalExpenses: runningTotalExpenses
            })
        }

        setStartDate(startAndEndDateOfSelectedMonth.startDate);
        setEndDate(startAndEndDateOfSelectedMonth.endDate);
        setData(dataPoints);
        setLoading(false);
    };

    if (!isDataReady || isLoading) return <LoadingOverlay visible={true}/>
    return (
        <ResponsiveContainer width='100%' height='100%' >
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthAndYear" scale='time'
                       tickFormatter={timeStr => dayjs(timeStr).format('MMM DD')}/>
                <YAxis tickFormatter={amountStr => toSgdCurrencyString(amountStr)}/>
                <Tooltip />
                <Legend />
                <Line name="Total Expenses" type="monotone" dataKey="totalExpenses" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default RunningTotalExpensesOfTheMonth;