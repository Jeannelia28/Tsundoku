const { Schema, model } = require('mongoose')

const ObraSchema = Schema({
    title: {
        type: String,
        required: [true, 'El titulo de la obra es obligatorio']
    },
    category:{
        type: String,
        required: [true, 'Debe asignarle una categoría a la obra']
    },
    description:{
        type: String
    },
    author:{
        type: String  //se tomara el id del usuario en sesion
    }
})


ObraSchema.methods.toJSON = function(){
    const { __v , _id, ...obra  } = this.toObject();
    obra.uid = _id;
    return obra;
}

module.exports = model('Obra', ObraSchema)