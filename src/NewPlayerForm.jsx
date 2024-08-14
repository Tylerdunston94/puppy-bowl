import React, { useState } from 'react';

const NewPlayerForm = ({ addPlayer }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addPlayer({ name });
      setName('');
    }
  };

  return (
    <form className="new-player-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Player Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default NewPlayerForm;
