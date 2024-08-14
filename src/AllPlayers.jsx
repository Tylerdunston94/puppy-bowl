import React, { useState } from 'react';

const AllPlayers = ({ players, deletePlayer }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="new-player-form">
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search players" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <ul className="player-list">
        {filteredPlayers.map(player => (
          <li className="player-list-item" key={player.name}>
            {player.name} 
            <button onClick={() => deletePlayer(player.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPlayers;

