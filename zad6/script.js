// DenysBaiuk_66718

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // ZADANIE 4: Interakcja
    // ==========================================
    const themeBtn = document.getElementById('themeToggle'); // Upewnij się, że masz takie ID przycisku w HTML
    const sectionBtn = document.getElementById('sectionToggle'); // Upewnij się, że masz takie ID w HTML
    const skillsSection = document.getElementById('skills-section');
    const body = document.body;

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (body.classList.contains('green-theme')) {
                body.classList.replace('green-theme', 'red-theme');
            } else if (body.classList.contains('red-theme')) {
                body.classList.replace('red-theme', 'green-theme');
            } else {
                body.classList.add('red-theme');
            }
        });
    }

    if(sectionBtn && skillsSection) {
        sectionBtn.addEventListener('click', () => {
            skillsSection.classList.toggle('hidden');
        });
    }

    // ==========================================
    // ZADANIE 5: Walidacja formularza
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('input-error'));
            document.getElementById('successMessage').style.display = 'none';

            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            const hasNumbers = /\d/; 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

            const showError = (element, messageText) => {
                document.getElementById(element.id + 'Error').textContent = messageText;
                element.classList.add('input-error');
                isValid = false;
            };

            if (!firstName.value.trim()) showError(firstName, 'Imię jest wymagane');
            else if (hasNumbers.test(firstName.value)) showError(firstName, 'Imię nie może zawierać cyfr');

            if (!lastName.value.trim()) showError(lastName, 'Nazwisko jest wymagane');
            else if (hasNumbers.test(lastName.value)) showError(lastName, 'Nazwisko nie może zawierać cyfr');

            if (!email.value.trim()) showError(email, 'E-mail jest wymagany');
            else if (!emailRegex.test(email.value.trim())) showError(email, 'Wprowadź poprawny format e-mail');

            if (!message.value.trim()) showError(message, 'Wiadomość nie może być pusta');

            if (isValid) {
                document.getElementById('successMessage').style.display = 'block';
                contactForm.reset(); 
            }
        });
    }

    // ==========================================
    // ZADANIE 6: Pobieranie danych (fetch JSON)
    // ==========================================
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd ładowania pliku JSON');
            }
            return response.json();
        })
        .then(data => {
            // Generowanie listy umiejętności
            const skillsList = document.getElementById('skillsList');
            if (skillsList) {
                data.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
            }

            // Generowanie listy projektów
            const projectsList = document.getElementById('projectsList');
            if (projectsList) {
                data.projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.style.marginBottom = '15px';
                    projectDiv.innerHTML = `
                        <h3 style="margin: 0 0 5px 0; color: #333;">${project.title}</h3>
                        <p style="margin: 0;">${project.description}</p>
                        <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 10px;">
                    `;
                    projectsList.appendChild(projectDiv);
                });
            }
        })
        .catch(error => {
            console.error('Błąd pobierania danych:', error);
        });
});
