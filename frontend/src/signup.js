import React from 'react';
import './signup.css'

function Signup() {
    return (
    <div className='signup-container d-flex justify-content-center align-items-center'>
        <div className='signup-form card p-4'>
            <h2 className='card-title text-center'>Sign up</h2>

            <form>
                <div className='form-group'>
                    <label>Username</label>
                    <input type='text' className='form-control' placeholder='Enter username' />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' placeholder='Enter email' />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' className='form-control' placeholder='Enter password' />
                </div>
                <button type='submit' className='btn btn-success btn-block'>Submit</button>
            </form>
        </div>
    </div>  
    )
}

export default Signup;

