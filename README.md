Fish Sticks – Phase 1 JavaScript Project

Fish Sticks is a simple single-page web app built using HTML, CSS, and JavaScript. It connects to a local server (using json-server) to display a list of fish, and lets users interact with them.

What the App Does

Shows a list of fish when the page loads, each with a name, image, price, and number of likes.

Like button: You can click a button on any fish to increase its likes. The like count updates both on the page and in the server.

Search bar: As you type in the search bar, the list filters in real-time based on the fish name (not case sensitive).

Add new fish: There’s a form to add a new fish. After submitting, the fish gets saved to the server and shows up immediately on the page.

How It Works

Uses fetch() to get fish data from the server and show it on the page.

When the like button is clicked, a PATCH request is sent to update just the likes.

The search works by checking if the typed value is found in any fish name.

The form uses a POST request to send new fish data to the server.

What I Practiced

Getting and sending data with fetch()

Updating the DOM based on server responses

Using event listeners (for clicks, input, and form submit)

Writing clean and organized JavaScript

How to Run It

Run the server:
json-server --watch db.json

Open index.html in a browser

Try searching, liking, or adding a new fish
