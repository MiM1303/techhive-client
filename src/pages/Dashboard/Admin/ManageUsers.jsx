// import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";
// import TableRow from "./TableRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiAdminFill } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa6";
import Swal from "sweetalert2";


const ManageUsers = () => {
    
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
            queryKey: ['users'],
            queryFn: async () => {
                const res = await axiosSecure.get('/users');
                return res.data;
            }
        })
    
    // const [users, setUsers] = useState([]);
    // useEffect(()=>{
    //     fetch('https://techhive-server.vercel.app/users')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setUsers(data);
    //     })
    // },[])

    const handleRoleUpdate = (role,user) =>{
        console.log(role, user.user_name)
        if(role === user.role){
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${user.user_name} is already an ${role}!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
        axiosSecure.patch(`/users/${user.user_email}?role=${role}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${user.user_name} is an ${role} Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }


    return (
        <div>
            <SectionTitle heading="Manage Users" subHeading={`Number of Users: ${users.length}`}></SectionTitle>

            <div className="overflow-x-auto px-28">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Role</th>
                        <th>Make Moderator</th>
                        <th>Make Admin</th>
                    </tr>
                    </thead>
                    <tbody>

                    {/* rows  */}
                    {/* {
                        users.map(user=> <TableRow
                            key={user._id}
                            user={user}
                            users={users}
                            setUsers={setUsers}></TableRow>)
                    } */}

                    {
                        users.map(user=> <tr key={user._id}>       
                            {/* User Name */}
                            <td>{user.user_name}</td>
                            {/* User Email */}
                            <td>{user.user_email}</td>
                            {/* Role */}
                            <td>{user.role}</td>
                            {/* Make Moderator Button */}
                            <th className="text-xl text-warning text-center lg:pr-28">
                                {/* <Link to={`/update-product/${_id}`}> */}
                                    <button onClick={()=>{handleRoleUpdate("Moderator", user)}} className="btn btn-ghost btn-xs"><FaUserShield className="text-3xl text-warning"/></button>
                                {/* </Link> */}
                            </th>
                            {/* Make Admin Button */}
                            <th className="text-xl text-red-600 text-center lg:pr-20">
                            <button onClick={()=>{handleRoleUpdate("Admin", user)}} className="btn btn-ghost btn-xs"><RiAdminFill className="text-3xl text-error"/></button>
                            </th>
                        </tr>)
                    }
                    </tbody>                    
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;