
document.addEventListener('DOMContentLoaded', function() {
    // Define the API endpoint for fetching data
    const API_ENDPOINT = 'https://api.example.com'; // Replace with your actual API endpoint

    // FUNCTION to fetch and display the roster of players
    async function fetchRoster() {
        try {
            // Make a GET request to fetch the roster data
            const response = await fetch(`${API_ENDPOINT}/roster`);
            
            // Check if the response is not OK
            if (!response.ok) throw new Error('Network response was not ok');
            
            // Parse the JSON data from the response
            const roster = await response.json();
            
            // Get the roster list element from the DOM
            const rosterList = document.getElementById('roster-list');
            // Clear any existing content in rosterList
            rosterList.innerHTML = '';
            
            // Loop through each player in the roster
            roster.forEach(player => {
                // Create a new div for the player
                const playerDiv = document.createElement('div');
                playerDiv.className = 'player';
                
                // Set the inner HTML content for playerDiv with player details
                playerDiv.innerHTML = `
                    <img src="${player.photo}" alt="${player.name}">
                    <h3>${player.name}</h3>
                    <button onclick="viewPlayerDetails(${player.id})">View Details</button>
                `;
                
                // Append the playerDiv to the rosterList
                rosterList.appendChild(playerDiv);
            });
        } catch (error) {
            // Log any error that occurs while fetching the roster
            console.error('Error fetching roster:', error);
        }
    }

    // FUNCTION to fetch detailed information for a specific player
    async function viewPlayerDetails(playerId) {
        try {
            // Make a GET request to fetch player details
            const response = await fetch(`${API_ENDPOINT}/player/${playerId}`);
            
            // Check if the response is not OK
            if (!response.ok) throw new Error('Network response was not ok');
            
            // Parse the JSON data from the response
            const player = await response.json();
            
            // Get the player info element from the DOM
            const playerInfo = document.getElementById('player-info');
            // Set the inner HTML content for playerInfo with player's detailed info
            playerInfo.innerHTML = `
                <img src="${player.photo}" alt="${player.name}">
                <h3>${player.name}</h3>
                <p>Age: ${player.age}</p>
                <p>Breed: ${player.breed}</p>
            `;
        } catch (error) {
            // Log any error that occurs while fetching the player details
            console.error('Error fetching player details:', error);
        }
    }

    // Add event listener for the add-player form submission
    document.getElementById('add-player-form').addEventListener('submit', async function(event) {
        // Prevent the default form submission action
        event.preventDefault();
        
        // Create a FormData object from the submitted form
        const formData = new FormData(event.target);
        
        // Create a new player object with the form data
        const newPlayer = {
            name: formData.get('name'),
            age: formData.get('age'),
            breed: formData.get('breed'),
            photo: formData.get('photo')
        };
        
        try {
            // Make a POST request to add a new player
            const response = await fetch(`${API_ENDPOINT}/addPlayer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlayer)
            });
            
            // If the response is not OK, throw an error
            if (!response.ok) throw new Error('Network response was not ok');
            
            // Call fetchRoster to update the list of players
            fetchRoster();
        } catch (error) {
            // Log any error that occurs while adding a new player
            console.error('Error adding new player:', error);
        }
    });

    // Fetch the initial roster data when the script loads
    fetchRoster();
});

// Expose the viewPlayerDetails function to the global window object
window.viewPlayerDetails = viewPlayerDetails;
