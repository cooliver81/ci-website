document.addEventListener("DOMContentLoaded", () => {
  const form       = document.getElementById("inquiry-form");
  const successEl  = document.getElementById("form-success");
  const errorEl    = document.getElementById("form-error");
  const yearEl     = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    successEl.style.display = "none";
    errorEl.style.display   = "none";

    try {
      const resp = await fetch(form.action, {
        method:  "POST",
        body:    new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (resp.ok) {
        successEl.style.display = "block";
        form.reset();
      } else {
        errorEl.style.display = "block";
      }
    } catch {
      errorEl.style.display = "block";
    }
  });
});