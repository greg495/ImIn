/*var config = {
   entry: './main.js',
	
   output: {
      path:'/',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8008
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;*/
const common = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                    
                query: {
                presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'] // common extensions
    },
    devServer: {
      inline: true,
      port: 8008,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
   }
    // other plugins, postcss config etc. common for frontend and backend
};

const frontend = {
     entry: [
         './main.js'
     ],
     output: {
        path:'/',
        filename: 'index.js',
    }
     // other loaders, plugins etc. specific for frontend
};

const backend = {
     entry: [
         './backend.js'
     ],
     output: {
        path:'/', // added line here
        filename: 'backend_index.js',
    },
     target: 'node',
     externals: ['mysql']// specify for example node_modules to be not bundled
     // other loaders, plugins etc. specific for backend
};

module.exports = [
    Object.assign({} , common, frontend),
    Object.assign({} , common, backend)
];