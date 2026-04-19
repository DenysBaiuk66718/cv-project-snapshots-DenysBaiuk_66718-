document.addEventListener('DOMContentLoaded', () => {
    
    const themeBtn = document.getElementById('themeToggle');
    const sectionBtn = document.getElementById('sectionToggle');
    const skillsSection = document.getElementById('skills-section');
    const body = document.body;

    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('green-theme')) {
            body.classList.replace('green-theme', 'red-theme');
        } else {
            
            if (body.classList.contains('red-theme')) {
                body.classList.replace('red-theme', 'green-theme');
            } else {
                 body.classList.add('red-theme'); 
            }
        }
    });

    sectionBtn.addEventListener('click', () => {
        skillsSection.classList.toggle('hidden');
    });

 
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

            
            if (!firstName.value.trim()) {
                showError(firstName, 'Imię jest wymagane');
            } else if (hasNumbers.test(firstName.value)) {
                showError(firstName, 'Imię nie może zawierać cyfr');
            }

          
            if (!lastName.value.trim()) {
                showError(lastName, 'Nazwisko jest wymagane');
            } else if (hasNumbers.test(lastName.value)) {
                showError(lastName, 'Nazwisko nie może zawierać cyfr');
            }

          
            if (!email.value.trim()) {
                showError(email, 'E-mail jest wymagany');
            } else if (!emailRegex.test(email.value.trim())) {
                showError(email, 'Wprowadź poprawny format e-mail');
            }

           
            if (!message.value.trim()) {
                showError(message, 'Wiadomość nie może być pusta');
            }

            
            if (isValid) {
                document.getElementById('successMessage').style.display = 'block';
                contactForm.reset(); 
            }
        });
    }
});
