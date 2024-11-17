import { useState } from "react";

export default function TodoCard({
  id,
  title,
  description,
  handleDelete,
  handleEdit,
}) {
  const [isDone, setIsDone] = useState(false);

  const handleDone = () => {
    isDone ? setIsDone(false) : setIsDone(true);
  };

  return (
    <div
      className=" bordered"
      style={
        isDone
          ? { backgroundColor: "lightblue" }
          : { backgroundColor: "lightgrey" }
      }
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="btn" onClick={handleDelete}>
        Delete
      </button>
      <button className="btn" onClick={handleEdit}>
        Edit
      </button>
      <button className="btn" onClick={handleDone}>
        {isDone ? "Reopen" : "Ready"}
      </button>
    </div>
  );
}
