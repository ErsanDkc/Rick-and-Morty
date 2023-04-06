import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { singleCharacter } from '../../redux/characterSlice';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import "./styles.css"
function Detail() {
    const dispatch = useDispatch()
    const {id} = useParams()
    
    const item = useSelector((state) => state.characters.item)
    const status = useSelector((state) => state.characters.status)
    const error = useSelector((state) => state.characters.error)
    useEffect(() => {

           dispatch(singleCharacter(id))
    
    },[dispatch,id])


    if(status ==="loading") {
        return <Loading />
      }
      if(status ==="failed") {
        return <Error message={error} />
      }
  return (
    <div >
        {
            item && <>
            <section>
            <h1>{item.name}</h1>
            <img src={item.image} alt={item.name} />
            <h4>Status: {item.status}</h4>
            <h4>Species: {item.species}</h4>
            <h4>Gender: {item.gender}</h4>
            <h4>Location: {item.location.name}</h4>
            </section>
            </>
        }
        </div>
  )
}

export default Detail