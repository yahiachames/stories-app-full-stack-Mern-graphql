import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries/index";
import { withRouter } from "react-router-dom";
import Error from "../Error";
class signIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handelChange = this.handelChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  handelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateForm() {
    const { username, password } = this.state;
    return !username || !password;
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <Mutation mutation={SIGNIN_USER}>
          {(signinUser, { data, loading, error }) => (
            <form
              onSubmit={async e => {
                e.preventDefault();
                try {
                  const { data } = await signinUser({
                    variables: {
                      username,
                      password
                    }
                  });
                  localStorage.setItem("token", data.signinUser.token);
                  await this.props.refetch();
                  this.setState({ username: "", password: "" });
                  this.props.history.push("/");
                } catch (error) {
                  console.log(error);
                }
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
              <button type='submit' disabled={loading || this.validateForm()}>
                Submit
              </button>
              {error ? <Error message={error.message.split(":")[1]} /> : ""}
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(signIn);
