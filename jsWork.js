// Grab elements from the page
const fishList = document.getElementById("fish-list");
const searchInput = document.getElementById("search");
const fishForm = document.getElementById("fish-form");

// Get and show all fish
function getFish() {
  fetch("http://localhost:3000/fish")
    .then(res => res.json())
    .then(fishArray => {
      fishList.innerHTML = ""; // clear before showing new
      fishArray.forEach(fish => {
        // make a card for each fish
        const card = document.createElement("div");
        card.className = "fish-card";

        card.innerHTML = `
          <h3>${fish.name}</h3>
          <img src="${fish.image}" alt="${fish.name}">
          <p>Price: KES ${fish.price}</p>
          <p>Likes: <span>${fish.likes}</span></p>
          <button>👍 Like</button>
        `;

        // Like button
        const likeBtn = card.querySelector("button");
        likeBtn.addEventListener("click", () => {
          fetch("http://localhost:3000/fish/" + fish.id, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ likes: fish.likes + 1 })
          })
            .then(res => res.json())
            .then(updatedFish => {
              fish.likes = updatedFish.likes; // update the object
              card.querySelector("span").textContent = updatedFish.likes; // update DOM
            });
        });

        fishList.appendChild(card);
      });
    });
}

// Search fish
searchInput.addEventListener("input", e => {
  fetch("http://localhost:3000/fish")
    .then(res => res.json())
    .then(fishArray => {
      const searchValue = e.target.value.toLowerCase();
      const filtered = fishArray.filter(fish =>
        fish.name.toLowerCase().includes(searchValue)
      );
      fishList.innerHTML = "";
      filtered.forEach(fish => {
        const card = document.createElement("div");
        card.className = "fish-card";
        card.innerHTML = `
          <h3>${fish.name}</h3>
          <img src="${fish.image}" alt="${fish.name}">
          <p>Price: KES ${fish.price}</p>
          <p>Likes: ${fish.likes}</p>
        `;
        fishList.appendChild(card);
      });
    });
});

// Add new fish
fishForm.addEventListener("submit", e => {
  e.preventDefault();

  const newFish = {
    name: document.getElementById("name").value,
    image: document.getElementById("image").value,
    price: parseInt(document.getElementById("price").value),
    likes: 0
  };

  fetch("http://localhost:3000/fish", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newFish)
  })
    .then(res => res.json())
    .then(() => {
      getFish(); // refresh list
      fishForm.reset(); // clear form
    });
});

// Start app
getFish();