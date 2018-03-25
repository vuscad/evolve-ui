// @flow
import React, { Component } from 'react'
import { Modal, Button, Icon, Header, Label } from 'semantic-ui-react'

const State = {
  modalOpen: Boolean
}

const Props = {
  id: String,
  delete: Function
}

class DeleteModal extends Component<Props, State> {
  state = {
    modalOpen: false
  }

  onYesClicked = () => {
    console.log(this.props)

    this.props.delete(this.props.id)
    this.closeModal()
  }

  openModal = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render = () => {

    return (
      <Modal 
        dimmer='blurring' 
        trigger={<Button color='red' icon='delete' onClick={ this.openModal }/>} 
        open={ this.state.modalOpen }
        closeIcon
        closeOnRootNodeClick
        onClose={ this.closeModal }
        >
          <Header icon='delete' content='Delete object' />
          <Modal.Content>
              <p>Are you sure you want to delete?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={ this.onYesClicked }>
              <Icon name='checkmark' /> Yes
            </Button>
            <Button color='red' onClick={ this.closeModal }>
              <Icon name='remove' /> No
            </Button>
          </Modal.Actions>
        </Modal>
    )
  }
}

export default DeleteModal