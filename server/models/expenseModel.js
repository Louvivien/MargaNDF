const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  dateDeplacement: {
    type: Date,
    required: true
  },
  codeClient: {
    type: String,
    required: false // Changed to false or you can simply remove this line
  },
  lieuxDeplacement: {
    type: String,
    required: false
  },
  kilometres: {
    type: Number,
    required: false
  },
  restauMidi: {
    type: Number,
    required: false
  },
  restauSoir: {
    type: Number,
    required: false
  },
  hotel: {
    type: Number,
    required: false
  },
  petitDej: {
    type: Number,
    required: false
  },
  soireeEtape: {
    type: Number,
    required: false
  },
  carburant: {
    type: Number,
    required: false
  },
  adBlue: {
    type: Number,
    required: false
  },
  autoroute: {
    type: Number,
    required: false
  },
  parking: {
    type: Number,
    required: false
  },
  laPoste: {
    type: Number,
    required: false
  },
  telephone: {
    type: Number,
    required: false
  },
  cadeauFournisseurClient: {
    type: Number,
    required: false
  },
  nomFournisseurClient: {
    type: String,
    required: false
  },
  lavageVoiture: {
    type: Number,
    required: false
  },
  entretienVoiture: {
    type: Number,
    required: false
  },
  fournitureBureau: {
    type: Number,
    required: false
  },
  montantDivers: {
    type: Number,
    required: false
  },
  descriptionDivers: {
    type: String,
    required: false
  },
  indemniteKilometrique: {
    type: Number,
    required: false
  },
  user_id: {
    type: String,
    required: true // Assuming you still want to keep the user_id required
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
