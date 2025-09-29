// Get references to elements in the HTML
const fishList = document.getElementById("fish-list");   // where fish cards will be shown
const searchInput = document.getElementById("search");   // search bar
const fishForm = document.getElementById("fish-form");   // add fish form

// Function to create a card for one fish
// this function is called in the the getfish ... so to run we pas a value ..... and apparently we just use fish for the same but we passed the value in the getfish function this other fish is just acting as a lone arguement representing the previous value it was called by

function createFishCard(fish) {
  // we start of by creating a div that will hold the cards ..... and then make sure we will append it too
  const card = document.createElement("div");   // creating the div
  card.className = "fish-card";                 // add class for styling .... this is to allow same styling for the cards for a uniform ui

  //... note that the function is getting the values as a single object since we iterared over the values in the get fish function .... so we use the bracket notation
  card.innerHTML = `
    <h3>${fish.name}</h3>
    <img src="${fish.image}" alt="${fish.name}">
    <p>Price: KES ${fish.price}</p>
    <p>Likes: <span>${fish.likes}</span></p>
    <button>Like</button>
  `;

  // Grab the like button inside the card
  const likeBtn = card.querySelector("button");

  // When clicked, update likes in the db.json
  likeBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/fish/" + fish.id, {
      method: "PATCH",                                   // update existing record
      headers: { "Content-Type": "application/json" },   // tell server we send JSON
      body: JSON.stringify({ likes: fish.likes + 1 })    // increase likes by 1
    })
      .then(res => res.json())                           // convert response to JSON
      .then(updatedFish => {
        fish.likes = updatedFish.likes;                  // update fish object in memory
        card.querySelector("span").textContent = updatedFish.likes; // update likes on page
      });
  });

  return card;   // return ready card
}

// Fetch all fish and display them
//this is the first function to start ... so it runs the other functions
// and it starts by fetching the data to display the fish
function getFish() {
  fetch("http://localhost:3000/fish")        // request data from local server .... so when we back slash into fish to give us the whole array ...
    .then(res => res.json())                 // convert response to JSON
    .then(fishArray => {
      fishList.innerHTML = "";               // clear old cards ... this is a good habit to ensure we are placing our card in empty divs
      fishArray.forEach(fish => {            // loop through fish
        fishList.appendChild(createFishCard(fish));  // make a card and add it so we do this to ensure that the function we are creating has to offet back a value 
      }); //so i pass each fish .... meaning that in the whole array every object representing a fish will be iterated over and will be given to the the fish list and run the value of the cards generated from running the functions will be appended to the list of the div ....
    });
}

// Search functionality
searchInput.addEventListener("input", e => {
  fetch("http://localhost:3000/fish")       // get fish again
    .then(res => res.json())
    .then(fishArray => {
      const searchValue = e.target.value.toLowerCase();  // what user typed
      // filter fish whose names match the search
      const filtered = fishArray.filter(fish =>
        fish.name.toLowerCase().includes(searchValue)
      );
      fishList.innerHTML = "";                          // clear list
      filtered.forEach(fish => {                        // loop filtered fish
        fishList.appendChild(createFishCard(fish));     // show only matching fish
      });
    });
});

// Form submit to add new fish
fishForm.addEventListener("submit", e => {
  e.preventDefault();   // stop form from refreshing the page

  // Build new fish object from inputs
  const newFish = {
    name: document.getElementById("name").value,       // fish name
    image: document.getElementById("image").value,     // image URL
    price: parseInt(document.getElementById("price").value), // price number
    likes: 0                                           // default likes
  };

  // Send new fish to db.json
  fetch("http://localhost:3000/fish", {
    method: "POST",                                   // create new record
    headers: { "Content-Type": "application/json" },  // sending JSON
    body: JSON.stringify(newFish)                     // convert object to JSON
  })
    .then(res => res.json())                          // parse response
    .then(() => {
      getFish();       // reload fish list so new one appears
       fishForm.reset();// clear input fields
    });
});

// Start the app by showing all fish
getFish();
