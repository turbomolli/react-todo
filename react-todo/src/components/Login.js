import React from 'react'
import { Card, Button } from "react-bootstrap";
import { login2, logout } from "../firebase";

function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <Card style={{ width: '18rem' }}>
        <Card.Body className="w-100 text-center">
          <Button variant="primary" onClick={login2}> Login with Google</Button>
          {/* <Button variant="secondary" className="ml-2" onClick={logout}>Logout</Button> */}
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login
