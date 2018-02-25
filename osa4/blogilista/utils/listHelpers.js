const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.likes
    }
    return blogs.length > 0 ? blogs.reduce(reducer, 0) : 0
}

module.exports = {
    dummy,
    totalLikes
}