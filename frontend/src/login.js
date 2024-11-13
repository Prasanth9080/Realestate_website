import React from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    return (
    <div className='login-container d-flex justify-content-center align-items-center'>
        <div className='login-form card p-4'>
            <h2 className='card-title text-center'>Login</h2>
            <form>
                <div className='form-group'>
                    <label>Username</label>
                    <input type="text" className='form-control' placeholder='Enter username' />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type="password" className='form-control' placeholder='Enter password' />
                </div>
                <button type='submit' className='btn btn-primary btn-block'>Login</button>
            </form>
        </div>
    </div>
    )
}

export default Login;

