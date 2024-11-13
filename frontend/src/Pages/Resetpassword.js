// import React from 'react'

// const Resetpassword = () => {
//   return (
//     <div>Resetpassword page</div>
//   )
// }

// export default Resetpassword





import React, { useState } from 'react';
import { axiosInstance } from '../Api/Axios'; // Import your axios instance for API calls


const Resetpassword = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // State to track success
  const [errors, setErrors] = useState({}); // Track form validation errors
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form has been submitted

  // Handle input change for all form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear specific field error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));

    if (name === 'username') setUsername(value);
    if (name === 'oldPassword') setOldPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // Handle form submission and make API call
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Check for field validation
    const validationErrors = {};
    if (!username) validationErrors.username = 'Username is required.';
    if (!oldPassword) validationErrors.oldPassword = 'Old password is required.';
    if (!newPassword) validationErrors.newPassword = 'New password is required.';
    if (!confirmPassword) validationErrors.confirmPassword = 'Confirm password is required.';
    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = 'New password and confirm password do not match.';
    }

    // If there are validation errors, set them and prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    try {
      // Make the API request using axiosInstance
      const response = await axiosInstance.post('/resetpassword/', {
        username,
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      // Handle the response and set message accordingly
      if (response.data.message) {
        setMessage('Password updated successfully!');
        setSuccess(true);  // Set success to true to style the message as a success
      }

      // Optionally clear the form after success
      setUsername('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsSubmitted(false); // Reset form submission state

    } catch (error) {
      // Set an error message based on the API response or fallback
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
      setSuccess(false);  // Set success to false to style the message as an error
    }
  };

  return (
    <div>
      <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-5">
                <h2 className="display-5 fw-bold text-center">Reset Password</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="row gy-5 justify-content-center">
                <div className="col-12 col-lg-5">
                  {/* Form to handle reset password */}
                  <form onSubmit={handleResetPassword}>
                    <div className="row gy-3 overflow-hidden">
                      {/* Username Input */}
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control border-0 border-bottom rounded-0"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="username" className="form-label">
                            Username <span className="text-danger">*</span>
                          </label>
                          {/* Show validation error */}
                          {isSubmitted && errors.username && (
                            <div className="text-danger">{errors.username}</div>
                          )}
                        </div>
                      </div>

                      {/* Old Password Input */}
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control border-0 border-bottom rounded-0"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter your old password"
                            value={oldPassword}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="oldPassword" className="form-label">
                            Old Password <span className="text-danger">*</span>
                          </label>
                          {/* Show validation error */}
                          {isSubmitted && errors.oldPassword && (
                            <div className="text-danger">{errors.oldPassword}</div>
                          )}
                        </div>
                      </div>

                      {/* New Password Input */}
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control border-0 border-bottom rounded-0"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="newPassword" className="form-label">
                            New Password <span className="text-danger">*</span>
                          </label>
                          {/* Show validation error */}
                          {isSubmitted && errors.newPassword && (
                            <div className="text-danger">{errors.newPassword}</div>
                          )}
                        </div>
                      </div>

                      {/* Confirm New Password Input */}
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control border-0 border-bottom rounded-0"
                            name="confirmPassword"
                            id="confirmnewpassword"
                            placeholder="Confirm your new password"
                            value={confirmPassword}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="confirmnewpassword" className="form-label">
                            Confirm New Password <span className="text-danger">*</span>
                          </label>
                          {/* Show validation error */}
                          {isSubmitted && errors.confirmPassword && (
                            <div className="text-danger">{errors.confirmPassword}</div>
                          )}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">
                            Update Password
                          </button>
                        </div>
                      </div>

                      {/* Display the success or error message */}
                      {message && (
                        <div className="col-12 mt-3">
                          <p className={`text-center ${success ? 'text-success' : 'text-danger'}`}>
                            {message}
                          </p>
                        </div>
                      )}

                      {/* Link to login page */}
                      <div className="col-12">
                        <div className="mb-5">
                          <p className="text-center m-0">
                            Click to {' '}
                            <a href="/login" className="link-primary text-decoration-none">Login</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Optional additional navigation, links, or components */}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Resetpassword;
