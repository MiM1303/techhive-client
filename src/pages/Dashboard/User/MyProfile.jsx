import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user, loading, setLoading, subscriptionCost, setSubscriptionCost } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-16 flex flex-col items-center gap-5">
      <h2 className="text-center md:mt-16 mb-6 text-3xl font-bold text-[#442537] border-b-4 p-5 rounded-xl border-[#5CE1E6] ">
        {user.displayName}'s Profile
      </h2>
      <img
        className="w-9 h-9 md:w-10 md:h-10 lg:w-40 lg:h-40 border-[#5CE1E6] border-8 rounded-full btn-circle avatar"
        src={user.photoURL}
        alt=""
      />
      <div className="overflow-x-auto">
        <table className="table text-xl">
          <tbody>
            {/* row 1 */}
            <tr className="bg-[#EDFAF6]">
              <th className="p-10">Name:</th>
              <td>{user.displayName}</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th className="p-10">Email:</th>
              <td>{user.email}</td>
            </tr>
            {/* row 3 */}
            <tr className="bg-[#EDFAF6]">
              <th className="p-10">Photo URL:</th>
              <td>{user.photoURL}</td>
            </tr>
            {/* row 4 */}
            {userData.membership_status === "Verified" ? (
              <tr>
                <th className="p-10">Membership Subscription Status:</th>
                <td>{userData.membership_status}</td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        {userData.membership_status === "Not Verified" ? (
          <Link to="/dashboard/payment">
            <button 
              onClick={()=>{
                setSubscriptionCost(20); 
                console.log(subscriptionCost)}} className="btn bg-transparent border-[#5CE1E6] mt-6 hover:bg-[#EDFAF6] hover:text-black hover:border-[#5CE1E6] text-lg font-semibold flex mx-auto">
              Subscribe
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
