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

app.set('views','./views');
app.set('view engine','ejs');
app.use(express.json());

/**
 * Post request for when the user queries deepseek 
 */
app.post('/reqDeepseek',(req,res) =>{

  const userQuery = req.body['userQuery'];
  res.send(userQuery);
});



//llama sample code for tomorrow 
// import ollama from 'ollama'

// const response = await ollama.chat({
//   model: 'llama2',
//   messages: [{ role: 'user', content: 'Why is the sky blue?' }],
// })
// console.log(response.message.content)

//launch locally 
app.listen(port, () => console.info(`Listening on port: ${port}`));