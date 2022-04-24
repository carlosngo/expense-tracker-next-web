import {Transaction} from "../../interfaces/transaction";
import {toReadableDateString} from "../../util/date";
import {Card, Divider, SimpleGrid, Grid, Text, Group, Button} from "@mantine/core";
import TransactionAmount from "./TransactionAmount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import {useModals} from "@mantine/modals";

interface Props {
    transaction: Transaction,
    handleDelete: () => void,
}

const TransactionDetail = ({transaction, handleDelete}: Props) => {
    const transactionType = transaction.amount < 0 ? 'Expense' : 'Revenue';

    const modals = useModals();

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: `Delete transaction "${transaction.description}"`,
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this transaction? This action is destructive and you will have
                    to contact support to restore your data.
                </Text>
            ),
            labels: { confirm: 'Delete transaction', cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onCancel: () => {},
            onConfirm: handleDelete,
        });

    if (transaction.id === undefined) return (
        <div>No such transaction</div>
    );
    else return (
        <SimpleGrid cols={2}>
            <Card shadow='xs'>
                <Group position='apart'>
                    <Text size='lg'>Transaction Information</Text>
                    <Group>
                        <Link href={`/expenses/update/${transaction.id}`} passHref>
                            <Button component='a' leftIcon={<FontAwesomeIcon icon={faPenToSquare} />} size='xs'>Update</Button>
                        </Link>
                        <Button onClick={openDeleteModal} leftIcon={<FontAwesomeIcon icon={faTrashCan} />} size='xs' color='red'>Delete</Button>
                    </Group>
                </Group>
                <Divider size='sm' my='sm' />
                <Grid>
                    <Grid.Col span={3}><Text size='sm'>Type:</Text></Grid.Col>
                    <Grid.Col span={9}><Text size='sm'>{transactionType}</Text></Grid.Col>
                </Grid>
                <Divider size='xs' my='xs' />
                <Grid>
                    <Grid.Col span={3}><Text size='sm'>Description:</Text></Grid.Col>
                    <Grid.Col span={9}><Text size='sm'>{transaction.description}</Text></Grid.Col>
                </Grid>
                <Divider size='xs' my='xs' />
                <Grid>
                    <Grid.Col span={3}><Text size='sm'>Total Amount:</Text></Grid.Col>
                    <Grid.Col span={9}><Text size='sm'><TransactionAmount amount={transaction.amount} /></Text></Grid.Col>
                </Grid>
                <Divider size='xs' my='xs' />
                <Grid>
                    <Grid.Col span={3}><Text size='sm'>Transaction Date:</Text></Grid.Col>
                    <Grid.Col span={9}><Text size='sm'>{toReadableDateString(transaction.transactionDate)}</Text></Grid.Col>
                </Grid>
            </Card>
        </SimpleGrid>
    )
}

export default TransactionDetail;