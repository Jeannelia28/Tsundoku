// importamos la libreria de mongoose para la conexion
const mongoose = require('mongoose')

// constantes que se utilizaran para la cadena de conexion 
const username = "neli";
const password = "admin123";
const cluster = "cluster0.fzzzphs.mongodb.net";
const dbname = "Tsundoku";
//definicion de la cadena de conexion
const db_uri = `mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`


//funcion que sera usada para la conexion 
module.exports = () => {
    //funcion asincrona que sera utilizada para la conexion 
    const connect = async () => {
        // manejo de errores
        try{
            mongoose.set('strictQuery', true);
            mongoose.connect(
                db_uri,
                {
                    keepAlive: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            )
            console.log('Connected to data base');
        }catch(error){
            console.error(error);
        }
    }
    //llamada de la funcion de conexion 
    connect();
}