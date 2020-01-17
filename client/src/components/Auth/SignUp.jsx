import React, { Component } from "react";
import { SIGNUP_USER } from "../../queries/index";
import { Mutation } from "react-apollo";

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
    this.validateForm = this.validateForm.bind(this);
  }
  handelChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  validateForm(e) {
    const { username, email, password, password2 } = this.state;
    return (
      !password || !password2 || !username || !email || password2 !== password2
    );
  }
  render() {
    const { username, email, password, password2 } = this.state;
    return (
      <div className='content'>
        <h2>Register</h2>
        <Mutation mutation={SIGNUP_USER}>
          {(signupUser, { data, loading, error }) => (
            <form
              className='form'
              onSubmit={async e => {
                try {
                  e.preventDefault();
                  const { data } = await signupUser({
                    variables: { email, username, password }
                  });
                  localStorage.setItem("token", data.signupUser.token);
                  this.setState({ username: "", password: "", email: "" });
                } catch (err) {
                  console.log(err);
                }
              }}
            >
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
              <button type='submit' disabled={loading || this.validateForm()}>
                {" "}
                Submit
              </button>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default SignUp;
