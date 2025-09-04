import React from 'react';

function Welcome({user}) {
    return <p>Logged in: {user.lastName}, {user.firstName}, (user.email)</p>;
}

export default Welcome;