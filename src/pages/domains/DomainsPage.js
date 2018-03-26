// @flow
import React, { Component } from 'react'
import { Table, Modal, Button, Header, Icon } from 'semantic-ui-react'
import { domainsService } from '../../service/DomainsService'
import DomainsModal from './components/DomainsModal'
import DeleteModal from '../common/DeleteModal'

const State = {
  domains: Array
}

class DomainsPage extends Component<{}, State> {
  state = {
    domains: []
  }

  componentDidMount = async () => {
    this.reload()
  }

  reload = async () => {
    const domains = await domainsService.getDomains()

    this.setState({ domains })
  }

  onDelete = async (id) => {
    await domainsService.deleteDomain(id)

    this.reload()
  }

  render = () => {
      
    return (
      <div>
        <DomainsModal domain={ {} } title='Add modal' icon='add' reload={ this.reload }/>
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
            this.state.domains.map((domain, index) => 
              <Table.Row key={ index }> 
                <Table.Cell>
                  { domain.id }
                </Table.Cell>
                <Table.Cell>
                  { domain.name }
                </Table.Cell>
                <Table.Cell>
                  { domain.tasks.map(task => JSON.stringify(task, null, 2)).join(',') }
                </Table.Cell>
                <Table.Cell>
                  <DomainsModal domain={ domain } title='Edit modal' icon='edit' reload={ this.reload }/>
                  <DeleteModal id={ domain.id } delete={ this.onDelete }/>
                </Table.Cell>
              </Table.Row>
            )
          }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default DomainsPage