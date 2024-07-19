import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/Layout/NavBar";
import Header from "./Components/Layout/Header";
import Home from "./Components/Pages/Home";
import AllEmployees from "./Components/Forms/AllEmployees";
import AddEmployee from "./Components/Forms/AddEmployee";
import Service from "./Components/Pages/Service";
import UpdateForm from "./Components/Forms/UpdateForm";
import EmployeeProfile from "./Components/Forms/EmployeeProfile";
import SingleUser from "./Components/Forms/SingleUser";
import UpdatePassword from "./Components/Forms/UpdatePassword";
import GeneratePaySlip from "./Components/PaySlipsComponents/GeneartePaySlip";
import PayslipDetails from "./Components/PaySlipsComponents/PaySlipDetails";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: hidden;
`;

const Sidebar = styled.div`
  flex: 0 0 200px; /* Adjust as needed */
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const useUserRoles = () => {
  const { isAuthenticated, user } = useAuth0();
  
  const rolesUrl = import.meta.env.VITE_API_ROLES_URL;
  console.log(rolesUrl)
  
  const getUserRoles = () => {
    if (isAuthenticated && user && user[rolesUrl]?.length > 0) {
      return user[rolesUrl];
    }
    return [];
  };

  const userRoles = getUserRoles();

  const isAdminOrHR = isAuthenticated && userRoles.length > 0 &&
    (userRoles.includes("Admin") || userRoles.includes("HR"));
  const isEmployee = isAuthenticated && userRoles.includes("Employee");

  return { isAuthenticated, user, isAdminOrHR, isEmployee };
};
  

function App() {
  const { isAuthenticated, isAdminOrHR, isEmployee } = useUserRoles();

  return (
    <Container>
      <Header />
      {isAuthenticated && (
        <MainContainer>
          <Sidebar>
            <NavBar />
          </Sidebar>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              {isAdminOrHR && (
                <>
                  <Route path="/admin/addemp" element={<AddEmployee />} />
                  <Route path="/admin/allemp" element={<AllEmployees />} />
                  <Route path="/admin/service" element={<Service />} />
                  <Route path="/admin/update/:id" element={<UpdateForm />} />
                  <Route path="/admin/profile/:id" element={<EmployeeProfile />} />
                  <Route path="/genratepayslip" element={<GeneratePaySlip />} />
                  <Route path="/payslipdetails" element={<PayslipDetails />} />
                </>
              )}
              {isEmployee && (
                <>
                  <Route path="/employee/viewprofile" element={<SingleUser />} />
                  <Route path="/updatepassword" element={<UpdatePassword />} />
                  <Route path="/genratepayslip" element={<GeneratePaySlip />} />
                  <Route path="/payslipdetails" element={<PayslipDetails />} />
                
                </>
              )}
            </Routes>
          </Content>
        </MainContainer>
      )}
    </Container>
  );
}

export default App;
