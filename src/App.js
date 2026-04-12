import React from 'react';
import './App.css';

function App() {
  const groupNumber = 'Group 3';
  const teamMembers = [
    'Thiago Barbosa Lima',
    'Marianna Rangel Antunes',
    'Gunther Dos Santos',
    'Daniela Souza Freire',
    'Bruno Alves Martins',
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>{groupNumber}</h1>
        <h2>Team Members</h2>
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;