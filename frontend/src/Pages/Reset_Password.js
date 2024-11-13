// import React from 'react'

// const Reset_Password = () => {
//   return (
//     <div>Reset_Password page</div>
//   )
// }

// export default Reset_Password




// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { axiosInstance } from '../Api/Axios';  // Your Axios instance


// const Reset_Password = () => {
//   const { uidb64, token } = useParams(); // Get parameters from the URL
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [success, setSuccess] = useState(false); // Track whether the reset was successful
//   const [errors, setErrors] = useState({}); // Track validation errors
//   const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form was submitted

//   // Handle form submission for resetting the password
//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     // Mark the form as submitted
//     setIsSubmitted(true);

//     // Clear previous errors
//     const newErrors = {};

//     // Check if passwords match
//     if (!newPassword) {
//       newErrors.newPassword = 'New Password is required.';
//     }

//     if (!confirmPassword) {
//       newErrors.confirmPassword = 'Confirm Password is required.';
//     } else if (newPassword !== confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match.';
//     }

//     // If there are errors, stop form submission
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       // API request to reset the password
//       const response = await axiosInstance.post(`/resetpasswordconfirm/${uidb64}/${token}/`, {
//         new_password: newPassword,
//         confirm_password: confirmPassword,
//       });

//       // Show success message and set the success flag to true
//       setMessage('Password reset successfully! You can now log in.');
//       setSuccess(true);

//       // Optionally, clear the form fields after success
//       setNewPassword('');
//       setConfirmPassword('');
//       setIsSubmitted(false);
//       setErrors({});
      
//     } catch (error) {
//       // Show error message from the server or a general error message
//       if (error.response && error.response.data.message) {
//         setMessage(error.response.data.message);
//       } else {
//         setMessage('An error occurred. Please try again.');
//       }
//       setSuccess(false);
//     }
//   };

//   // Handle input change and clear validation errors as user types
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'newPassword') setNewPassword(value);
//     if (name === 'confirmPassword') setConfirmPassword(value);

//     // Clear the errors for the current input as the user starts typing
//     if (isSubmitted) {
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
//     }
//   };

//   return (
//     <div>
//       <section className="py-3 py-md-5 py-xl-8">
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="mb-5">
//                 <h2 className="display-5 fw-bold text-center">Reset Password</h2>
//               </div>
//             </div>
//           </div>
//           <div className="row justify-content-center">
//             <div className="col-12 col-lg-10 col-xl-8">
//               <div className="row gy-5 justify-content-center">
//                 <div className="col-12 col-lg-5">
//                   {/* Form to handle password reset */}
//                   <form onSubmit={handleResetPassword}>
//                     <div className="row gy-3 overflow-hidden">
                      
//                       {/* New Password Field */}
//                       <div className="col-12">
//                         <div className="form-floating mb-3">
//                           <input
//                             type="password"
//                             className="form-control border-0 border-bottom rounded-0"
//                             name="newPassword"
//                             id="newpassword"
//                             placeholder="Enter your New Password"
//                             value={newPassword}
//                             onChange={handleInputChange}
                            
//                           />
//                           <label htmlFor="newpassword" className="form-label">
//                             New Password <span className="text-danger">*</span>
//                           </label>
//                           {errors.newPassword && (
//                             <div className="text-danger">{errors.newPassword}</div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Confirm Password Field */}
//                       <div className="col-12">
//                         <div className="form-floating mb-3">
//                           <input
//                             type="password"
//                             className="form-control border-0 border-bottom rounded-0"
//                             name="confirmPassword"
//                             id="confirmnewpassword"
//                             placeholder="Confirm your New Password"
//                             value={confirmPassword}
//                             onChange={handleInputChange}
                            
//                           />
//                           <label htmlFor="confirmnewpassword" className="form-label">
//                             Confirm New Password <span className="text-danger">*</span>
//                           </label>
//                           {errors.confirmPassword && (
//                             <div className="text-danger">{errors.confirmPassword}</div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="col-12">
//                         <div className="d-grid">
//                           <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">
//                             Update Password
//                           </button>
//                         </div>
//                       </div>

//                       {/* Display success or error message */}
//                       {message && (
//                         <div className="col-12 mt-3">
//                           <p className={`text-center ${success ? 'text-success' : 'text-danger'}`}>
//                             {message}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </form>
//                 </div>
//               </div>

//               {/* Optional additional navigation or links */}
//             </div>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Reset_Password;





import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../Api/Axios';  // Your Axios instance


const Reset_Password = () => {
  const { uidb64, token } = useParams(); // Get parameters from the URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // Track whether the reset was successful
  const [errors, setErrors] = useState({}); // Track validation errors
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form was submitted

  // Handle form submission for resetting the password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Mark the form as submitted
    setIsSubmitted(true);

    // Clear previous errors
    const newErrors = {};

    // Check if passwords match
    if (!newPassword) {
      newErrors.newPassword = 'New Password is required.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // If there are errors, stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // API request to reset the password
      const response = await axiosInstance.post(`/resetpasswordconfirm/${uidb64}/${token}/`, {
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      // Show success message and set the success flag to true
      setMessage('Password reset successfully! You can now log in.');
      setSuccess(true);

      // Optionally, clear the form fields after success
      setNewPassword('');
      setConfirmPassword('');
      setIsSubmitted(false);
      setErrors({});
      
    } catch (error) {
      // Show error message from the server or a general error message
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
      setSuccess(false);
    }
  };

  // Handle input change and clear validation errors as user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);

    // Clear the errors for the current input as the user starts typing
    if (isSubmitted) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
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
                  {/* Form to handle password reset */}
                  <form onSubmit={handleResetPassword}>
                    <div className="row gy-3 overflow-hidden">
                      
                      {/* New Password Field */}
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control border-0 border-bottom rounded-0"
                            name="newPassword"
                            id="newpassword"
                            placeholder="Enter your New Password"
                            value={newPassword}
                            onChange={handleInputChange}
                            
                          />
                          <label htmlFor="newpassword" className="form-label">
                            New Password <span className="text-danger">*</span>
                          </label>
                          {errors.newPassword && (
                            <div className="text-danger">{errors.newPassword}</div>
                          )}
                        </div>
                      </div>

                      {/* Confirm Password Field */}
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control border-0 border-bottom rounded-0"
                            name="confirmPassword"
                            id="confirmnewpassword"
                            placeholder="Confirm your New Password"
                            value={confirmPassword}
                            onChange={handleInputChange}
                            
                          />
                          <label htmlFor="confirmnewpassword" className="form-label">
                            Confirm New Password <span className="text-danger">*</span>
                          </label>
                          {errors.confirmPassword && (
                            <div className="text-danger">{errors.confirmPassword}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">
                            Update Password
                          </button>
                        </div>
                      </div>

                      {/* Display success or error message */}
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

              {/* Optional additional navigation or links */}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Reset_Password;
