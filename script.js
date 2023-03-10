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

const emptySpace = document.createElement('div')
emptySpace.setAttribute('class', 'emptySpace')

const addEventButtonPlus = document.createElement('button')
addEventButtonPlus.setAttribute('class', 'add-event-button-plus')
addEventButtonPlus.innerHTML = '<i class="fa fa-plus fa-2x" aria-hidden="true"></i>'

const AddEventButtonText = document.createElement('button')
AddEventButtonText.setAttribute('class', 'add-event-button-text')
AddEventButtonText.innerText= 'Lägg till'

header.append(emptySpace, headerButtonLeft, headerH1, headerButtonRight, addEventButtonPlus, AddEventButtonText)




//kalender 
// let arry = []
// for( let i = 0; i < 7; i++) {
// const calendarH2 = document.createElement('h2') 
// arry.push(calendarH2)
// }
// arry[1].innerText = 1



// Händelser
function amountOfEvent() {
	const events = document.createElement('label') 
events.setAttribute('class', 'events')

const eventHeading = document.createElement('h3')
eventHeading.setAttribute('class', 'event-heading')

const eventTime = document.createElement('p')
eventTime.setAttribute('class', 'event-time')

const eventCheck = document.createElement('input')
eventCheck.setAttribute('class', 'event-check')

eventCheck.type = 'checkbox'
eventHeading.innerHTML = 'Händelse'
eventTime.innerHTML = '09.00'

events.append(eventHeading, eventTime, eventCheck)
eventConatiner.append(events)
}

const eventConatiner = document.getElementById('eventContainer')
amountOfEvent()
amountOfEvent()

// Overlay
const overlay = document.createElement('div')
overlay.setAttribute('class', 'overlay')
overlay.setAttribute('id', 'overlay')

// Overlay Rubrik
const overlayHeading = document.createElement('h4')
overlayHeading.setAttribute('class', 'overlay-heading')
overlayHeading.setAttribute('id', 'overlayHeading')
overlayHeading.innerText = 'Torsdag 4/3'

// Spara-knapp i overlay
const saveButton = document.createElement('button')
saveButton.setAttribute('class', 'save-button')
saveButton.innerText = 'Spara'

// Kryss för att stänga overlay
const closeOverlayButton =document.createElement('button')
closeOverlayButton.setAttribute('class', 'close-overlay-button')
closeOverlayButton.innerHTML = '<i class="fa fa-times fa-2x" aria-hidden="true"></i>'

// Startar
const overlayEvent = document.createElement('p')
overlayEvent.setAttribute('class', 'overlay-event')
overlayEvent.setAttribute('id', 'overlayEvent')
overlayEvent.innerText = 'Händelse'

// Inputfält i overlay
const addEvent = document.createElement('input')
addEvent.setAttribute('class', 'add-event')
addEvent.setAttribute('id', 'addEvent')

// Startar
const overlayStart = document.createElement('p')
overlayStart.setAttribute('class', 'overlay-start')
overlayStart.setAttribute('id', 'overlayStart')
overlayStart.innerText = 'Startar'

const overlayStartInput = document.createElement('input')
overlayStartInput.setAttribute('class', 'overlay-start-input')
overlayStartInput.setAttribute('id', 'overlayStartInput')
overlayStartInput.type = 'time'

// Slutar
const overlayEnd = document.createElement('p')
overlayEnd.setAttribute('class', 'overlay-end')
overlayEnd.setAttribute('id', 'overlayEnd')
overlayEnd.innerText = 'Slutar'

const overlayEndInput = document.createElement('input')
overlayEndInput.setAttribute('class', 'overlay-end-input')
overlayEndInput.setAttribute('id', 'overlayEndInput')
overlayEndInput.type = 'time'

// Hela dagen
const overlayDay = document.createElement('p')
overlayDay.setAttribute('class', 'overlay-day')
overlayDay.setAttribute('id', 'overlayDay')
overlayDay.innerText = 'Hela dagen'

const overlayDayCheckbox = document.createElement('input')
overlayDayCheckbox.setAttribute('class', 'overlay-day-checkbox')
overlayDayCheckbox.setAttribute('id', 'overlayDayCheckbox')
overlayDayCheckbox.type = 'checkbox'

const invisible = overlay.style.display = 'none'

addEventButtonPlus.addEventListener('click', () => {
	overlay.style.display = 'grid'
})

AddEventButtonText.addEventListener('click', () => {
	overlay.style.display = 'grid'
})

closeOverlayButton.addEventListener('click', () => {
	overlay.style.display = invisible
})

let eventList = []

eventList = JSON.parse(localStorage.getItem('eventList'))
saveButton.addEventListener('click', () => {
	const eventInputValue = addEvent.value
	const eventStartTime = overlayStartInput.value
	const eventEndTime = overlayEndInput.value

	eventList.push(eventInputValue)
	localStorage.setItem('eventList', JSON.stringify(eventList))
	addEvent.value = ''
})



const contaierOverlay = document.getElementById('main')
overlay.append(overlayHeading, saveButton, closeOverlayButton, overlayHeading, overlayEvent, addEvent, overlayStart, overlayStartInput, overlayEnd, overlayEndInput, overlayDay, overlayDayCheckbox)
contaierOverlay.append(overlay)



// kalender ---------------------

generateACalendar()

function generateACalendar(){

	const months = [
		"Januari", "Feburari", "Mars", "April", "Maj", "Juni",
		"Juli", "Augusti", "September", "Oktober", "November", "December"
	]

	console.log('nu provar jag generateACalender funktionen ')
	let date = new Date() //dag, månad, år + tidzon
	let month = date.getMonth()
	let year = date.getFullYear()
	
	// alert(date)
	// alert(month)  Blir månad två pga array 0

	//  'YYYY-MM-DD hh:mm:ss.mmm' format.
	let dayInMonth = new Date(year, month +  1, 0).getDate()

	// .getDate() ----- Tar man bort den förlorar tiden formatet

	// januari är 0 (1 måste vara med för att korregera till rätt månad)
	let firstDay = new Date(year, month, 1).getDay()

	// Här lägger jag till månad och år i headerH1 som skapats tidigare.
	headerH1.innerText = ' ' + months[month] + ' ' + year; 

	let dayCount = 1; 
	// en yttre loop som körs 5 ggr för att skapa 5 veckor 
	for( let i = 0; i < 5; i++) {
		let week = document.createElement('div')
		week.classList.add('week')
		
		// en loop som körs 7 ggr och skapar dagarna
		for(let d = 0; d < 7; d++ ){
			let day = document.createElement('div')
			day.classList.add('day')
		
			// här kontrollerar jag ifall den första veckan i månaden och dagens datum är den första dagen i månaden. Är det de så skapas ett tomt fält för att visa de tomma dagarna i kalendern
			if(i === 0 && d < firstDay){
				let white = document.createElement('div')
				white.classList.add('white')
				week.appendChild(white)

			// Här kontrollerar jag ifall antalet dagar som skapats i kalendern är fler än antalet dagar i månaden. I så fall stopp.
			} else if(dayCount > dayInMonth){
				break;

			// annars sätts texten på dagen (nummer) och läggs till i veckan. Samt ökar "daycount" för att räkna dagarna i veckan.
			}else {
				day.textContent = dayCount;
				week.appendChild(day)
				dayCount++;
			}
		}
		// lägg till veckorna i kalender kontainern som hämtas med dom högre upp.
		calendarSection.appendChild(week)

	}

}



