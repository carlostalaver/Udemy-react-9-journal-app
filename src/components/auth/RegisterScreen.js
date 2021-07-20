import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWhitEMailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatchRegister = useDispatch();

    // para acceder a la informacion que tiene reducer ui
    const { msgError } = useSelector(state => state.ui); // retorno el state ui, si solo dejo la palabra state despues de la => me retornara todo los reducer que que registrado en el store

    const [formValues, handleInputChange] = useForm({
        name: 'Carlitos',
        email: 'carlito@gmail.com',
        password: '123456',
        password2: '123456'
    });


    const { name, email, password, password2 } = formValues;




    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatchRegister( startRegisterWhitEMailPasswordName(email, password, name) );
        }
    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatchRegister(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatchRegister(setError('Email is not validad'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatchRegister(setError('Password should be at least  6 characters and match each other'));
            return false;
        }
        dispatchRegister(removeError());
        return true;
    }


    return (
        <>
            <h3 className="auth__login">Register</h3>
            <form onSubmit={handleRegister}>

                {
                    msgError && (
                        <div className="auth__alert-error">
                           { msgError }
                        </div>
                    )
                }

                <input type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
                <input type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />
                <input type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <input type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button type="submit" className="btn btn-primary btn-block mb-5">
                    Register
                </button>
                <hr />

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>
            </form>
        </>
    )
}
