const form = document.getElementById("questionForm");
const questionsList = document.getElementById("questionsList");
const rankingList = document.getElementById("rankingList");

// 質問投稿
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const optionInputs = document.querySelectorAll(".option");

  const options = [];
  optionInputs.forEach(input => {
    const value = input.value.trim();
    if (value) options.push({ text: value, votes: 0 });
  });

  if (!title || !description || options.length < 2) {
    alert("最低2つの選択肢が必要です");
    return;
  }

  const newQuestion = {
    id: Date.now(),
    title,
    description,
    options
  };

  const questions = getQuestions();
  questions.push(newQuestion);
  saveQuestions(questions);
  form.reset();
  renderQuestions();
});

// データ取得・保存
function getQuestions() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}

function saveQuestions(questions) {
  localStorage.setItem("questions", JSON.stringify(questions));
}

// 表示処理
function renderQuestions() {
  questionsList.innerHTML = "";
  const questions = getQuestions();

  questions.forEach(question => {
    const div = document.createElement("div");
    div.className = "question-card";

    const title = document.createElement("h3");
    title.textContent = question.title;
    div.appendChild(title);

    const desc = document.createElement("p");
    desc.textContent = question.description;
    div.appendChild(desc);

    question.options.forEach((option, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-button";
      btn.textContent = `${option.text} (${option.votes}票)`;
      btn.addEventListener("click", () => {
        vote(question.id, idx);
      });
      div.appendChild(btn);
    });

    questionsList.appendChild(div);
  });

  renderRanking(questions);
}

// 投票
function vote(questionId, optionIndex) {
  const questions = getQuestions();
  const question = questions.find(q => q.id === questionId);
  if (!question) return;

  question.options[optionIndex].votes += 1;
  saveQuestions(questions);
  renderQuestions();
}

// ランキング表示
function renderRanking(questions) {
  const voteResults = {};

  questions.forEach(q => {
    q.options.forEach(opt => {
      if (voteResults[opt.text]) {
        voteResults[opt.text] += opt.votes;
      } else {
        voteResults[opt.text] = opt.votes;
      }
    });
  });

  const sorted = Object.entries(voteResults)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  rankingList.innerHTML = "";
  sorted.forEach(([option, votes]) => {
    const li = document.createElement("li");
    li.textContent = `${option}：${votes}票`;
    rankingList.appendChild(li);
  });
}

// 初期表示
renderQuestions();
