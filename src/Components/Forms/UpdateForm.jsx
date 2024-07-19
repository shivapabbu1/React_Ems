import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchEmployeeById, updateEmployee } from "../Utils/ApiFetch";
import { FaArrowLeft, FaUpload } from "react-icons/fa";
import "../../App.css"
const UpdateForm = () => {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const { id } = useParams();
  const [updated, setUpdated] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const idToken = await getIdTokenClaims();
      const userRoles = idToken["https://itynerds.com/roles"];

      if (!userRoles?.includes("Admin")) {
        throw new Error(
          "You do not have the required permissions to view employee details."
        );
      }

      const data = await fetchEmployeeById(id, accessToken);
      setUpdated(data);
      
    } catch (error) {
      console.error("Error fetching employee details:", error);
      setError("Failed to fetch employee details. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdated({
      ...updated,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = await getAccessTokenSilently();
      await updateEmployee(id, updated, accessToken);
      alert("Employee updated successfully");
      navigate("/admin/allemp");
      // Reset form data
      setUpdated({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobile: "",
        dob: "",
        bloodGroup: "",
        gender: "",
        maritalstatus: "",
        spouseName: "",
        fathersName: "",
        mothersName: "",
        aadhar: "",
        pan: "",
        communicationAddress: "",
        permanentAddress: "",
        highestQualification: "",
        university: "",
        collegeName: "",
        yearOfPassing: "",
        technicalSkills: "",
        technicalCertification: "",
        cgpa: "",
        qualifyingBranch: "",
        lastWorkedCompany: "",
        jobRole: "",
        dateOfJoining: "",
        dateOfLeaving: "",
        experienceInYears: "",
        uanNumber: "",
        nameOfEmergencyContact_1: "",
        phone_1: "",
        email_id_1: "",
        relation_1: "",
        nameOfEmergencyContact_2: "",
        phone_2: "",
        email_id_2: "",
        relation_2: "",
      });
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-12 col-md-6 col-sm-6 card mb-3">
        <div className="card-header bg-dark-blue  d-flex justify-content-between align-items-center">
        <h3 className="mb-0 text-dark">
           <FaUpload className=" me-2 text-dark"/>Update Employee
           </h3>
           <Link to="/admin/allemp" className="btn btn-light-blue">
    <FaArrowLeft className="me-2 text-dark" />
    Back to Employees
  </Link>
          </div>
          <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
              {/* Personal Details */}
              <div className="row">
                {/* First Name */}
                <h3>Personal Details:</h3>
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={updated.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                     // Make field required
                  />
                </div>
                {/* Middle Name */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="middleName"
                    name="middleName"
                    value={updated.middleName}
                    onChange={handleChange}
                    placeholder="Enter middle name"
                  />
                </div>
                {/* Last Name */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={updated.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                     // Make field required
                  />
                </div>
                {/* Email */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={updated.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                     // Make field required
                  />
                </div>
                {/* Mobile */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="mobile">Mobile *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={updated.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile"
                     // Make field required
                  />
                </div>
                {/* Date of Birth */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="dob">Date of Birth *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="dob"
                    value={updated.dob}
                    onChange={handleChange}
                     // Make field required
                  />
                </div>

                {/* Blood Group */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="bloodgroup">Blood Group *</label>
                  <select
                    className="form-control"
                    id="bloodgroup"
                    name="bloodGroup"
                    value={updated.bloodGroup}
                    onChange={handleChange}
                    
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                {/* gender */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="gender">Gender*</label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={updated.gender}
                    onChange={handleChange}
                    required // Make field required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="NotSpecified">NotSpecified</option>
                  </select>
                </div>

                {/* marital status */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="maritalstatus">Marital Status*</label>
                  <select
                    className="form-control"
                    id="maritalstatus"
                    name="maritalstatus"
                    value={updated.maritalstatus}
                    onChange={handleChange}
                    required // Make field required
                  >
                    <option value="">select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
                {/* Spouse name */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="spouseName">Spouse Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="spouseName"
                    name="spouseName"
                    value={updated.spouseName}
                    onChange={handleChange}
                    // Make field required
                  />
                </div>

                {/* Father name */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="fathersName">Father Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fathersName"
                    name="fathersName"
                    value={updated.fathersName}
                    onChange={handleChange}
                     // Make field required
                  />
                </div>

                {/* Mother name */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="mothersName">Mother Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mothersName"
                    name="mothersName"
                    value={updated.mothersName}
                    onChange={handleChange}
                     // Make field required
                  />
                </div>

                {/* Communication Address */}
                <div className="form-group mb-2 col-lg-12 col-md-4 col-sm-6">
                  <label htmlFor="communicationAddress">Communication Address *</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="communicationAddress"
                    name="communicationAddress"
                    value={updated.communicationAddress}
                    onChange={handleChange}
                    placeholder="Enter address"
                     // Make field required
                  />
                </div>

                {/* Permenent Address */}
                <div className="form-group mb-2 col-lg-12 col-md-4 col-sm-6">
                  <label htmlFor="permanentAddress">Permeanent Address *</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="permanentAddress"
                    name="permanentAddress"
                    value={updated.permanentAddress}
                    onChange={handleChange}
                    placeholder="Enter address"
                   // Make field required
                  />
                </div>
                {/*aadhar */}
                <div
                  className="form-group mb-2 col-lg-6
                 col-md-4 col-sm-6"
                >
                  <input
                    type="text"
                    className="form-control"
                    id="aadhar"
                    name="aadhar"
                    checked={updated.aadhar}
                    onChange={handleChange}
                  // Make field required
                  />
                  <label className="form-check-label" htmlFor="aadhar">
                    Aadhar
                  </label>
                </div>
                {/* PAN Name */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="pan"
                    name="pan"
                    checked={updated.pan}
                    onChange={handleChange}
                     // Make field required
                  />
                  <label className="form-check-label" htmlFor="pan">
                    PAN
                  </label>
                </div>
              </div>

              {/* Education Details */}
              <div className="row">
                <h3>Education Details:</h3>
                {/* Qulaification */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="highestQualification">Highest Qualification *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="highestQualification"
                    name="highestQualification"
                    value={updated.highestQualification}
                    onChange={handleChange}
                    placeholder="Enter  Higher Qualification"
                  />
                </div>
                {/* University Name */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="university">University Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="university"
                    name="university"
                    value={updated.university}
                    onChange={handleChange}
                    placeholder="Enter UniversityName"
                     // Make field required
                  />
                </div>
                {/* CollegeName */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="collegeName">College Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="collegeName"
                    name="collegeName"
                    value={updated.collegeName}
                    onChange={handleChange}
                    placeholder="Enter College Name"
                     // Make field required
                  />
                </div>
                {/* Branch */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="qualifyingBranch">Branch/Depratment</label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualifyingBranch"
                    name="qualifyingBranch"
                    value={updated.qualifyingBranch}
                    onChange={handleChange}
                  />
                </div>
                {/* cgpa */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="cgpa">CGPA/Percnatge</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cgpa"
                    name="cgpa"
                    value={updated.cgpa}
                    onChange={handleChange}
                    placeholder="Enter CGPA"
                  />
                </div>

                {/* YOP  */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="yearOfPassing"> Year of Passing *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="yearOfPassing"
                    name="yearOfPassing"
                    value={updated.yearOfPassing}
                    onChange={handleChange}
                    placeholder="Enter Year of passing"
                     // Make field required
                  />
                </div>
                {/* Techical skills  */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="technicalSkills">Technical skills *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="technicalSkills"
                    name="technicalSkills"
                    value={updated.technicalSkills}
                    onChange={handleChange}
                    placeholder="Enter Skills"
                // Make field required
                  />
                </div>
                {/* Certification */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="technicalCertification">Certifications*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="technicalCertification"
                    name="technicalCertification"
                    value={updated.technicalCertification}
                    onChange={handleChange}
                   // Make field required
                  />
                </div>
              </div>
              {/* previous work experinece */}
              <div className="row">
                <h3>Previous Work Experience Details:</h3>
                {/* previous company*/}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="previouscompany">Last Worked Company</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastworkedcompany"
                    name="lastWorkedCompany"
                    value={updated.lastWorkedCompany}
                    onChange={handleChange}
                    placeholder="Enter Last worked company name"
                  />
                </div>
                {/* job role */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="jobRole">Job Role</label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobRole"
                    name="jobRole"
                    value={updated.jobRole}
                    onChange={handleChange}
                    placeholder="Enter job role"
                  />
                </div>
                {/* exp in years role */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="experienceInYears">Total Experience </label>
                  <input
                    type="text"
                    className="form-control"
                    id="experienceInYears"
                    name="experienceInYears"
                    value={updated.experienceInYears}
                    onChange={handleChange}
                    placeholder="Enter Expereince in Years"
                  />
                </div>
  {/* Date of Joining*/}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="dateOfLeaving">Date Of Joining</label>
                  <input
                    type="Date"
                    className="form-control"
                    id="dateOfJoining"
                    name="dateOfJoining"
                    value={updated.dateOfJoining}
                    onChange={handleChange}
                    placeholder="Enter Date of Joining"
                  />
                </div>
                {/* Date of leavingf*/}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="dateOfLeaving">Date Of Leaving</label>
                  <input
                    type="Date"
                    className="form-control"
                    id="dateOfLeaving"
                    name="dateOfLeaving"
                    value={updated.dateOfLeaving}
                    onChange={handleChange}
                    placeholder="Enter Date of leaving"
                  />
                </div>
                {/* UAN*/}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="uanNumber">UAN Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="uanNumber"
                    name="uanNumber"
                    value={updated.uanNumber}
                    onChange={handleChange}
                    placeholder="Enter Your UAN Number"
                  />
                </div>
              </div>

              {/* Emergency Details */}
              <div className="row">
                <h3>Emergency Contact Details:</h3>
                {/* Emergency Contact name-1 */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="nameofemergencycontact-1">
                    Name of Emergency contact-1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameofemergencycontact-1"
                    name="nameOfEmergencyContact_1"
                    value={updated.nameOfEmergencyContact_1}
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
                {/* relation */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="realtion-1">Relation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="realtion-1"
                    name="relation_1"
                    value={updated.relation_1}
                    onChange={handleChange}
                    placeholder="Enter Realtion"
                  />
                </div>

                {/* Emergency Contact Number */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="emergencyContactNo">Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactNo"
                    name="phone_1"
                    value={updated.phone_1}
                    onChange={handleChange}
                    placeholder="Enter emergency contact number"
                  />
                </div>

                {/* Emergency email */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="emergencyemai-1">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyemai-1"
                    name="email_id_1"
                    value={updated.email_id_1}
                    onChange={handleChange}
                    placeholder="Enter emergency contact number"
                  />
                </div>
                {/* Emergency Contact name-1 */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="nameofemergencycontact-2">
                    Name of Emergency contact-2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameofemergencycontact-2"
                    name="nameOfEmergencyContact_2"
                    value={updated.nameOfEmergencyContact_2}
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </div>
                {/* relation */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="relation_2">Relation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="relation_2"
                    name="relation_2"
                    value={updated.relation_2}
                    onChange={handleChange}
                    placeholder="Enter Realtion"
                  />
                </div>

                {/* Emergency Contact Number */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="emergencyContactNo-2">Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactNo-2"
                    name="phone_2"
                    value={updated.phone_2}
                    onChange={handleChange}
                    placeholder="Enter emergency contact number"
                  />
                </div>

                {/* Emergency email */}
                <div className="form-group mb-2 col-lg-6 col-md-4 col-sm-6">
                  <label htmlFor="emergencyemai-2">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyemai-2"
                    name="email_id_2"
                    value={updated.email_id_2}
                    onChange={handleChange}
                    placeholder="Enter emergency contact number"
                  />
                </div>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="d-flex justify-content-center box-footer">
                <button type="submit" className="btn btn-primary btn-lg mx-3">
                  Submit
                </button>
                <Link to="/admin/allemp">
                  <button className="btn btn-danger btn-lg mx-3">Cancel</button>
                </Link>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
