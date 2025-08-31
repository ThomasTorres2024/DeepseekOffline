//set up express and port 
const express = require("express");
const app = express();
const port = 3000; 

//add static files 
app.use(express.static('public'));
app.use('/css',express.static(__dirname+"public/css"));
app.use('/js',express.static(__dirname+"public/js"));
app.use('/img',express.static(__dirname+"public/img"));

app.get('',(rec,res) => {
    res.sendFile(__dirname + '/views/index.html')
})

//launch locally 
app.listen(port, () => console.info(`Listening on port: ${port}`));