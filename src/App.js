import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ContactList from "./components/contacts/ContactList";
import AddContact from "./components/contacts/AddContact";
import EditContact from "./components/contacts/EditContact";
import ViewContact from "./components/contacts/ViewContact";
import Spinner from "./components/contacts/Spinner";
function App() {
  return (
    <>
     
       <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/contact"/>} />
        <Route path="/contact" element={<ContactList/>} />
        <Route path="/addcontact" element={<AddContact/>} />
        <Route path="/editcontact/:contactId" element={<EditContact/>} />
        <Route path="/viewcontact/:contactId" element={<ViewContact/>} />

      </Routes>
      
    </>
  );
}

export default App;
