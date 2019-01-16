import React, { PureComponent, ChangeEvent } from 'react'
import {  Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { TTransaction, TCurrency, ALL_CURRENCIES } from '../../context/StoreContext/types'

interface IEditTransactionModalProps {
  transaction: TTransaction
  isOpen: boolean
  toggle: (show: boolean) => void
  save: (id: number, amount: number, type: 'debit' | 'credit', currency: TCurrency) => void
}

interface IEditTransactionModalState {
  amount: number
  type: 'debit' | 'credit'
  currency: TCurrency
}

class EditTransactionModal extends PureComponent<IEditTransactionModalProps, IEditTransactionModalState> {
  constructor(props: IEditTransactionModalProps) {
    super(props) 

    this.state = {
      amount: 0,
      currency: 'Aud',
      type: 'debit'
    }
  }
  componentWillReceiveProps() {
    const { transaction } = this.props
    console.log('will receive props')
    this.setState({
      amount: transaction.amount,
      currency: transaction.currency,
      type: transaction.type
    })
  }

  save() {
    const { currency, amount, type } = this.state
    this.props.save(this.props.transaction.id, amount, type, currency)
  }

  updateType(evt: React.FormEvent<HTMLInputElement>) {
    const selectedType: string = evt.currentTarget.value
    // @ts-ignore
    this.setState({ type: selectedType })
  }

  updateCurrency(evt: React.FormEvent<HTMLInputElement>) {
    const selectedCurrency: TCurrency = evt.currentTarget.value as TCurrency
    this.setState({ currency: selectedCurrency })
  }

  render() {
    const { toggle } = this.props

    return (
      <Modal isOpen={this.props.isOpen} toggle={() => {}}>
        <ModalHeader>Editing Transaction</ModalHeader>
        <ModalBody>
          <Input 
            value={this.state.amount} 
            onChange={x => this.setState({ amount: parseInt(x.target.value, 10) })} 
          /> 
          <Input 
            type="select" 
            name="currency" 
            id="currency" 
            value={this.state.currency}
            onChange={(e: React.FormEvent<HTMLInputElement>) => this.updateCurrency(e)}
          >
            {ALL_CURRENCIES.map(x => 
            <option key={x} value={x}>
                {x}
              </option>
            )}
          </Input>
          <Input 
            type="select" 
            name="type" 
            id="type" 
            value={this.state.type}
            onChange={(e: React.FormEvent<HTMLInputElement>) => this.updateType(e)}
          >
            {['debit', 'credit'].map(x => 
            <option key={x} value={x}>
                {x}
              </option>
            )}
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.save()}>Save</Button>{' '}
          <Button color="secondary" onClick={() => toggle(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export { EditTransactionModal }
