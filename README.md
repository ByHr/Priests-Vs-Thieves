# Priests Vs Thieves
This is a personal project of mine... A continuation of my lab from Purdue's CS252 Systems Programming course.

   The original lab repository:

	https://github.com/aberendsen18/cs252-lab06

  Project Name:

    -Priests vs Thiefs

  Project:

    -Game with online lobby system, players enter the lobby in groups of 4 or more
    -The game starts with each person (user) starting with 100 points
    -Each round, the players are given the choice to either "help" or "steal"
    	-If all players "help" then the collective whole is awarded 10 points
    	-If a single player picks "steal" then they get 30 points
    	-If more than 2 players pick "steal" in the same round then they each get deducted 20 points
    -After 10 rounds each players final point value revealed is revealed to all users in the lobby
    -The user with the most points win
    -In the case of a tie, everyone loses (this is still to be determined)

  Tools Used:

    -NodeJS (incl. modules such as express, jade)
    -MongoDB
    -HTML5 w/ Bootstrap
    -CSS
    -Pingendo 4.0

Project Idea Credit:

    The project idea is owed to the "Prisoner Dilemma" and the various games built prior that work off the concept.

Install Instructions:

    Skeleton is based on tutorial described in Useful Link #2

      INITIAL SETUP
      1) Download Node.js (make sure npm is installed as well)
      2) Download MongoDB Community Edition
      3) in root directory run: npm install express
      4) in root directory run: npm install express-generator
      5) in nodetest2 directory run: npm install
      6) in bin folder within MongoDB directory run: ./mongod --dbpath [ insert path to nodetest2\data here ]
      7) in seperate window, in bin folder within MongoDB directory run: ./mongo
      8) in the seperate window, in MongoDB command-line run: use nodetest2
      9) in the seperate window, in MongoDB command-line run: db.userlist.insert({'username' : 'test1','email' : 'test1@test.com','fullname' : 'Bob Smith','age' : 27,'location' : 'San Francisco','gender' : 'Male'})

      HOW TO START DATABASE
      1) in bin folder within MongoDB directory run: mongod --dbpath [ insert path to nodetest2\data here ]

      HOW TO START SERVER
      1) in nodtest2 directory run: npm start

      HOW TO ACCESS SERVER
      1) go to localhost:3000
      
To-do List:

      Note: List below is not in any specific order

      1) Migrate CSS files from Google Drive to a self-hosted Rasberry Pi
      2) Add email authentication
      3) Add password hashing
      4) Create CSS for lobby
      5) Create CSS for profile page
      6) Create CSS for game
      7) Create CSS for leaderboard
      8) Fix game logic
      9) Add ability for player avatars
      10) Add chat functionality
 

Useful Links:

    1)   https://github.com/aerrity/socket-click-example - Real-time communication between users on webpage (see last example on page)
    2)   https://closebrace.com/tutorials/2017-03-02/creating-a-simple-restful-web-app-with-nodejs-express-and-mongodb
