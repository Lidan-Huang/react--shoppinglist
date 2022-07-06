import { useState } from "react";

const DEFAULT_ITEM = {name: "", price: ""};

const ItemForm = ({ updateItem, addNewItem, existData }) => {
  const [formData, setFormData] = useState(existData || DEFAULT_ITEM);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData((fData) => (
      {
        ...fData,
        [name]: value,
      }
    ));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if(existData){
      updateItem(formData);
    }else{
      addNewItem(formData);
    }
    setFormData(DEFAULT_ITEM);
  }

  return(
    <form className="ItemForm" onSubmit={handleSubmit}>
      <label htmlFor="item-name">
        name:
      </label>
      <input 
        id="item-name"
        name='name'
        value={formData.name}
        type='text'
        onChange={handleChange}
      />
      <br></br>
      <label htmlFor="item-price">
        price:
      </label>
      <input 
        id="item-price"
        name='price'
        value={formData.price}
        type='text'
        onChange={handleChange}
      />  
      <br></br>
      {existData 
      ? <button className="ItemForm add-item-btn">Edit this item</button> 
      : <button className="ItemForm add-item-btn">add new item</button>}
    </form>
  );
}

export default ItemForm;