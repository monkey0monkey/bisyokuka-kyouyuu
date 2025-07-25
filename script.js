document.getElementById("questionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // 入力値の取得
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const options = [
    document.getElementById("option1").value,
    document.getElementById("option2").value,
    document.getElementById("option3").value,
    document.getElementById("option4").value,
  ].filter((opt) => opt !== "");

  // 投稿された質問のHTMLを作成
  const questionHTML = `
    <div class="question">
      <h2>${title}</h2>
      <p>${description}</p>
      <ul>
        ${options
          .map((opt) => `<li><button onclick="vote(this)">${opt}</button></li>`)
          .join("")}
      </ul>
    </div>
  `;

  // ページに表示
  document.getElementById("questionsList").innerHTML += questionHTML;

  // フォームをリセット
  this.reset();
});

// 投票ボタンの処理
function vote(button) {
  alert(`「${button.innerText}」に投票しました！`);
}
