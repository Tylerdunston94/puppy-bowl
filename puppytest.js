
global.fetch = jest.fn(() =>
  Promise.resolve({
      ok: true, // Simulate a successful response
      json: () => Promise.resolve([]), // Simulate a JSON response
  })
);

// Import the jest-fetch-mock library to handle fetch 
const fetch = require('jest-fetch-mock');
fetch.enableMocks(); // Enable fetch mocks

// Before each test, reset all mocks to avoid interference between tests
beforeEach(() => {
  fetch.resetMocks(); // Reset fetch calls and results
});

// Define a constant for the API endpoint
const API_ENDPOINT = 'https://api.example.com';

// Set up the initial HTML structure for testing
document.body.innerHTML = `
<div id="roster-list"></div> // This div will hold the roster of players
`;

// Define the async function to fetch and display the roster
async function fetchRoster() {
  try {
      // Make a GET request to the specified endpoint to fetch the roster
      const response = await fetch(`${API_ENDPOINT}/roster`);
      
      // Check if the response indicates failure
      if (!response.ok) throw new Error('Network response was not ok');
      
      // Paers the JSON data from the response
      const roster = await response.json();
      
      // Get the roster list element from the DOM
      const rosterList = document.getElementById('roster-list');
      
      // Clear any existing roster items in the list
      rosterList.innerHTML = '';
      
      // Loop through each player in the fetched roster
      roster.forEach(player => {
          // Create a new div for each player
          const playerDiv = document.createElement('div');
          playerDiv.className = 'player';
          
          // Set the inner HTML for the player div with player's details
          playerDiv.innerHTML = `
              <img src="${player.photo}" alt="${player.name}">
              <h3>${player.name}</h3>
              <button onclick="viewPlayerDetails(${player.id})">View Details</button>
          `;
          
          // the player div to the roster list
          rosterList.appendChild(playerDiv);
      });
  } catch (error) {
      // Log any errors encountered during the fetching process
      console.error('Error fetching roster:', error);
  }
}

// Jest test to fetch and display the roster
test('fetches and displays roster', async () => {
  // Mock player data to simulate API response
  const mockPlayers = [
      { id: 1, name: 'Puppy 1', photo: 'photo1.jpg' },
      { id: 2, name: 'Puppy 2', photo: 'photo2.jpg' },
  ];
  
  // the response of fetch for the current test case
  fetch.mockResponseOnce(JSON.stringify(mockPlayers));

  // Call the function to fetch and display the roster
  await fetchRoster();

  // Get the roster list element from the DOM
  const rosterList = document.getElementById('roster-list');
  
  // to verify that the roster has been displayed correctly
  expect(rosterList.children.length).toBe(2); // Check if 2 players were added
  expect(rosterList.children[0].querySelector('h3').textContent).toBe('Puppy 1'); // Check the first player's name
});

