// 1. darkmode mygtukas

document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.getElementById("darkmode");

    if (!themeToggleButton) {
        console.warn("Darkmode mygtukas nerastas. Kodas nebus vykdomas.");
        return;
    }

    const icon = themeToggleButton.querySelector("img");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        icon.src = "Images/moon-icon.jpg";
    } else {
        icon.src = "Images/sun-icon.jpg";
    }

    themeToggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            icon.src = "Images/moon-icon.jpg";
        } else {
            localStorage.setItem("theme", "light");
            icon.src = "Images/sun-icon.jpg";
        }
    });
});

// 2. scrollUp mygtukas

const scrollButton = document.getElementById("scrollUp");

window.addEventListener("scroll", function () {
    console.log(window.scrollY);
    if (window.scrollY > 200) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
});

scrollButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 3. laikrodis

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;

    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

setInterval(updateTime, 1000);
updateTime();


// 4. forma

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("form")) {
        document.getElementById("submitButton").addEventListener("click", function () {
            const formData = {
                name: document.getElementById("name").value,
                surname: document.getElementById("surname").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                address: document.getElementById("address").value,
                ratings: {
                    question1: parseInt(document.getElementById("question1").value, 10),
                    question2: parseInt(document.getElementById("question2").value, 10),
                    question3: parseInt(document.getElementById("question3").value, 10),
                    question4: parseInt(document.getElementById("question4").value, 10),
                    question5: parseInt(document.getElementById("question5").value, 10),
                }
            };

            const errorMessagesDiv = document.getElementById("errorMessages");
            errorMessagesDiv.innerHTML = "";
            const errorMessages = [];

            if (!validateEmail(formData.email)) {
                errorMessages.push("Klaida: Neteisingas el. pašto formatas.");
            }

            if (!validatePhone(formData.phone)) {
                errorMessages.push("Klaida: Neteisingas telefono numeris.");
            }

            if (formData.address.trim() === "") {
                errorMessages.push("Klaida: Adresas negali būti tuščias.");
            }

            if (errorMessages.length > 0) {
                errorMessagesDiv.innerHTML = errorMessages.join("<br>");
                return;
            }

            const ratings = Object.values(formData.ratings);
            const average = ratings.reduce((a, b) => a + b, 0) / ratings.length;

            const outputDiv = document.getElementById("output");
            outputDiv.innerHTML = `
                <p><strong>Vardas:</strong> ${formData.name}</p>
                <p><strong>Pavardė:</strong> ${formData.surname}</p>
                <p><strong>El. paštas:</strong> ${formData.email}</p>
                <p><strong>Telefonas:</strong> ${formData.phone}</p>
                <p><strong>Adresas:</strong> ${formData.address}</p>
                <p><strong>Vidurkis:</strong> <span style="color:${average < 4 ? "red" : average < 7 ? "orange" : "green"};">${average.toFixed(2)}</span></p>
            `;
        });
    }
});

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email) && email.split('@')[1].includes('.');
}

function validatePhone(phone) {
    const regex = /^\+?(\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
    return regex.test(phone);
}

