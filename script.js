const mainContainer = document.getElementById('main')
const header = document.getElementById('head')
const calendarSection = document.getElementById('calendar')
const eventSection = document.getElementById('events')

//Header
const headerButtonLeft = document.createElement('button')
headerButtonLeft.setAttribute('class', 'header_button')
headerButtonLeft.innerHTML = '<i class="ri-arrow-left-line"></i>'

const headerButtonRight = document.createElement('button')
headerButtonRight.setAttribute('class', 'header_button')
headerButtonRight.innerHTML = '<i class="ri-arrow-right-line"></i>' 

const headerH1 = document.createElement('h1')
headerH1.setAttribute('class', 'header__h1')
headerH1.innerText = 'March 2023'

header.append(headerButtonLeft, headerH1, headerButtonRight)


//kalender 
// let arry = []
// for( let i = 0; i < 7; i++) {
// const calendarH2 = document.createElement('h2') 
// arry.push(calendarH2)
// }
// arry[1].innerText = 1



// Händelser
const events = document.getElementById('events')
const eventHeading = document.createElement('h3')
eventHeading.setAttribute('class', 'eventHeading')
eventHeading.innerHTML = 'Händelse'

events.append(eventHeading)


