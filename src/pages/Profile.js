import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    loading: true,
    user: {},
  };

  componentDidMount() {
    getUser().then((data) => {
      this.setState({ user: data });
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <img data-testid="profile-image" src={ user.image } alt="Profile" />
            <h3>Nome</h3>
            <p>
              { ` ${user.name}`}
            </p>
            <h3>E-mail</h3>
            <p>
              { user.email }
            </p>
            <h3>Descrição</h3>
            <p>
              { user.description }
            </p>
            <Link to="/profile/edit">
              Editar perfil
            </Link>
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;
