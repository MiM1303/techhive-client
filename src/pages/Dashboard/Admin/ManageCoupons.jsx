import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CouponCard from "./CouponCard";
import Swal from "sweetalert2";
import { ImCross } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import EditCouponModal from "./EditCouponModal";


const ManageCoupons = () => {

    const {register, handleSubmit, formState: { errors }} = useForm();
    // const [coupons, setCoupons] = useState([]);
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/coupons`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         setCoupons(data);
    //     })
    // },[coupons])

    const [currentCoupon, setCurrentCoupon] = useState({});

    const axiosSecure = useAxiosSecure();
    const { data: coupons = [], refetch } = useQuery({
            queryKey: ['coupons'],
            queryFn: async () => {
                const res = await axiosSecure.get('/coupons');
                return res.data;
            },
    })



    const onSubmit = (data) => {
        console.log(data);
        axiosSecure.post('/coupons', data)
            .then(res => {
                if(res.data.insertedId){
                    refetch();
                    toast.success('Coupon added successfully!')
                }
            })
        }

        const handleEditCoupon = (id, coupon) =>{
            setCurrentCoupon(coupon)
            document.getElementById('my_modal_5').showModal();
        }
    
        const handleDeleteCoupon =(id, coupon) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
    
                    axiosSecure.delete(`/coupons/${coupon._id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        }       
                


    return (
        <div className="w-full">
            <SectionTitle heading="Manage Coupons" subHeading="See all added coupons and their details. Add new coupons in the form!"></SectionTitle>
            <ToastContainer/>
            {/* COUPON CARDS AND FORM */}
            <div className="">
            {/* COUPON FORM */}
            <h2 className="text-center font-medium text-3xl mt-10 border-b-4 w-fit mx-auto rounded-2xl p-4  border-[#98fbdd] mb-12">Add Coupon</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body  rounded-xl p-6 w-1/2 mx-auto  bg-[#EDFAF6]">
                {/* coupon code */}
                <div className="form-control mb-3">
                    <label className="label">
                            <span className="label-text">Coupon Code</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" {...register("coupon_code", { required: true })} placeholder="Coupon Code" />
                    </label>
                {errors.email && <span className="mt-3 text-[#FF5A3D]">This field is required</span>}
                </div>
                {/* expiry date */}
                <div className="form-control">
                    <label className="label">
                            <span className="label-text">Expiry Date</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="date" {...register("expiry_date", { required: true })} placeholder="Expiry Date" />
                    </label>
                </div>
                {/* coupon code description */}
                <div className="form-control">
                    <label className="label">
                            <span className="label-text">Description</span>
                    </label>
                    <label className="input input-bordered w-full flex items-center gap-2">
                        <input className="w-full" type="text" {...register("coupon_code_description", { required: true })} placeholder="Coupon Code Description" />
                    </label>
                </div>
                {/* discount amount */}
                <div className="form-control">
                    <label className="label">
                            <span className="label-text">Discount Amount</span>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="number" {...register("discount_amount", { required: true })} placeholder="Discount Amount" />
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-[#b6f8e4] text-black button-styles hover:bg-[#98fbdd]  text-lg ">Add Coupon</button>
                </div>
            </form>
            {/* COUPON CARDS */}
            <h2 className="text-center font-medium text-3xl mt-10 border-b-4 w-fit mx-auto rounded-2xl p-4  border-[#98fbdd]">Existing Coupons</h2>
            <div className='grid grid-cols-3 gap-10 p-10'>
                {coupons.map(coupon => 
                    <>
                    <div className="card max-w-96 bg-[#EDFAF6] shadow-xl">
                        <div className="card-body relative">
                            <div className="absolute flex flex-col gap-3 right-0 items-center mx-4">
                                <div><ImCross onClick={()=>{handleDeleteCoupon(coupon._id, coupon)}} className="text-red-500 text-xl"/></div>
                                <div><MdEdit onClick={()=>{handleEditCoupon(coupon._id, coupon)}} className="text-slate-500 text-2xl"/></div>
                            </div>
                            <h2 className="card-title text-center font-bold">{coupon.coupon_code}</h2>
                            <h2 className="card-title">Discount Amount: {coupon.discount_amount}</h2>
                            <p><span className="text-black font-medium">Valid Till: </span>{coupon.expiry_date}</p>
                            <p>{coupon.coupon_code_description}</p>
                        </div>
                    </div>
                   
                    </>
                    
                )}
                 {/* EDIT MODAL */}
                 <EditCouponModal currentCoupon={currentCoupon} refetch={refetch}></EditCouponModal>
            </div>

            
            </div>
        </div>
    );
};

export default ManageCoupons;