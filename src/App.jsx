import React, { useState } from 'react';
import AllPlayers from './components/AllPlayers';
import NewPlayerForm from './components/NewPlayerForm';
import NavBar from './components/NavBar'; // Optional

function App() {
  const [players, setPlayers] = useState([]);
  
  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  const deletePlayer = (playerName) => {
    setPlayers(players.filter(player => player.name !== playerName));
  };

  return (
    <div>
      <NavBar />
      <NewPlayerForm addPlayer={addPlayer} />
      <AllPlayers players={players} deletePlayer={deletePlayer} />
    </div>
  );
}

export default App;
