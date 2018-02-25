const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.likes
    }
    return blogs.length > 0 ? blogs.reduce(reducer, 0) : 0
}

const favoriteBlog = (blogs) => {
    const compareFunc = (a, b) => {
        return b.likes - a.likes
    }
    return blogs.sort(compareFunc)[0]
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = {}
    blogs.forEach(blog => {
        if (blogsByAuthor[blog.author]) {
            blogsByAuthor[blog.author].blogs++
        } else {
            blogsByAuthor[blog.author] = {
                author: blog.author,
                blogs: 1
            }
        }
    })
    const compareFunc = (a, b) => b.blogs - a.blogs
    return Object.values(blogsByAuthor).sort(compareFunc)[0]
    
}

const mostLikes = (blogs) => {
    const likesByAuthor = {}
    blogs.forEach(blog => {
        if (likesByAuthor[blog.author]) {
            likesByAuthor[blog.author].likes += blog.likes
        } else {
            likesByAuthor[blog.author] = {
                author: blog.author,
                likes: blog.likes
            }
        }
    })
    const compareFunc = (a, b) => b.likes - a.likes
    return Object.values(likesByAuthor).sort(compareFunc)[0]
    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}