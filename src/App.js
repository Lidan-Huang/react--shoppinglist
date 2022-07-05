// import {useEffect, useState}
import './App.css';
const BASE_URL = "http://localhost:3000/items";


function App() {

  const items = async() => {
    await fetch(
                `${BASE_URL}`,{
                method: 'GET',
                })                                
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error ("Can't get the data!");
          }
        });
  };

  console.log("items from app:", items());
  return (
   <div>
    <button class="App items-btn" onClick={() => items()}>get items</button>
   </div>
  );
}

export default App;
