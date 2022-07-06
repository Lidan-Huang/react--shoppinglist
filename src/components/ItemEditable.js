import {useState} from 'react';
import ItemForm from './ItemForm';
import Item from "./Item";

const ItemEditable = ({ name, price, updateItem }) => {
  const [isEdit, setIsEdit] = useState(false);

  const editItem = () => {
    setIsEdit(true);
  }

  const removeItem = () => {

  }

  const showForm = ({name, price}) => {
    updateItem({name, price});
    setIsEdit(false);
  }

  return (
    <>
      <Item name={name} price={price} />
      {isEdit === true ? <ItemForm
        updateItem={showForm}
        existData={{ name, price }} />
        : <div>
          <button onClick={() => editItem()}>Edit Item</button>
          <button onClick={() => removeItem()}>Remove Item</button>
        </div>}
    </>
  )
}

export default ItemEditable;