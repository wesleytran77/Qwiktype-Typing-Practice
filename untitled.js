//calls function once page loads
window.onload = function(){
    timerSettings()
    color()
    createText()
}

var currentTest= ""
var repeatTest= ""


if (localStorage.getItem('repeatTest') != null){
    repeatTest= localStorage.getItem('repeatTest') //new
} //new


//words used to create text
const shortWords = ["cat", "dog", "sun", "run", "sky", "hat", "pen", "box", "car", "fan", "tree", "cup", "bed", "hat", "dog", "bus", "fly", "rat", "key", "bat", "fish", "hill", "ball", "snow", "star", "hand", "jump", "milk", "play", "rain", "rock", "sand", "wind", "fish", "note", "sand", "wood", "shop", "park", "moon", "lake", "desk", "wave", "bird", "shoe", "clay", "lock", "road", "wave", "coin", "wind"];
const mediumWords = ["apple", "bicycle", "coffee", "doctor", "eagle", "flower", "guitar", "house", "jungle", "kitchen", "letter", "market", "nature", "orange", "pencil", "queen", "rabbit", "sunset", "table", "umbrella", "violin", "water", "yellow", "zebra", "animal", "bottle", "circle", "dance", "earth", "famous", "grape", "honest", "image", "juice", "kitchen", "laugh", "mouse", "night", "open", "party", "quiet", "river", "storm", "train", "unity", "visit", "watch", "yacht", "zebra", "bright", "clean", "dream", "enjoy", "flame", "globe", "happy", "idea", "jump", "knight", "light", "music", "north", "pearl", "quest"];
const longWords = ["kingdom", "dictionary", "cornhole", "chinese", "traditional","mysterious", "forgetful", "programming", "congruent", "horoscope","performance", "basketball", "adventure", "atmosphere", "challenge","collection", "discovery", "education", "recovery", "attention","foundation", "expressive", "remarkable", "creative", "positive","geography", "volunteer", "engagement", "tradition", "exploration","experience", "reflection", "excellence", "technology", "reliable","significant", "innovation", "imagination", "important", "precise","generation", "exciting", "generation", "discovery", "investment","adventure", "fantastic", "freedom", "satisfaction", "application","attention", "progressive", "solution", "education", "incredible","strategy", "discoveries", "diversion", "formation", "suggestion"];


//elements used for DOM manipulation
const words= document.querySelector(".words")
const timer= document.querySelector(".timer")
const colorScheme= document.querySelector(".lightdarkmode")
const shortSetting= document.querySelector(".shortSetting")
const mediumSetting= document.querySelector(".mediumSetting")
const longSetting= document.querySelector(".longSetting")
const secfifteen= document.querySelector(".fifteensec")
const secthirty= document.querySelector(".thirtysec")
const secsixty= document.querySelector(".sixtysec")
const colorway= document.querySelector(".colorway")
const logo = document.querySelector('.logo'); //qwiktype logo
const logoSvg = document.querySelector('.logo svg');
var colorChoice= "light" //used to know if light or dark to apply colors
var colorChoice= localStorage.getItem('colorChoice')

//retrieve back from Results.js

var timeSelected= localStorage.getItem('timeSelected')


//variables for statistics calculations
var wordLength= localStorage.getItem('wordLength') //have it right after pre-define so localStorage can work
var missClicks= ""
var totalCorrectStored= 0
var totalPressedStored= 0

var timerStarted= false //used to make timer not speed up 

//function that controls the timer
const rootStyles= getComputedStyle(document.documentElement)


function start(){
    const primaryColor= rootStyles.getPropertyValue("--primaryColor") //get the color updated so it can reflect the correct color, bc interval does not allow changes it seals in the interval settings
    timer.style.color = primaryColor
    //counts down timer 
    if (timer.innerHTML != 0){
        timer.innerHTML -=1
    }
    else{
        clearInterval(interval) //stops the timer from running
        localStorage.setItem('totalCorrectStored', totalCorrectStored)
        localStorage.setItem('totalPressedStored', totalPressedStored)
        localStorage.setItem('timeSelected', timeSelected)
        localStorage.setItem('missClicks', missClicks)
        localStorage.setItem('wordLength', wordLength)
        localStorage.setItem('colorChoice', colorChoice)

        localStorage.setItem('currentTest', currentTest) //new
        localStorage.setItem('repeatTest', repeatTest) //new
        localStorage.setItem('enable', enable)

        window.location.href= "Results.html"
    }
    if (timerStarted == false){
        interval= setInterval(start, 1000) //timer starts
        timerStarted = true //prevents timer from starting again
    }
}


var enable = "false"
if (localStorage.getItem('enable') != null){
    enable= localStorage.getItem('enable')
} 


// creates the words to type
function createText(){
    const element = document.querySelector('.words');
    
    // isMobile()
    words.innerHTML= ""
    if (repeatTest == "true" && enable == "true"){
        enable= "false"
        currentTest= localStorage.getItem('currentTest')
        words.innerHTML= currentTest
    }
    else if (wordLength == "medium"){
        while (words.innerHTML.length < 300){ 
            words.innerHTML += mediumWords[Math.floor(Math.random() * mediumWords.length)] + " "
        }      
    }
    else if (wordLength == "long"){
        while (words.innerHTML.length < 300){ 
            words.innerHTML += longWords[Math.floor(Math.random() * longWords.length)] + " "
        }
    }
    else{
        while (words.innerHTML.length < 300){ 
            words.innerHTML += shortWords[Math.floor(Math.random() * shortWords.length)] + " "
            //the game defaults to short and 15seconds so we need to highlight correct one 
            mediumSetting.classList.remove("highlight")
            longSetting.classList.remove("highlight")
            shortSetting.classList.add("highlight")
            wordLength = "short"
        }
    }
    
    currentTest= words.innerHTML
    localStorage.setItem('currentTest', currentTest)
    createSpans()
}

//controls light and dark mode
const root = document.documentElement //grab the root element from CSS to edit the styles

colorScheme.addEventListener("click", function(){
    if (colorChoice == "light"){
        colorChoice = "dark"
        localStorage.setItem('colorChoice', colorChoice)
        root.style.setProperty('--bg-color', '#121520');
        root.style.setProperty('--textPrimary', '#f8f9f9');
        root.style.setProperty('--textSecondary', '#626984');
        root.style.setProperty('--primaryColor', '#ffffff');
        root.style.setProperty('--darkestColor', '#1c1e2b'); 
        colorway.innerHTML= "dark mode"

        //changes favicon color to match colorway
        const favicon16 = document.getElementById('favicon16');
        const appleFavi= document.getElementById('apple');
        const favicon32= document.getElementById('favicon32');
        favicon16.setAttribute('href', '/favicon16.png');
        appleFavi.setAttribute('href', '/apple.png');
        favicon32.setAttribute('href', '/favicon32.png');
    }

    else{
        colorChoice = "light"
        localStorage.setItem('colorChoice', colorChoice)
        root.style.setProperty('--bg-color', '#faf1e4');
        root.style.setProperty('--textPrimary', '#3c403b');
        root.style.setProperty('--textSecondary', '#c2b8aa');
        root.style.setProperty('--primaryColor', 'black');
        root.style.setProperty('--darkestColor', '#e7dccb'); 
        colorway.innerHTML= "light mode"

        //changes favicon color to match colorway
        const favicon16 = document.getElementById('favicon16');
        const appleFavi= document.getElementById('apple');
        const favicon32= document.getElementById('favicon32');
        favicon16.setAttribute('href', '/favicon-16x16.png');
        appleFavi.setAttribute('href', '/apple-touch-icon.png');
        favicon32.setAttribute('href', '/favicon-32x32.png');
    }
    //needed to adjust color of timer and logo to correct when hitting enter - new test then switching colorScheme
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primaryColor').trim();
    const textSecondary = getComputedStyle(document.documentElement).getPropertyValue('--textSecondary').trim(); 
    logoSvg.style.fill = primaryColor
    logo.style.color = primaryColor
    timer.style.color= textSecondary
})


//getting CSS styles to edit the animation / cursor
const sheet= document.styleSheets[0]
const rules = sheet.cssRules || sheet.rules;


//runs timer when a key is pressed and handles right or wrong presses
document.addEventListener("keydown", function(){
    if (timerStarted == false && event.key != 'Enter'){
        for (let i = 0; i < rules.length; i++) {
            if (rules[i].selectorText === '.blink') {
                rules[i].style.animation= 'none' //removes the blinking cursor animation when typing starts replaces for solid cursor
                rules[i].style.boxShadow = 'inset 3px 0 0 0 var(--textPrimary)'; // Set box shadow to a solid line to form cursor
            }
        }
        //hides elements so user can focus 
        document.querySelectorAll('.hide').forEach(function(element) {
                element.style.visibility = 'hidden';
        });
        //changes the color of the logo to gray when they start typing (focus mode)
        const textSecondary = getComputedStyle(document.documentElement).getPropertyValue('--textSecondary').trim();
        logoSvg.style.fill = textSecondary
        
        // const logo = document.querySelector('.logo');
        logo.style.color = textSecondary
        start()
    }

    if (event.key.toLowerCase().trim() == words.querySelector(".blink").innerText.trim()){
        
        words.querySelector(".blink").classList.add("correct")
        words.querySelector(".blink").classList.remove("none", "blink", "incorrect")

        //adds to statistics for calculations
        totalCorrectStored +=1 
        totalPressedStored+=1


        //makes new text if everything is typed
        var hasClass = document.querySelectorAll(".none").length == 1 //checks if there is  1 ".none" class which would be the extra white space
        if (hasClass == true){
            createText()
        }
        cursorPlacement()
    }
    else if (event.key != 'Enter'){
        words.querySelector(".blink").classList.remove("correct")
        words.querySelector(".blink").classList.add("incorrect")
        totalPressedStored+=1

        //tracks miss clicks to show user what letters they need to improve on
        if (!missClicks.includes(words.querySelector(".blink").innerHTML)) {
            missClicks+= " " + words.querySelector(".blink").innerHTML;
        }
    }

})


//handles word length settings 
shortSetting.addEventListener("click", function(){
    wordLength= "short"
    localStorage.setItem('wordLength', wordLength)
    mediumSetting.classList.remove("highlight")
    longSetting.classList.remove("highlight")
    shortSetting.classList.add("highlight")
    createText()
})

mediumSetting.addEventListener("click", function(){
    wordLength= "medium"
    localStorage.setItem('wordLength', wordLength)
    shortSetting.classList.remove("highlight")
    longSetting.classList.remove("highlight")
    mediumSetting.classList.add("highlight")
    createText()
})

longSetting.addEventListener("click", function(){
    wordLength= "long"
    localStorage.setItem('wordLength', wordLength)
    shortSetting.classList.remove("highlight")
    mediumSetting.classList.remove("highlight")
    longSetting.classList.add("highlight")
    createText()
})


//handles timer settings
secfifteen.addEventListener("click", function(){
    // wordsDiv.focus()
    timer.innerHTML= "15"
    timeSelected= "15"
    localStorage.setItem('timeSelected', timeSelected)
    secthirty.classList.remove("highlight")
    secsixty.classList.remove("highlight")
    secfifteen.classList.add("highlight")
})

secthirty.addEventListener("click", function(){
    // wordsDiv.focus()
    timer.innerHTML= "30"
    timeSelected= "30"
    localStorage.setItem('timeSelected', timeSelected)
    secfifteen.classList.remove("highlight")
    secsixty.classList.remove("highlight")
    secthirty.classList.add("highlight")
})
const primaryColor= rootStyles.getPropertyValue("--primaryColor")
secsixty.addEventListener("click", function(){
    // wordsDiv.focus()
    timer.innerHTML= "60"
    timeSelected= "60"
    localStorage.setItem('timeSelected', timeSelected) //save the setting so on refresh the setting stays
    secfifteen.classList.remove("highlight")
    secthirty.classList.remove("highlight")
    secsixty.classList.add("highlight")
})


//checks if the user is on mobile
var mobile = false
function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile = true
    } else {
        mobile= false
    }
}
  

const wordsDiv= document.querySelector(".wordsDiv")

//creates spans for every letter (we will use spans to color the letters)
function createSpans(){
    if (mobile == true){
        iosKeyboard.focus() //this is for mobile so this brings up keyboard
    }
    else{
        // wordsDiv.focus() //sets focus on when they refresh screen so they can type
    }

    words.innerHTML.split("").forEach(character =>{
        var characterSpan= document.createElement("span")
        characterSpan.innerText= character
        words.appendChild(characterSpan)
        characterSpan.classList.add("none")
        words.innerHTML= words.innerHTML.substring(1) //removes first character then we are left w no more <p> letters 
        cursorPlacement() 
    }) 
}

//find first span in the .words element to add cursor
function cursorPlacement(){
    const findSpan= words.querySelector(".none")
    findSpan.classList.add("blink")
}


// Function to handle when the window loses or gains focus
function handleWindowFocusChange() {
    const words = document.querySelector('.words');
    const focusElement = document.querySelector('.focus');

    if (document.hasFocus()) {
        // The window is active
        words.classList.remove('blurred');
        if (focusElement) {
            focusElement.style.display = 'none'; // Hide the .focus element
        }
    } else {
        // The window is not active
        words.classList.add('blurred'); //adds blur to words when screen not active
        if (focusElement) {
            focusElement.style.display = 'block'; // Show the "Click her to focus"
        }
    }
}
window.addEventListener('focus', handleWindowFocusChange);
window.addEventListener('blur', handleWindowFocusChange);

handleWindowFocusChange(); // Initial check to set the correct state on load



//handles keyboard shortcuts (enter and shift)
//store currentTest in currentTest to use for repeat test and if they click enter just load creatText()
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        newTest()
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primaryColor').trim();
        logoSvg.style.fill = primaryColor
        
        // const logo = document.querySelector('.logo');
        logo.style.color = primaryColor
    }
})

//handles new test button
const resetButton= document.querySelector(".reset")

resetButton.addEventListener("click", function(){
    newTest()
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primaryColor').trim();
    logoSvg.style.fill = primaryColor      
    // const logo = document.querySelector('.logo');
    logo.style.color = primaryColor
})


function newTest(){
    //creates the new test
    createText()
    //brings back all the UI
    document.querySelectorAll('.hide').forEach(function(element) {
        element.style.visibility = 'visible';
    })
    //resets timer and sets color back to normal
    clearInterval(interval)
    timer.innerHTML= timeSelected
    timer.style.color = rootStyles.getPropertyValue("--textSecondary") 
    timerStarted= false
    totalCorrectStored= 0
    totalPressedStored= 0
    missClicks= ""
}


function color(){
    var colorChoice= localStorage.getItem('colorChoice');
    if (colorChoice == "light"){
        // light colors
        root.style.setProperty('--bg-color', '#faf1e4');
        root.style.setProperty('--textPrimary', '#3c403b');
        root.style.setProperty('--textSecondary', '#c2b8aa');
        root.style.setProperty('--primaryColor', 'black');
        root.style.setProperty('--darkestColor', '#e7dccb'); 
        colorway.innerHTML= "light mode"

        //changes favicon color to match colorway
        const favicon16 = document.getElementById('favicon16');
        const appleFavi= document.getElementById('apple');
        const favicon32= document.getElementById('favicon32');
        favicon16.setAttribute('href', '/favicon-16x16.png');
        appleFavi.setAttribute('href', '/apple-touch-icon.png');
        favicon32.setAttribute('href', '/favicon-32x32.png');
    }

    else{  
        //dark
        root.style.setProperty('--bg-color', '#121520');
        root.style.setProperty('--textPrimary', '#f8f9f9');
        root.style.setProperty('--textSecondary', '#626984');
        root.style.setProperty('--primaryColor', '#ffffff');
        root.style.setProperty('--darkestColor', '#1c1e2b'); 
        colorway.innerHTML= "dark mode"

        //changes favicon color to match colorway
        const favicon16 = document.getElementById('favicon16');
        const appleFavi= document.getElementById('apple');
        const favicon32= document.getElementById('favicon32');
        favicon16.setAttribute('href', '/favicon16.png');
        appleFavi.setAttribute('href', '/apple.png');
        favicon32.setAttribute('href', '/favicon32.png');
    }
    // makes settings show correct wordLength
    if (wordLength == "short"){
        mediumSetting.classList.remove("highlight")
        longSetting.classList.remove("highlight")
        shortSetting.classList.add("highlight")  
    }
    else if (wordLength == "medium"){
        mediumSetting.classList.add("highlight")
        longSetting.classList.remove("highlight")
        shortSetting.classList.remove("highlight")  
    }
    else if (wordLength == "long"){
        mediumSetting.classList.remove("highlight")
        longSetting.classList.add("highlight")
        shortSetting.classList.remove("highlight")  
    }
    //jump add clear highlights and apply correct one here
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        repeatTest= "true" //used to make if condition for repeat test fulfilled
        enable= "true"
        newTest()

        //change the logo color back to primaryColor
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primaryColor').trim();
        logoSvg.style.fill = primaryColor
        logo.style.color = primaryColor
    }
})


document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        newTest()
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primaryColor').trim();
        logoSvg.style.fill = primaryColor
        
        // const logo = document.querySelector('.logo');
        logo.style.color = primaryColor
    }
})


//handles all timer functions: setting correct setting
function timerSettings(){
    if (timeSelected == 60){
        timer.innerHTML= "60"
        timeSelected= "60"
        secfifteen.classList.remove("highlight")
        secsixty.classList.add("highlight")
        secthirty.classList.remove("highlight")
    } 
    else if (timeSelected == 30){
        timer.innerHTML= "30"
        timeSelected= "30"
        secfifteen.classList.remove("highlight")
        secsixty.classList.remove("highlight")
        secthirty.classList.add("highlight")
    }
    else {
        timer.innerHTML= "15"
        timeSelected= "15"
        secfifteen.classList.add("highlight")
        secsixty.classList.remove("highlight")
        secthirty.classList.remove("highlight")
    }//jump here
}












