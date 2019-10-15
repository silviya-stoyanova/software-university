function getArticleGenerator(articles) {
    return () => {
        if (articles.length > 0) {
            let currArticle = articles.shift()
            let newArticleElement = document.createElement('article')
            newArticleElement.textContent = currArticle
            document.getElementById('content').appendChild(newArticleElement)
        }
    }
}
