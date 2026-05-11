// DenysBaiuk_66718

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // ZADANIE 4: Interakcja
  // ==========================================
  const themeBtn = document.getElementById("themeToggle");
  const sectionBtn = document.getElementById("sectionToggle");
  const skillsSection = document.getElementById("skills-section");
  const body = document.body;

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      if (body.classList.contains("green-theme")) {
        body.classList.replace("green-theme", "red-theme");
      } else if (body.classList.contains("red-theme")) {
        body.classList.replace("red-theme", "green-theme");
      } else {
        body.classList.add("red-theme");
      }
    });
  }

  if (sectionBtn && skillsSection) {
    sectionBtn.addEventListener("click", () => {
      skillsSection.classList.toggle("hidden");
    });
  }

  // ==========================================
  // ZADANIE 5: Walidacja formularza
  // ==========================================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      document
        .querySelectorAll(".error-message")
        .forEach((el) => (el.textContent = ""));
      document
        .querySelectorAll("input, textarea")
        .forEach((el) => el.classList.remove("input-error"));
      document.getElementById("successMessage").style.display = "none";

      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      const hasNumbers = /\d/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const showError = (element, messageText) => {
        document.getElementById(element.id + "Error").textContent = messageText;
        element.classList.add("input-error");
        isValid = false;
      };

      if (!firstName.value.trim()) showError(firstName, "Imię jest wymagane");
      else if (hasNumbers.test(firstName.value))
        showError(firstName, "Imię nie może zawierać cyfr");

      if (!lastName.value.trim()) showError(lastName, "Nazwisko jest wymagane");
      else if (hasNumbers.test(lastName.value))
        showError(lastName, "Nazwisko nie może zawierać cyfr");

      if (!email.value.trim()) showError(email, "E-mail jest wymagany");
      else if (!emailRegex.test(email.value.trim()))
        showError(email, "Wprowadź poprawny format e-mail");

      if (!message.value.trim())
        showError(message, "Wiadomość nie może być pusta");

      //Zadanie 8 Backend 66718 Denys Baiuk
      if (isValid) {
        const formData = {
          firstName: firstName.value.trim(),
          lastName: lastName.value.trim(),
          email: email.value.trim(),
          message: message.value.trim(),
        };

        const backendURL =
          "https://6a019f8436fb6ad04de1507d.mockapi.io/messages";

        fetch(backendURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (response.ok) {
              document.getElementById("successMessage").style.display = "block";
              contactForm.reset();
            } else {
              alert("Błąd serwera. Spróbuj ponownie.");
            }
          })
          .catch((error) => {
            console.error("Błąd połączenia:", error);
            alert("Nie udało się połączyć z serwerem.");
          });
      }
    });
  }

  // ==========================================
  // ZADANIE 6: Pobieranie danych (fetch JSON)
  // ==========================================
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Błąd ładowania pliku JSON");
      }
      return response.json();
    })
    .then((data) => {
      const skillsList = document.getElementById("skillsList");
      if (skillsList) {
        data.skills.forEach((skill) => {
          const li = document.createElement("li");
          li.textContent = skill;
          skillsList.appendChild(li);
        });
      }

      const projectsList = document.getElementById("projectsList");
      if (projectsList) {
        data.projects.forEach((project) => {
          const projectDiv = document.createElement("div");
          projectDiv.style.marginBottom = "15px";
          projectDiv.innerHTML = `
                        <h3 style="margin: 0 0 5px 0; color: #333;">${project.title}</h3>
                        <p style="margin: 0;">${project.description}</p>
                        <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 10px;">
                    `;
          projectsList.appendChild(projectDiv);
        });
      }
    })
    .catch((error) => {
      console.error("Błąd pobierania danych:", error);
    });
});
// ==========================================
// ZADANIE 7: Local Storage (Lista celów)
// ==========================================
const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalsList = document.getElementById("goalsList");

if (goalInput && addGoalBtn && goalsList) {
  const renderGoals = () => {
    goalsList.innerHTML = "";
    const goals = JSON.parse(localStorage.getItem("myGoals")) || [];

    goals.forEach((goal, index) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.style.marginBottom = "8px";
      li.style.padding = "8px";
      li.style.backgroundColor = "#f4f4f4";
      li.style.border = "1px solid #ccc";

      li.innerHTML = `
                    <span>${goal}</span>
                    <button data-index="${index}" style="background: #ff4c4c; color: white; border: none; padding: 5px 10px; cursor: pointer;">Usuń</button>
                `;
      goalsList.appendChild(li);
    });
  };

  addGoalBtn.addEventListener("click", () => {
    const newGoal = goalInput.value.trim();
    if (newGoal !== "") {
      const goals = JSON.parse(localStorage.getItem("myGoals")) || [];
      goals.push(newGoal);
      localStorage.setItem("myGoals", JSON.stringify(goals));
      goalInput.value = "";
      renderGoals();
    }
  });

  goalsList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.getAttribute("data-index");
      const goals = JSON.parse(localStorage.getItem("myGoals")) || [];
      goals.splice(index, 1);
      localStorage.setItem("myGoals", JSON.stringify(goals));
      renderGoals();
    }
  });

  renderGoals();
}
