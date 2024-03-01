import React, { useCallback, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getCommandes } from '../../redux/api/commandeApiCall';
import ListCommandes from './shildren/ListCommandes';
import SpinerBs from '../../components/share/SpinerBs';
import ErrorAlert from '../../components/share/ErrorAlert';
import {Link} from "react-router-dom"
const Show = () => {
  const dispatch = useDispatch()
  const { commandes, error, loading } = useSelector((state) => state.commande);
  const get=useCallback(()=>{
   dispatch(getCommandes('/api/commandes')) 
  },[])
  useEffect(()=>{
    get()
  },[get])
  return (
    <div className="category-list w-100 h-100 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2>Commandes List </h2>
        </div>

        <div>
          <Link className="btn-create btn btn-sm" to="/commande/create">
            Create Commande
          </Link>
        </div>
      </div>
      <div className="table-container py-3">
        {loading ? <SpinerBs /> : commandes && <ListCommandes commandes={commandes} />}
        {error && <ErrorAlert error={error} />}
      </div>
    </div>)
}

export default Show