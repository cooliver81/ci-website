document.addEventListener("DOMContentLoaded", () => {
  const form       = document.getElementById("inquiry-form");
  const successEl  = document.getElementById("form-success");
  const errorEl    = document.getElementById("form-error");
  const errorText  = document.getElementById("form-error-detail");
  const submitBtn  = document.getElementById("submit-btn");
  const yearEl     = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (!form) return;

  const defaultError = errorText ? errorText.textContent : "";
  const defaultLabel = submitBtn ? submitBtn.textContent : "";

  const showAlert = el => {
    el.style.display = "block";
    el.focus();
  };

  // Clear a field's invalid state as soon as the visitor fixes it.
  form.querySelectorAll("input, textarea, select").forEach(field =>
    field.addEventListener("input", () => {
      if (field.validity.valid) field.removeAttribute("aria-invalid");
    })
  );

  form.addEventListener("submit", async e => {
    e.preventDefault();
    successEl.style.display = "none";
    errorEl.style.display   = "none";

    // The form is `novalidate` so the browser doesn't block the native POST
    // fallback; validation runs here instead.
    if (!form.checkValidity()) {
      form.querySelectorAll(":invalid").forEach(f => f.setAttribute("aria-invalid", "true"));
      form.reportValidity();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }

    try {
      const resp = await fetch(form.action, {
        method:  "POST",
        body:    new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (resp.ok) {
        form.reset();
        showAlert(successEl);
      } else {
        const data = await resp.json().catch(() => null);
        const detail = data && Array.isArray(data.errors)
          ? data.errors.map(err => err.message).join(" ")
          : "";
        if (errorText) errorText.textContent = detail || defaultError;
        showAlert(errorEl);
      }
    } catch {
      if (errorText) errorText.textContent = defaultError;
      showAlert(errorEl);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultLabel;
      }
    }
  });
});
