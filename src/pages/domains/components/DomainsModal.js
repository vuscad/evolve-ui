// @flow
import React, { Component } from 'react'
import { Grid, Modal, Button, Icon, Header, Dropdown, Label, Input } from 'semantic-ui-react'
import { tasksService } from '../../../service/TasksService'
import { domainsService } from '../../../service/DomainsService'

const State = {
  tasks: Array,
  selectedTasks: Array,
  name: String,
  modalOpen: Boolean
}

const Props = {
  domain: Object,
  icon: String,
  title: String,
  reload: Function
}

class DomainsModal extends Component<Props, State> {
  state = {
    tasks: [],
    selectedTasks: [],
    name: '',
    modalOpen: false
  }

  componentWillMount = async () => {
    var selectedTasks = []
    if (this.props.icon === 'edit') {
    selectedTasks = this.props.domain.tasks.map((task, index) => { 
      console.log(this.props.domain.id + '  ' + JSON.stringify(this.props.domain))
      console.log(this.props.domain.id + '  ' + JSON.stringify(task))
      const name = task.name

      return { key: index, text: name, value: task }
    })
  }

    const tasks = await tasksService.getTasks()
    const tasksOptions = tasks.map((task, index) => { 
      const name = task.name

      return { key: index, text: name, value: task }
    })

    this.setState({ selectedTasks, tasks: tasksOptions, name: this.props.domain.name })
  }

  onChange = (event, { value }) => {
    const selectedTasks = value.map((task, index) => { 
      const name = task.name

      return { key: index, text: name, value: task }
    })
    this.setState({ selectedTasks })
  }

  onYesClicked = async () => {
    const domain = this.props.domain
    domain.name = this.state.name
    domain.tasks = this.state.selectedTasks.map(task => task.value)
    console.log(this.state.selectedTasks)
    
    if (this.props.icon === 'add') {
      await domainsService.createDomain(domain)
    } else {
      await domainsService.updateDomain(domain)
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
    this.setState({ modalOpen: false, selectedTasks: [] })
  }

  deleteAll = () => {
    this.setState({ selectedTasks: [] })
  }

  render = () => {
    const { domain } = this.props

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
                  <Input onChange={ this.onInputChange } defaultValue={ domain.name }/>
                </Grid.Row>
                <Grid.Row>
                  <Label size='large'>Tasks</Label>
                  <Dropdown placeholder='Tasks' defaultValue={ this.state.selectedTasks.map(element => element.value) } multiple selection options={ this.state.tasks } onChange={ this.onChange }/>
                  <Button color='red' onClick={ this.deleteAll }>Delete all !</Button>
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

export default DomainsModal