module: {
   loaders: [
    { test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    { test: /\.css$/, loader: "style!css" },
    { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url?limit=8192' },
    { test: /\.(otf|eot|ttf)$/, loader: "file?prefix=font/" },
    { test: /\.svg$/, loader: "file" }
  ],
}