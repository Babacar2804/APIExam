const mongoose = require('mongoose');

const eleveSchema = mongoose.Schema(
    {
        name: {
            type: String,
           
        },
      
        age: {
            type: Number, 
        }, 
    },
   
)


const Eleve = mongoose.model('Eleve', eleveSchema);

module.exports = Eleve;