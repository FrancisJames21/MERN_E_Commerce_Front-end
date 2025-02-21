import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'

const Profile = () => {
    const {user} = useContext(AppContext)
  return (
    <>
      <div className="container text-center my-5">
    <h1>Welcome {user ? user.name : "Guest"}</h1>
    <h3>{user ? user.email : "Not Available"}</h3>
  </div>

      
    </>
  )
}

export default Profile
