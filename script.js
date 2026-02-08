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

function setSubmitMessage(message, type) {
  submitMsg.className = "submitMsg";
  submitMsg.textContent = message;
  if (type === "ok") submitMsg.classList.add("ok");
  if (type === "err") submitMsg.classList.add("err");
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
    setSubmitMessage(result.message, "ok");
  } else {
    setSubmitMessage(result.message, "err");
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

updatePreviewAndCount();
