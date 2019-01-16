import React, { PureComponent } from 'react'
import { Button, Table } from 'reactstrap';

import { StoreContext } from '../../context/StoreContext';
import { EditTransactionModal } from '../components/EditTransactionModal'
import {
  TTransaction,
  TStoreContext,
  TStoreContent,
  ALL_CURRENCIES,
  TCurrency 
} from '../../context/StoreContext/types';

interface IHomeState {
  selectedCurrencies: TCurrency[],
  showModal: boolean,
  editingId: number
}

class Home extends PureComponent<{}, IHomeState> {
  static contextType = StoreContext

  constructor(props = {}) {
    super(props)

    this.state = {
      editingId: 0,
      showModal: false,
      selectedCurrencies: ['Aud', 'Usd']
    }
  }

  deleteTransaction(id: number) {
    const context: TStoreContext = this.context as TStoreContext
    const cloneWithoutDeletedTransaction = {...context.store.allTransactions}
    delete cloneWithoutDeletedTransaction[id]

    context.setStore({
      allTransactionIds: context.store.allTransactionIds.filter(x => x !== id),
      allTransactions: cloneWithoutDeletedTransaction
    })
  }

  selectCurrency(currency: TCurrency) {
    if (this.state.selectedCurrencies.includes(currency)) {
      this.setState({
        selectedCurrencies: this.state.selectedCurrencies.filter(x => x !== currency)
      })
    } else {
      this.setState({
        selectedCurrencies: [...this.state.selectedCurrencies, currency]
      })
    }
  }

  get tranactionIdsFromSelectedCurrencies(): number[] {
    const context = this.context.store as TStoreContent

    return context.allTransactionIds.filter(id => {
      const trans = context.allTransactions[id]

      return this.state.selectedCurrencies.includes(trans.currency)
    })
  }

  componentWillMount() {
    const context = this.context as TStoreContext

    const store: TStoreContent = {
      allTransactions: {
        '0': { id: 0, amount: 120, type: 'debit', currency: 'Aud' },
        '1': { id: 1, amount: 150, type: 'credit', currency: 'Aud' },
        '2': { id: 2, amount: 230, type: 'credit', currency: 'Usd' }
      },
      allTransactionIds: [0, 1, 2]
    }
    context.setStore(store)
  }

  toggleModal(show: boolean) {
    this.setState({ showModal: show })
  }

  edit(transaction: TTransaction) {
    this.setState({ editingId: transaction.id }, () => this.toggleModal(true))
  }

  saveChanges(id: number, amount: number, type: 'debit' | 'credit', currency: TCurrency) {
    const context: TStoreContext = this.context

    context.setStore({
      ...context.store,
      allTransactions: {
        ...context.store.allTransactions,
        [id]: { id, amount, type, currency }
      }
    })
    this.setState({ showModal: false })
  }

  transactionRow(transaction: TTransaction): JSX.Element {
    return (
      <tr key={transaction.id}>
        <td scope="row">{transaction.id}</td>
        <td scope="row">{transaction.amount}</td>
        <td scope="row">{transaction.currency}</td>
        <td scope="row">{transaction.type}</td>
        <td scope="row">
          <Button
            size='sm'
            color='primary'
            outline
            onClick={() => this.edit(transaction)}
          >
            Edit
            </Button>
          <Button
            size='sm'
            color='danger'
            onClick={() => this.deleteTransaction(transaction.id)}
          >
            Delete
            </Button>
        </td>
      </tr>
    )
  }

  public render(): JSX.Element {
    const context = this.context as TStoreContext

    const { tranactionIdsFromSelectedCurrencies } = this
    const { selectedCurrencies, editingId } = this.state

    const transaction: TTransaction = context.store.allTransactions[editingId]
    console.log('transaction', transaction)

    const modal = transaction ? (
      <EditTransactionModal
        isOpen={this.state.showModal}
        transaction={transaction}
        save={(...args) => this.saveChanges(...args)}
        toggle={(show: boolean) => this.toggleModal(show)}
      />
    ) : ''

    return (
      <div>
        {modal}
        {ALL_CURRENCIES.map((x) => {
          return (
            <Button
              key={x}
              outline={!selectedCurrencies.includes(x)}
              onClick={() => this.selectCurrency(x)}
            >
              {x}
            </Button>
          )
        })}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tranactionIdsFromSelectedCurrencies.map((x) =>
              this.transactionRow(context.store.allTransactions[x])
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

export {
  Home
}
