import React from 'react'
import { Card, Button } from "react-bootstrap";
import { loginWithGoogle } from "../firebase";

function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <Card style={{ width: '18rem' }}>
        <Card.Body className="w-100 text-center">
          <Button variant="primary" onClick={loginWithGoogle}> Login with Google</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login
