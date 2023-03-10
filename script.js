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

header.append(headerButtonLeft, headerH1, headerButtonRight)


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


// kalender ---------------------


function generateCalendar(month, year) {

	const months = [
		"Januari", "Feburari", "Mars", "April", "Maj", "Juni",
		"Juli", "Augusti", "September", "Oktober", "November", "December"
	]

	const days = [
		"Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"
	]

	const weekDays = document.createElement('div')
	weekDays.setAttribute('class', 'week__days')

	days.forEach((day) => {
		const span = document.createElement('span')
		span.innerText = day;
		weekDays.append(span)
	})

	calendarSection.append(weekDays)


	let date = new Date(year, month);
	let monthIndex = date.getMonth();
	let dayInMonth = new Date(year, monthIndex + 1, 0).getDate()

	// .getDate() ----- Tar man bort den förlorar tiden formatet


	let firstDay = new Date(year, monthIndex).getDay() - 1

	// Här lägger jag till månad och år i headerH1 som skapats tidigare.
	headerH1.innerText = ' ' + months[monthIndex] + ' ' + year;

	let dayCount = 1;
	// en yttre loop som körs 5 ggr för att skapa 5 veckor 
	for (let i = 0; i < 5; i++) {
		let week = document.createElement('div')
		week.classList.add('week')

		// en loop som körs 7 ggr och skapar dagarna
		for (let d = 0; d < 7; d++) {
			let day = document.createElement('div')
			day.classList.add('day')

			// här kontrollerar jag ifall den första veckan i månaden och dagens datum är den första dagen i månaden. Är det de så skapas ett tomt fält för att visa de tomma dagarna i kalendern
			if (i === 0 && d < firstDay) {
				let prevMonthDays = new Date(year, monthIndex, 0).getDate();
				let dayNum = prevMonthDays - (firstDay - d) + 1;
				if (dayNum > 0) {
				day.innerText = dayNum
				let white = document.createElement('div')
				white.classList.add('white')
				white.append(day)
				week.append(white)
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
				
				// break; 

				// annars sätts texten på dagen (nummer) och läggs till i veckan. Samt ökar "daycount" för att räkna dagarna i veckan.
			} else {
				day.textContent = dayCount;
				week.appendChild(day)
				dayCount++;
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
	generateCalendar(currentMonth , currentYear)
})




