window.onload = function() {
    //path color() > calculateStats() > handlePage2Refresh()
    color()
    updateLeaderboard()

}



//handles going back to home page when refreshing 
function handlePage2Refresh() {
    if (localStorage.getItem('page2Refresh')) {
        window.location.href = 'index.html'; //send them over if they have the flag so on refresh it goes back to home
        localStorage.removeItem('page2Refresh') //remove the flag so they don't get sent to home page upon loading results page
    } 
    else{
        localStorage.setItem('page2Refresh', true) //grant flag so they can go to home page on refresh
    }
}


// //DOMs to manipulate
const colorScheme= document.querySelector(".lightdarkmode")
const colorway2= document.querySelector(".colorway2")


// //controls light and dark mode
var colorChoice= "light" //used to know if light or dark to apply colors
const root = document.documentElement //grab the root element from CSS to edit the styles




colorScheme.addEventListener("click", function(){
    if (colorChoice == "light"){
        localStorage.setItem('colorChoice', colorChoice)
        colorChoice = "dark"
        root.style.setProperty('--bg-color', '#121520');
        root.style.setProperty('--textPrimary', '#f8f9f9');
        root.style.setProperty('--textSecondary', '#626984');
        root.style.setProperty('--primaryColor', '#ffffff');
        root.style.setProperty('--darkestColor', '#1c1e2b'); 
        colorway2.innerHTML= "dark mode"

        //changes favicon color to match colorway
        const favicon16 = document.getElementById('favicon16');
        const appleFavi= document.getElementById('apple');
        const favicon32= document.getElementById('favicon32');
        favicon16.setAttribute('href', 'favicon16.png');
        appleFavi.setAttribute('href', 'apple.png');
        favicon32.setAttribute('href', 'favicon32.png');
    }

    else{
        localStorage.setItem('colorChoice', colorChoice)
        colorChoice = "light"
        root.style.setProperty('--bg-color', '#faf1e4');
        root.style.setProperty('--textPrimary', '#3c403b');
        root.style.setProperty('--textSecondary', '#c2b8aa');
        root.style.setProperty('--primaryColor', 'black');
        root.style.setProperty('--darkestColor', '#e7dccb'); 
        colorway2.innerHTML= "light mode"

        //changes favicon color to match colorway
        const favicon16 = document.getElementById('favicon16');
        const appleFavi= document.getElementById('apple');
        const favicon32= document.getElementById('favicon32');
        favicon16.setAttribute('href', 'favicon-16x16.png');
        appleFavi.setAttribute('href', 'apple-touch-icon.png');
        favicon32.setAttribute('href', 'favicon-32x32.png');
    }

    //needed to update color of highlight in leaderboard
    updateLeaderboard()
});


//p elements on the leaderboard to edit
const you= document.querySelectorAll(".you")
const youWPM= document.querySelector(".youWPM")
const youAccuracy= document.querySelector(".youAccuracy")
const wpmResult= document.querySelector(".wpmResult")
const accResult= document.querySelector(".accResult")

var wordLength= localStorage.getItem('wordLength');
var timeSelected= localStorage.getItem('timeSelected');
function calculateStats(){
    var totalCorrectStored= localStorage.getItem('totalCorrectStored');
    var totalPressedStored= localStorage.getItem('totalPressedStored');
    var missClicks= localStorage.getItem('missClicks');
    var missedKeys= document.querySelector(".missedKeys")
    var testType= document.querySelector(".testChoice")

    //update testType in stats box
    testType.innerHTML= timeSelected + " " + wordLength

    //shows user what keys they miss clicked
    if (missClicks.length > 0){
        missedKeys.innerHTML= missClicks 
    }
    else{
        missedKeys.innerHTML= "n/a"
    }
    
    //calculates WPM and accuracy
    if (timeSelected == 15){
        youWPM.innerHTML= Math.floor((totalCorrectStored / 5)) * 4 

    }
    else if (timeSelected == 30){
        youWPM.innerHTML= Math.floor((totalCorrectStored / 5)) * 2  
    }
    else{
        youWPM.innerHTML= Math.floor((totalCorrectStored / 5))  
    }
    youAccuracy.innerHTML= Math.floor((totalCorrectStored / totalPressedStored) * 100) + "%"
    accResult.innerHTML=  youAccuracy.innerHTML
    wpmResult.innerHTML= youWPM.innerHTML 
    handlePage2Refresh();
}


//import color Choice if dark then set root colors and apply using function colorFunction()
function color(){
    var colorChoice= localStorage.getItem('colorChoice');
    if (colorChoice == "light"){
        // light colors
        root.style.setProperty('--bg-color', '#faf1e4');
        root.style.setProperty('--textPrimary', '#3c403b');
        root.style.setProperty('--textSecondary', '#c2b8aa');
        root.style.setProperty('--primaryColor', 'black');
        root.style.setProperty('--darkestColor', '#e7dccb'); 
        colorway2.innerHTML= "light mode"

        //changes favicon color to match colorway
        const favicon16 = document.getElementById('favicon16');
        const appleFavi= document.getElementById('apple');
        const favicon32= document.getElementById('favicon32');
        favicon16.setAttribute('href', 'assets/img/favicon-16x16.png');
        appleFavi.setAttribute('href', 'assets/img/apple-touch-icon.png');
        favicon32.setAttribute('href', 'assets/img/favicon-32x32.png');
    }

    else{  
        //dark
        root.style.setProperty('--bg-color', '#121520');
        root.style.setProperty('--textPrimary', '#f8f9f9');
        root.style.setProperty('--textSecondary', '#626984');
        root.style.setProperty('--primaryColor', '#ffffff');
        root.style.setProperty('--darkestColor', '#1c1e2b'); 
        colorway2.innerHTML= "dark mode"

        //changes favicon color to match colorway
        const favicon16 = document.getElementById('favicon16');
        const appleFavi= document.getElementById('apple');
        const favicon32= document.getElementById('favicon32');
        favicon16.setAttribute('href', 'assets/img/favicon16.png');
        appleFavi.setAttribute('href', 'assets/img/apple.png');
        favicon32.setAttribute('href', 'assets/img/favicon32.png');
    }
    calculateStats()
}


//handles enter keyboard shortcut (new test)
document.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && window.location.pathname.endsWith('results.html')) {
        //sending data over to keep the same settings       
        localStorage.setItem('wordLength', wordLength)
        localStorage.setItem('timeSelected', timeSelected) 
        handlePage2Refresh() //sends back to index.html
    }
})

//handles shift keyboard shortcut (repeat test) currently this is the exact same as enter shortcut
var repeatTest= localStorage.getItem('repeatTest')
var enable= localStorage.getItem('enable')

document.addEventListener('keydown', (event) => {
    if (event.key === 'Shift' && window.location.pathname.endsWith('results.html')) {
        //sending data over to keep the same settings        
        localStorage.setItem('wordLength', wordLength) 
        localStorage.setItem('timeSelected', timeSelected)
        repeatTest= "true"
        enable = "true"
        localStorage.setItem('enable', enable)
        localStorage.setItem('repeatTest', repeatTest) //new
        handlePage2Refresh() //sends back to index.html
    }
})


//handles restart test button
var restartTestButton= document.querySelector(".restartTestButton")
restartTestButton.addEventListener("click", function(){
    //sending data over to keep the same settings        
    localStorage.setItem('wordLength', wordLength) 
    localStorage.setItem('timeSelected', timeSelected)
    repeatTest= "true"
    enable = "true"
    localStorage.setItem('enable', enable)
    localStorage.setItem('repeatTest', repeatTest) //new
    handlePage2Refresh() //sends back to index.html
})


//handles new test button
var newTestButton= document.querySelector(".newTestButton")
newTestButton.addEventListener("click", function(){
    //sending data over to keep the same settings       
    localStorage.setItem('wordLength', wordLength)
    localStorage.setItem('timeSelected', timeSelected) 
    handlePage2Refresh() //sends back to index.html
})

var leaderboard= [
    {name: "Wesley", WPM: 102, accuracy: 95},
    {name: "Chrollo", WPM: 71, accuracy: 81},
    {name: "Jane", WPM: 64, accuracy: 60},
    {name: "Light", WPM: 55, accuracy: 80},
    {name: "Best", WPM: 0, accuracy: 50}
]

//updates leaderboard 
function updateLeaderboard(){
    //stores the personal record and updates it if its surpassed
    var personalRecord = localStorage.getItem("personalRecord")
    var storedAccuracy = localStorage.getItem("storedAccuracy")
    var wpm = wpmResult.innerHTML
    

    if (personalRecord == null){
        personalRecord= wpm
        localStorage.setItem("personalRecord", personalRecord)

        storedAccuracy= accResult.innerHTML
        localStorage.setItem("storedAccuracy", storedAccuracy)
        
    }else{
        //if the test wpm they just did beats previous PR then update PR 
        if (+wpm > +personalRecord){
            personalRecord= wpm
            localStorage.setItem("personalRecord", personalRecord)

            storedAccuracy= accResult.innerHTML
            localStorage.setItem("storedAccuracy", storedAccuracy)
        }
    }


    //puts the players in correct order and displays Best score and KEEPS IT
    leaderboard[4].WPM= personalRecord


    //sorts the leaderboard after updating Best's wpm
    leaderboard.sort(function(a, b){
        return b.WPM - a.WPM
    })


    //displays leaderboard's names in descending order 
    firstPlace.innerHTML= leaderboard[0].name
    secondPlace.innerHTML= leaderboard[1].name
    thirdPlace.innerHTML= leaderboard[2].name
    fourthPlace.innerHTML= leaderboard[3].name
    fifthPlace.innerHTML= leaderboard[4].name

    firstWPM.innerHTML= leaderboard[0].WPM
    secondWPM.innerHTML= leaderboard[1].WPM
    thirdWPM.innerHTML= leaderboard[2].WPM
    fourthWPM.innerHTML= leaderboard[3].WPM
    fifthWPM.innerHTML= leaderboard[4].WPM

    const primaryColor= getComputedStyle(document.documentElement).getPropertyValue('--primaryColor');

    if (leaderboard[0].name === "Best") {
        firstPlace.style.color = primaryColor
        firstWPM.style.color = primaryColor
        firstAccuracy.style.color= primaryColor
        firstAccuracy.innerHTML= storedAccuracy
    }
    else if (leaderboard[1].name === "Best") {
        secondPlace.style.color = primaryColor
        secondWPM.style.color = primaryColor
        secondAccuracy.style.color= primaryColor //highlight the accuracy
        secondAccuracy.innerHTML= storedAccuracy
    }
    else if (leaderboard[2].name === "Best") {
        thirdPlace.style.color = primaryColor
        thirdWPM.style.color = primaryColor
        thirdAccuracy.style.color= primaryColor //highlight the accuracy
        thirdAccuracy.innerHTML= storedAccuracy
    }
    else if (leaderboard[3].name === "Best") {
        fourthPlace.style.color = primaryColor
        fourthWPM.style.color = primaryColor
        fourthAccuracy.style.color= primaryColor //highlight the accuracy
        fourthAccuracy.innerHTML= storedAccuracy
    }
    else if (leaderboard[4].name === "Best") {
        fifthPlace.style.color = primaryColor
        fifthWPM.style.color = primaryColor
        fifthAccuracy.style.color= primaryColor //highlight the accuracy
        fifthAccuracy.innerHTML= storedAccuracy
    }
}

//this is for updating the leaderboard
var firstPlace= document.querySelector(".firstPlace")
var firstWPM= document.querySelector(".firstWPM")
var firstAccuracy= document.querySelector(".firstAccuracy")

var secondPlace= document.querySelector(".secondPlace")
var secondWPM= document.querySelector(".secondWPM")
var secondAccuracy= document.querySelector(".secondAccuracy")

var thirdPlace= document.querySelector(".thirdPlace")
var thirdWPM= document.querySelector(".thirdWPM")
var thirdAccuracy= document.querySelector(".thirdAccuracy")

var fourthPlace= document.querySelector(".fourthPlace")
var fourthWPM= document.querySelector(".fourthWPM")
var fourthAccuracy= document.querySelector(".fourthAccuracy")

var fifthPlace= document.querySelector(".fifthPlace")
var fifthWPM= document.querySelector(".fifthWPM")
var fifthAccuracy= document.querySelector(".fifthAccuracy")

