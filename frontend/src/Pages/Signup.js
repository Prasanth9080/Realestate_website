// import React from 'react'

// const Signup = () => {
//   return (
//     <div>Signup page</div>
//   )
// }

// export default Signup




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Signup() {
  // State to manage form input
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate(); // Initialize navigate

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear the error when user types
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if any
      return; // Stop form submission
    }

    try {
      const response = await axios.post('http://localhost:8000/signup/', formData);
      console.log(response.data);
      alert('User registered successfully!');
      // Redirect to the login page after successful signup
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error(error);
      alert('Failed to register!');
    }
  };

  return (
    <div>
      <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-5">
                <h2 className="display-5 fw-bold text-center">Sign up</h2>
                <p className="text-center m-0">
                  Already have an account?{' '}
                  <a href="/login" className="link-primary text-decoration-none">
                    Sign in
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
                            className="form-control border-0 border-bottom rounded-0"
                            name="username"
                            id="username"
                            placeholder="User Name"
                            value={formData.username}
                            onChange={handleChange}
                            
                          />
                          <label htmlFor="username" className="form-label">
                            User Name <span className="text-danger">*</span>
                          </label>
                          {errors.username && <div className="text-danger">{errors.username}</div>}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control border-0 border-bottom rounded-0"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            
                          />
                          <label htmlFor="email" className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control border-0 border-bottom rounded-0"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <label htmlFor="password" className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          {errors.password && <div className="text-danger">{errors.password}</div>}
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
                            // required
                          />
                          <label
                            className="form-check-label text-secondary"
                            htmlFor="iAgree"
                          >
                            I agree to the{' '}
                            <a
                              href="#!"
                              className="link-primary text-decoration-none"
                            >
                              terms and conditions
                            </a>
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn btn-lg btn-dark rounded-0 fs-6"
                            type="submit"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center gap-3 flex-lg-column">
                  <div
                    className="bg-dark h-100 d-none d-lg-block"
                    style={{ width: '1px', opacity: '.1' }}
                  ></div>
                  <div
                    className="bg-dark w-100 d-lg-none"
                    style={{ height: '1px', opacity: '.1;' }}
                  ></div>
                  <div>or</div>
                  <div
                    className="bg-dark h-100 d-none d-lg-block"
                    style={{ width: '1px', opacity: '.1' }}
                  ></div>
                  <div
                    className="bg-dark w-100 d-lg-none"
                    style={{ height: '1px', opacity: '.1;' }}
                  ></div>
                </div>
                <div className="col-12 col-lg-5 d-flex align-items-center">
                  <div className="d-flex gap-3 flex-column w-100">
                    <a
                      href="#!"
                      className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-google text-danger"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                      </svg>
                      <span className="ms-2 fs-6 flex-grow-1">
                        Continue with Google
                      </span>
                    </a>
                    <a
                      href="#!"
                      className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-apple text-dark"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.837 2.337 1.814.926-.023 1.276-.593 2.365-.593 1.09 0 1.394.593 2.364.57.926-.022 1.507-.888 2.08-1.871.328-.562.461-.854.72-1.494ZM9.12 3.193c.445-.537.787-1.292.698-2.043-.676.025-1.49.416-1.975.96-.435.484-.83 1.274-.728 2.018.762.06 1.56-.38 2.005-.935Z" />
                      </svg>
                      <span className="ms-2 fs-6 flex-grow-1">
                        Continue with Apple
                      </span>
                    </a>
                    <a
                      href="#!"
                      className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-facebook text-primary"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.94 16V8.667h2.808l.42-2.982H8.94V3.743c0-.864.24-1.453 1.478-1.453h1.58V.179C11.18.12 10.393 0 9.43 0 7.387 0 6.034 1.216 6.034 3.452v2.233H3.64v2.982h2.394V16h2.907Z" />
                      </svg>
                      <span className="ms-2 fs-6 flex-grow-1">
                        Continue with Facebook
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Signup;
