import { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm.js';
import Welcome from './Welcome.js';
import DataSource from './DataSource.js';

function App() {
  const [user, setUser] = useState(null);

  function handleLogin(userFirstName, userLastName, userEmail) {
    var user = {firstName: userFirstName, lastName: userLastName, email: userEmail};
    setUser(user);
  }

  const loginForm = (<LoginForm onLogin={handleLogin} />);
  var loggedIn = (<div>
    <Welcome user={user} />
    <DataSource />
  </div>);

  return user === null ? loginForm : loggedIn;
}

export default App;
