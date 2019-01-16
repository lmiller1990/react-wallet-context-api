import React, { PureComponent } from 'react'
import {  Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { TTransaction, TCurrency, ALL_CURRENCIES } from '../../context/StoreContext/types'

interface IEditTransactionModalProps {
  transaction: TTransaction
  isOpen: boolean
}

interface IEditTransactionModalState {
  amount: number
  type: 'debit' | 'credit'
  currency: TCurrency
}

class EditTransactionModal extends PureComponent<IEditTransactionModalProps, IEditTransactionModalState> {
  constructor(props: IEditTransactionModalProps) {
    super(props)
    console.log(props.transaction)

    this.state = {
      amount: props.transaction.amount,
      currency: props.transaction.currency,
      type: props.transaction.type
    }
  }

  updateCurrency(evt: any) {
    this.setState({ currency: evt.target.value })
  }

  render() {
    console.log(ALL_CURRENCIES)
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => {}}>
        <ModalHeader>Editing Transaction</ModalHeader>
        <ModalBody>
          <Input 
            value={this.state.amount} 
            onChange={x => this.setState({ amount: parseInt(x.target.value, 10) })} 
          />
          <Input type="select" name="currency" id="currency" onChange={this.updateCurrency}>
            {ALL_CURRENCIES.map(x => 
            <option 
                key={x} 
                value={x}
              >
                {x}
              </option>
            )}
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {}}>Save</Button>{' '}
          <Button color="secondary" onClick={() => {}}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export { EditTransactionModal }
