// @flow
import React, { Component } from 'react'
import { Table, Modal, Button, Header, Icon } from 'semantic-ui-react'
import { tasksService } from '../../service/TasksService'
import TasksModal from './components/TasksModal'
import DeleteModal from '../common/DeleteModal'

const State = {
  tasks: Array
}

class TasksPage extends Component<{}, State> {
  state = {
    tasks: []
  }

  componentDidMount = async () => {
    this.reload()
  }

  reload = async () => {
    const tasks = await tasksService.getTasks()

    this.setState({ tasks })
  }

  onDelete = async (id) => {
    await tasksService.deleteTask(id)

    this.reload()
  }

  render = () => {
      
    return (
      <div>
        <TasksModal task={ {} } title='Add modal' icon='add' reload={ this.reload }/>
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
                Assignments
              </Table.HeaderCell>

              <Table.HeaderCell width={ 4 }>
                More
              </Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <Table.Body>
          {
            this.state.tasks.map((task, index) => 
              <Table.Row key={ index }> 
                <Table.Cell>
                  { task.id }
                </Table.Cell>
                <Table.Cell>
                  { task.name }
                </Table.Cell>
                <Table.Cell>
                  { task.assignments.join(',') }
                </Table.Cell>
                <Table.Cell>
                  <TasksModal task={ task } title='Edit modal' icon='edit' reload={ this.reload }/>
                  <DeleteModal id={ task.id } delete={ this.onDelete }/>
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

export default TasksPage