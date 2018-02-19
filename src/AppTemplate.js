// @flow
import React, { PureComponent } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Divider, Grid } from 'semantic-ui-react'
import OverviewPage from './pages/overview/OverviewPage'
import PathsPage from './pages/paths/PathsPage'
import DomainsPage from './pages/domains/DomainsPage'
import TasksPage from './pages/tasks/TasksPage'

type Props = {
  t: Function,
  history: history,
  match: Object,
  location: location
}

const menuItems = [
  new MenuItem('Overview', '/overview', OverviewPage),
  new MenuItem('Paths', '/paths', PathsPage),
  new MenuItem('Domains', '/domains', DomainsPage),
  new MenuItem('Tasks', '/tasks', TasksPage)
]

Class AppTemplate extends PureComponent<Props> {

  render = () => {

    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={ 2 }>
            <div>Logo here</div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={ 2 }>
           <MenuBar menuItems={ menuItems } { ...this.props } />
          </Grid.Column>

          <Grid.Column width={ 14 }>
            <Switch>
              {
                menuItems.map((menuItem, index) =>
                <Route key={ index }
                  path={ this.props.match.path.concat(menuItem.path) }
                  component={ menuItem.component }
                />
              )
              }
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AppTemplate