// db.ts
import Dexie, { Table } from 'dexie';
import {Transaction} from "../interfaces/transaction";

export class MySubClassedDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    transactions!: Table<Transaction>;

    constructor() {
        super('transactions');
        this.version(1).stores({
            transactions: '++id, transactionDate, amount' // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();
