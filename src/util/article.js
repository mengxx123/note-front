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
                articles[i].updateTime = new Date().getTime()
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
    },
    remove(item) {
        let list = this.getAll()
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === item.id) {
                list.splice(i, 1)
                break
            }
        }
        storage.set('articles', list)
    }
}

export default article
