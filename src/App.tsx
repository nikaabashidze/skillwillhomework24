import React, { useEffect, useState } from 'react';
import './App.css';
import UserForm from './components/userForm';

interface User {
    firstname: string;
    lastname: string;
    id: string;
}

type FormSubmitHandler = (firstname: string, lastname: string) => void;

const API_KEY = 'qInet3aKDxfSOPq3FrG_eu5XKuHY9DRDQAipl7fIrKlbboZOFw';

function App() {
    const [userList, setUserList] = useState<User[]>([]);
     


  useEffect (() => {
    fetch('api/v1/users',{
      method: "GET",
      headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${API_KEY}`
      },   
    })
    .then(res => {
      if (!res.ok) throw new Error("response failed");
      return res.json() as Promise<{ items: { firstname: string; lastname: string; _uuid: string }[] }>;
  })
  .then(data => setUserList(data.items.map(user => {
    return {
      firstname: user.firstname,
      lastname:user.lastname,
      id: user._uuid
    }
})))
  .catch(err => console.log(err));
  },[])










    const getUsers = () => {
      fetch('api/v1/users',{
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${API_KEY}`
        },
      
      
      })
      .then(res => {
        if (!res.ok) throw new Error("response failed");
        return res.json() as Promise<{ items: { firstname: string; lastname: string; _uuid: string }[] }>;
    })
    .then(data => setUserList(data.items.map(user => {
      return {
        firstname: user.firstname,
        lastname:user.lastname,
        id: user._uuid
      }
  })))
    .catch(err => console.log(err));
    }






    const onFormSubmit: FormSubmitHandler = (firstname, lastname) => {
        fetch('api/v1/users', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify([{ firstname, lastname }])
        })
        .then(res => {
            if (!res.ok) throw new Error("response failed");
            return res.json() as Promise<{ items: { firstname: string; lastname: string; _uuid: string }[] }>;
        })
        .then(data => setUserList((prev) =>  [
            { 
                firstname: data.items[0].firstname,
                lastname: data.items[0].lastname,
                id: data.items[0]._uuid
            },
            ...prev,
        ]))
        .catch(err => console.log(err));
    };

    return (
      <div className="App">
          <UserForm onFormSubmit={onFormSubmit} />
          <button onClick={getUsers}>GET users</button>
          <button onClick={() => setUserList([])}>Clear users</button>
          {userList.map((user) => (
              <div key={user.id} style={{border: "1px solid black"}}>
                  <h3>{user.firstname}</h3>
                  <h3>{user.lastname}</h3>
              </div>
          ))}
      </div>
  );
  
}

export default App;
