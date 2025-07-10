function openTab(evt, tabName) {
  document.querySelectorAll(".tabcontent").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".tablink").forEach(el => el.classList.remove("active"));
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-toggle').textContent = theme === 'dark' ? '🌞 Light' : '🌙 Dark';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("defaultTab").click();

  // Set theme based on system or saved preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = systemPrefersDark ? 'dark' : 'light';
  setTheme(initialTheme);

  // Toggle event
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Contact Form events
    const form = document.getElementById('contact-form');
    const responseEl = document.getElementById('response');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      };

      try {
        const res = await fetch('https://homepage-deploy.onrender.com/api/contact', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        });

        const result = await res.json();
        responseEl.innerHTML = `<div class="success">${result.message}</div>`;
        form.reset();
      } catch (error) {
        responseEl.innerHTML = `<div class="error">Something went wrong. Please try again later.</div>`;
      }
    });

});
