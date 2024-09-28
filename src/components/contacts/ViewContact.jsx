import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContactServer } from '../servers/ContactServer';
import Spinner from './Spinner';
import './viewcontact.css'; // Import the CSS file

const ViewContact = () => {
  const { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactServer.getOne(contactId);
        setState({
          ...state,
          loading: false,
          contact: response.data
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message
        });
      }
    };
    fetchData();
  }, [contactId]);

  let { contact, loading, errorMessage } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : errorMessage ? (
        <div className="error">{errorMessage}</div>
      ) : (
        contact && (
          <div className="card">
            <div className="card-body">
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Age:</strong> {contact.age}</p>
              <p><strong>Blood Group:</strong> {contact.blood}</p>
              <p><strong>Phone Number:</strong> {contact.phone}</p>
              <p><strong>Gender:</strong> {contact.gender}</p>
              <p><strong>Place:</strong> {contact.place}</p>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ViewContact;
