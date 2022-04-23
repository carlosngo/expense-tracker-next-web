import {Text} from "@mantine/core";
import {toSgdCurrencyString} from "../../util/currency";

interface Props {
    amount: number
}

const TransactionAmount = ({amount}: Props) => {
    const transactionAmountColor = amount < 0 ? 'red' : 'green';
    return (
        <Text color={transactionAmountColor} inherit>{toSgdCurrencyString(amount)}</Text>
    );
}

export default TransactionAmount;