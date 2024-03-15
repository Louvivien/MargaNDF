const Expense = require('../models/expenseModel')
const mongoose = require('mongoose')

// get all expenses
// const getExpenses = async (req, res) => {
//   const expenses = await Expense.find({}).sort({createdAt: -1})

//   res.status(200).json(expenses)
// }

// get all expenses by user id
const getExpenses = async (req, res) => {
  console.log("Fetching expenses for user:", req.user._id); // Log the user ID for whom expenses are being fetched

  const user_id = req.user._id;
  try {
    const expenses = await Expense.find({ user_id }).sort({ createdAt: -1 });
    console.log(`Found ${expenses.length} expenses for user: ${user_id}`); // Log the number of expenses found

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses for user:", user_id, error); // Log any errors that occur during the fetch
    res.status(400).json({ error: error.message });
  }
}


// get a single expense
const getExpense = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such expense' })
  }

  const expense = await Expense.findById(id)

  if (!expense) {
    return res.status(404).json({ error: 'No such expense' })
  }

  res.status(200).json(expense)
}

const createExpense = async (req, res) => {
  console.log("Creating new expense with data:", req.body); // Log the incoming request data

  const {
    dateDeplacement,
    codeClient,
    lieuxDeplacement,
    kilometres,
    restauMidi,
    restauSoir,
    hotel,
    petitDej,
    soireeEtape,
    carburant,
    adBlue,
    autoroute,
    parking,
    laPoste,
    telephone,
    cadeauFournisseurClient,
    nomFournisseurClient,
    lavageVoiture,
    entretienVoiture,
    fournitureBureau,
    montantDivers,
    descriptionDivers,
    indemniteKilometrique
  } = req.body;

  let emptyFields = [];

  if (!dateDeplacement) {
    emptyFields.push('dateDeplacement');
  }

  if (emptyFields.length > 0) {
    console.log("Missing required fields:", emptyFields); // Log missing fields
    return res.status(400).json({ error: 'Please fill in the date de déplacement', emptyFields });
  }

  try {
    const user_id = req.user._id;
    const expense = await Expense.create({
      dateDeplacement,
      codeClient,
      lieuxDeplacement,
      kilometres,
      restauMidi,
      restauSoir,
      hotel,
      petitDej,
      soireeEtape,
      carburant,
      adBlue,
      autoroute,
      parking,
      laPoste,
      telephone,
      cadeauFournisseurClient,
      nomFournisseurClient,
      lavageVoiture,
      entretienVoiture,
      fournitureBureau,
      montantDivers,
      descriptionDivers,
      indemniteKilometrique,
      user_id
    });
    console.log("Expense created successfully:", expense); // Log the created expense document
    res.status(200).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error.message); // Log any errors
    res.status(400).json({ error: error.message });
  }
};


// delete a expense
const deleteExpense = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such expense' })
  }

  const expense = await Expense.findOneAndDelete({ _id: id })

  if (!expense) {
    return res.status(400).json({ error: 'No such expense' })
  }

  res.status(200).json(expense)
}

// update a expense
const updateExpense = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such expense' })
  }

  const expense = await Expense.findOneAndUpdate(
    { _id: id },
    {
      ...req.body
    }
  )

  if (!expense) {
    return res.status(400).json({ error: 'No such expense' })
  }

  res.status(200).json(expense)
}

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense
}