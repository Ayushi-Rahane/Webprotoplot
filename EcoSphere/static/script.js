window.addEventListener("load", () => {
    setTimeout(() => {
      const splash = document.getElementById("splash");
      splash.style.opacity = 0;
      setTimeout(() => splash.style.display = "none", 1000);
    }, 3000);
  });