window.addEventListener("load", () => {
    setTimeout(() => {
      const splash = document.getElementById("splash");
      splash.style.opacity = 0;
      setTimeout(() => splash.style.display = "none", 1000);
    }, 3000);
  });


  document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.habits input[type="checkbox"]');
    const co2Elem = document.querySelector('.stats .card:nth-child(1) p strong');
    const energyElem = document.querySelector('.stats .card:nth-child(2) p strong');
    const streakElem = document.querySelector('.stats .card:nth-child(3) p strong');
  
    let streak = 0; // Example: starting streak
    const co2PerTask = 0.5; // kg
    const energyPerTask = 1; // kWh
  
    function updateStats() {
      const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
  
      const co2Saved = (checkedCount * co2PerTask).toFixed(1);
      const energySaved = (checkedCount * energyPerTask).toFixed(1);
      const newStreak = checkedCount === checkboxes.length ? streak + 1 : streak;
  
      co2Elem.textContent = `${co2Saved} kg`;
      energyElem.textContent = `${energySaved} kWh`;
      streakElem.textContent = `${newStreak} days`;
    }
  
    checkboxes.forEach(cb => {
      cb.addEventListener('change', updateStats);
    });
  });
  

  /*Dark Emoji */

   // Dark Mode Toggle
   const toggleIcon = document.getElementById('themeIcon');
   const body = document.body;
   const elementsToToggle = document.querySelectorAll('.navbar, .navbar-brand, .nav-link, .hero, .btn-success, section.bg-light, footer');

   function enableDarkMode() {
     body.classList.add('dark-mode');
     elementsToToggle.forEach(el => el.classList.add('dark-mode'));
     toggleIcon.classList.remove('sun');
     toggleIcon.classList.add('moon');
     toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
   }

   function disableDarkMode() {
     body.classList.remove('dark-mode');
     elementsToToggle.forEach(el => el.classList.remove('dark-mode'));
     toggleIcon.classList.remove('moon');
     toggleIcon.classList.add('sun');
     toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
   }

   // Apply saved theme
   window.addEventListener('DOMContentLoaded', () => {
     if (localStorage.getItem('theme') === 'dark') {
       enableDarkMode();
     }
   });

   // Icon click toggle
   toggleIcon.addEventListener('click', () => {
     if (body.classList.contains('dark-mode')) {
       disableDarkMode();
       localStorage.setItem('theme', 'light');
     } else {
       enableDarkMode();
       localStorage.setItem('theme', 'dark');
     }
   });


  // Scroll Animation Observer
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });
  
    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));
  });  