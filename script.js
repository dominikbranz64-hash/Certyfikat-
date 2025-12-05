// PYTANIA — proste, humorystyczne jak chciałeś

const quizzes = {
  lawyer: [
    "Czy umiesz mówić?",
    "Czy potrafisz słuchać?",
    "Czy rozumiesz proste zdania?",
    "Czy wiesz co to paragraf?",
    "Czy potrafisz być spokojny?",
    "Czy czytałeś kiedyś umowę?",
    "Czy umiesz pisać zdania?",
    "Czy potrafisz argumentować?",
    "Czy szanujesz kodeks?",
    "Czy umiesz wyjaśniać ludziom rzeczy?"
  ],
  judge: [
    "Czy potrafisz być sprawiedliwy?",
    "Czy umiesz liczyć do 10?",
    "Czy wiesz co to jest rozprawa?",
    "Czy potrafisz słuchać obu stron?",
    "Czy potrafisz powiedzieć 'proszę ciszej'?",
    "Czy wiesz co to wyrok?",
    "Czy potrafisz zachować powagę?",
    "Czy umiesz podjąć decyzję?",
    "Czy rozumiesz prawo?",
    "Czy potrafisz nie krzyczeć?"
  ],
  prosecutor: [
    "Czy potrafisz wskazać winnego?",
    "Czy umiesz zadawać pytania?",
    "Czy rozumiesz, co to jest dowód?",
    "Czy potrafisz być stanowczy?",
    "Czy mówisz wyraźnie?",
    "Czy potrafisz analizować?",
    "Czy wiesz, co to akt oskarżenia?",
    "Czy potrafisz wykazywać błędy?",
    "Czy potrafisz bronić swojej racji?",
    "Czy umiesz zachować formalność?"
  ]
};

let currentQuiz = "lawyer";
const quizContainer = document.getElementById("quizContainer");
const certContainer = document.getElementById("certificateContainer");

// ŁADOWANIE LOGO

const btnLogo = document.getElementById("btnLogo");
const logoInput = document.getElementById("logoInput");
const appLogo = document.getElementById("appLogo");

btnLogo.addEventListener('click', () => logoInput.click());

logoInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    const src = ev.target.result;
    appLogo.innerHTML = `<img src="${src}">`;
    localStorage.setItem("appLogo", src);
  };
  reader.readAsDataURL(file);
});

const savedLogo = localStorage.getItem("appLogo");
if (savedLogo) appLogo.innerHTML = `<img src="${savedLogo}">`;


// FUNKCJA STARTU QUIZU
function loadQuiz(type) {
  currentQuiz = type;
  certContainer.style.display = "none";
  quizContainer.innerHTML = "";

  quizzes[type].forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "quiz-question";
    div.innerHTML = `
      <h3>${i+1}. ${q}</h3>
      <button class="answer" onclick="answer(${i})">Tak</button>
    `;
    quizContainer.appendChild(div);
  });
}

loadQuiz("lawyer");


// ODPOWIEDŹ
function answer(i) {
  document.querySelectorAll(".quiz-question")[i].style.opacity = "0.4";

  const all = document.querySelectorAll(".quiz-question");
  const done = [...all].filter(q => q.style.opacity === "0.4").length;

  if (done === 10) {
    showCertificate();
    localStorage.setItem(currentQuiz + "_done", "1");
  }
}

// CERTYFIKAT
function showCertificate() {
  certContainer.style.display = "block";
  certContainer.innerHTML = `
      <div class="cert-box">
          <h2>Gratulacje!</h2>
          <p>Zaliczyłeś wszystkie pytania dla roli:</p>
          <h1>${currentQuiz.toUpperCase()}</h1>
          <p>Możesz uznać się za oficjalnego ${currentQuiz}a 😎</p>
      </div>
  `;
}

// ZAKŁADKI
document.getElementById("tab-lawyer").onclick = () => {
  setActive("lawyer");
};

document.getElementById("tab-judge").onclick = () => {
  setActive("judge");
};

document.getElementById("tab-prosecutor").onclick = () => {
  setActive("prosecutor");
};

function setActive(type) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById("tab-" + type).classList.add("active");

  loadQuiz(type);
}

// RESET
document.getElementById("btn-reset").onclick = () => {
  localStorage.clear();
  appLogo.innerHTML = "⚖️";
  loadQuiz(currentQuiz);
};
