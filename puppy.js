document.addEventListener('DOMContentLoaded', function() {
    const API_ENDPOINT = 'https://api.example.com'; // Replace with your actual API endpoint

    async function fetchRoster() {
        try {
            const response = await fetch(`${API_ENDPOINT}/roster`);
            if (!response.ok) throw new Error('Network response was not ok');
            const roster = await response.json();
            const rosterList = document.getElementById('roster-list');
            rosterList.innerHTML = '';
            roster.forEach(player => {
                const playerDiv = document.createElement('div');
                playerDiv.className = 'player';
                playerDiv.innerHTML = `
                    <img src="${player.photo}" alt="${player.name}">
                    <h3>${player.name}</h3>
                    <button onclick="viewPlayerDetails(${player.id})">View Details</button>
                `;
                rosterList.appendChild(playerDiv);
            });
        } catch (error) {
            console.error('Error fetching roster:', error);
        }
    }

    async function viewPlayerDetails(playerId) {
        try {
            const response = await fetch(`${API_ENDPOINT}/player/${playerId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const player = await response.json();
            const playerInfo = document.getElementById('player-info');
            playerInfo.innerHTML = `
                <img src="${player.photo}" alt="${player.name}">
                <h3>${player.name}</h3>
                <p>Age: ${player.age}</p>
                <p>Breed: ${player.breed}</p>
            `;
        } catch (error) {
            console.error('Error fetching player details:', error);
        }
    }

    document.getElementById('add-player-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newPlayer = {
            name: formData.get('name'),
            age: formData.get('age'),
            breed: formData.get('breed'),
            photo: formData.get('photo')
        };
        try {
            const response = await fetch(`${API_ENDPOINT}/addPlayer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlayer)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchRoster();
        } catch (error) {
            console.error('Error adding new player:', error);
        }
    });

    fetchRoster();
});

window.viewPlayerDetails = viewPlayerDetails;
