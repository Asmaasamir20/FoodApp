
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function ProtectedRoutes({ loginData, children }) {
  const navigate = useNavigate()
  useEffect(() => {
    if (loginData === null) {
      navigate('/LogIn')
    }
  }, [loginData, navigate])

  return loginData ? children : null
}
