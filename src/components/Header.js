import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    name: '',
    loading: true,
  };

  async componentDidMount() {
    await getUser().then((data) => {
      this.setState({ name: data.name, loading: false });
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading />
          : <p data-testid="header-user-name">{ name }</p> }
        <Link data-testid="link-to-search" to="/search" />
        <Link data-testid="link-to-favorites" to="/favorites" />
        <Link data-testid="link-to-profile" to="/profile" />
      </header>
    );
  }
}
