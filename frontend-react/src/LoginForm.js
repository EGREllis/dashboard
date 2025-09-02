import React from 'react';

function LoginForm({onLogin}) {
  function handleSubmit(e) {
    e.preventDefault();
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    onLogin(firstName, lastName, email);
  }

  return (
  <div>
    <p>Please enter your details to proceed.</p>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="First name" id="firstName" />
      <input type="text" placeholder="Last name" id="lastName" />
      <input type="email" placeholder="Email" id="email" />
      <input type="submit" value="Proceed" />
    </form>
  </div>
  );
}

export default LoginForm;