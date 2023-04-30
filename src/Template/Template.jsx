import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Header from '../Component/Header/Header'
import { useSelector } from 'react-redux'
import { history } from '..'

const Template = () => {
  const { userLogin, userToken } = useSelector(state => state.userReducer)
  const navigate = useNavigate();
  if (!userToken) {
    return <Navigate to={'login'} />
  }
  else {
    return (
      <>
        <Header />
        <Outlet />
      </>
    )
  }
}

export default Template
