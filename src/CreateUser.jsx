import React,{useState} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CreateUser() {
    const [name, setName] = useState(); // Define state for 'name' and initialize it to undefined
    const [email, setEmail] = useState(); // Define state for 'email' and initialize it to undefined
    const [age, setAge] = useState(); // Define state for 'age' and initialize it to undefined
    const navigate = useNavigate(); // Get the navigation function from React Router

    const Submit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        axios.post("http://localhost:3001/createUser", { name, email, age }) // Send a POST request to create a user
            .then((response) => {
                console.log(response);
                console.log(response.data);
                navigate('/'); // Navigate back to the home page after user creation
            })
            .catch((error) => {
                console.log("Error:", error); // Handle and log any errors that occur during the request
            });
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
           <div className='vw-100 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className='form-control' 
                        // Update the 'name' state on input change
                        onChange={(e) => setName(e.target.value)}/>  
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className='form-control' 
                         onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder="Enter Age" className='form-control' 
                         onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
           </div>
        </div>
    )
}


export default CreateUser;