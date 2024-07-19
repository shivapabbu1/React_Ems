import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { generatePaySlip, fetchEmployeeByEmail } from '../Utils/ApiFetch';
import { useAuth0 } from '@auth0/auth0-react';
import PayslipDetails from './PaySlipDetails';
import { FaFileAlt } from 'react-icons/fa';

// Styled Components
const Container = styled.div`
  margin-top: 40px;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${props => (props.primary ? '#007bff' : '#6c757d')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const GenertePaySlip = () => {
  const [paySlip, setPaySlip] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [month, setMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          const employeeEmail = user.email;
          const employeeData = await fetchEmployeeByEmail(employeeEmail, accessToken);
          setEmployee(employeeData);
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, getAccessTokenSilently, user.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      
      const paySlipDTO = {
        payPeriod: `${month} ${new Date().getFullYear()}`,
        grossSalary: 20000, // Replace with actual value
        taxDeducted: 1000, // Replace with actual value
        otherDeductions: 500, // Replace with actual value
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobRole: employee.jobRole,
        employeeId: employee.employeeId,
        employeeEmail: employee.email,
      };
  
      const response = await generatePaySlip(accessToken, employee.employeeId, paySlipDTO);
      setPaySlip(response);
    } catch (error) {
      console.error('Error generating payslip:', error);
      // Handle error state or display a user-friendly message
    } finally {
      setLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner color="primary" />
      </SpinnerContainer>
    );
  }

  if (!isAuthenticated) {
    return <Container>You need to be authenticated to generate a payslip.</Container>;
  }

  return (
    <Container>
      <Title><FaFileAlt style={{ marginRight: '10px' }} />Generate Pay Slip</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="employeeId">Employee ID</Label>
          <Input
            type="text"
            id="employeeId"
            value={employee ? employee.employeeId : ''}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="month">Month</Label>
          <Select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </Select>
        </FormGroup>
        <Button primary type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Pay Slip'}
        </Button>
      </Form>
      
      {paySlip && (
        <div className="shadow m-3">
          <div className="p-4">
            <PayslipDetails paySlip={paySlip} employee={employee} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default GenertePaySlip;
