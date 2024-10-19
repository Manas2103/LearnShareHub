import React from 'react'
import axios from 'axios'

export default function LogoutBtn() {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post("https://learnsharehub-1.onrender.com/api/v1/users/logout")

        if(response.status === 200){
            alert("User logged Out successfully")
        }
        else{
            alert("error while logging out")
        }
    }
  return (
    
    <div className="logout">
        <form action="" onSubmit={handleSubmit}>
            <input type="submit" className="searchbtn px-3 p-2" value = "logout" />
        </form>
    </div>
  )
}
