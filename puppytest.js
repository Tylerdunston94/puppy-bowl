global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  
  const fetch = require('jest-fetch-mock');
fetch.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

const API_ENDPOINT = 'https://api.example.com';

document.body.innerHTML = `
  <div id="roster-list"></div>
`;

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

test('fetches and displays roster', async () => {
  const mockPlayers = [
    { id: 1, name: 'Puppy 1', photo: 'photo1.jpg' },
    { id: 2, name: 'Puppy 2', photo: 'photo2.jpg' },
  ];
  fetch.mockResponseOnce(JSON.stringify(mockPlayers));

  await fetchRoster();

  const rosterList = document.getElementById('roster-list');
  expect(rosterList.children.length).toBe(2);
  expect(rosterList.children[0].querySelector('h3').textContent).toBe('Puppy 1');
});
