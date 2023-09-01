const mongoose = require('mongoose')

const db_uri = 'mongodb+srv://neli:admin123@cluster0.fzzzphs.mongodb.net/'

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            db_uri,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if(err){
                    console.log('DB: ERROR!!');
                }else{
                    console.log('Conexion Correcta')
                }
            }
        )
        
    }

    connect();
}