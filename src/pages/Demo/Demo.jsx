import { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const Demo = () => {
  const [selected, setSelected] = useState(["papaya"]);

  return (
    <div>
      <div>
        <h1>Add Fruits</h1>
        <pre>{JSON.stringify(selected)}</pre>
        <TagsInput
          value={selected}
          onChange={setSelected}
          name="fruits"
          placeHolder="enter fruits"
        />
        <em>press enter or comma to add new tag</em>
      </div>
    </div>
  );
};

export default Demo;
