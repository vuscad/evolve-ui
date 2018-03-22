// @flow
import React, { Component } from 'react'
import { Table, Modal, Button, Header, Icon, Label, Input, Segment } from 'semantic-ui-react'
import { domainsService } from '../../service/DomainsService'

const State = {
  domains: Array
}

class DomainsPage extends Component<{}, State> {
  state = {
    domains: []
  }

  componentDidMount = async () => {
    const domains = await domainsService.getDomains()

    this.setState({ domains })
  }

  editYesCliked = (event) => {
    console.log(event)
  }

  editNoClicked = (event) => {
    console.log(event)
  }

  render = () => {
      
    return (
      <Table celled striped fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={ 4 }>
              ID
            </Table.HeaderCell>

            <Table.HeaderCell width={ 4 }>
              Name
            </Table.HeaderCell>

            <Table.HeaderCell width={ 4 }>
              Tasks
            </Table.HeaderCell>

            <Table.HeaderCell width={ 4 }>
              More
            </Table.HeaderCell>

          </Table.Row>
        </Table.Header>
        <Table.Body>
        {
          this.state.domains.map(domain => 
            <Table.Row> 
              <Table.Cell>
                { domain.id }
              </Table.Cell>
              <Table.Cell>
                { domain.name }
              </Table.Cell>
              <Table.Cell>
                { domain.tasks.join(',') }
              </Table.Cell>
              <Table.Cell>
                <Modal 
                dimmer='blurring' 
                trigger={<Button color='green' icon='add'></Button>} 
                closeIcon
                closeOnRootNodeClick
                >
                  <Header icon='add' content='Add Domain' />
                  <Modal.Content>
                    <Label size='large'>Name</Label>
                    <Input></Input>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color='red'>
                      <Icon name='remove' /> No
                    </Button>
                    <Button color='green'>
                      <Icon name='checkmark' /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>

                <Modal dimmer='blurring' trigger={<Button color='yellow' icon='edit'></Button>} size='small'>
                  <Header icon='edit' content='Add Domain' />
                  <Modal.Content>
                    <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color='red' onClick={ () => this.editNoClicked }>
                      <Icon name='remove' /> No
                    </Button>
                    <Button color='green' onClick={ () => this.editYesCliked }>
                      <Icon name='checkmark' /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>

                <Modal dimmer='blurring' trigger={<Button color='red' icon='delete'></Button>} size='small'>
                  <Header icon='delete' content='Delete domain' />
                  <Modal.Content>
                    <p>Are you sure you want to delete the domain?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color='red'>
                      <Icon name='remove' /> No
                    </Button>
                    <Button color='green'>
                      <Icon name='checkmark' /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Table.Cell>
            </Table.Row>
          )
        }
        </Table.Body>
      </Table>
    )
  }
}

export default DomainsPage