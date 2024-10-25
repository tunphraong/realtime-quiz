// module.exports = {
//     presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
//     plugins: ['@babel/plugin-transform-react-jsx'],
// };

module.exports = {
    presets: [
        '@babel/preset-env',  // Transpiles modern JavaScript
        '@babel/preset-react', // Transpiles JSX,
        //  '@babel/preset-typescript'
    ], 
    plugins: ['@babel/plugin-transform-react-jsx'],
}