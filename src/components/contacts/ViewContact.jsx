import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContactServer } from '../servers/ContactServer';
import Spinner from './Spinner';

const ViewContact = () => {
  const { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: ""
  });

  
useEffect(()=>{

  const fetchData = async ()=>{
     try {
      setState({...state, loading:true});
      let response = await ContactServer.getOne(contactId)
       setState({
        ...state,
        loading:false,
        contact:response.data
       })
     } catch (error) {
      setState({
        ...state,
        loading:false,
        errorMessage:error.message
       })
     }
  }
  fetchData()

},[contactId])



  let { contact, loading, errorMessage } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        contact && (
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <p>Name: {contact.name}</p>
              <p>Age: {contact.age}</p>
              <p>Blood Group: {contact.blood}</p>
              <p>Phone Number: {contact.phone}</p>
              <p>Gender: {contact.gender}</p>
              <p>Place: {contact.place}</p>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ViewContact;
