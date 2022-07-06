import {useState} from 'react';
import ItemEditable from './components/ItemEditable';
import ItemForm from './components/ItemForm';
import { v4 as uuid } from 'uuid';
import './App.css';

const BASE_URL = "http://localhost:3001/items";

function App() {
  const [data, setData] = useState(null);

  //getItems is a function
  const getItems = async() => {
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

  const addNewItem =  async({name, price}) => {
      const response = await fetch(`${BASE_URL}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, price}),
      });  
      
      const d = await response.json();
      // one way to get the data with two await
      // const extractData = res => res.json();
      // const d = await extractData(response);

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

  const updateItem = async ({name, price}) => {
    const response = await fetch(`${BASE_URL}/${name}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({name, price})
    });
    const newRes = await response.json();
    console.log('newRes', newRes);
    setData((d) => d.map((item) => item.name !== newRes.updated.name ? item : {...newRes.updated, id:item.id}));
  };

  return (
   <div className='App'>
    <button className="App items-btn" onClick={() => getItems()}>get items</button>
    {data && data.map((d) => {
      return <ItemEditable 
                name={d.name} 
                price={d.price} 
                updateItem={updateItem}
                key={d.id}/>
    })}
    <ItemForm addNewItem={addNewItem} />
   </div>
  );
}

export default App;