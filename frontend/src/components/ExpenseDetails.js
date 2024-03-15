import { useExpensesContext } from '../hooks/useExpensesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import format from 'date-fns/format'
import { fr } from 'date-fns/locale'

const ExpenseDetails = ({ expense }) => {
  const { dispatch } = useExpensesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:4000/api/expenses/' + expense._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_EXPENSE', payload: json })
    }
  }

  return (
    <div className="expense-details">
      <h4>Note de frais</h4>
      {expense.dateDeplacement && (
        <p><strong>Date de déplacement : </strong>{format(new Date(expense.dateDeplacement), 'dd/MM/yyyy', { locale: fr })}</p>
      )}
      {expense.codeClient && <p><strong>Code client : </strong>{expense.codeClient}</p>}
      {expense.lieuxDeplacement && <p><strong>Lieux de déplacement : </strong>{expense.lieuxDeplacement}</p>}
      {expense.kilometres && <p><strong>Kilometres : </strong>{expense.kilometres}</p>}
      {expense.restauMidi && <p><strong>Restau midi : </strong>{expense.restauMidi}</p>}
      {expense.restauSoir && <p><strong>Restau soir : </strong>{expense.restauSoir}</p>}
      {expense.hotel && <p><strong>Hotel : </strong>{expense.hotel}</p>}
      {expense.petitDej && <p><strong>Petit dej : </strong>{expense.petitDej}</p>}
      {expense.soireeEtape && <p><strong>Soirée étape : </strong>{expense.soireeEtape}</p>}
      {expense.carburant && <p><strong>Carburant : </strong>{expense.carburant}</p>}
      {expense.adBlue && <p><strong>Ad blue : </strong>{expense.adBlue}</p>}
      {expense.autoroute && <p><strong>Autoroute : </strong>{expense.autoroute}</p>}
      {expense.parking && <p><strong>Parking : </strong>{expense.parking}</p>}
      {expense.laPoste && <p><strong>La poste : </strong>{expense.laPoste}</p>}
      {expense.telephone && <p><strong>Téléphone : </strong>{expense.telephone}</p>}
      {expense.cadeauFournisseurClient && <p><strong>Cadeau fournisseur/client : </strong>{expense.cadeauFournisseurClient}</p>}
      {expense.nomFournisseurClient && <p><strong>Nom fournisseur/client : </strong>{expense.nomFournisseurClient}</p>}
      {expense.lavageVoiture && <p><strong>Lavage voiture : </strong>{expense.lavageVoiture}</p>}
      {expense.entretienVoiture && <p><strong>Entretien voiture : </strong>{expense.entretienVoiture}</p>}
      {expense.fournitureBureau && <p><strong>Fourniture bureau : </strong>{expense.fournitureBureau}</p>}
      {expense.montantDivers && <p><strong>Montant divers : </strong>{expense.montantDivers}</p>}
      {expense.descriptionDivers && <p><strong>Description divers : </strong>{expense.descriptionDivers}</p>}
      {expense.indemniteKilometrique && <p><strong>Indemnité kilométrique : </strong>{expense.indemniteKilometrique}</p>}
      <p>{formatDistanceToNow(new Date(expense.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ExpenseDetails