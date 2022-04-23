import Layout from "../../components/Layout";
import {TransactionForm, TransactionFormFields} from "../../components/transactions/TransactionForm";
import {Transaction} from "../../interfaces/transaction";
import {db} from '../../util/db';

const CreateWithdrawalPage = () => {
    const handleSubmit = async (values: TransactionFormFields) => {
        const newTransaction: Transaction = {
            description: values.transactionDescription,
            amount: -values.transactionAmount,
            transactionDate: values.transactionDate
        };
        const id = await db.transactions.add(newTransaction);
    }

    return (
        <Layout>
            <TransactionForm editMode="create" handleSubmit={handleSubmit} transactionType="withdrawal"/>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {}
    }
}

export default CreateWithdrawalPage;