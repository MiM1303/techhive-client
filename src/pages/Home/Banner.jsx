import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/Banner/WebApp.jpg'
import img2 from '../../assets/Banner/Mobileapp.jpg'
import img3 from '../../assets/Banner/Gaming.jpg'
import img4 from '../../assets/Banner/Software.jpg'
import img5 from '../../assets/Banner/AITool.jpg'
import "../Home/Banner.css"

const Banner = () => {
    return (
        <Carousel autoPlay="true" infiniteLoop="true" interval={2000} stopOnHover>
        {/* <Carousel> */}
                <div className="relative " >
                    <img className="bg-center image-container bg-contain z-2 " src={img1} />
                    <div className="absolute text-white top-1/4 right-4 lg:top-1/4 lg:right-60 z-10 space-y-2 lg:space-y-10">
                        <p className="text-sm lg:text-4xl font-semibold">Find All Your Necessary</p>
                        <p className="text-lg lg:text-7xl  font-bold">Web Applications!</p>
                        <p className="text-sm lg:text-2xl font-semibold">Out of hundreds of top-quality products, <br />pick out the one best suited for your needs!</p>
                    </div>
                </div>
                <div className="relative">
                    <img className="bg-center image-container bg-contain z-2 " src={img4} />
                    <div className="absolute text-white top-1/4 right-4 lg:top-1/4 lg:left-60 z-10  space-y-2 lg:space-y-10">
                        <p className="text-sm lg:text-4xl font-semibold">Find All Your Necessary</p>
                        <p className="text-lg lg:text-7xl  font-bold">Softwares!</p>
                        <p className="text-sm lg:text-2xl font-semibold">Out of hundreds of top-quality products, <br />pick out the one best suited for your needs!</p>
                    </div>
                </div>
                <div className="relative">
                    <img className="bg-center image-container bg-contain z-2 " src={img3} />
                    <div className="absolute text-white top-1/4 right-4 lg:top-1/4 lg:right-60 z-10 space-y-2 lg:space-y-10">
                        <p className="text-sm lg:text-4xl font-semibold">Find All Your Necessary</p>
                        <p className="text-lg lg:text-7xl  font-bold">Gaming Tools!</p>
                        <p className="text-sm lg:text-2xl font-semibold">Out of hundreds of top-quality products, <br />pick out the one best suited for your needs!</p>
                    </div>
                </div>
                <div className="relative">
                    <img className="bg-center image-container bg-contain z-2 " src={img5} />
                    <div className="absolute text-white top-1/4 right-4 lg:top-1/4 lg:left-60 z-10  space-y-2 lg:space-y-10">
                        <p className="text-sm lg:text-4xl font-semibold">Find All Your Necessary</p>
                        <p className="text-lg lg:text-7xl  font-bold">AI Tools!</p>
                        <p className="text-sm lg:text-2xl font-semibold">Out of hundreds of top-quality products, <br />pick out the one best suited for your needs!</p>
                    </div>
                </div>
                <div className="relative">
                    <img className="bg-center image-container bg-contain z-2 " src={img2} />
                    <div className="absolute text-white top-1/4 right-4 lg:top-1/4 lg:right-44 z-10 space-y-2 lg:space-y-10">
                        <p className="text-sm lg:text-4xl font-semibold">Find All Your Necessary</p>
                        <p className="text-lg lg:text-7xl  font-bold">Mobile Applications!</p>
                        <p className="text-sm lg:text-2xl font-semibold">Out of hundreds of top-quality products, <br />pick out the one best suited for your needs!</p>
                    </div>
                </div>
            </Carousel>
    );
};

export default Banner;