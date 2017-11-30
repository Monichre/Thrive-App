export default {
    createText: (params, callback) => {
        const text = {
            from: params.from,
            content: params.content
        }
        callback(console.log(text))
    }
}