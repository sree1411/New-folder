import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { ContactServer } from '../servers/ContactServer'

const EditContact = () => {

  let navigate = useNavigate();

  const {contactId} = useParams()

let [updatedstate, setupdatedstate] = useState({
    loading:false,
    contact:{
      name:"",
      age:"",
      gender:"",
      phone:"",
      place:"",
      blood:""
    },
    errorMessage:""
})


useEffect(()=>{

   const fetchData = async ()=>{
      try {
         setupdatedstate({...updatedstate, loading:true});
       let response = await ContactServer.getOne(contactId)
       setupdatedstate({
         ...updatedstate,
         loading:false,
         contact:response.data
        })
      } catch (error) {
         setupdatedstate({
         ...updatedstate,
         loading:false,
         errorMessage:error.message
        })
      }
   }
   fetchData()
 
 },[contactId])




const handleInput =  (e)=>{

     setupdatedstate({
      ...updatedstate,
      contact:{
       
         ...updatedstate.contact,
         [e.target.name]:e.target.value
         
         
      }
     })
   
}



const handleSubmit = async(e)=>{
   e.preventDefault();

   try {
      setupdatedstate({...updatedstate, loading:true})
      let response = await ContactServer.editContact(contactId,updatedstate.contact);
      console.log(response)
      if(response){
         navigate("/contact",  {replace:true})
      }
   } catch (error) {
      setupdatedstate({...updatedstate, loading:false, 
         errorMessage:error.message
      })
      navigate("/addcontact", {replace:false})
   }

}



let {contact, loading, errorMessage} = updatedstate;
 

  return (
      <>

         <p> We are Happy, You are also part to the Blood Donation</p>
         <p> Edit your details</p>
         <form onSubmit={handleSubmit}>
            Name: <input type="text" name='name' value={contact.name} onChange={handleInput} placeholder='enter your Name' /> <br/>
            Age: <input type="text" name='age' value={contact.age} onChange={handleInput}  placeholder='enter your Name' /> <br/>
            Gender: <input type="radio" name="gender" value="male"  checked={contact.gender === "male"} onChange={handleInput} /> Male 
                    <input type="radio" name="gender" value="female" checked={contact.gender === "female"} onChange={handleInput} /> Female
                    <input type="radio" name="gender" value="other" checked={contact.gender === "other"} onChange={handleInput} /> Other <br/>
            Phone Number: <input type="text" name='phone' value={contact.phone} onChange={handleInput}  placeholder='enter your Phone Number' /> <br/>
            Place: <input type="text"  name='place' value={contact.place} onChange={handleInput}   placeholder='enter your place' /> <br/>
            BloodGroup: <select name='blood' value={contact.blood} onChange={handleInput}>
                  <option value=""> Select the Blood Group </option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="O">O</option>
                  <option value="A-">A-</option>
              </select> <br/>
            
         
            <button  className="btn btn-primary"> update Details</button>
            <Link to="/" className="btn btn-warning m-1"> Back</Link>
         </form>
      
      
      </>
  )
}

export default EditContact;