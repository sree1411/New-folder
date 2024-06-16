import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServer } from '../servers/ContactServer'

const AddContact = () => {

  let navigate = useNavigate();

let [state, setState] = useState({
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


const handleInput =  (e)=>{

     setState({
      ...state,
      contact:{
         ...state.contact,
         [e.target.name]:e.target.value
         
      }
     })
   
}



const handleSubmit = async(e)=>{
   e.preventDefault();

   try {
      setState({...state, loading:true})
      let response = await ContactServer.createContact(state.contact);
      if(response){
         navigate("/contact",  {replace:true})
      }
   } catch (error) {
      setState({...state, loading:false, 
         errorMessage:error.message
      })
      navigate("/addcontact", {replace:false})
   }

}



let {contact, loading, errorMessage} = state;
 

  return (
      <>

         <p> We are Happy, You are also part to the Blood Donation</p>
         <p> Add your details</p>
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
            
         
           <input type="submit" class="btn btn-primary"/>
            <Link to="/" class="btn btn-warning m-1"> Back</Link>
         </form>
      
      
      </>
  )
}

export default AddContact