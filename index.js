import express from 'express'
import fs from 'fs/promises'
const app = express();
const port = process.env.PORT || 3011


//setting up a variable to readJSON data 

let jsonData;
const readJSON = async() => {
    const data = await fs.readFile('data2.json', 'utf-8');
    jsonData = JSON.parse(data);
}
readJSON().then(() => {
    app.listen(port, () => {
        console.log(`Server running at ${port}`)
    })
    app.get ('/music', (req, res) => {
        res.send(jsonData);
    })
    app.get ('/year', (req, res) => {
        // [url]/year?max=2021 how to input into console 
        //whatever usesr requests and looks for they key max and whatever its equal to and sets it to the requstedAge value 
        const reqYear = req.query.max
        const music = jsonData.music;

        let selectedSongs = [];
        music.forEach((song) => {
            if(song.year <= reqYear){
                selectedSongs.push(song.year)
                selectedSongs.push(song.title)
                console.log(song.year)
            }
        })
        res.send(`${selectedSongs} Song Title: ${music.title}`);
    })
    // app.get ('/yearsActive', (req, res) => {
    //     const minYearsActive = req.query.min; //getting the avalue that the user requested
    //     const roster = jsonData.roster;
    //     let selectedPlayers = [];
    //     roster.forEach((player) => {
    //         if (player.years_active >= minYearsActive){
    //             selectedPlayers.push(player.last_name)
    //         }
    //     })
    // })
    //accepting request for player with playername (colon is doing that)
    app.get ('/song/:title', (req, res) => {
        const reqSong = req.params.title.substring(1);
        console.log("requested song is", reqSong)
        const songs = jsonData.music;
        songs.forEach((song,index) => {
           // console.log(song.title)
            if (song.title == reqSong){
                const reqSongData = songs[index]
                res.send(reqSongData);
                console.log(reqSongData)
            }
        })
    })

})
