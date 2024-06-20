import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";


const EditCouponModal = ({currentCoupon, refetch}) => {
    const { _id, coupon_code, expiry_date, coupon_code_description, discount_amount } = currentCoupon;
    console.log('coupon', coupon_code, _id)
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const axiosSecure = useAxiosSecure();

    const [couponInfo, setCouponInfo] = useState({});
    const { data: coupon = {} } = useQuery({
            queryKey: ['coupon'],
            queryFn: async () => {
                const res = await axiosSecure.get(`/coupons/${currentCoupon._id}`);
                setCouponInfo(res.data);
                refetch();
                return res.data;
            },
    })


    const onSubmit = async(data) => {
        console.log(data);
        if(data.expiry_date===''){
            data.expiry_date = expiry_date;
        }
        const couponRes = await axiosSecure.put(`/coupons/${_id}`, data);
            console.log(couponRes.data)
            if(couponRes.data.modifiedCount > 0){
                // show success popup
                // reset();
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${couponInfo.coupon_code} is updated!.`,
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => {
                    window.location.reload(); // Refresh the page after the success alert
                });
                  document.getElementById('my_modal_5').close();
            }
        }
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Editing {couponInfo.coupon_code}!</h3>
                <p className="py-4">Edit details of the coupon and hit save!</p>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button onClick={() => document.getElementById('my_modal_5').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="modal-action">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body  rounded-xl p-6 w-1/2 mx-auto  bg-[#EDFAF6]">
                {/* coupon code */}
                <div className="form-control mb-3">
                    <label className="label">
                            <span className="label-text">Coupon Code</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" {...register("coupon_code", { required: true })} defaultValue={couponInfo.coupon_code}  />
                    </label>
                {errors.email && <span className="mt-3 text-[#FF5A3D]">This field is required</span>}
                </div>
                {/* expiry date */}
                <div className="form-control">
                    <label className="label">
                            <span className="label-text">Expiry Date</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="date" {...register("expiry_date", { required: false })} defaultValue={couponInfo.expiry_date} />
                    </label>
                </div>
                {/* coupon code description */}
                <div className="form-control">
                    <label className="label">
                            <span className="label-text">Description</span>
                    </label>
                    <label className="input input-bordered w-full flex items-center gap-2">
                        <input className="w-full" type="text" {...register("coupon_code_description", { required: true })} defaultValue={couponInfo.coupon_code_description}  />
                    </label>
                </div>
                {/* discount amount */}
                <div className="form-control">
                    <label className="label">
                            <span className="label-text">Discount Amount</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="number" {...register("discount_amount", { required: true })} defaultValue={couponInfo.discount_amount}  />
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-[#b6f8e4] text-black button-styles hover:bg-[#98fbdd]  text-lg ">Save</button>
                </div>
            </form>
                </div>
            </div>
            </dialog>
        </div>
    );
};

export default EditCouponModal;