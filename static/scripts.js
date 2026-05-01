const parkingContainer = document.getElementById("parking-container")

class ParkingSpace {
    constructor(spaceNumber) {

        this.spaceNumber = spaceNumber

        this.createHTML()
        this.createElements()
        this.addEvents()
    }

    createHTML() {
        this.element = document.createElement("div")
        this.element.classList.add("parking-space")

        this.element.innerHTML = `
            <button class="parking-button">
                Parking Space ${this.spaceNumber}
            </button>

            <div class="modal">
                <div class="modal-header">
                    <div class="modal-title">
                        Space ${this.spaceNumber} Info
                    </div>

                    <button class="close-button">
                        &times;
                    </button>
                </div>
            </div>
        `

        parkingContainer.appendChild(this.element)
    }

    createElements() {
        this.parkingButton = this.element.querySelector(".parking-button")
        this.modal = this.element.querySelector(".modal")
        this.closeButton = this.element.querySelector(".close-button")
    }
    addEvents(){
        this.parkingButton.addEventListener('click', () => {
            this.openModal()
        })

        this.closeButton.addEventListener('click', () => {
            this.closeModal()
        })
    }
    openModal() {
      this.modal.classList.add("active")
    }
    closeModal() {
      this.modal.classList.remove("active")
    }
}

new ParkingSpace(1)
new ParkingSpace(2)
new ParkingSpace(3)
new ParkingSpace(4)



//        <div class ="modal">
//            <div class = "modal-header">
//                <div class = "modal-title"> Space ${this.spaceNumber} Info </div>
//                    <button class = "close button">
//                        &times;
//                    </button>
//            </div>
//        </div>
//

////these will have to be replaced to use ParkingSpace rather than data-modal-target so each space manages its own modal
//const openModalButtons = document.querySelectorAll('[data-modal-target]')
//const closeModalButtons = document.querySelectorAll('[data-close-button]')
//const overlay = document.getElementById('overlay')
//const bookBtn = document.getElementById('book-btn')
//const parkingBtn = document.getElementById('parking-button')
//
//


//
//
//
//function openModal(modal) {
//    if (modal == null) return
//    modal.classList.add('active')
//    overlay.classList.add('active')
//}
//
//
//    <body>
//    <button data-modal-target="#modal" class = "parking-button" id = "parking-button"> Parking Space</button>//    <div class ="modal" id="modal">
//        <div class = "modal-header">
//            <div class = "title">Space Info </div>
//            <button data-close-button class = "close-button">&times;</button>
//        </div>
//        <div class = "modal-body">
//            <div>
//
//
//
//closeModalButtons.forEach(button => {
//    button.addEventListener('click', () => {
//        const modal = button.closest('.modal')
//        closeModal(modal)
//    })
//  })
//
//function openModal(modal) {
//    if (modal == null) return
//    modal.classList.add('active')
//    overlay.classList.add('active')
//}
//
//function closeModal(modal) {
//    if (modal == null) return
//    modal.classList.remove('active')
//    overlay.classList.remove('active')
//}
//
//overlay.addEventListener('click', () => {
//    const modals = document.querySelectorAll('.modal.active')
//    modals.forEach(modal => {
//    closeModal(modal)
//    })
//})
//
//bookBtn.addEventListener('click', () => {
//      parkingBtn.style.border = "10px solid red";
//    bookBtn.classList.toggle('booked')
//    if (bookBtn.classList.contains('booked')) {
//        bookBtn.textContent = "Reserved"
//    } else {
//        bookBtn.textContent = "Reserve Space"
//    }
//})