import axios from "axios";
import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";

function Users () {
    const [users, setUsers] = useState([]) // Define a state variable 'users' to store the user data

// Use the useEffect hook to fetch user data when the component mounts
useEffect(() => {
    axios.get('http://localhost:3001') // Send a GET request to fetch user data from the server
        .then(result => setUsers(result.data)) // Set the 'users' state with the fetched data
        .catch(err => console.log(err)); // Handle any errors by logging them
}, []); // The empty dependency array ensures this effect runs only once on component mount

// Define a function to handle user deletion
const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteUser/' + id) // Send a DELETE request to delete a user
        .then(res => {
            console.log(res); // Log the response from the server
            window.location.reload(); // Reload the page to reflect the updated user list
        })
        .catch(err => console.log(err)); // Handle any errors by logging them
}


    // useEffect(() => {
    //     axios.get('http://localhost:3001')
    //     .then(result => setUsers(result.data))
    //     .catch(er => console.log(err))
    // }, [])

    // const handleDelete = (id) => {
    //     axios.delete('http://localhost:3001/deleteUser/'+id)
    //     .then(res => {console.log(res)
    //     window.location.reload()})
    //     .catch(err => console.log(err))
    // }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='vw-100 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success' >Add +</Link>
                <table className='table'> 
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((user) => {     // Map over the 'users' array and render user data in a table ro
                       return <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                            <Link to={`/update/${user._id}`} className='btn btn-success' >Update</Link>
                                <button className='btn btn-danger' 
                                onClick={(e) => handleDelete(user._id)} >Delete</button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;