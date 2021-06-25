import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const [ formValues, handleInputChange ] =  useForm({
        email: 'nando@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    return (
        <>
            <h3  className="auth__login">Login</h3>
            <form>
                <input type="text"
                    placeholder="email"
                    name="Email"
                    className="auth__input"
                    autoComplete="off"
                    value= { email }
                    onChange= { handleInputChange }/>

                <input type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value= { password } 
                    onChange= { handleInputChange }/>

                <button type="submit" className="btn btn-primary btn-block">
                    Ingresar
                </button>
                <hr />
                <div className="auth__social-networks">
                    <p>Login whit social networks</p>
                    <div
                        className="google-btn"
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link  to="/auth/register" className="link">
                    Create new account
                </Link>
            </form>
        </>
    )
}
