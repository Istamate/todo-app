export default function TodoCard({
  id,
  title,
  description,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className=" bordered">
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="btn" onClick={handleDelete}>
        Delete
      </button>
      <button className="btn" onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
}
