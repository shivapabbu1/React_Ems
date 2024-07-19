import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from 'react-bootstrap';
import { fetchEmployeeByEmail } from '../Utils/ApiFetch'; // Replace with your API fetch function
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
`;

const Title = styled.h2`
  color: #007bff;
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const CardTitle = styled.h5`
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: bold;
  margin: 1rem 0;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const Col = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 0.5rem;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const SpinnerContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const SingleUser = () => {
  const { isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user?.email && user['https://itynerds.com/roles']?.includes('Employee')) {
        try {
          const email = user.email;
          const accessToken = await getAccessTokenSilently();
          const data = await fetchEmployeeByEmail(email, accessToken);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  if (isLoading) {
    return (
      <SpinnerContainer role="status" aria-live="polite">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <span className="ms-2">Loading...</span>
      </SpinnerContainer>
    );
  }

  return (
    <Container>
      <Title>Welcome ,{user.nickname} 
      <CardTitle> We're glad to have you here.</CardTitle>
      </Title>
      {userData ? (
        <Card>
          <CardBody>
          
            <CardText><strong>Email:</strong> {userData.email}</CardText>
            <CardText><strong>Role:</strong> {userData.role}</CardText>
            <hr />
            <Row>
              <Col>
                <CardText><strong>Mobile:</strong> {userData.mobile}</CardText>
                <CardText><strong>Date of Birth:</strong> {userData.dob}</CardText>
                <CardText><strong>Blood Group:</strong> {userData.bloodGroup}</CardText>
                <CardText><strong>Gender:</strong> {userData.gender}</CardText>
                <CardText><strong>Marital Status:</strong> {userData.maritalstatus}</CardText>
                <CardText><strong>Date Of Joining:</strong> {userData.dateOfJoining}</CardText>
              </Col>
              <Col>
                <CardText><strong>Address:</strong> {userData.communicationAddress}</CardText>
                <CardText><strong>Permanent Address:</strong> {userData.permanentAddress}</CardText>
                <CardText><strong>Highest Qualification:</strong> {userData.highestQualification}</CardText>
                <CardText><strong>University:</strong> {userData.university}</CardText>
                <CardText><strong>College:</strong> {userData.collegeName}</CardText>
                <CardText><strong>Year of Passing:</strong> {userData.yearOfPassing}</CardText>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ) : (
        <p>{isLoading}</p>
      )}
    </Container>
  );
};

export default SingleUser;
