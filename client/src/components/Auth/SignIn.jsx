import React, { Component } from "react";
class signIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handelChange = this.handelChange.bind(this);
  }
  handelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        {" "}
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log("submit");
          }}
        >
          <h2>Sign in</h2>
          <input
            type='text'
            name='username'
            placeholder='username'
            onChange={this.handelChange}
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            onChange={this.handelChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default signIn;
