const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class','container')

app.appendChild(logo)
app.appendChild(container)

fetch('https://ghibliapi.herokuapp.com/films')
	.then(response => {
		return response.json()
	})
	.then(data => {
		data.forEach(movie => {
			const card = document.createElement('div')
			card.setAttribute('class','card')
			
			const h1 = document.createElement('h1')
			h1.textContent = movie.title
			
			const p = document.createElement('p')
			movie.description = movie.description.substring(0,300)
			p.textContent = movie.description
			
			container.appendChild(card)
			card.appendChild(h1)
			card.appendChild(p)
		})
	})
	.catch(err => {
		console.log('HTTP request error')
	})

