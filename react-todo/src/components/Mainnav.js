import React from 'react'
import { Container, Navbar, Button, Image, Popover, OverlayTrigger, Row } from 'react-bootstrap'
import { login2, logout } from "../firebase";

export default function Mainnav(props) {

  const userInfo = (
    <Popover id="user-info">
      <Popover.Content>
        <Container>
          <Row>
            {props?.user?.displayName}
          </Row>
          <Row>
            <Button variant="secondary" className="ms-2" onClick={logout}>Logout</Button>
          </Row>
        </Container>
        
      
      </Popover.Content>
    </Popover>
  )

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>REACT TODO</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {/* <Navbar.Text>
              {props.user ? 'Logged in as: ' + props.user.displayName : ''}
            </Navbar.Text> */}
            {props.user &&
              <div>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={userInfo}>
                  <Image src={props.user.photoURL} roundedCircle style={{height: 50 + 'px'}}/>
                </OverlayTrigger>
                
                {/* <Button variant="secondary" className="ms-2" onClick={logout}>Logout</Button> */}
              </div>
            }
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
