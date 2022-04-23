import {Anchor, Text, Table, Card} from "@mantine/core";
import Link from "next/link";
import {Transaction} from "../../interfaces/transaction";
import {toSgdCurrencyString} from "../../util/currency";
import {toReadableDateString} from "../../util/date";
import TransactionAmount from "./TransactionAmount";


interface Props {
    data: Transaction[],
    isLoading: boolean
}

const TransactionTable = ({data, isLoading}: Props) => {
    const tableHeaders = (
        <tr>
            <th>Description</th>
            <th>Amount (SGD)</th>
            <th>Date</th>
        </tr>
    );

    const tableRows = data.map((transaction => {
        return (
            <tr key={transaction.id}>
                <td>
                    <Link href={`/expenses/${transaction.id}`} passHref>
                        <Anchor inherit>{transaction.description}</Anchor>
                    </Link>
                </td>
                <td>
                    <TransactionAmount amount={transaction.amount} />
                </td>
                <td>{toReadableDateString(transaction.transactionDate)}</td>
            </tr>
        )
    }));
    const tableHeader = <thead>{tableHeaders}</thead>
    const tableBody = <tbody>{tableRows}</tbody>
    return (
        <Card shadow='sm'>
            <Table highlightOnHover>
                {tableHeader}
                {tableBody}
            </Table>
        </Card>
    );
}

export default TransactionTable;