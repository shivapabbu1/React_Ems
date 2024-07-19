import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { assignRoleToUser, getApiManagmentAcessToken, getAuth0Roles, getAuth0UserByEmail } from '../Utils/ApiFetch';

const AssignRoleModel = ({ showRoleModal, handleCloseRoleModal, email }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRolesAndCurrentUser = async () => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const apiToken = await getApiManagmentAcessToken(accessToken);
        const fetchedCurrentUser = await getAuth0UserByEmail(email, apiToken);
        setCurrentUser(fetchedCurrentUser);
        const auth0Roles = await getAuth0Roles(apiToken);
        setRoles(auth0Roles);
      } catch (error) {
        console.error('Error fetching roles or current user:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (showRoleModal) {
      fetchRolesAndCurrentUser();
    }
  }, [getAccessTokenSilently, showRoleModal, email]);

  const handleChangeRoles = async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      const userId = currentUser?.user_id;
      if (!userId) {
        throw new Error('User ID not available');
      }

      await Promise.all(selectedRoles.map(async roleId => {
        const user = [`${userId}`];
        await assignRoleToUser(roleId, user, accessToken); 
      }));

      console.log('Roles assigned successfully');
      alert(`Roles assigned successfully to ${currentUser.email}`);
    } catch (error) {
      alert(`Error assigning roles: ${error.message}`);
    } finally {
      setLoading(false);
      handleCloseRoleModal();
    }
  };

  const handleRoleChange = (e) => {
    const { options } = e.target;
    const selectedRoles = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedRoles(selectedRoles);
  };

  return (
    <Modal show={showRoleModal} onHide={handleCloseRoleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Roles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
          <span>Please wait until we reach you...</span>
          <Spinner animation="border" role="status" className="mt-3">
            <span className="sr-only"></span>
          </Spinner>
        </div>
        ) : (
          <Form>
            <Form.Group controlId="roles">
              <Form.Label>Select Roles</Form.Label>
              <Form.Control as="select" multiple onChange={handleRoleChange}>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseRoleModal} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleChangeRoles} disabled={loading}>
          {loading ? 'Assigning...' : 'Assign Roles'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignRoleModel;
