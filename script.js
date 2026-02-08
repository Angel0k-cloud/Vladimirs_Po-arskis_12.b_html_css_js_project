console.log("JS pieslēgts un darbojas");

const feedback = document.getElementById("feedback");
const preview = document.getElementById("preview");
const charCount = document.getElementById("charCount");
const charLimitEl = document.getElementById("charLimit");

const btnTheme = document.getElementById("btnTheme");
const themeStatus = document.getElementById("themeStatus");

const btnSubmit = document.getElementById("btnSubmit");
const submitMsg = document.getElementById("submitMsg");
const feedbackList = document.getElementById("feedbackList");

const contactForm = document.getElementById("contactForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const formMsg = document.getElementById("formMsg");
const formErrors = document.getElementById("formErrors");

const CHAR_LIMIT = 200;
charLimitEl.textContent = String(CHAR_LIMIT);

function updatePreviewAndCount() {
  const text = feedback.value.trim();
  preview.textContent = text.length > 0 ? text : "Šeit parādīsies tavs teksts.";
  charCount.textContent = String(feedback.value.length);

  if (feedback.value.length > CHAR_LIMIT) {
    charCount.style.fontWeight = "700";
    charCount.style.textDecoration = "underline";
  } else {
    charCount.style.fontWeight = "400";
    charCount.style.textDecoration = "none";
  }
}

function setMessage(el, message, type) {
  el.className = el.id === "submitMsg" ? "submitMsg" : "formMsg";
  el.textContent = message;
  if (type === "ok") el.classList.add("ok");
  if (type === "err") el.classList.add("err");
}

function clearErrors() {
  formErrors.innerHTML = "";
}

function renderErrors(errors) {
  if (errors.length === 0) {
    clearErrors();
    return;
  }
  const ul = document.createElement("ul");
  errors.forEach(function (e) {
    const li = document.createElement("li");
    li.textContent = e;
    ul.appendChild(li);
  });
  formErrors.innerHTML = "";
  formErrors.appendChild(ul);
}

function isValidEmail(value) {
  const v = value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(v);
}

function validateForm(nameValue, emailValue) {
  const errors = [];
  const nameTrim = nameValue.trim();
  const emailTrim = emailValue.trim();

  if (nameTrim.length === 0) {
    errors.push("Lauks “Vārds un uzvārds” nedrīkst būt tukšs.");
  } else if (nameTrim.length < 3) {
    errors.push("Vārdam un uzvārdam jābūt vismaz 3 simboliem.");
  }

  if (emailTrim.length === 0) {
    errors.push("Lauks “E-pasts” nedrīkst būt tukšs.");
  } else if (!isValidEmail(emailTrim)) {
    errors.push("E-pasta formāts nav pareizs (piemērs: vards@epasts.lv).");
  }

  return errors;
}

function handleFormSubmit(event) {
  event.preventDefault();

  setMessage(formMsg, "", "");
  clearErrors();

  const errors = validateForm(fullName.value, email.value);

  if (errors.length > 0) {
    renderErrors(errors);
    setMessage(formMsg, "Forma netika iesniegta. Lūdzu, izlabo kļūdas.", "err");
    return;
  } else {
    renderErrors([]);
    setMessage(formMsg, "Forma veiksmīgi iesniegta!", "ok");
    fullName.value = "";
    email.value = "";
  }
}

function validateFeedback(text) {
  if (text.length === 0) {
    return { ok: false, message: "Lūdzu, ieraksti atsauksmi pirms sūtīšanas." };
  } else if (text.length > CHAR_LIMIT) {
    return { ok: false, message: "Atsauksme ir par garu. Maksimums: " + CHAR_LIMIT + " simboli." };
  } else {
    return { ok: true, message: "Atsauksme nosūtīta!" };
  }
}

function addFeedbackToList(text) {
  const emptyItem = feedbackList.querySelector("li.empty");
  if (emptyItem) emptyItem.remove();

  const li = document.createElement("li");

  const time = document.createElement("span");
  time.className = "time";
  time.textContent = new Date().toLocaleString("lv-LV");

  const msg = document.createElement("div");
  msg.textContent = text;

  li.appendChild(time);
  li.appendChild(msg);
  feedbackList.prepend(li);
}

function handleSubmit(text) {
  const result = validateFeedback(text);

  if (result.ok) {
    addFeedbackToList(text);
    feedback.value = "";
    updatePreviewAndCount();
    setMessage(submitMsg, result.message, "ok");
  } else {
    setMessage(submitMsg, result.message, "err");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeStatus.textContent = isDark ? "Tumšais režīms" : "Gaišais režīms";
}

feedback.addEventListener("input", updatePreviewAndCount);
btnTheme.addEventListener("click", toggleTheme);
btnSubmit.addEventListener("click", function () {
  handleSubmit(feedback.value.trim());
});

contactForm.addEventListener("submit", handleFormSubmit);

updatePreviewAndCount();
