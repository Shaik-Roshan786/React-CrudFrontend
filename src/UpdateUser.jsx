import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios'


function UpdateUser() {
    const { id } = useParams(); // Get the 'id' parameter from the URL using useParams()
    const [name, setName] = useState(); // Define state for 'name' and initialize it to undefined
    const [email, setEmail] = useState(); // Define state for 'email' and initialize it to undefined
    const [age, setAge] = useState(); // Define state for 'age' and initialize it to undefined
    const navigate = useNavigate(); // Get the navigation function from React Router

    // Use the useEffect hook to fetch the user's current information when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3001/getUser/' + id) // Send a GET request to fetch user data by ID
            .then(result => {
                console.log(result);
                setName(result.data.name); // Update the 'name' state with the fetched data
                setEmail(result.data.email); // Update the 'email' state with the fetched data
                setAge(result.data.age); // Update the 'age' state with the fetched data
            })
            .catch(err => console.log(err)); 
        }, []);

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/updateUser/"+id, {name,email,age})  // Send a PUT request to update the user
        .then((response) => {
            console.log(response); 
            console.log(response.data); 
            navigate('/')
          })
          .catch((error) => {
            console.log("Error:", error);
          });
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
           <div className='vw-100 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className='form-control' 
                        value={name}    onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className='form-control' 
                        value={email}    onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder="Enter Age" className='form-control' 
                        value={age}   onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
           </div>
        </div>
    )
}

export default UpdateUser;