# Movie Map!

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- bcrypt
- body-parser
- cookie-session
- dotenv
- ejs
- express
- knex
- knex-logger
- method-override
- morgan
- node-sass-middleware
- pg
- request

## Features

### Landing Page

- Is shown when the user is not logged in
- Has Login and Register button
- The navbar also has login and register button, and will only have those buttons if not logged in

!["Movie Maps Landing Page"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-home.png)

### Login/Register Page

- Log in with email and password
- Register with email, username, and password
- They have forms connected to the POST route
- Once logged in, a session cookie with its signed value will be saved

!["Movie Maps Login Page"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-login.png)

### Maps Index Page

- Lists all the created maps in a grid list
- Each map is related to a specific movie
- Shows the thumbnail of the map, name of the map, and username of the creator
- Shows how many users favourited the map

!["Movie Maps Index Page"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-index.png)

### Maps Individual Page

- Displays a map with a relatively large screen
- Key points where the movie was filmed is saved
- Clicking 'list' button at the left side shows a drop-down list of all the points
- Cliking the items in the list or clicking each markers in the map opens their info-window
- Both the items in the list and the info window displays the name, image, and description of each points
- Cliking 'new' button beside the 'list' button will display a form to enter new point data
- Cliking in the map will generate a marker, which when clicked, opens up an info-window with a form to enter a new point data
- Edit buttons are present for the map itself and the points
- Delete buttons are present for the map itself and the points
- Favourite button is in the second navbar to favourite the map

!["Movie Maps Map Page"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-map-page.png)
!["Movie Maps Map Point"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-map-point.png)

### Create Maps/Search Maps

- Create maps page has a form to enter name and location for the new map
- Search maps page has a form to enter a search query where it will redirect the user to the results page
- Search results are displayed in a separate page, displaying the results in a way maps index page does

!["Movie Maps New Map"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-new-map.png)

### Profile Page

- At the top, the user name is shown along it his/her featured map as a spotlight
- The featured map is the first map of the user's favourite maps
- The page shows three lists: Created maps, Favourite maps, and Contributed maps
- Contributed maps are where the users have created any points in the map

!["Movie Maps Profile Page"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-user-profile.png)

### Responsiveness

- Our page is mobile friendly

!["Movie Maps Landing Page"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-mobile-index.png)
!["Movie Maps Landing Page"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-mobile-map.png)
!["Movie Maps Landing Page"](https://github.com/nridout/movieMap2/blob/master/docs/movie-maps-mobile-userpage.png)