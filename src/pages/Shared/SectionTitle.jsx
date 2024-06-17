

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mb-12">
            <h2 className="border-y-2 md:border-y-4 w-fit mx-auto rounded-2xl p-3 md:p-4 bg-[#EDFAF6] border-[#98fbdd] text-center lg:text-4xl text-2xl mt-3 lg:mt-5 font-semibold text-black">{heading}</h2>
            <p className=" text-center mt-5 text-sm lg:text-xl">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;