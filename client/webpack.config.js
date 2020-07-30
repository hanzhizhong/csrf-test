const {resolve}=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')

module.exports={
    entry:'./csrf-demo/client/src/main.js',
    output:{
        filename:'bundle.js',
        path:resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./csrf-demo/client/src/index.html'
        })
    ],
    mode:'development',
    devServer:{
        contentBase:resolve(__dirname,'build'),
        compress:true,
        port:8900,
        proxy:{
            '/':{
                target:'http://localhost:8082'
            }
        }
    }
}