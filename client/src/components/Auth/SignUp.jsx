import React, { Component } from "react";
class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
    };

    this.handelChange = this.handelChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  handelChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  handelSubmit(e) {
    e.preventDefault();
    console.log("submited");
  }
  render() {
    const { username, email, password, password2 } = this.state;
    return (
      <div className='content'>
        <h2>Register</h2>
        <form action='' className='form' onSubmit={this.handelSubmit}>
          <input
            type='text'
            placeholder='name'
            onChange={this.handelChange}
            value={username}
            name='username'
          />
          <input
            type='email'
            placeholder='Email'
            onChange={this.handelChange}
            value={email}
            name='email'
          />
          <input
            type='password'
            placeholder='password'
            onChange={this.handelChange}
            value={password}
            name='password'
          />
          <input
            type='password'
            placeholder='repeat password'
            onChange={this.handelChange}
            value={password2}
            name='password2'
          />
          <button type='submit'> Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
