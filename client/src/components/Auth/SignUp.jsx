import React, { Component } from "react";
class SignUp extends Component {
  state = {};
  render() {
    return (
      <div className='content'>
        <h2>Register</h2>
        <form action=''>
          <input type='text' placeholder='name' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='password' />
          <input type='password' placeholder='passwrod2' />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
