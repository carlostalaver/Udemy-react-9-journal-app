import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import  { useDispatch, useSelector} from 'react-redux'
import { startGoogleLogin, startLoginEmailPaswords }  from '../../actions/auth'

export const LoginScreen = () => {

    /* Este hook me permite hacer dispatch de acciones */
    const dispatchLogin = useDispatch();

    const  {loading}  = useSelector(state => state.ui);

    const [ formValues, handleInputChange ] =  useForm({
        email: 'carlito@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        //dispatchLogin( login(12345, 'CarlosT') );// al llamar a login() me retorna un obj que entrega a dispachtLogin
        dispatchLogin( startLoginEmailPaswords(email, password) ); // llamada a un action de tipo ASINCRONO
    }

    //para utenticarme con google login
    const handleGoogleLogin = () => {
        dispatchLogin( startGoogleLogin() );
    }

    return (
        <>
            <h3  className="auth__login">Login</h3>
            <form onSubmit= { handleLogin }>
                <input type="text"
                    placeholder="email"
                    name="email"
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

                <button type="submit"
                        className="btn btn-primary btn-block"
                        disabled={ loading }>
                    Login { loading }
                </button>
                <hr />
                <div className="auth__social-networks">
                    <p>Login whit social networks</p>
                    <div
                        className="google-btn"
                        onClick={ handleGoogleLogin }
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
