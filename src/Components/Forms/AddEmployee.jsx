import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { saveEmployee } from "../Utils/ApiFetch";
import { FaArrowLeft,  FaRegPlusSquare } from "react-icons/fa";
import "../../App.css"
const AddEmployee = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const [formData, setFormData] = useState({
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

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveEmployeeData = async (e) => {
    e.preventDefault();

    try {
      const accessToken = await getAccessTokenSilently();

       await saveEmployee(formData, accessToken);

      console.log("SaveEmployee AccessToken:", accessToken);

      const idToken = await getIdTokenClaims();
      console.log("ID Token Claims:", idToken);

      if (!accessToken) {
        throw new Error("Access token is null or undefined");
      }

      if (!idToken) {
        throw new Error("ID token is null or undefined");
      }

      const userRoles = idToken["https://itynerds.com/roles"];
      console.log("User Roles:", userRoles);

      if (!userRoles?.includes("Admin")) {   //optional chaining in js to acess  safely access deeply nested properties without having to manually check for the existence of each propert
        
        throw new Error("You do not have the required permissions to save employees.");
      }
      

      console.log("Employee saved successfully");
      alert("Employee saved successfully");
      navigate("/admin/allemp");
    } catch (error) {
      console.error("Error saving employee:", error);
      setError(error.message || "Failed to save employee");
    } finally {
      // Reset form data regardless of success or failure
      // setFormData({ ...initialFormData });
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card shadow-sm">
          <div className="card-header bg-dark-blue  d-flex justify-content-between align-items-center">
  <h3 className="mb-0 text-dark">
    <FaRegPlusSquare className="me-2 text-dark" />
    Add Employee
  </h3>
  <Link to="/admin/allemp" className="btn btn-light-blue">
    <FaArrowLeft className="me-2 text-dark" />
    Back to Employees
  </Link>
</div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={saveEmployeeData}>
            {/* Personal Details */}
            <div className="row">
              {/* First Name */}
              <h3>Personal Details:</h3>
              <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-12">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required // Make field required
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
                    value={formData.middleName}
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
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required // Make field required
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required // Make field required
                  />
                </div>
                {/* Mobile */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="mobile">Mobile *</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile"
                    required // Make field required
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
                    value={formData.dob}
                    onChange={handleChange}
                    required // Make field required
                  />
                </div>

                {/* Blood Group */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="bloodgroup">Blood Group *</label>
                  <select
                    className="form-control"
                    id="bloodgroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
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
                    value={formData.gender}
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
                    value={formData.maritalstatus}
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
                  <label htmlFor="spouseName">Spouse Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="spouseName"
                    name="spouseName"
                    value={formData.spouseName}
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
                    value={formData.fathersName}
                    onChange={handleChange}
                    required // Make field required
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
                    value={formData.mothersName}
                    onChange={handleChange}
                    required // Make field required
                  />
                </div>

                {/* aadhar */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="aadhar">Aadhar*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="aadhar"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    required // Make field required
                  />
                </div>

                {/* pan */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="pan">Pan*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pan"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    required // Make field required
                  />
                </div>
              </div>

              {/* Communication and Permanent Address */}
              <div className="row">
                <h3>Communication and Permanent Address:</h3>

                {/* Communication Address */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="communicationAddress">Communication Address </label>
                  <input
                    type="text"
                    className="form-control"
                    id="communicationAddress"
                    name="communicationAddress"
                    value={formData.communicationAddress}
                    onChange={handleChange}
                    placeholder="Enter communication address"
                     // Make field required
                  />
                </div>

                {/* Permanent Address */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="permanentAddress">Permanent Address *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="permanentAddress"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    placeholder="Enter permanent address"
                    required // Make field required
                  />
                </div>

              </div>

              {/* Educational Details */}
              <div className="row">
                <h3>Educational Details:</h3>

                {/* Highest Qualification */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="highestQualification">Highest Qualification *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="highestQualification"
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleChange}
                    placeholder="Enter highest qualification"
                    required // Make field required
                  />
                </div>

                {/* University */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="university">University *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="Enter university"
                    required // Make field required
                  />
                </div>

                {/* College Name */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="collegeName">College Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="collegeName"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="Enter college name"
                    required // Make field required
                  />
                </div>

                {/* Year of Passing */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="yearOfPassing">Year Of Passing *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="yearOfPassing"
                    name="yearOfPassing"
                    value={formData.yearOfPassing}
                    onChange={handleChange}
                    placeholder="Enter year of passing"
                    required // Make field required
                  />
                </div>

                {/* Technical Skills */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="technicalSkills">Technical Skills </label>
                  <input
                    type="text"
                    className="form-control"
                    id="technicalSkills"
                    name="technicalSkills"
                    value={formData.technicalSkills}
                    onChange={handleChange}
                    placeholder="Enter technical skills"
                    // Make field required
                  />
                </div>

                {/* Technical Certification */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="technicalCertification">Technical Certification </label>
                  <input
                    type="text"
                    className="form-control"
                    id="technicalCertification"
                    name="technicalCertification"
                    value={formData.technicalCertification}
                    onChange={handleChange}
                    placeholder="Enter technical certification"
                     // Make field required
                  />
                </div>

                {/* CGPA */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="cgpa">CGPA *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cgpa"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    placeholder="Enter cgpa"
                    required // Make field required
                  />
                </div>

                {/* Qualifying Branch */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="qualifyingBranch">Qualifying Branch *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualifyingBranch"
                    name="qualifyingBranch"
                    value={formData.qualifyingBranch}
                    onChange={handleChange}
                    placeholder="Enter qualifying branch"
                    required // Make field required
                  />
                </div>

                {/* Last Worked Company */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="lastWorkedCompany">Last Worked Company *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastWorkedCompany"
                    name="lastWorkedCompany"
                    value={formData.lastWorkedCompany}
                    onChange={handleChange}
                    placeholder="Enter last worked company"
                    required // Make field required
                  />
                </div>

                {/* Job Role */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="jobRole">Job Role *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobRole"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleChange}
                    placeholder="Enter job role"
                    required // Make field required
                  />
                </div>
                
                {/* Date Of Joining */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="dateOfLeaving">Date Of Joining *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfJoining"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    placeholder="Enter date of joining"
                    required
                  />
                </div>

                {/* Date Of Leaving */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="dateOfLeaving">Date Of Leaving </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfLeaving"
                    name="dateOfLeaving"
                    value={formData.dateOfLeaving}
                    onChange={handleChange}
                    placeholder="Enter date of leaving"
                 
                  />
                </div>

                {/* Experience In Years */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="experienceInYears">Experience In Years *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="experienceInYears"
                    name="experienceInYears"
                    value={formData.experienceInYears}
                    onChange={handleChange}
                    placeholder="Enter experience in years"
                    required // Make field required
                  />
                </div>

                {/* UAN Number */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="uanNumber">UAN Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="uanNumber"
                    name="uanNumber"
                    value={formData.uanNumber}
                    onChange={handleChange}
                    placeholder="Enter UAN number"
                    required // Make field required
                  />
                </div>

                {/* Emergency Contact Details */}
                <h3>Emergency Contact Details:</h3>

                {/* Name of Emergency Contact_1 */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="nameOfEmergencyContact_1">Name of Emergency Contact_1 *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameOfEmergencyContact_1"
                    name="nameOfEmergencyContact_1"
                    value={formData.nameOfEmergencyContact_1}
                    onChange={handleChange}
                    placeholder="Enter name of Emergency Contact_1"
                    required // Make field required
                  />
                </div>

                {/* Phone_1 */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="phone_1">Phone_1 *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone_1"
                    name="phone_1"
                    value={formData.phone_1}
                    onChange={handleChange}
                    placeholder="Enter phone_1"
                    required // Make field required
                  />
                </div>

                {/* Email_id_1 */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="email_id_1">Email_id_1 *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email_id_1"
                    name="email_id_1"
                    value={formData.email_id_1}
                    onChange={handleChange}
                    placeholder="Enter email_id_1"
                    required // Make field required
                  />
                </div>

                {/* Relation_1 */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="relation_1">Relation_1 </label>
                  <input
                    type="text"
                    className="form-control"
                    id="relation_1"
                    name="relation_1"
                    value={formData.relation_1}
                    onChange={handleChange}
                    placeholder="Enter relation_1"
                  
                  />
                </div>

                {/* Name of Emergency Contact_2 */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="nameOfEmergencyContact_2">Name of Emergency Contact_2 *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameOfEmergencyContact_2"
                    name="nameOfEmergencyContact_2"
                    value={formData.nameOfEmergencyContact_2}
                    onChange={handleChange}
                    placeholder="Enter name of Emergency Contact_2"
                    required // Make field required
                  />
                </div>

                {/* Phone_2 */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="phone_2">Phone_2 *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone_2"
                    name="phone_2"
                    value={formData.phone_2}
                    onChange={handleChange}
                    placeholder="Enter phone_2"
                    required // Make field required
                  />
                </div>

                {/* Email_id_2 */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="email_id_2">Email_id_2 *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email_id_2"
                    name="email_id_2"
                    value={formData.email_id_2}
                    onChange={handleChange}
                    placeholder="Enter email_id_2"
                    required // Make field required
                  />
                </div>

                {/* Relation_2 */}
                <div className="form-group mb-2 col-lg-4 col-md-4 col-sm-6">
                  <label htmlFor="relation_2">Relation_2 </label>
                  <input
                    type="text"
                    className="form-control"
                    id="relation_2"
                    name="relation_2"
                    value={formData.relation_2}
                    onChange={handleChange}
                    placeholder="Enter relation_2"
                    
                  />
                </div>
              </div>

              <div className="text-center mt-3">
                <button type="submit" className="btn btn-primary">
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddEmployee;
