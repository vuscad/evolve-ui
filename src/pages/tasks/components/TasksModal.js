// @flow
import React, { Component } from 'react'
import { Grid, Modal, Button, Icon, Header, TextArea, Label, Input } from 'semantic-ui-react'
import { tasksService } from '../../../service/TasksService'

const State = {
  name: String,
  modalOpen: Boolean,
  assignments: Array
}

const Props = {
  task: Object,
  icon: String,
  title: String,
  reload: Function
}

class TasksModal extends Component<Props, State> {
  state = {
    name: '',
    modalOpen: false,
    assignments: []
  }

  componentWillMount = async () => {
    var assignments = []
    console.log(this.props.task)
    if (this.props.icon === 'edit' && this.props.task.assignments !== undefined) {
      assignments = this.props.task.assignments
    }
    this.setState({ assignments, name: this.props.task.name })
  }

  onChange = (event, { value }) => {
    this.setState({ assignments: value })
  }

  onYesClicked = async () => {
    const task = this.props.task
    task.name = this.state.name

    if(typeof this.state.assignments === 'string') {
      task.assignments = JSON.parse(this.state.assignments)
    } else {
      task.assignments = this.state.assignments
    }

    if (this.props.icon === 'add') {
      await tasksService.createTask(task)
    } else {
      await tasksService.updateTask(task)
    }
    
    this.props.reload()
    this.closeModal()
  }

  onInputChange = (event, data) => {
    this.setState({ name: data.value })
  }

  openModal = () => {
    this.componentWillMount()
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  render = () => {
    const { task } = this.props

    return (
        <Modal 
          dimmer='blurring' 
          trigger={<Button color={ this.props.icon === 'add' ? 'green' : 'yellow' } icon={ this.props.icon } onClick={ this.openModal }/>} 
          open={ this.state.modalOpen }
          closeIcon
          closeOnRootNodeClick
          onClose={ this.closeModal }
          >
            <Header icon={ this.props.icon } content={ this.props.title } />
            <Modal.Content>
              <Grid>
                <Grid.Row>
                  <Label size='large'>Name</Label>
                  <Input onChange={ this.onInputChange } defaultValue={ task.name }/>
                </Grid.Row>
                <Grid.Row>
                  <Label size='large'>Assignments</Label>
                  <TextArea defaultValue={ JSON.stringify(this.state.assignments) } onChange={ this.onChange }/>
                </Grid.Row>
              </Grid>

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

export default TasksModal