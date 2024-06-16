

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mb-12">
            <h2 className="border-y-4 w-fit mx-auto rounded-2xl p-4 bg-[#EDFAF6] border-[#98fbdd] text-center lg:text-4xl text-2xl mt-5 font-semibold text-black">{heading}</h2>
            <p className=" text-center mt-5 lg:text-xl">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;