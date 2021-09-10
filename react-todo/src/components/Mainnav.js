import React from 'react'
import { Container, Navbar, Button, Image, Popover, OverlayTrigger, Row } from 'react-bootstrap'
import { Route } from 'react-router';
import { login2, logout } from "../firebase";

export default function Mainnav(props) {

  const userInfo = (
    <Popover id="user-info">
      <Popover.Content>
        <Container>
          <Row>
            <h6>{props?.user?.displayName}</h6>
            <p>{props?.user?.email}</p>
            <p>{props?.user?.uid}</p>
          </Row>
          <Row>
            <Button variant="secondary" className="ms-2" onClick={logout}>Logout</Button>
          </Row>
        </Container>
        
      
      </Popover.Content>
    </Popover>
  );

  const Avatar = () => (
    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={userInfo}>
    {({ ref, ...triggerHandler}) => (
      <Image ref={ref} src={props.user.photoURL} roundedCircle style={{height: 50 + 'px'}} {...triggerHandler}/>
    )}
    </OverlayTrigger>
  );

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>REACT TODO</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {props.user &&
              <div>
                <Avatar />
              </div>
            }
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
