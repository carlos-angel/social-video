import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../actions';
import Header from '../components/Header';

import '../assets/styles/components/Register.scss';

function Register(props) {
  const [form, setForm] = useState({ email: '', name: '', password: '' });

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.registerUser(form, '/login');
  };
  return (
    <>
      <Header isRegister />
      <section className='register'>
        <section className='register__container'>
          <h2>Regístrate</h2>
          <form className='register__container--form' onSubmit={handleSubmit}>
            <input
              name='name'
              className='input'
              type='text'
              placeholder='Nombre'
              onChange={handleInput}
            />
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              onChange={handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button type='submit' className='button'>
              Registrarme
            </button>
          </form>
          <Link to='/login'>Iniciar sesión</Link>
        </section>
      </section>
    </>
  );
}

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(Register);