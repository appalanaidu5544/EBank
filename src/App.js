import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import Notfound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Notfound />
    </Switch>
  </>
)

export default App
