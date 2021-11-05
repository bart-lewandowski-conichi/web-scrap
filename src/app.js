const feed = document.querySelector('.feed');

fetch('http://localhost:8000/data')
  .then((response) => response.json())
  .then((data) => {
    data.map((article) => {
      const articleDisplay = `<div class='article-container'><h3>${article.title}</h3><a href='${article.link}'>Click here</a></div>`;
      feed.insertAdjacentHTML('beforeend', articleDisplay);
    });
  })
  .catch((err) => console.log(err));
