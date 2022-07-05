
const Item = ({name, price}) => {

  return (
    <div className="Item">
      <h1 className="Item-title">{name}</h1>
      <p className="Item-price">{price}</p>
    </div>
  )
};

export default Item
