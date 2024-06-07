import "../Shared/Shared.css"
import header_img from "../../assets/Header.jpg"

const Header = () => {
    return (
        <div className="bg-[linear-gradient(45deg,rgba(19,19,24,0.50),rgba(19,19,24,0.50)),url('./assets/Header.jpg')] bg-left-bottom h-[250px]">
            {/* <img className="h-[400px] w-full" src={header_img} alt="" /> */}
            <p>Add Product</p>
        </div>
    );
};

export default Header;