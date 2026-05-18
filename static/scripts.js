const parkingContainer = document.getElementById("parking-container")
const overlay = document.getElementById("overlay")

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
                <div class="modal-body">
                    <div>
                        <label> What time do you want this booking for: </label>
                        <input type="time">
                    </div>
                    <div>
                        <label> How many hours would you like to reserve this space for:</label>
                        <input type="number" value = "1" min="1"> 
                    </div>
                    <div>
                        <label> Select booking date: </label>
                        <input type="date">
                    </div>  
                    </div>
                <button class="book-btn"> 
                Reserve Space 
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
        this.bookButton = this.element.querySelector(".book-btn")
    }

    addEvents(){
        this.parkingButton.addEventListener('click', () => {
            this.openModal()
        })

        this.closeButton.addEventListener('click', () => {
            this.closeModal()
        })

        this.bookButton.addEventListener('click', () => {
            this.toggleBooking()
        })
    }

    openModal() {
        this.modal.classList.add("active")
        overlay.classList.add("active")
    }

    closeModal() {
        this.modal.classList.remove("active")
        overlay.classList.remove("active")
    }

    toggleBooking() {
        this.bookButton.classList.toggle("booked")

        if (this.bookButton.classList.contains("booked")) {
            const time = this.element.querySelector('input[type="time"]').value
            const hours = this.element.querySelector('input[type="number"]').value
            const date = this.element.querySelector('input[type="date"]').value

            this.bookButton.textContent = "Reserved"
            this.parkingButton.style.border = "10px solid red"

            fetch("/submit", {
                method: "POST",
                body: new URLSearchParams({
                    time: time,
                    hours: hours,
                    date: date,
                    passed_id: this.spaceNumber
                })
            });
            
        } else {
            this.bookButton.textContent = "Reserve Space"
            this.parkingButton.style.border = ""
        }
    }
}

overlay.addEventListener("click", () => {
    document.querySelectorAll(".modal.active").forEach(modal => {
        modal.classList.remove("active")
    })

    overlay.classList.remove("active")
})

for (let i = 0; i < 5; i++) {
    new ParkingSpace(i+1)
}

