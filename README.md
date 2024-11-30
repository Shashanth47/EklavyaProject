# EklavyaProject
Woodland Creatures - Spot 6 Differences
Access the Game
The game can be accessed via the Vercel link below or by cloning the repository and running it locally.

Play the Game on Vercel - https://eklavya-project-tz3y-jthnvjypw-kushashanth-gmailcoms-projects.vercel.app


Run Locally:

Clone the repository:
bash
Copy code
git clone <repository-url>
cd woodland-creatures-spot-differences
Open the index.html file in your browser or host it on a local server (e.g., using Python's http.server).


How to Play
Click on "Play" to start the game.
Two images will be displayed: one complete and one with differences.
Identify the differences by clicking on them.
Complete the game as quickly as possible—the timer is running!

<img width="866" alt="image" src="https://github.com/user-attachments/assets/8350e3eb-121f-4b53-92f5-2a33a2ffa8b1">

How the Game Uses the JSON File
JSON Structure
The game uses a JSON file to define the differences between the two images. Below is a summary of its structure:

gameTitle: Title of the game.
images: Contains paths to the full and empty images.
full: Path to the complete image.
empty: Path to the image with missing differences.
differences: An array of objects defining the differences.
Each object includes:
id: Unique identifier for the difference.
x and y: Coordinates of the top-left corner of the difference on the image.
width and height: Dimensions of the difference.
description: Text description of the difference.
