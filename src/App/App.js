import React, { Component } from 'react'
import Setup from '../Setup'
import Prepare from '../Prepare'
import Training from '../Training'
import Finish from '../Finish'
import { Route } from 'react-router-dom'
import routes from '../routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path={routes.root} component={Setup} />
        <Route exact path={routes.prepare} component={Prepare} />
        <Route exact path={routes.training} component={Training} />
        <Route exact path={routes.finish} component={Finish} />
      </div>
    )
  }
}

export default App
