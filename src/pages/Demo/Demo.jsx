import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { useForm } from "react-hook-form"

const Demo = () => {
  const [selected, setSelected] = useState(["papaya"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(selected)

  const onSubmit = (data) =>{
    console.log('got data',data, selected);
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} action="">
                  <div className="form-control flex flex-col md:flex-row gap-4 md:gap-14">
                    {/* item 1 */}
                    <div className="md:w-1/2">
                      <label className="input input-bordered flex items-center text-base md:text-xl h-16 gap-2">
                        Add Tags:
                      </label>
                        <pre>{JSON.stringify(selected)}</pre>
                        <TagsInput
                          value={selected}
                          onChange={setSelected}
                          name="product_tags"
                          placeHolder="enter tags"
                          {...register("product_tags", { required: true })}
                        />
                      
                    </div>

                  </div>
                <div className="form-control mt-6">
                    <button className="btn bg-[#cb946a] button-styles text-base font-bold lg:text-xl  pb-10 pt-4 flex items-center justify-center">
                        Add
                    </button>
                </div>
        </form>
        <h1>Add Fruits</h1>
        
        <em>press enter or comma to add new tag</em>
      </div>
    </div>
  );
};

export default Demo;
