import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewPassword() {
  const location = useLocation();
    const navigate = useNavigate();
   
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    const passRege = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    const [newpassword, setNewpassword] = useState("");

    const verify =async(id)=>{
    

        if (!newpassword){
            return notifyA("Password Required !!!");
        }
        else if (!passRege.test(newpassword)) {
            notifyA("Password must contain atleast 8 characters, including atleast 1 number and 1 includes both lower and uppercase letters and special characters for example #,?!");
            return;
        }
        try{
            const response = await fetch(`http://localhost:8000/verify/656dee2e95b8122e614aab0b`,{
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: newpassword }),
            })
            if(response.status===200){
                // const updatedPassword = await response.json();
                console.log(response);
                notifyB("password Updated Successfully!!!")
                navigate('/');
            }
            else{
                return notifyA("Password Updation Failed");
            }
        }
        catch(err){
            return notifyA(err);
        }
    }

  return (
    <div className="container d-flex">
        <input type="password" name="password" placeholder='Enter New Password' onChange={(e)=>setNewpassword(e.target.value)}/>
        <button type="submit" onClick={()=>{verify(location.state.id)}}>Change Password</button>
    </div>
  )
}
