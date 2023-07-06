"use client"
import { useState, useEffect } from 'react';
import personService from './services/person.js'

const Filter = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      filter shown with:
      <input value={filterName} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({ newName, newNum, handleNameChange, handleNumChange, addName }) => {
  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
          number:
          <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const PersonsList = ({ persons, remove }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => remove(person.id)}>DELETE</button>
        </div>
      ))}
    </div>
  );
}; 

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="border border-black-700 rounded-md bg-gray-400 p-2.5 my-2.5 border-solid border-2 text-lg ">
      {message.toString()}
    </div>
  )
}

/*const AfterFilter = (props) => {
  return(
  <div>{props.afterFilter}</div>
  )}
*/
const App = () => {
  const [persons, setPersons] = useState([{ name: '' }]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterName, setFilterName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const dataHook = () => {
    personService 
      .getAll()
      .then( initialData => setPersons(initialData))
  }

  useEffect(dataHook, [])

  const addName = (event) => {
    event.preventDefault();
    const newPersons = {
      name: newName,
      number: newNum,
    };

    const checkName = persons.find((person) => person.name.toLowerCase() === newPersons.name.toLowerCase());
    const changedPerson = { ...checkName, number:newNum}

    if (checkName && checkName.number === newPersons.number) {
      setErrorMessage(`${newName} is already added to phonebook`);
    } else if(checkName && checkName.number !== newPersons.number){
      if(window.confirm(`${newName} already in phonebook, do you want to change number`)) {
      personService
        .update(checkName.id, changedPerson)
        .then(returnedPerson =>{
          setPersons(persons.map(i => i.id !== checkName.id ? i : returnedPerson))
          setTimeout(() => {
              setErrorMessage(`number of ${newName} is changed`)
            }, 5000)
        })
         .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server`);
            setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})
    }
    } else {
      personService
        .create(newPersons)
        .then( returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`Successfully added ${newName}`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        })
        .catch(error => {
          setErrorMessage(error)
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})
      }

    setNewName('');
    setNewNum('');
  };

 
const removePerson = (id) => {
  const remove = persons.find((person) => person.id === id);
  if (remove && window.confirm(`${remove.name} want to remove?`)) {
    personService
      .removePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => window.alert(error));
  }
};


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()));
/* const afterFilter = filteredPersons.map((person, index) => (
  <div key={index}>
    {person.name} {person.number}
    <button onClick={() => removePerson(person.id)}>DELETE</button>
  </div>
));
*/
  return (
    <div>
     
      <h2 className="text-2xl">Phonebook</h2>
     
      <Notification message={errorMessage} />

      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        addName={addName}
      />
      <PersonsList persons={persons} remove={removePerson}/>
      <div>filter results</div>
      <PersonsList persons ={filteredPersons} remove={removePerson} />
    </div>
  );
};

export default App;

