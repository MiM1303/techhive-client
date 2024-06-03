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
        <Carousel>
                <div>
                    <img className="bg-bottom bg-contain " src={img1} />
                </div>
                <div>
                    <img className="bg-bottom bg-contain " src={img2} />
                </div>
                <div>
                    <img className="bg-bottom bg-contain " src={img3} />
                </div>
                <div>
                    <img className="bg-bottom bg-contain " src={img4} />
                </div>
                <div>
                    <img className="bg-bottom bg-contain " src={img5} />
                </div>
            </Carousel>
    );
};

export default Banner;