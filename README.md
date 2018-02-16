# liri-node-app
This is a Liri node app.
it takes inputs in the command line running with node.
once you have downloaded all the files you are almost ready to use liri bot.
Navagate to the directory you have saved all the files into and you will run "npm install"
this will install all of the npm packages you need to run the files.
After that you are ready to go on.
the program has a few main functions:

    spotify-this-song: if you type "node liri.js spotify-this-song '<song name here>'" into your terminal, spotify will
                       retrieve and display information about the track, artists, and album in the terminal
    
    my-tweets: if you type "node liri.js my-tweets" into your terminal, twitter will return and display the last 20 
               tweets and when they were sent
               
    movie-this: if you type "node liri.js movie-this '<movie name here>'" into your terminal, omdb will retrieve and 
                display information about the movie, where it was made, when it was released in the terminal.
                
    do-what-it-says: if you type "node liri.js do-what-it-says" into the terminal it will execute the command and 
                     paramaters found in the random.txt file
