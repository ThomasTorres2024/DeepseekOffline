//set up express and port 
const express = require("express");
const { default: ollama } = require('ollama'); // CJS
const { marked } = require('marked');
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
 * Query LLM through Ollama 
 * @returns Ollama response as markdown
 */
async function callDeepSeek(userQuery){
  console.log(`Waiting. Received user query: ${userQuery}`);
    const response = await ollama.chat({
      model: 'deepseek-r1:7b',
      messages: [{ role: 'user', content: userQuery }],
    })
    
    return response.message.content
}

/**
 * Converts mark down from deepseek into HTML
 * @param {raw markdown information from deepseek} rawMD 
 * @returns HTMl equivalent to the markdown
 */
function convertMDToHTML(rawMD){
  return marked(rawMD);
}

/**
 * Post request for when the user queries deepseek 
 */
app.post('/reqDeepseek', async (req,res) =>{

  const userQuery = req.body['userQuery'];
  const deepSeekResponse = await callDeepSeek(userQuery);
  res.send(convertMDToHTML(deepSeekResponse));
});


//launch locally 
app.listen(port, () => console.info(`Listening on port: ${port}`));
