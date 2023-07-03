"use client"
import { useState } from 'react';

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

const PersonsList = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: '' }]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterName, setFilterName] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const newPersons = {
      name: newName,
      number: newNum,
    };

    const checkName = persons.find((person) => person.name.toLowerCase() === newPersons.name.toLowerCase());

    if (JSON.stringify(newPersons) === JSON.stringify(checkName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPersons));
    }

    setNewName('');
    setNewNum('');
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        addName={addName}
      />
      <PersonsList persons={persons} />
      <div>filter results</div>
      <PersonsList persons={filteredPersons} />
    </div>
  );
};

export default App;

