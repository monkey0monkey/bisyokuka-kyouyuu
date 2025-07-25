// 投稿の配列を格納するローカル変数
let posts = [];

// 投稿フォームの送信処理
document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const optionInputs = document.querySelectorAll(".option-input");

  const options = [];
  optionInputs.forEach(input => {
    const text = input.value.trim();
    if (text) {
      options.push({ text: text, votes: 0 });
    }
  });

  if (title && description && options.length >= 2) {
    const post = { title, description, options };
    posts.push(post);
    renderPosts();
    this.reset(); // フォームをリセット
  }
});

// 投稿と選択肢を表示
function renderPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = '<h2>🗳️ 投稿一覧と投票</h2>'; // 見出しを再描画

  posts.forEach((post, postIndex) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const titleEl = document.createElement("div");
    titleEl.className = "post-title";
    titleEl.textContent = post.title;

    const descEl = document.createElement("div");
    descEl.className = "post-description";
    descEl.textContent = post.description;

    postDiv.appendChild(titleEl);
    postDiv.appendChild(descEl);

    // 各選択肢ボタン
    post.options.forEach((option, optionIndex) => {
      const optionBtn = document.createElement("div");
      optionBtn.className = "option";
      optionBtn.innerHTML = `${option.text} <span class="vote-count">${option.votes}票</span>`;

      optionBtn.addEventListener("click", () => {
        posts[postIndex].options[optionIndex].votes++;
        renderPosts(); // 再描画
      });

      postDiv.appendChild(optionBtn);
    });

    postList.appendChild(postDiv);
  });
}
