const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const bookBtn = document.getElementById('book-btn')
const parkingBtn = document.getElementById('parking-button')
const dateBooked = document.getElementById('date-booked')


openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
  })

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
  })


function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
    closeModal(modal)
    })
})

bookBtn.addEventListener('click', () => {
      parkingBtn.style.border = "10px solid red";
    bookBtn.classList.toggle('booked')
    if (bookBtn.classList.contains('booked')) {
        bookBtn.textContent = "Reserved"
    } else {
        bookBtn.textContent = "Reserve Space"
    }
})