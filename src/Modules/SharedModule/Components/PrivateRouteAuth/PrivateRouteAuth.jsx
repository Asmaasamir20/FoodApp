import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRouteAuth = ({ children, loginData }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (loginData) {
      navigate('/MasterLayOut')
    }
  }, [loginData, navigate])

  return loginData ? null : children
}

export default PrivateRouteAuth

// PropTypes
PrivateRouteAuth.propTypes = {
  children: PropTypes.node.isRequired,
  loginData: PropTypes.object,
}
