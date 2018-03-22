// @flow
import React, { Component } from 'react'
import { Grid, Modal, Button, Icon, Header } from 'semantic-ui-react'

class DomainsModal extends Component {

  render = () => {
    const { domain } = this.props
    return (
        <Modal 
          dimmer='blurring' 
          trigger={<Button color='green' icon='add'></Button>} 
          closeIcon
          closeOnRootNodeClick
          >
            <Header icon='add' content='Add Domain' />
            <Modal.Content>
              <Grid>
                <Grid.Row>
                  <Label size='large'>Name</Label>
                  <Input>{ domain.name }</Input>
                </Grid.Row>
                <Grid.Row>
                  <Label size='large'>Tasks</Label>
                  <Input>{ domain.tasks }</Input>
                </Grid.Row>
              </Grid>

            </Modal.Content>
            <Modal.Actions>
              <Button basic color='red' inverted>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' inverted>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
    )
  }
}

export default DomainsModal