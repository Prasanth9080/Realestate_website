// import React from 'react'

// const Forgotpassword = () => {
//   return (
//     <div>Forgotpassword</div>
//   )
// }

// export default Forgotpassword





import React, { useState } from 'react';
import { axiosInstance } from '../Api/Axios'; // Use your axios instance


const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // Track whether request is successful
  const [errors, setErrors] = useState({}); // State for validation errors
  const [isSubmitted, setIsSubmitted] = useState(false); // To track if form was submitted

  // Function to handle form submission for forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Mark form as submitted
    setIsSubmitted(true);

    // Clear previous errors
    setErrors({});

    // Validate the email field
    if (!email) {
      setErrors({ email: 'Email is required.' });
      return; // Stop form submission if validation fails
    }

    try {
      // API request to forgot password endpoint
      const response = await axiosInstance.post('/forgotpassword/', { email });
      
      // Show success message and clear input field
      setMessage(response.data.message || 'Password reset link sent successfully!');
      setSuccess(true); // Set success to true to change message style

      // Optionally, reset email input field after submission
      setEmail('');
      setIsSubmitted(false); // Reset submission state
    } catch (error) {
      // Show error message from server
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
      setSuccess(false); // Set success to false for error message style
    }
  };

  // Hide the error message as soon as the user starts typing in the email input
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (isSubmitted) {
      setErrors({}); // Clear errors when user starts typing after form submission
    }
  };

  return (
    <div>
      <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-5">
                <h2 className="display-5 fw-bold text-center">Forgot Password</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="row gy-5 justify-content-center">
                <div className="col-12 col-lg-5">
                  {/* Form to handle forgot password */}
                  <form onSubmit={handleForgotPassword}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control border-0 border-bottom rounded-0"
                            name="email"
                            id="emailid"
                            placeholder="Enter your Email-Id"
                            value={email}
                            onChange={handleInputChange} // Handle change
                            
                          />
                          <label htmlFor="emailid" className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          {/* Show validation error only if the form is submitted without the field being filled */}
                          {isSubmitted && !email && (
                            <div className="text-danger">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">
                            Reset Password
                          </button>
                        </div>
                      </div>
                      {/* Display message for success or error */}
                      {message && (
                        <div className="col-12 mt-3">
                          <p className={`text-center ${success ? 'text-success' : 'text-danger'}`}>
                            {message}
                          </p>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Additional navigation links */}
              <div className="row justify-content-center mt-4">
                <div className="col-12 col-lg-5 d-flex justify-content-center gap-3 flex-column">
                  <a href="/login" className="btn btn-outline-dark rounded-0 d-block">
                    Back to Login
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
};

export default Forgotpassword;
