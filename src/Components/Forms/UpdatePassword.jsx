import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getApiManagmentAcessToken, updatePassword } from '../Utils/ApiFetch'; // Replace with your API fetch function
import { FaLock } from 'react-icons/fa'; // Importing lock icon from react-icons/fa

const UpdatePassword = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccessMessage(null);
      return;
    }

    try {
      const accessToken = await getAccessTokenSilently();
      const apiToken = await getApiManagmentAcessToken(accessToken);
      
      await updatePassword(user.sub, newPassword, apiToken); // Assuming 'sub' is the user's unique identifier in Auth0

      setSuccessMessage('Password changed successfully');
      setError(null);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error.message);
      setError('Failed to update password');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2><FaLock className="me-2" />Update Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
    </div>
  );
};

export default UpdatePassword;
