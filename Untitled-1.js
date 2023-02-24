const words= document.querySelector(".words")
const mediumWords = ["admire", "beloved", "charity", "deserve", "efforts", "freedom", "genuine", "healing", "indulge", "justice", "kindred", "laughed", "massive", "natural", "organic", "passion", "quality", "respect", "sincere", "tactics", "unique", "valuable", "wealthy", "xenial", "youthful", "zealous", "awesome", "balance", "courage", "dynamic", "embrace", "fantasy", "grateful", "hustler", "innovate", "jovial", "kingdom", "lifetime", "momentum", "nurtured", "optimism", "perceive", "quirky", "radiant", "sensual", "thrifty", "ultimate", "vibrant", "willing"]
const shortWords = ["dog", "cat", "pen", "cup", "book", "tree", "song", "desk", "bird", "fork", "code", "bike", "sock", "moon", "car", "idea", "lake", "film", "card", "sand", "lamp", "key", "rain", "fire", "leaf", "pear", "fish", "love", "game", "ship", "frog", "city", "door", "hill", "baby", "ball", "bear", "time", "park", "duck", "milk", "star", "idea", "food", "team", "road", "goal", "idea", "rose"]
const longWords = ["ambitious", "beautiful", "convenient", "delicious", "enthusiasm", "fascinated", "generosity", "harmonious", "impressive", "knowledgeable", "luxurious", "magnificent", "neuroscience", "optimistic", "particular", "quintessence", "resilience", "satisfaction", "tremendous", "unbelievable", "vocabulary", "wonderful", "xylophone", "youthfulness", "zoologist", "accomplish", "breathtaking", "confidently", "determination", "established", "fantastically", "gracefully", "historically", "inspiration", "juxtaposition", "knowledgeable", "legitimately", "metaphorical", "narratively", "opportunist", "philosopher", "quantitative", "revolutionary", "superiority", "transparency", "understanding", "vivacious", "wittiness", "xenophobic"]
const iosKeyboard= document.querySelector(".iosKeyboard")
const wordsDiv= document.querySelector(".wordsDiv")
const timer= document.querySelector(".timer")
//variable for statistics calculations
var totalCorrect= 0
var totalPressed= 0
var timeSelected= "30"
var wordLength= "medium"
const timeSelect= document.querySelectorAll(".timeSelect")
var topWPM = 0


//checks if the user is on mobile
var mobile = false
function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile = true
    } else {
        mobile= false
    }
    //alert(mobile + " line 25 testing ")
}
  



//call function once page loads
window.onload= createText


//start timer
var startedTimer= false
var interval= null //globally defined so that we can clear interval anywhere
function startTimer(){
    if (startedTimer == false){
        var seconds= timer.innerHTML
        startedTimer= true


        function start(){
            timer.innerHTML -=1
            //shows stats when timer expires
            if (timer.innerHTML == 0){
                clearInterval(interval)
                document.querySelector(".statsBox").style.display= "flex"
                document.querySelector(".wordsDiv").style.display= "none"
                document.querySelector(".timerDiv").style.display= "none"
                //calculating stats
                //var newWPM= document.querySelector(".wpm").innerHTML= Math.floor((totalCorrect / 5) / 0.5) //calculates WPM 
                document.querySelector(".acc").innerHTML= Math.floor((totalCorrect / totalPressed) * 100) + "%";
                document.querySelector(".test").innerHTML= timeSelected + "s" + " " + wordLength

                if (timeSelected == 60){
                    var newWPM= document.querySelector(".wpm").innerHTML= Math.floor((totalCorrect / 5)) //calculates WPM 
                }
                else if (timeSelected == 30){
                    var newWPM= document.querySelector(".wpm").innerHTML= Math.floor((totalCorrect / 5)) * 2 //calculates WPM 
                }
                else if (timeSelected == 15){
                    var newWPM= document.querySelector(".wpm").innerHTML= Math.floor((totalCorrect / 5)) * 4 //calculates WPM 
                }


                if (newWPM > topWPM){
                    document.querySelector(".top").innerHTML= newWPM
                    topWPM= newWPM
                }
            }
        }

        interval= setInterval(start, 1000)      
    }
}


//create text
function createText(){
    isMobile()
    words.innerHTML= ""
    if (wordLength == "medium"){
        while (words.innerHTML.length < 150){ 
            words.innerHTML += mediumWords[Math.floor(Math.random() * mediumWords.length)] + " "
        }      
    }
    else if (wordLength == "long"){
        while (words.innerHTML.length < 150){ 
            words.innerHTML += longWords[Math.floor(Math.random() * longWords.length)] + " "
        }
    }
    else{
        while (words.innerHTML.length < 150){ 
            words.innerHTML += shortWords[Math.floor(Math.random() * shortWords.length)] + " "
        }
    }
    createSpans()
}


//creates spans for every letter 
function createSpans(){

    if (mobile == true){
        iosKeyboard.focus() //this is for mobile so this brings up keyboard
    }
    else{
        wordsDiv.focus() //sets focus on when they refresh screen 
    }


    // wordsDiv.focus() //sets focus on when they refresh screen 
    // iosKeyboard.focus() //this is for mobile so this brings up keyboard
    words.innerHTML.split("").forEach(character =>{
        var characterSpan= document.createElement("span")
        characterSpan.innerText= character
        words.appendChild(characterSpan)
        characterSpan.classList.add("none")
        words.innerHTML= words.innerHTML.substring(1) //removes first character then we are left w no more <p> letters 
        cursorPlacement()
    }) 
}


//find first span in the .words element to add underline
function cursorPlacement(){
    const findSpan= words.querySelector(".none")
    findSpan.classList.add("blink")
}


//handles right or wrong keypresses
document.addEventListener("keydown", function(){
    startTimer()

    if (event.key.toLowerCase() == words.querySelector(".blink").innerText){
        
        words.querySelector(".blink").classList.add("correct")
        words.querySelector(".blink").classList.remove("none", "blink", "incorrect")
        totalCorrect++
        totalPressed++
        var hasClass = document.querySelectorAll(".none").length == 1 //checks if there is  1 ".none" class which would be the extra white space
        if (hasClass == true){
            createText()
        }
        cursorPlacement()
    }
    else{
        totalPressed++
        words.querySelector(".blink").classList.remove("correct")
        words.querySelector(".blink").classList.add("incorrect")
    }
})



//handles enter shortcut for new game
document.addEventListener("keydown", function(){
    if (event.keyCode == 13){
        reset()
    }
})


//handles reset button functionality
document.querySelector(".reset").addEventListener("click", function(){
    reset()
})


//this function resets stuff so it can start new test
function reset(){
    createText()
    timer.innerHTML= timeSelected
    document.querySelector(".statsBox").style.display= "none"
    document.querySelector(".wordsDiv").style.display= "flex"
    document.querySelector(".timerDiv").style.display= "flex"        
    //createText()
    totalCorrect= 0
    totalPressed= 0        
    clearInterval(interval)
    startedTimer= false //allows for timer to be run again and reset time
    
   
    if (mobile == true){
        iosKeyboard.focus() //this is for mobile so this brings up keyboard
    }
    else{
        wordsDiv.focus() //sets focus on when they refresh screen 
    }
}


//handles light and dark mode switch

const color= document.querySelector(".color")
const root= document.documentElement;


const rootStyles = getComputedStyle(document.documentElement);
var counter= 1
var primaryColor = null
var textSecondary= null
color.addEventListener("click", function(){
    if (mobile == true){
        iosKeyboard.focus() //this is for mobile so this brings up keyboard
    }
    else{
        wordsDiv.focus() //sets focus on when they refresh screen 
    }
    //wordsDiv.focus() //keep it focused, ready to type
    //iosKeyboard.focus()
    if (counter == 1){
        counter ++ 
        //dark mode
        root.style.setProperty('--bg-color', '#111');
        root.style.setProperty('--textPrimary', '#eee');
        root.style.setProperty('--textSecondary', '#444');
        root.style.setProperty('--primaryColor', '#eee');
        root.style.setProperty('--darkestColor', '#191919');
    
    }
    else if (counter == 2){
        //monkeytype inspo
        counter ++
        root.style.setProperty('--bg-color', '#333');
        root.style.setProperty('--textPrimary', '#D1D0C5');
        textSecondary= root.style.setProperty('--textSecondary', '#666');
        primaryColor= root.style.setProperty('--primaryColor', '#fd4');
        root.style.setProperty('--darkestColor', '#2C2E31'); 
        
    }
    else if (counter == 3){
        //back to light mode
        counter= 1
        root.style.setProperty('--bg-color', '#faf1e4');
        root.style.setProperty('--textPrimary', '#3c403b');
        root.style.setProperty('--textSecondary', '#c2b8aa');
        root.style.setProperty('--primaryColor', 'black');
        root.style.setProperty('--darkestColor', '#e7dccb'); 
        
    }
})


//handles word length settings
document.querySelectorAll(".wordLength").forEach(setting => {
    setting.addEventListener("click", function(){
        // reset()
        wordLength= setting.innerHTML //wordLength innerHTML = long, short, medium
        reset()
        //applies correct colors for unselected settings
        document.querySelectorAll(".wordLength").forEach(setting =>{
            setting.classList.remove("picked")
            setting.classList.add("unchosen")
        })
        //applies the right colors for the selected setting
        setting.classList.remove("unchosen")
        setting.classList.add("picked")
    })
})


//handles test length settings
document.querySelectorAll(".timeSelect").forEach(setting => {
    setting.addEventListener("click", function(){
        reset()
        timer.innerHTML= setting.innerHTML 
        timeSelected= setting.innerHTML //needed for metrics data display
        //applies correct colors for unselected settings
        timeSelect.forEach(setting =>{
            setting.classList.remove("picked")
            setting.classList.add("unchosen")
        })
        //applies the right colors for the selected setting
        setting.classList.remove("unchosen")
        setting.classList.add("picked")
    })
})














    



    
