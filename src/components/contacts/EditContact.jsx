import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactServer } from '../servers/ContactServer';
import './editcontact.css'; // Import the CSS file here

const EditContact = () => {
  let navigate = useNavigate();
  const { contactId } = useParams();

  let [updatedState, setUpdatedState] = useState({
    loading: false,
    contact: {
      name: "",
      age: "",
      gender: "",
      phone: "",
      place: "",
      blood: ""
    },
    errorMessage: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUpdatedState({ ...updatedState, loading: true });
        let response = await ContactServer.getOne(contactId);
        setUpdatedState({
          ...updatedState,
          loading: false,
          contact: response.data
        });
      } catch (error) {
        setUpdatedState({
          ...updatedState,
          loading: false,
          errorMessage: error.message
        });
      }
    }
    fetchData();
  }, [contactId]);

  const handleInput = (e) => {
    setUpdatedState({
      ...updatedState,
      contact: {
        ...updatedState.contact,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdatedState({ ...updatedState, loading: true });
      let response = await ContactServer.editContact(contactId, updatedState.contact);
      console.log(response);
      if (response) {
        navigate("/contact", { replace: true });
      }
    } catch (error) {
      setUpdatedState({
        ...updatedState,
        loading: false,
        errorMessage: error.message
      });
      navigate("/addcontact", { replace: false });
    }
  };

  let { contact, loading, errorMessage } = updatedState;

  return (
    <>
      <p>We are Happy, You are also part of the Blood Donation</p>
      <p>Edit your details</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' value={contact.name} onChange={handleInput} placeholder='Enter your name' />

        <label htmlFor="age">Age</label>
        <input type="text" name='age' value={contact.age} onChange={handleInput} placeholder='Enter your age' />

        <div className="gender-group">
          <label>Gender</label>
          <label>
            <input type="radio" name="gender" value="male" checked={contact.gender === "male"} onChange={handleInput} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={contact.gender === "female"} onChange={handleInput} /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" checked={contact.gender === "other"} onChange={handleInput} /> Other
          </label>
        </div>

        <label htmlFor="phone">Phone Number</label>
        <input type="text" name='phone' value={contact.phone} onChange={handleInput} placeholder='Enter your phone number' />

        <label htmlFor="place">Place</label>
        <input type="text" name='place' value={contact.place} onChange={handleInput} placeholder='Enter your place' />

        <label htmlFor="blood">Blood Group</label>
        <select name='blood' value={contact.blood} onChange={handleInput}>
          <option value="">Select the Blood Group</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="O">O</option>
          <option value="A-">A-</option>
        </select>

        <button className="btn btn-primary">Update Details</button>
        <Link to="/" className="btn btn-warning m-1">Back</Link>
      </form>
    </>
  );
}

export default EditContact;
