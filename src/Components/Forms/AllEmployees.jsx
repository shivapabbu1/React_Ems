import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEdit } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAllEmployees } from "../Utils/ApiFetch";

const AllEmployees = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const data = await fetchAllEmployees(accessToken);
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching Employees API:", error);
        setError("Failed to fetch employees data. Please try again later.");
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [getAccessTokenSilently]);

  const getStatusLabel = (status) => {
    return status ? "Active" : "Inactive";
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4"> Employees List</h2>
      {loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
        <span>Please wait until we reach you...</span>
        <Spinner animation="border" role="status" className="mt-3">
          <span className="sr-only"></span>
        </Spinner>
      </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{getStatusLabel(employee.status)}</td>
                <td>
                  <Link to={`/admin/profile/${employee.employeeId}`} className="btn btn-info btn-sm me-2">
                    <FaEye className="me-1" /> View
                  </Link>
                  <Link to={`/admin/update/${employee.employeeId}`} className="btn btn-success btn-sm">
                    <FaEdit className="me-1" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllEmployees;
