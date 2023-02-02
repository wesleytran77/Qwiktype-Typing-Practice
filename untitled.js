//add source code tab working when make repo to github



//loads new text once the page loads
window.addEventListener("load", function(){
    newText()
})


//used for making text for user to type
var randomWords= ["words ", "went " , "vehicle " , "bread ", "money ", "food ", "contrast ", "still ", "both ", "before ", "about ", "over " , "went ", "work ", "life ", "sand ", "hawk ", "post ", "carrot ", "penguin ", "haircut ", "japan ", "apple ", "color ", "bench ", "chest ", "cork ", "corn ", "fly ", "pray ", "dream ", "real ", "strong ", "create ", "empire ", "world ", "feel ", "fire ", "power ", "rebel ", "feet ", "meat ", "big ", "rain ", "hail ", "all ", "mine ", "ready ", "job ", "rich ", "pool ", "play ", "life ", "one ", "count ", "brain ", "chess ", "forest ", "rainbow ", "steak ", "carrot ", "ice ", "kitten ", "fried ", "baked ", "hard ", "minute ", "hour ", "as ", "torn ", "breathe ", "hot ", "good ", "rare ", "medium ", "king ", "ranch ", "sauce ", "prince ", "wit ", "peace ", "smile "]


//imports
const text= document.querySelector(".text")
const input= document.querySelector(".input")


//makes new text and check when text is typed fully
var currentText= ""
var totalHits= 0

function newText(){
    if (input.value.length == currentText.length){

        if (timerStarted == true){
            totalHits+= document.querySelectorAll(".correct").length //identified problem
        }
        input.value= ""
        currentText= ""
        
        while (currentText.length < 70){
            currentText += randomWords[Math.floor(Math.random() * randomWords.length)]
        }
        currentText= currentText.trim()
        createSpans()
    }
}


//creates spans for text so we can style each character 
function createSpans(){
    text.innerHTML= ""
    currentText.split("").forEach(character =>{
        var characterSpan= document.createElement("span")
        characterSpan.innerText= character
        text.appendChild(characterSpan)
    })
}


//handles every key pressed checks if right or wrong key 
//global variables
var totalPressed= 0

input.addEventListener("input", function(){
    const letters= text.querySelectorAll("span")
    const inputSplit= input.value.split("")
    runTimer()

    timer.style.visibility= "visible"
    document.querySelector(".topRow").style.borderTop= "2.3rem solid transparent"
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.style.visibility = "hidden";
    })
    const icons= document.querySelectorAll(".icon")
    icons.forEach(icon =>{
        icon.style.visibility= "hidden"
    })
    document.querySelector(".logo").style.color= "#646669"
    document.querySelector(".lightning").style.fill= "#646669"

    totalPressed++

    letters.forEach((span, index) => {
        const typed= inputSplit[index]
        if (typed == null){
            span.classList.remove("correct")
            span.classList.remove("incorrect")
            newText() //checking if text is done, if so new text given
        } else if (typed == span.innerText){    
            span.classList.add("correct")
            span.classList.remove("incorrect")
            newText()
        } else{
            span.classList.remove("correct")
            span.classList.add("incorrect")
            input.value= input.value.slice(0, -1) //takes off last key pressed from input 
            newText()
        }
    })
})


//handles all replay buttons
document.querySelector(".replay").addEventListener("click", function(){
    loadHome()
})

document.querySelector(".logo").addEventListener("click", function(){
    loadHome()
})

document.querySelector(".lightning").addEventListener("click", function(){
    loadHome()
})

document.querySelector(".replay2").addEventListener("click", function(){
    loadHome()
})
//restart game using enter key
document.addEventListener("keydown", function(){
    input.focus()//makes sure input is always ready
    if (event.keyCode == 13 && timerStarted == false){
        loadHome()
    }
})



//handles timer and calculates WPM and accuracy
var timer= document.querySelector(".timer")
var timerStarted= false //makes timer run only once (flag variable)
var startTimer= false


function runTimer(){
    if (timerStarted == false){
        var seconds= 30
        timer.innerHTML= 30
        timerStarted= true
        startTimer= setInterval(countdown, 1000)

        function countdown(){
            if (seconds > 0){
                seconds--
                timer.innerHTML= seconds
            }
            else{
                timerStarted= false
                timer.style.visibility= "hidden"
                document.querySelector(".main").style.visibility= "hidden"
                
                clearInterval(startTimer)
                totalHits= totalHits + document.querySelectorAll(".correct").length//add the current correct presses to the amount
                const tabs = document.querySelectorAll(".tab")
                tabs.forEach(tab => {
                    tab.style.visibility = "hidden";
                })
                const icons= document.querySelectorAll(".icon")
                icons.forEach(icon =>{
                    icon.style.visibility= "hidden"
                })
                document.querySelector(".resultsPage").style.display= "block"
                document.querySelector(".topRow").style.borderTop= "2.3rem solid transparent"
                document.querySelector(".acc").innerHTML= Math.floor((totalHits / totalPressed) * 100) + "%";
                document.querySelector(".wpm").innerHTML= Math.floor((totalHits / 5) / 0.5) //calculates WPM and displays it
                document.querySelector(".metricsDiv").style.visibility= "visible"
                document.querySelector(".restart").style.visibility= "visible"
                document.querySelector(".logo").style.color= "#d1d0c5"
                document.querySelector(".lightning").style.fill= "#abe9b3"
            }
        }
    }
}


//disables backspace which is not needed
document.addEventListener("keydown", function(){
    if (event.keyCode == 8){
        event.preventDefault()
    }
})


//if mouse moves we want tabs to show
document.addEventListener("mousemove", function(){
    if (timerStarted == true){
        const tabs = document.querySelectorAll(".tab")
        tabs.forEach(tab => {
            tab.style.visibility = "visible";
        })
        const icons = document.querySelectorAll(".icon")
        icons.forEach(icon => {
            icon.style.visibility = "visible";
        })
        
        document.querySelector(".topRow").style.borderTop= "2.3rem solid #abe9b3"
        document.querySelector(".logo").style.color= "#d1d0c5"
        document.querySelector(".lightning").style.fill= "#abe9b3"
    }
})


//ensures input is always ready to type
document.addEventListener("click", function(){
    input.focus()
})


//takes you to home and sets up new game
function loadHome(){
    clearInterval(startTimer) 
    document.querySelector(".resultsPage").style.display= "none"
    timer.innerHTML= 30
    timer.style.visibility= "hidden"
    timerStarted= false
    totalHits= 0
    totalPressed= 0
    input.focus()//makes sure input is always ready
    document.querySelector(".main").style.visibility= "visible"
    document.querySelector(".metricsDiv").style.visibility= "hidden"
    document.querySelector(".restart").style.visibility= "hidden"
    document.querySelector(".topRow").style.borderTop= "2.3rem solid #abe9b3"
    const tabs = document.querySelectorAll(".tab")
    tabs.forEach(tab => {
        tab.style.visibility = "visible";
    })
    const icons = document.querySelectorAll(".icon")
    icons.forEach(icon => {
        icon.style.visibility = "visible";
    })
    currentText= ""
    input.value= ""
    newText()
}


//alerts user if CAPS LOCK is on
document.addEventListener("keydown", function(event) {
    if (event.getModifierState("CapsLock")) {
      alert("Turn off Caps Lock");
    }
})
  



