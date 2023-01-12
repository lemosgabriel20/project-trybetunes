import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };
    this.onSave.bind(this.onSave);
  }

  async onSave(evt) {
    this.setState({ loading: true });
    const { name } = this.state;
    evt.preventDefault();
    await createUser({ name }).then(() => {
      this.setState({ loading: false, redirect: true });
    });
  }

  render() {
    const { name, loading, redirect } = this.state;
    const minLength = 3;
    return (
      <div data-testid="page-login">
        {
          loading
            ? <Loading /> : (
              <form>
                <input
                  type="text"
                  data-testid="login-name-input"
                  placeholder="Nome"
                  onChange={ (evt) => this.setState({ name: evt.target.value }) }
                />
                <button
                  disabled={ name.length < minLength }
                  type="submit"
                  data-testid="login-submit-button"
                  onClick={ (evt) => this.onSave(evt) }
                >
                  Entrar
                </button>
              </form>)
        }
        { redirect ? <Redirect to="/search" /> : null }
      </div>
    );
  }
}

export default Login;
