// @flow
import React, { Component } from 'react'
import { Table, Modal, Button, Header, Icon } from 'semantic-ui-react'
import { pathsService } from '../../service/PathsService'
import PathsModal from './components/PathsModal'
import DeleteModal from '../common/DeleteModal'

const State = {
  paths: Array
}

class PathsPage extends Component<{}, State> {
  state = {
    paths: []
  }

  componentWillMount = () => {
    this.reload()
  }

  reload = async () => {
    const paths = await pathsService.getPaths()

    this.setState({ paths })
  }

  onDelete = async (id) => {
    await pathsService.deletePath(id)

    this.reload()
  }

  render = () => {
    return (
      <div>
        <PathsModal path={ {} } title='Add modal' icon='add' reload={ this.reload }/>
        
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
                Domains
              </Table.HeaderCell>

              <Table.HeaderCell width={ 4 }>
                More
              </Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <Table.Body>
          {
            this.state.paths.map((path, index) => 
              <Table.Row key={ index }> 
                <Table.Cell>
                  { path.id }
                </Table.Cell>
                <Table.Cell>
                  { path.name }
                </Table.Cell>
                <Table.Cell>
                  { path.domains.map(domain => JSON.stringify(domain, null, 2)).join(',') }
                </Table.Cell>
                <Table.Cell>
                  <PathsModal path={ path } title='Edit modal' icon='edit' reload={ this.reload }/>
                  <DeleteModal id={ path.id } delete={ this.onDelete }/>
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

export default PathsPage