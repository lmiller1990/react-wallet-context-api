export type TStoreContent = {
  allTransactions: {
    [id: string]: TTransaction
  }
  allTransactionIds: number[]
}

export type TStoreContext = {
  store: TStoreContent
  setStore(store: TStoreContent): void
}

type TAud = 'Aud'
type TUsd = 'Usd'

export type TCurrency = TAud | TUsd

export interface TTransaction {
  id: number
  currency: TCurrency
  amount: number
  type:  'debit' | 'credit'
}

export const ALL_CURRENCIES: TCurrency[] = [
  'Aud', 'Usd'
]