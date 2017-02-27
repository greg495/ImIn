var path = require('path');
process.traceDeprecation = true;

const common = {
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{ 
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }]
        }]
    },
    resolve: {
        modules: [path.resolve(__dirname, './'), path.resolve(__dirname, "node_modules")],
        extensions: ['.js', '.jsx']
    },
    devServer: {
      inline: true,
      port: 8008,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8008",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        //,"Access-Control-Allow-Credentials": "true"
      }
   }
};

const frontend = {
     entry: ['./main.js'],
     output: {
        path:'/',
        filename: 'index.js',
    }
};

const backend = {
     entry: ['./backend.js'],
     output: {
        path:'/',
        filename: 'backend_index.js',
    },
     target: 'node',
     externals: ['mysql']// specify for example node_modules to be not bundled
};

module.exports = [
    Object.assign({} , common, frontend),
    Object.assign({} , common, backend)
];