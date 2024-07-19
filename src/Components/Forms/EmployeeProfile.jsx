import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchEmployeeById } from '../Utils/ApiFetch';
import { useAuth0 } from '@auth0/auth0-react';
import PasswordModel from './PasswordModel';
import AssignRoleModel from './AssignRoleModel';
import { FaKey, FaUserShield, FaUser, FaBackward } from 'react-icons/fa';
import '../../App.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const EmployeeProfile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = await getAccessTokenSilently();
        const data = await fetchEmployeeById(id, accessToken);
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, getAccessTokenSilently]);

  const handleGoBack = () => {
    navigate('/admin/allemp');
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowRoleModal = () => setShowRoleModal(true);
  const handleCloseRoleModal = () => setShowRoleModal(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4" style={styles.container}>
      <div className="d-flex justify-content-between align-items-center mb-4" style={styles.header}>
        <h5 style={styles.title}>
          <FaUser style={styles.icon} />Employee Profile
        </h5>
        <div className="d-flex align-items-center">
          <DropdownButton title="Actions" variant="primary" className="me-2" style={styles.dropdown}>
            <Dropdown.Item onClick={handleShowModal}>
              <FaKey className="me-1" /> Change Password
            </Dropdown.Item>
            <Dropdown.Item onClick={handleShowRoleModal}>
              <FaUserShield className="me-1" /> Assign Roles
            </Dropdown.Item>
          </DropdownButton>
          <button className="btn btn-secondary me-4" onClick={handleGoBack} style={styles.backButton}>
            <FaBackward /> Back to Employees
          </button>
        </div>
      </div>
      <div className="card shadow mb-4" style={styles.card}>
        <div className="card-body" style={styles.cardBody}>
          <div className="row">
            <div className="col-md-6">
              <h5 className="card-title" style={styles.sectionTitle}>Personal Information</h5>
              {renderEmployeeInfo(employee, 'Personal')}
            </div>
            <div className="col-md-6">
              <h5 className="card-title" style={styles.sectionTitle}>Address Information</h5>
              {renderEmployeeInfo(employee, 'Address')}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <h5 className="card-title" style={styles.sectionTitle}>Education Information</h5>
              {renderEmployeeInfo(employee, 'Education')}
            </div>
            <div className="col-md-6">
              <h5 className="card-title" style={styles.sectionTitle}>Work Experience</h5>
              {renderEmployeeInfo(employee, 'Work')}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <h5 className="card-title" style={styles.sectionTitle}>Emergency Contacts</h5>
              {renderEmployeeInfo(employee, 'Emergency1')}
            </div>
            <div className="col-md-6">
              <h5 className="card-title" style={styles.sectionTitle}>Emergency Contacts (Continued)</h5>
              {renderEmployeeInfo(employee, 'Emergency2')}
            </div>
          </div>
        </div>
      </div>
      {employee && (
        <>
          <PasswordModel
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            email={employee.email.toLowerCase()}
          />
          <AssignRoleModel
            showRoleModal={showRoleModal}
            handleCloseRoleModal={handleCloseRoleModal}
            email={employee.email.toLowerCase()}
          />
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '5px',
  },
  title: {
    color: '#007bff',
    marginBottom: 0,
  },
  icon: {
    marginRight: '8px',
  },
  dropdown: {
    marginRight: '10px',
  },
  backButton: {
    marginLeft: '10px',
  },
  card: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  cardBody: {
    padding: '20px',
  },
  sectionTitle: {
    color: '#120776',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  employeeInfo: {
    marginBottom: '10px',
  },
};

const renderEmployeeInfo = (employee, section) => {
  switch (section) {
    case 'Personal':
      return (
        <>
          <p style={styles.employeeInfo}><strong>Name:</strong> {employee.firstName} {employee.middleName} {employee.lastName}</p>
          <p style={styles.employeeInfo}><strong>Email:</strong> {employee.email}</p>
          <p style={styles.employeeInfo}><strong>Mobile:</strong> {employee.mobile}</p>
          <p style={styles.employeeInfo}><strong>Date of Birth:</strong> {employee.dob}</p>
          <p style={styles.employeeInfo}><strong>Blood Group:</strong> {employee.bloodGroup}</p>
          <p style={styles.employeeInfo}><strong>Gender:</strong> {employee.gender}</p>
          <p style={styles.employeeInfo}><strong>Marital Status:</strong> {employee.maritalstatus}</p>
          <p style={styles.employeeInfo}><strong>Spouse Name:</strong> {employee.spouseName}</p>
        </>
      );
    case 'Address':
      return (
        <>
          <p style={styles.employeeInfo}><strong>Communication Address:</strong> {employee.communicationAddress}</p>
          <p style={styles.employeeInfo}><strong>Permanent Address:</strong> {employee.permanentAddress}</p>
        </>
      );
    case 'Education':
      return (
        <>
          <p style={styles.employeeInfo}><strong>Highest Qualification:</strong> {employee.highestQualification}</p>
          <p style={styles.employeeInfo}><strong>University:</strong> {employee.university}</p>
          <p style={styles.employeeInfo}><strong>College Name:</strong> {employee.collegeName}</p>
          <p style={styles.employeeInfo}><strong>Year of Passing:</strong> {employee.yearOfPassing}</p>
          <p style={styles.employeeInfo}><strong>CGPA:</strong> {employee.cgpa}</p>
          <p style={styles.employeeInfo}><strong>Qualifying Branch:</strong> {employee.qualifyingBranch}</p>
        </>
      );
    case 'Work':
      return (
        <>
          <p style={styles.employeeInfo}><strong>Last Worked Company:</strong> {employee.lastWorkedCompany}</p>
          <p style={styles.employeeInfo}><strong>Job Role:</strong> {employee.jobRole}</p>
          <p style={styles.employeeInfo}><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
          <p style={styles.employeeInfo}><strong>Experience in Years:</strong> {employee.experienceInYears}</p>
        </>
      );
    case 'Emergency1':
      return (
        <>
          <p style={styles.employeeInfo}><strong>Name of Emergency Contact 1:</strong> {employee.nameOfEmergencyContact_1}</p>
          <p style={styles.employeeInfo}><strong>Phone 1:</strong> {employee.phone_1}</p>
          <p style={styles.employeeInfo}><strong>Email 1:</strong> {employee.email_id_1}</p>
          <p style={styles.employeeInfo}><strong>Relation 1:</strong> {employee.relation_1}</p>
        </>
      );
    case 'Emergency2':
      return (
        <>
          <p style={styles.employeeInfo}><strong>Name of Emergency Contact 2:</strong> {employee.nameOfEmergencyContact_2}</p>
          <p style={styles.employeeInfo}><strong>Phone 2:</strong> {employee.phone_2}</p>
          <p style={styles.employeeInfo}><strong>Email 2:</strong> {employee.email_id_2}</p>
          <p style={styles.employeeInfo}><strong>Relation 2:</strong> {employee.relation_2}</p>
        </>
      );
    default:
      return null;
  }
};

export default EmployeeProfile;
