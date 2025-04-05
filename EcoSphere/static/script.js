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
  