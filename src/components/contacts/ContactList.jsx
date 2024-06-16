import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';  
import { ContactServer } from '../servers/ContactServer';
import Spinner from './Spinner';

function App() {


   const[state, setState] = useState({
        loading:false,
        contacts:[],
        errorMessage:""
    })

   useEffect(  ()=>{
    async function fetchData() {
      
      const response = await ContactServer.getAllDetails();
      setState({
        ...state,
        contacts: response.data,
        loading:false
      })
      // ...
    }
    fetchData();
     
   }, [])

   const {loading, contacts, errorMessage }= state

 

  return (

    <> 
    <h1> Thanks for the visiting webpage </h1>
    <p> IF you are interested plase click the below link and register </p>
    <Link to='/addcontact'>
      register your details
    </Link>
    {
      loading ? <Spinner/> : <> 
        
        <div className='bb'>
        {contacts.length>0 && contacts.map((contact)=>{
          return  <div className="flex-container">
          <div className="card">
            <div className="card-body">
              <p>Name: {contact.name}</p>
              <p>Age: {contact.age}</p>
              <p>Blood Group: {contact.blood}</p>
              <p>Phone Number: {contact.phone}</p>
              <div className="links">
                <Link to={`/viewcontact/${contact.id}`}>
                  <p>View Complete Info <i className="bi bi-eye"></i></p>
                </Link>
                <Link to={`/editcontact/${contact.id}`}>
                  <p>Edit Details <i className="bi bi-pencil-square"></i></p>
                </Link>
              </div>
            </div>
          </div>
           
       
        </div>
        })}
        </div>
      
       </>
    }
    
    </>
  );
}

export default App;
