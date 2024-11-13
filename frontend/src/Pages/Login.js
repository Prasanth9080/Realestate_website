// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  // State to manage form input
  const [formData, setFormData] = useState({
    username_or_email: '',
    password: ''
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({
    username_or_email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Clear error when the user starts typing
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation checks
    let newErrors = {};
    if (!formData.username_or_email) {
      newErrors.username_or_email = 'Username or Email is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    // If there are validation errors, set them and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login/', formData);
      console.log(response.data);
      // Store the token in local storage
      localStorage.setItem('token', response.data.token);
      alert('Logged in successfully!');
      // Redirect after 1 second
      setTimeout(() => {
        navigate('/'); // Redirect to the Product page
      }, 1000); // 1000 milliseconds = 1 second
    } catch (error) {
      console.error(error);
      alert('Failed to login!');
    }
  };

  return (
    <div>
      <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-5">
                <h2 className="display-5 fw-bold text-center">Log - in</h2>
                <p className="text-center m-0">
                  Don't have an account?{' '}
                  <a href="/signup" className="link-primary text-decoration-none">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="row gy-5 justify-content-center">
                <div className="col-12 col-lg-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className={`form-control border-0 border-bottom rounded-0 ${errors.username_or_email ? 'is-invalid' : ''}`}
                            name="username_or_email"
                            id="username_or_email"
                            placeholder="Username or Email"
                            value={formData.username_or_email}
                            onChange={handleChange}
                            
                          />
                          <label htmlFor="username_or_email" className="form-label">
                            Username or Email <span className="text-danger">*</span>
                          </label>
                          {errors.username_or_email && (
                            <div className="invalid-feedback">{errors.username_or_email}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className={`form-control border-0 border-bottom rounded-0 ${errors.password ? 'is-invalid' : ''}`}
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            
                          />
                          <label htmlFor="password" className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            name="iAgree"
                            id="iAgree"
                          />
                          <label className="form-check-label text-secondary" htmlFor="iAgree">
                            I agree to the{' '}
                            <a href="#!" className="link-primary text-decoration-none">
                              terms and conditions
                            </a>
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="row justify-content-center mt-4">
                <div className="col-12 col-lg-5 d-flex justify-content-center gap-3 flex-column">
                  <a href="/forgotpassword" className="btn btn-outline-dark rounded-0 d-block">
                    Forgot Password?
                  </a>
                  <a href="/signup" className="btn btn-outline-dark rounded-0 d-block">
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Login;

