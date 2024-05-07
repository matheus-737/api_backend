const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Disco = new Schema({
  nome: {
    type: String
  },
  banda: {
    type: String
  },
  ano: {
    type: Number
  },

},{
    collection: 'disco'
});

module.exports = mongoose.model('Disco', Disco);