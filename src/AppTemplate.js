// @flow
import React, { PureComponent } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Menu, Grid, MenuItem } from 'semantic-ui-react'
import PathsPage from './pages/paths/PathsPage'
import DomainsPage from './pages/domains/DomainsPage'
import TasksPage from './pages/tasks/TasksPage'
import history from 'history'

class AppTemplate extends PureComponent {

  state = { activeItem: 'paths' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render = () => {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            Logo here
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Link to='/'><Menu.Item name='paths' active={activeItem === 'paths'} onClick={ this.handleItemClick } /></Link>
              <Link to='/domains'><Menu.Item name='domains' active={activeItem === 'domains'} onClick={ this.handleItemClick } /></Link>
              <Link to='/tasks'><Menu.Item name='tasks' active={activeItem === 'tasks'} onClick={ this.handleItemClick } /></Link>
            </Menu>
          </Grid.Column>

          <Grid.Column width={12}>
            <Switch>
              <Route exact path='/' component={ PathsPage }/>
              <Route path='/domains' component={ DomainsPage }/>
              <Route path='/tasks' component={ TasksPage }/>
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AppTemplate