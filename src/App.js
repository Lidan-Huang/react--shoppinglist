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
      const response = await fetch(`${BASE_URL}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, price}),
      });  
      
      // one way to get the data with two await
      const extractData = res => res.json();
      const d = await extractData(response);

      // use '.then' to get the data
      // .then(res => {
      //   if(res.ok) return res.json()        
      // });
      // .then(res => {
      //   const newRes = {...res.added, id: uuid()};
      //   setData((d) => [...d, newRes]);
      // });
      const newRes = {...d.added, id: uuid()};
      setData((elems) => [...elems, newRes]);
      console.log("new item from app:", d);
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