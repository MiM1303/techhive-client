import { useEffect, useState } from 'react';
import {  Cell, PieChart, Pie, Legend } from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../Shared/SectionTitle';

const Statistics = () => {

    // custom shape for the pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const [numProducts, setNumProducts] = useState([]);
    const [numReviews, setNumReviews] = useState([]);

    // products
    useEffect(()=>{
        fetch("https://techhive-server.vercel.app/products")
        .then(res=>res.json())
        .then(data=>{
            setNumProducts(data);
            console.log('total products:', numProducts.length);
        })
    }, [])
    // users
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
            queryKey: ['users'],
            queryFn: async () => {
                const res = await axiosSecure.get('/users');
                return res.data;
            },
    })
   
    // reviews
    useEffect(()=>{
        fetch("https://techhive-server.vercel.app/reviews")
        .then(res=>res.json())
        .then(data=>{
            setNumReviews(data);
            console.log('total reviews:', numReviews.length)
        })
    }, [])

    

    const pieChartData = [
        { name: 'Total Products', value: numProducts.length },
        { name: 'Total Users', value: users.length },
        { name: 'Total Reviews', value: numReviews.length },
    ];


    return (
        <div>
            <SectionTitle heading="Website Statistics" subHeading="See the ratio of total products, users and reviews in a comprehensive manner as a pie chart!"></SectionTitle>
            <div className=" md:flex md:justify-center lg:w-1/2 mx-auto">
                    <PieChart width={380} height={380}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={140}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
        </div>
    );
};

export default Statistics;