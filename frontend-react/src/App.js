import { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm.js';

function App() {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  function handleLogin(firstName, lastName, email) {
    alert("App received: "+firstName+" "+lastName+" "+email);
    setUserFirstName(firstName);
    setUserLastName(lastName);
    setUserEmail(email);
  }

  const loginForm = (<LoginForm onLogin={handleLogin} />);
  var loggedIn = (<p>Welcome {userFirstName}</p>);

  return userFirstName === '' ? loginForm : loggedIn;
}

export default App;
