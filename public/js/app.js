const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  const url = `/weather?address=${location}`
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch(url)
    .then((response) => {
      response.json().then((data) => {
        if(data.error){
          return messageOne.textContent = data.error
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      })
    })

  search.value = '';
})