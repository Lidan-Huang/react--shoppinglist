// import {useEffect, useState}
import {useState} from 'react';
import Item from './components/Item';
import AddItemForm from './components/AddItemForm';
import { v4 as uuid } from 'uuid';
import './App.css';

const BASE_URL = "http://localhost:3001/items";

function App() {
  const [data, setData] = useState(null);
  // const [newItem, setNewItem] = useState(null);

  //items is a function
  const items = async() => {
    await fetch(`${BASE_URL}`,{method: 'GET'})                                
        .then(res => {
          if(res.ok) return res.json()        
        })
        .then(res => {
          const newRes = res.items.map((d) => {
            return {...d, id:uuid()}
          });
          setData(newRes);
        })
  };

  

  const updateNewItem =  async({name, price}) => {
      await fetch(`${BASE_URL}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, price}),
      })                                
      .then(res => {
        if(res.ok) return res.json()        
      })
      .then(res => {
        const newRes = {...res.added, id: uuid()};
        setData((d) => [...d, newRes]);
      });
  };

  return (
   <div>
    <button className="App items-btn" onClick={() => items()}>get items</button>
    {data && data.map((d) => {
      return <Item name={d.name} price={d.price} key={d.id}/>
    })}
    <AddItemForm updateNewItem={updateNewItem} />

   </div>
  );
}

export default App;