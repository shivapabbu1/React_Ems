import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../../assets/Logo.png";

const HeaderContainer = styled.nav`
  background-color: #343a40;
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 99vw;
  margin: 0 auto;
`;

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  object-fit: cover;
`;

const BrandName = styled.div`
  h2 {
    margin: 0;
    font-size: 1.5rem;

    span {
      display: block;
      font-size: 0.6em;
    }
  }
`;

const Nav = styled.ul`
  display: flex;
  align-items: center;
  margin: 3;
  padding: 0;
  list-style: none;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
`;

const UserProfilePic = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #343a40;
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 1;

    a {
      color: white;
      padding: 12px 16px;
      text-decoration: none;
      display: block;

      &:hover {
        background-color: #495057;
      }
    }

    .dropdown-divider {
      height: 1px;
      margin: .5rem 0;
      overflow: hidden;
      background-color: #6c757d;
    }
  }

  &:hover .dropdown-content {
    display: block;
  }
`;

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const logoutHandler = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <BrandLink to="/">
            <Logo src={logo} alt="Company Logo" />
            <BrandName>
              <h2>
                DevDolphins{' '}
                <span>Software Pvt Ltd</span>
              </h2>
            </BrandName>
          </BrandLink>
        </div>

        <Nav>
          <NavItem>
            {isAuthenticated ? (
              <DropdownMenu>
                <UserProfilePic src={user.picture} alt="User Profile" />
                <div className="dropdown-content">
                  <Link to="/employee/viewprofile">Profile</Link>
                  <Link to="/updatepassword">Reset Password</Link>
                  <div className="dropdown-divider"></div>
                  <a href="#logout" onClick={logoutHandler}>Logout</a>
                </div>
              </DropdownMenu>
            ) : (
              <button onClick={loginWithRedirect} className="btn btn-light">Log In</button>
            )}
          </NavItem>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
