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
charLimitEl.textContent = CHAR_LIMIT;

function updatePreviewAndCount(){
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

feedback.addEventListener("input", updatePreviewAndCount);
updatePreviewAndCount();

btnTheme.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    themeStatus.textContent = isDark ? "Tumšais režīms" : "Gaišais režīms";
});

btnSubmit.addEventListener("click", function(){
    const text = feedback.value.trim();

    submitMsg.className = "submitMsg";
    if (text.length === 0){
        submitMsg.textContent = "Lūdzu, ieraksti atsauksmi pirms sūtīšanas.";
        submitMsg.classList.add("err");
        return;
    }
    if (feedback.value.length > CHAR_LIMIT){
        submitMsg.textContent = "Atsauksme ir par garu. Maksimums: " + CHAR_LIMIT + " simboli.";
        submitMsg.classList.add("err");
        return;
    }

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

    feedback.value = "";
    updatePreviewAndCount();

    submitMsg.textContent = "Atsauksme nosūtīta!";
    submitMsg.classList.add("ok");
});
