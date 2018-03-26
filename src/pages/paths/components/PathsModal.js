// @flow
import React, { Component } from 'react'
import { Grid, Modal, Button, Icon, Header, Dropdown, Label, Input } from 'semantic-ui-react'
import { domainsService } from '../../../service/DomainsService'
import { pathsService } from '../../../service/PathsService'

const State = {
  domains: Array,
  selectedDomains: Array,
  name: String,
  modalOpen: Boolean
}

const Props = {
  path: Object,
  icon: String,
  title: String,
  reload: Function
}

class PathsModal extends Component<Props, State> {
  state = {
    domains: [],
    selectedDomains: [],
    name: '',
    modalOpen: false
  }

  componentWillMount = async () => {
    var selectedDomains = []
    if (this.props.icon === 'edit') {
    selectedDomains = this.props.path.domains.map((domain, index) => { 
      const name = domain.name

      return { key: index, text: name, value: domain }
    })
  }

    const domains = await domainsService.getDomains()
    const domainsOptions = domains.map((domain, index) => { 
      const name = domain.name

      return { key: index, text: name, value: domain }
    })

    this.setState({ selectedDomains, domains: domainsOptions, name: this.props.path.name })
  }

  onChange = (event, { value }) => {
    const selectedDomains = value.map((domain, index) => { 
      const name = domain.name

      return { key: index, text: name, value: domain }
    })
    this.setState({ selectedDomains })
  }

  onYesClicked = async () => {
    const path = this.props.path
    path.name = this.state.name
    path.domains = this.state.selectedDomains.map(domain => domain.value)
    
    if (this.props.icon === 'add') {
      await pathsService.createPath(path)
    } else {
      await pathsService.updatePath(path)
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
    this.setState({ modalOpen: false, selectedDomains: [] })
  }

  deleteAll = () => {
    this.setState({ selectedDomains: [] })
  }

  render = () => {
    const { path } = this.props

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
                  <Input onChange={ this.onInputChange } defaultValue={ path.name }/>
                </Grid.Row>
                <Grid.Row>
                  <Label size='large'>Domains</Label>
                  <Dropdown placeholder='Domains' defaultValue={ this.state.selectedDomains.map(element => element.value) } multiple selection options={ this.state.domains } onChange={ this.onChange }/>
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

export default PathsModal