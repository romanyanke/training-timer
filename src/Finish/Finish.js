import React from 'react'
import routes from '../routes'

const Finish = ({ history }) => (
  <div className="Finish">
    <h1>Молодец</h1>
    <button onClick={() => history.push(routes.root)}>Еще раз</button>
  </div>
)

export default Finish
