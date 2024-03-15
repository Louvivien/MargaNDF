import { useState } from "react"
import { useExpensesContext } from "../hooks/useExpensesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ExpenseForm = () => {
  const { dispatch } = useExpensesContext()
  const { user } = useAuthContext()

  const [dateDeplacement, setDateDeplacement] = useState('')
  const [codeClient, setCodeClient] = useState('')
  const [lieuxDeplacement, setLieuxDeplacement] = useState('')
  const [kilometres, setKilometres] = useState('')
  const [restauMidi, setRestauMidi] = useState('')
  const [restauSoir, setRestauSoir] = useState('')
  const [hotel, setHotel] = useState('')
  const [petitDej, setPetitDej] = useState('')
  const [soireeEtape, setSoireeEtape] = useState('')
  const [carburant, setCarburant] = useState('')
  const [adBlue, setAdBlue] = useState('')
  const [autoroute, setAutoroute] = useState('')
  const [parking, setParking] = useState('')
  const [laPoste, setLaPoste] = useState('')
  const [telephone, setTelephone] = useState('')
  const [cadeauFournisseurClient, setCadeauFournisseurClient] = useState('')
  const [nomFournisseurClient, setNomFournisseurClient] = useState('')
  const [lavageVoiture, setLavageVoiture] = useState('')
  const [entretienVoiture, setEntretienVoiture] = useState('')
  const [fournitureBureau, setFournitureBureau] = useState('')
  const [montantDivers, setMontantDivers] = useState('')
  const [descriptionDivers, setDescriptionDivers] = useState('')
  const [indemniteKilometrique, setIndemniteKilometrique] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([]) 


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const Expense = {
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
    }

    console.log(Expense); // Add this line to log the Expense object
    const response = await fetch('http://localhost:4000/api/Expenses', {
      method: 'POST',
      body: JSON.stringify(Expense),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setDateDeplacement('')
      setCodeClient('')
      setLieuxDeplacement('')
      setKilometres('')
      setRestauMidi('')
      setRestauSoir('')
      setHotel('')
      setPetitDej('')
      setSoireeEtape('')
      setCarburant('')
      setAdBlue('')
      setAutoroute('')
      setParking('')
      setLaPoste('')
      setTelephone('')
      setCadeauFournisseurClient('')
      setNomFournisseurClient('')
      setLavageVoiture('')
      setEntretienVoiture('')
      setFournitureBureau('')
      setMontantDivers('')
      setDescriptionDivers('')
      setIndemniteKilometrique('')
      setError(null)
      setEmptyFields(json.emptyFields || []);
      dispatch({type: 'CREATE_Expense', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Ajouter une nouvelle note de frais</h3>

      <label>Date de déplacement :</label>
      <input 
        type="date"
        onChange={(e) => setDateDeplacement(e.target.value)}
        value={dateDeplacement}
        className={emptyFields.includes('dateDeplacement') ? 'error' : ''}
      />

      <label>Code client :</label>
      <input
        type="text"
        onChange={(e) => setCodeClient(e.target.value)}
        value={codeClient}
        className={emptyFields.includes('codeClient') ? 'error' : ''}
      />

      <label>Lieux de déplacement :</label>
      <input
        type="text"
        onChange={(e) => setLieuxDeplacement(e.target.value)}
        value={lieuxDeplacement}
        className={emptyFields.includes('lieuxDeplacement') ? 'error' : ''}
      />

      <label>Kilometres :</label>
      <input
        type="number"
        onChange={(e) => setKilometres(e.target.value)}
        value={kilometres}
        className={emptyFields.includes('kilometres') ? 'error' : ''}
      />

      <label>Restau midi :</label>
      <input
        type="number"
        onChange={(e) => setRestauMidi(e.target.value)}
        value={restauMidi}
        className={emptyFields.includes('restauMidi') ? 'error' : ''}
      />

      <label>Restau soir :</label>
      <input
        type="number"
        onChange={(e) => setRestauSoir(e.target.value)}
        value={restauSoir}
        className={emptyFields.includes('restauSoir') ? 'error' : ''}
      />

      <label>Hotel :</label>
      <input
        type="number"
        onChange={(e) => setHotel(e.target.value)}
        value={hotel}
        className={emptyFields.includes('hotel') ? 'error' : ''}
      />

      <label>Petit dej :</label>
      <input
        type="number"
        onChange={(e) => setPetitDej(e.target.value)}
        value={petitDej}
        className={emptyFields.includes('petitDej') ? 'error' : ''}
      />

      <label>Soirée étape :</label>
      <input
        type="number"
        onChange={(e) => setSoireeEtape(e.target.value)}
        value={soireeEtape}
        className={emptyFields.includes('soireeEtape') ? 'error' : ''}
      />

      <label>Carburant :</label>
      <input
        type="number"
        onChange={(e) => setCarburant(e.target.value)}
        value={carburant}
        className={emptyFields.includes('carburant') ? 'error' : ''}
      />

      <label>Ad blue :</label>
      <input
        type="number"
        onChange={(e) => setAdBlue(e.target.value)}
        value={adBlue}
        className={emptyFields.includes('adBlue') ? 'error' : ''}
      />

      <label>Autoroute :</label>
      <input
        type="number"
        onChange={(e) => setAutoroute(e.target.value)}
        value={autoroute}
        className={emptyFields.includes('autoroute') ? 'error' : ''}
      />

      <label>Parking :</label>
      <input
        type="number"
        onChange={(e) => setParking(e.target.value)}
        value={parking}
        className={emptyFields.includes('parking') ? 'error' : ''}
      />

      <label>La poste :</label>
      <input
        type="number"
        onChange={(e) => setLaPoste(e.target.value)}
        value={laPoste}
        className={emptyFields.includes('laPoste') ? 'error' : ''}
      />

      <label>Téléphone :</label>
      <input
        type="number"
        onChange={(e) => setTelephone(e.target.value)}
        value={telephone}
        className={emptyFields.includes('telephone') ? 'error' : ''}
      />

      <label>Cadeau fournisseur/client :</label>
      <input
        type="number"
        onChange={(e) => setCadeauFournisseurClient(e.target.value)}
        value={cadeauFournisseurClient}
        className={emptyFields.includes('cadeauFournisseurClient') ? 'error' : ''}
      />

      <label>Nom fournisseur/client :</label>
      <input
        type="text"
        onChange={(e) => setNomFournisseurClient(e.target.value)}
        value={nomFournisseurClient}
        className={emptyFields.includes('nomFournisseurClient') ? 'error' : ''}
      />

      <label>Lavage voiture :</label>
      <input
        type="number"
        onChange={(e) => setLavageVoiture(e.target.value)}
        value={lavageVoiture}
        className={emptyFields.includes('lavageVoiture') ? 'error' : ''}
      />

      <label>Entretien voiture :</label>
      <input
        type="number"
        onChange={(e) => setEntretienVoiture(e.target.value)}
        value={entretienVoiture}
        className={emptyFields.includes('entretienVoiture') ? 'error' : ''}
      />

      <label>Fourniture bureau :</label>
      <input
        type="number"
        onChange={(e) => setFournitureBureau(e.target.value)}
        value={fournitureBureau}
        className={emptyFields.includes('fournitureBureau') ? 'error' : ''}
      />

      <label>Montant divers :</label>
      <input
        type="number"
        onChange={(e) => setMontantDivers(e.target.value)}
        value={montantDivers}
        className={emptyFields.includes('montantDivers') ? 'error' : ''}
      />

      <label>Description divers :</label>
      <input
        type="text"
        onChange={(e) => setDescriptionDivers(e.target.value)}
        value={descriptionDivers}
        className={emptyFields.includes('descriptionDivers') ? 'error' : ''}
      />

      <label>Indemnité kilométrique :</label>
      <input
        type="number"
        onChange={(e) => setIndemniteKilometrique(e.target.value)}
        value={indemniteKilometrique}
        className={emptyFields.includes('indemniteKilometrique') ? 'error' : ''}
      />

      <button>Ajouter</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ExpenseForm