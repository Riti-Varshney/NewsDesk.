const stock = [
    'url("img/bg1.png")',
    'url("img/bg2.png")',
    'url("img/bg3.png")',
    'url("img/bg4.png")',
    'url("img/bg6.png")',
    'url("img/bg7.png")'
];
let CI = 0;
function changeBackground() {
    const indexR = Math.floor(Math.random() * stock.length);
    document.body.style.backgroundImage = stock[indexR];
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}
setInterval(changeBackground, 2000);
changeBackground();

async function fetchNews() {
    const query = document.getElementById('queryInput').value;
    const resultDiv = document.getElementById('newsResult');
    resultDiv.innerHTML = "Fetching latest news...";

    const apiKey = "7a5eeba0bc254a63b386b72e0219f0f6";
const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;
    if (!query) {
        resultDiv.innerHTML = `
            <div class="invalid">
                <p>⚠️ Please enter a topic to search for news articles.</p>
                <p>Try something like <strong>"Technology"</strong> or <strong>"India"</strong>.</p>
            </div>
        `; return;
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        //creates object--<(json)
        if (data.articles && data.articles.length > 0) {
            resultDiv.innerHTML = "";
            data.articles.slice(0, 6).forEach(article => {
                let imageHtml = '';
                if (article.urlToImage) {
                    imageHtml = `<img src="${article.urlToImage}" alt="Image" class="news-image" style="max-width: 100%; max-height: 300px; object-fit: contain;">`;
                }

                resultDiv.innerHTML =  resultDiv.innerHTML +`<div class="news-card">
                        <h3>${article.title}</h3>
                        <p>${article.description || "No description available."}</p>;
                        <a href="${article.url}" target="_blank">Read more</a>
                        <p><strong>Content:</strong> ${article.content || "No content available."}</p>

                        ${imageHtml}
                    </div>`;
            });
        } else {
            resultDiv.innerHTML = "No news found for this query.";
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        resultDiv.innerHTML = "Something went wrong. Please try again.";
    }
}
