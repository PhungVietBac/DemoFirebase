const path = require('path')

// module.exports = {
//     mode: 'development',
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js'
//     },
//     watch: true
// }

// module.exports = {
//     mode: 'development',
//     entry: './src/books.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle_books.js'
//     },
//     watch: true
// }

// module.exports = {
//     mode: 'development',
//     entry: './src/signup.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle_signup.js'
//     },
//     watch: true
// }

// module.exports = {
//     mode: 'development',
//     entry: './src/home.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle_home.js'
//     },
//     watch: true
// }

module.exports = {
    mode: 'development',
    entry: './src/reset.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle_reset.js'
    },
    watch: true
}