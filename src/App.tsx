import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import NotFound from './components/not-found';
import CreateOrUpdateUser from './components/users/create-or-update';
import UserList from './components/users/list';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={UserList} /> 
        <Route path="/user/:slug" component={CreateOrUpdateUser} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
