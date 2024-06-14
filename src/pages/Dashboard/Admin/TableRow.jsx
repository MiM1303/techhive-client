import { RiAdminFill } from "react-icons/ri";
import { FaUserShield } from "react-icons/fa6";

const TableRow = ({users, user, setUsers}) => {

    const handleRoleUpdate = () =>{


        fetch(`http://localhost:5000/users/${user.user_email}?role=${user.email}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data=>{
            
            console.log(data);

        })
    }

    return (
        <tr>       
            {/* User Name */}
            <td>{user.user_name}</td>
            {/* User Email */}
            <td>{user.user_email}</td>
            {/* Make Moderator Button */}
            <th className="text-xl text-warning">
                {/* <Link to={`/update-product/${_id}`}> */}
                    <button onClick={()=>{handleRoleUpdate("Moderator")}} className="btn btn-ghost btn-xs"><FaUserShield className="text-3xl text-warning text-center"/></button>
                {/* </Link> */}
            </th>
            {/* Make Admin Button */}
            <th className="text-xl text-red-600">
            <button onClick={()=>{handleRoleUpdate(user.user_email)}} className="btn btn-ghost btn-xs"><RiAdminFill className="text-3xl text-error text-center"/></button>
            </th>
        </tr>
    );
};

export default TableRow;