import { useState } from "react";

const DEFAULT_ITEM = {name: "", price: ""};

const AddItemForm = ({ updateNewItem }) => {
  const [formData, setFormData] = useState(DEFAULT_ITEM);

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
    updateNewItem(formData);
    setFormData(DEFAULT_ITEM);
  }

  return(
    <form className="AddItem" onSubmit={handleSubmit}>
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
      <button className="AddItem add-item-btn">add new item</button>
    </form>
  );
}

export default AddItemForm;