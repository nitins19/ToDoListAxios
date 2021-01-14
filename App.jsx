import React, { useState } from 'react';
import axios from "axios";
function App()
{  
    
    const apiendpoint="https://crudcrud.com/api/42049adc7c084db8af406cfa24a874ea";
    const[item,updateditem]=useState("");
    document.addEventListener("DOMContentLoaded", () => {
        async function getUserData() {
            await axios.get(`${apiendpoint}/checklist`).then((data) => {
    
                for (let i = 0; i < data.data.length; i++) {
                    addNewLineElement(data.data[i]);
                }
    
            });
        }
        getUserData();
    });
    function inputEvent(event)
    {
      updateditem(event.target.value);
    }
    function addNewLineElement(object)
    {
        const ul = document.getElementById("listOfPeople");
        const li = document.createElement("li");
        const deletebutton = document.createElement("input");
        deletebutton.type = "button";
        deletebutton.value = "x";
        deletebutton.addEventListener("click", () => {
            li.remove();
            axios.delete(`${apiendpoint}/checklist/${object._id}`);
        });
        li.appendChild(deletebutton);
        li.appendChild(document.createTextNode(object.name));
        ul.appendChild(li);
        console.log(object);
    }
    function listofItems()
    {
    const useritems = {
        name: item
    };
    axios.post(`${apiendpoint}/checklist`, useritems).then((data) => {
        addNewLineElement(data.data);
    });
    updateditem('');
    }
    

    return(<>
    <div className="card">
    <div className="heading">
    <h1> Todo List</h1>
    </div>
    <div className="two">
    <input type="text" placeholder="Add an item" id="uniqueitem" onChange={inputEvent} value={item} />
    <button onClick={listofItems} id="submit">+</button>
    </div>
     <ul id="listOfPeople"></ul>
    </div>

    </>);
}
export default App;
