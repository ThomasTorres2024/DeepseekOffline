/**
 * Changes the screen from having a logo with a chatbox in the center to a screen where
 * the chatbox is at the bottom and there is a conversation going on between the user
 * and Deepseek/LLM
 */
function setScreenTextResponses(){

}

function resetTextAreaForm(){
    document.getElementById("chatBox").style.fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
    document.getElementById("chatBox").style.color="gray";
    document.getElementById("chatBox").style.fontSize="20";    
}

function convertSubmitToChange(){
    const submitButton = document.getElementById("voiceButton");
    submitButton.classList.replace('submitButton','loadingButton');
    image = voiceButton.querySelector('img'); // First <img> inside that button
    image.src="img/loading_center.png"
}

function convertVoiceTosubmit(){
    const voiceButton = document.getElementById("voiceButton");
    voiceButton.classList.replace('voiceButtonClass', 'submitButton');
    voiceButton.childNodes[2].textContent="";
    image = voiceButton.querySelector('img'); // First <img> inside that button
    image.src="img/arrow_submit.png"
}

function convertSubmitToVoice(){
    const submitButton = document.getElementById("voiceButton");
    submitButton.classList.replace('loadingButton','voiceButtonClass');
    submitButton.classList.replace('submitButton','voiceButtonClass');
    voiceButton.childNodes[2].textContent="Voice";
    image = voiceButton.querySelector('img'); // First <img> inside that button
    image.src="img/volume_logo.png"
}

/**
 * Gets response and updates page 
 */ 
async function getResponse(){
    const userQuery = document.getElementById("chatBox").value;

    convertSubmitToChange();
    //send request to server for info 
            
    const options = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body : JSON.stringify({userQuery})};
    
    document.getElementById("chatBox").value = "";
    resetTextAreaForm();

    const res = await fetch("/reqDeepseek",options);
    const result = await res.text();
    
    console.log("Responsed received from server:")
    console.log(result);
 
    //once server request is done, we can go back to voice
    convertSubmitToVoice();

    document.getElementById("chatBox").value = "";
    resetTextAreaForm();
}

function main(){

    var voiceButtonModified = false; 

    //text book event listener, changes "voice" button to modify button 
    const textBoxEvent = document.getElementById("chatBox");
    textBoxEvent.addEventListener("input",()=>{
        //check if size of input is back to 0 
        if(voiceButtonModified)
        {
            //revert submit button back to voice button
            if(document.getElementById("chatBox").value.length==0){
                convertSubmitToVoice();
                resetTextAreaForm();
                voiceButtonModified = false; 
            }
        }
        //convert voice button to submit button
        else
        {
            //change size of font, color, and font family of form as well
            document.getElementById("chatBox").style.fontFamily="sans-serif";
            document.getElementById("chatBox").style.color="black";
            document.getElementById("chatBox").style.fontSize="12";

            convertVoiceTosubmit();
            voiceButtonModified=true;
        }
    });

    
    const form = document.getElementById('formChatBox');

    form.addEventListener('submit', function(event) {
        // Prevent buttons from submitting in form when pressed
        event.preventDefault();

        //change submit button to waiting button

        //send 
    });

    const voiceButton = document.getElementById("voiceButton");
    voiceButton.addEventListener("click", async ()=>{
        if(voiceButtonModified){
            await getResponse();
            voiceButtonModified = false;
        }
    });

    //alternative submit method using enter 
    addEventListener("keypress", async (event) => 
        {
            if(voiceButtonModified && event.key === 'Enter'){
                await getResponse();
                voiceButtonModified = false;
            }
         })


}

main();