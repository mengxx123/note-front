import storage from './storage'

let article = {
    getAll() {
        let articles = storage.get('articles')
        if (!articles) {
            articles = []
        }
        return articles
    },
    add(article) {
        article.id = '' + new Date().getTime()
        let articles = this.getAll()
        articles.unshift(article)
        storage.set('articles', articles)
    },
    update(id, article) {
        let articles = this.getAll()
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].id === id) {
                articles[i].title = article.title
                articles[i].content = article.content
                break
            }
        }
        storage.set('articles', articles)
    },
    getById(id) {
        let articles = this.getAll()
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].id === id) {
                return articles[i]
            }
        }
        return null
    }
}

export default article
