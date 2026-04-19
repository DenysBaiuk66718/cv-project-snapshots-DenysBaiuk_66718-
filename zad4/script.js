

document.addEventListener('DOMContentLoaded', () => {
   
    const themeBtn = document.getElementById('themeToggle');
    const sectionBtn = document.getElementById('sectionToggle');
    const skillsSection = document.getElementById('skills-section');
    const body = document.body;

  
    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('green-theme')) {
            body.classList.replace('green-theme', 'red-theme');
        } else {
            body.classList.replace('red-theme', 'green-theme');
        }
    });

    sectionBtn.addEventListener('click', () => {
        skillsSection.classList.toggle('hidden');
    });
});
