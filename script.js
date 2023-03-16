const mainContainer = document.getElementById('main')
const header = document.getElementById('head')
const calendarSection = document.getElementById('calendar')
const eventSection = document.getElementById('events')

//Header
const headerButtonLeft = document.createElement('button')
headerButtonLeft.setAttribute('class', 'header_button_left')
headerButtonLeft.innerHTML = '<i class="ri-arrow-left-line"></i>'

const headerButtonRight = document.createElement('button')
headerButtonRight.setAttribute('class', 'header_button_right')
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
AddEventButtonText.innerText = 'Lägg till'

header.append(emptySpace, headerButtonLeft, headerH1, headerButtonRight, addEventButtonPlus, AddEventButtonText)

// Händelser---------

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
const closeOverlayButton = document.createElement('button')
closeOverlayButton.setAttribute('class', 'close-overlay-button')
closeOverlayButton.innerHTML = '<i class="fa fa-times fa-2x" aria-hidden="true"></i>'

// Händelse
const overlayEvent = document.createElement('p')
overlayEvent.setAttribute('class', 'overlay-event')
overlayEvent.setAttribute('id', 'overlayEvent')
overlayEvent.innerText = 'Händelse'

// Inputfält händelse
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

// funktion för att spara händelse i local storage
function saveEvent() {
	let eventList = JSON.parse(localStorage.getItem('eventList') || '[]')
	if (overlayDayCheckbox.checked == true) {
		const eventInfo = {
			event: addEvent.value,
			start: overlayStartInput.value,
			end: overlayEndInput.value,
			allDay: 'Hela dagen'
		}
		eventList.push(eventInfo)
	}
	else if (overlayDayCheckbox.checked == false) {
		const eventInfo = {
			event: addEvent.value,
			start: overlayStartInput.value,
			end: overlayEndInput.value,
		}
		eventList.push(eventInfo)
	}
	localStorage.setItem('eventList', JSON.stringify(eventList))
	
}

// Klickhändelser för alla knappar

addEventButtonPlus.addEventListener('click', () => {
	overlay.style.display = 'grid'
})

AddEventButtonText.addEventListener('click', () => {
	overlay.style.display = 'grid'
})

closeOverlayButton.addEventListener('click', () => {
	overlay.style.display = invisible
})

saveButton.addEventListener('click', () => {
	saveEvent()
	addEvent.value = ''
	overlayStartInput.value = ''
	overlayEndInput.value = ''
	eventConatiner.innerHTML = ''
	
	// Publicera på sidan
	let eventList = JSON.parse(localStorage.getItem('eventList') || '[]')
	for (const eventInfo of eventList) {
		amountOfEvent(eventInfo)
	}
	
})

const containerOverlay = document.getElementById('main')
overlay.append(overlayHeading, saveButton, closeOverlayButton, overlayHeading, overlayEvent, addEvent, overlayStart, overlayStartInput, overlayEnd, overlayEndInput, overlayDay, overlayDayCheckbox)
containerOverlay.append(overlay)

// Händelseruta
const eventConatiner = document.getElementById('eventContainer')
function amountOfEvent(eventInfo) {
	const events = document.createElement('label')
	events.setAttribute('class', 'events')
	
	const eventHeading = document.createElement('h3')
	eventHeading.setAttribute('class', 'event-heading')
	eventHeading.setAttribute('id', 'eventHeading')
	
	const eventTime = document.createElement('p')
	eventTime.setAttribute('class', 'event-time')
	
	const eventCheck = document.createElement('input')
	eventCheck.setAttribute('class', 'event-check')
	eventCheck.type = 'checkbox'
	
	// Radera händelse 
	const eventDelete = document.createElement('button')
	eventDelete.setAttribute('class', 'event-delete')
	eventDelete.setAttribute('id', 'eventDelete')
	eventDelete.innerText = 'Ta bort'
	eventDelete.addEventListener('click', (event) => {
		let eventList = JSON.parse(localStorage.getItem('eventList') || '[]');
		let deleteEvent = event.target.parentNode.querySelector('#eventHeading').textContent;
		
		for (let i = 0; i < eventList.length; i++) {
			if (eventList[i].event === deleteEvent) {
				eventList.splice(i, 1);
				break;
			}
		}
		
		localStorage.setItem('eventList', JSON.stringify(eventList));
		event.target.parentNode.remove();
	});
	
	eventHeading.innerHTML = eventInfo.event
	if (eventInfo.allDay !== undefined) {
		eventTime.innerHTML = eventInfo.allDay;
	} else {
		eventTime.innerHTML = `${eventInfo.start}-${eventInfo.end}`;
	}
	
	events.append(eventHeading, eventTime, eventCheck, eventDelete)
	eventConatiner.append(events)
}


// kalender ---------------------

const weekDays = document.createElement('div')
weekDays.setAttribute('class', 'week__days')

function generateCalendar(month, year) {
	const months = [
		"Januari", "Feburari", "Mars", "April", "Maj", "Juni",
		"Juli", "Augusti", "September", "Oktober", "November", "December"
	]
	const days = [
		"Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"
	]
	
	// Lägga till Vecka på kalendern 
	let date = new Date(year, month);
	let monthIndex = date.getMonth();
	let dayInMonth = new Date(year, monthIndex + 1, 0).getDate()
	
	let firstDay = new Date(year, monthIndex).getDay() - 1
	
	// Här lägger jag till månad och år i headerH1 som skapats tidigare.
	headerH1.innerText = ' ' + months[monthIndex] + ' ' + year;
	
	let dayCount = 1;
	let selectedDate = null; //för att bara en ska kunna bli märkt samtidigt.
	
	// ----------------------------------------
	
	function getWeekNumber(date) {
		// Obs! Inte säkert att den räknar rätt. Årets första vecka varierar när den börjar. Se: https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
		const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
		const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
		return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
	}
	
	
	// Den här funktionen skapar måndag,tisdag, onsdag, torsdag, etc
	let weekDays = document.createElement('div')
	weekDays.setAttribute('class', 'week__days')
	days.forEach((day) => {
		let span = document.createElement('span')
		span.innerText = day;
		weekDays.append(span)
	})
	
	calendarSection.append(weekDays)
		
	let currentDate = new Date();

	// en yttre loop som körs 5 ggr för att skapa 5 veckor 
	for (let i = 0; i < 5; i++) {
		let weekNumElem = document.createElement('div');
		weekNumElem.classList.add('week-num');

		console.log(`Per vecka: daycount=${dayCount}, firstDay=${firstDay}`)
		let firstDayOfWeek = new Date(year, monthIndex, dayCount -  - firstDay)
		weekNumElem.textContent = getWeekNumber(firstDayOfWeek);
		
		let week = document.createElement('div')
		week.classList.add('week')
		
		
		// en loop som körs 7 ggr och skapar dagarna
		for (let d = 0; d < 7; d++) {
			let day = document.createElement('div')
			day.classList.add('day')
			let prevMonthDays = new Date(year, monthIndex, 0).getDate();
			let dayNum = prevMonthDays - (firstDay - d) + 1;
			console.log('dayNum', dayNum)
			day.innerText = dayNum
			
			if (d === 6) {
				day.classList.add('red')
			}
			
			// här kontrollerar jag ifall den första veckan i månaden och dagens datum är den första dagen i månaden. Är det de så skapas ett tomt fält för att visa de tomma dagarna i kalendern
			if (i === 0 && d < firstDay) {
				
				let firstWeek = new Date(year, monthIndex - 1, dayNum)
				weekNumElem.textContent = getWeekNumber(firstWeek) 
				
					let white = document.createElement('div')
					white.classList.add('white')
					white.append(day)
					week.append(white)
					
					if(d===0){
						day.appendChild(weekNumElem)
					}
								
				// Här kontrollerar jag ifall antalet dagar som skapats i kalendern är fler än antalet dagar i månaden. I så fall stopp.
			} else if (dayCount > dayInMonth) {
				let daysLeft = dayCount - dayInMonth;
				day.innerText = daysLeft;
				let white = document.createElement('div')
				white.classList.add('white')
				white.append(day)
				week.append(white)
				
				dayCount++;
				
		// annars sätts texten på dagen (nummer) och läggs till i veckan. Samt ökar "daycount" för att räkna dagarna i veckan.
			} else {
				day.textContent = dayCount;
				week.appendChild(day)
				
				if (d === 0) {
					day.appendChild(weekNumElem);
				}
								
				dayCount++;
				
				day.addEventListener('click', () => {
					// Tar bort den vita bakgrunden om det är en som redan är klickad
					if (selectedDate) {
						selectedDate.style.backgroundColor = '';
						selectedDate.style.color = '';
					}
					// lägger till vit bakgrund om ett datum blir klickad
					day.style.backgroundColor = 'white';
					day.style.color = 'black'
					// updaterar valt datum
					selectedDate = day;
					//om dagen som blir klickad är en söndag så ska texten vara röd
					if (d === 6) {
						day.style.color = 'red'
						
					}
				});
			}
		}
		// lägg till veckorna i kalender kontainern som hämtas med dom högre upp.
		calendarSection.appendChild(week)
		
	}
}







generateCalendar(2, 2023)

let currentMonth = 2;
const currentYear = new Date().getFullYear();
//Eventlyssnare på pilar 

headerButtonLeft.addEventListener('click', () => {
	while (calendarSection.firstChild) {
		calendarSection.removeChild(calendarSection.firstChild)
	}
	currentMonth--
	generateCalendar(currentMonth, currentYear)
})

headerButtonRight.addEventListener('click', () => {
	while (calendarSection.firstChild) {
		calendarSection.removeChild(calendarSection.firstChild)
	}
	currentMonth++
	generateCalendar(currentMonth, currentYear)
})


