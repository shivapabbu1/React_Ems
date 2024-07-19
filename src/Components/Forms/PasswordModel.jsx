import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { getApiManagmentAcessToken, getAuth0UserByEmail, updatePassword } from '../Utils/ApiFetch';

const PasswordModel = ({ showModal, handleCloseModal, email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState(null);

  const handleChangePassword = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      const accessToken = await getAccessTokenSilently();
      const apiToken = await getApiManagmentAcessToken(accessToken);
      const auth0User = await getAuth0UserByEmail(email, apiToken);
   
        if (auth0User?.identities?.length > 0) {
          const userId = auth0User.identities[0].user_id;
          const auth0UserId = `auth0|${userId}`;
      
          await updatePassword(auth0UserId, password, accessToken);
      
          console.log("SaveEmployee AccessToken:", accessToken);
          alert(`Password changed successfully to ${password}`);
          handleCloseModal();
        }
      } catch (error) {
        alert(`Error changing password: ${error.message}`);
      }
      
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null); // Clear error message when typing in password field
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(null); // Clear error message when typing in confirm password field
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div>
          <button className="btn btn-primary mb-3 w-100" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordModel;
