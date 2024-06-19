import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const MyProfile = () => {
  const { user, loading, setLoading, subscriptionCost, setSubscriptionCost, discountAmount, setDiscountAmount } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const {register, handleSubmit, formState: { errors }} = useForm();
  const axiosPublic = useAxiosPublic();
  // const [coupons, setCoupons] = useState([]);
  const coupons = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://techhive-server.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  // console.log(document.getElementById('coupon_text').value);

  // console.log(coupons);
  const onSubmit = async(data) => {
      if (data.coupon_text === null || data.coupon_text === '') {
        // Navigate to payment if no coupon is added
        setDiscountAmount(0);
        navigate("/dashboard/payment");
        return; // Ensure no further code is executed
      }

      if(data.coupon_text === null){
        navigate("/dashboard/payment");
      }
      if(data.coupon_text!==''){
        console.log('user added coupon');

        const matchingCoupon = coupons.find(coupon => coupon.coupon_code === data.coupon_text);

        if (matchingCoupon) {
          setDiscountAmount(matchingCoupon.discount_amount);
          // console.log(`The discount amount is: $${discountAmount}`);
          navigate("/dashboard/payment");
        } else {
          toast.error('Invalid Coupon Code!');
        }
      }
      
      //   if(!coupons.some(coupon => coupon.coupon_code === data.coupon_text)){
      //     console.log('checking coupon match',coupons.includes(data.coupon_text));
      //     toast.error('Invalid Coupon Code!');
      //     return;
      //   }
      //   else{
      //     console.log('Coupon code from profile', data.coupon_text);
      //     setCouponCode(data.coupon_text);
      //     navigate("/dashboard/payment");
      //   }
      // }
      // else{
      //   console.log('Coupon code from profile', data.coupon_text);
      //   setCouponCode(data.coupon_text);
      //   navigate("/dashboard/payment");
      // }
      
}

  return (
    <div className=" flex flex-col items-center gap-5 max-w-9/12">
      <ToastContainer/>
      <h2 className="text-center font-medium text-3xl mt-10 border-b-4 w-fit mx-auto rounded-2xl p-4  border-[#98fbdd] mb-12">
        {user.displayName}'s Profile
      </h2>
      <img
        className="w-20 h-20 md:w-24 md:h-24 lg:w-40 lg:h-40 border-[#5CE1E6] border-8 rounded-full btn-circle avatar"
        src={user.photoURL}
        alt=""
      />
      <div className="overflow-x-auto max-w-1/2">
        <table className="table text-xl max-w-1/2">
          <tbody className="max-w-[200px]">
            {/* row 1 */}
            <tr className="bg-[#EDFAF6]">
              <th className="md:p-10 text-base md:text-lg ">Name:</th>
              <td className="w-40 text-base">{user.displayName}</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th className="md:p-10 text-base md:text-lg">Email:</th>
              <td className=" text-base">{user.email}</td>
            </tr>
            {/* row 3 */}
            {/* <tr className="bg-[#EDFAF6] md:max-w-1/4">
              <th className="p-10 md:text-lg">Photo URL:</th>
              <td className=""><p className="max-w-1/12">{user.photoURL}</p></td>
            </tr> */}
            {/* row 4 */}
            {userData.membership_status === "Verified" ? (
              <tr className="bg-[#EDFAF6]">
                <th className="md:p-10 text-base md:text-lg">Membership Subscription Status:</th>
                <td className=" text-base">{userData.membership_status}</td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        {userData.membership_status === "Not Verified" ? <>
          <h2 className="mt-10 text-center text-xl font-medium mb-4">Subscribe to our membership below to enjoy added benefits!</h2>
          <div className="flex flex-row">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body rounded-xl p-6 max-w-fit mx-auto bg-[#EDFAF6] flex flex-row items-center justify-center">
                {/* Coupon Code */}
                <div className="form-control mb-3">
                <label className="label">
                        <span className="label-text">Enter a valid coupon code to avail discount!</span>
                </label>
                <label className="input input-bordered flex w-fit items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="text" id="coupon_text" className="w-fit" {...register("coupon_text", { required: false })} placeholder="Coupon Code" />
                </label>
                {errors.email && <span className="mt-3 text-[#FF5A3D]">This field is required</span>}
                </div>
                <div className="form-control mt-6">
                  {/* <Link to="/dashboard/payment"> */}
                    <button 
                      onClick={()=>{
                        setSubscriptionCost(20); 
                        // console.log(subscriptionCost);
                        }} className="btn bg-transparent border-[#5CE1E6] hover:bg-[#EDFAF6] hover:text-black hover:border-[#5CE1E6] text-lg font-semibold flex mx-auto">
                      $20
                    </button>
                  {/* </Link> */}
                </div>
              </form>
          </div>
         
          </> : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
