// @flow
import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { pathsService } from '../../service/PathsService'

class PathsPage extends Component {

    componentDidMount = async () => {
        const response = await pathsService.getPaths()
        console.log(response)
    }

    render = () => {

        return (
            <div>Paths page </div>
        )
    }
}

export default PathsPage