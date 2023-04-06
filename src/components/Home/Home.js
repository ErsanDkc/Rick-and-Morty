import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters,  nextPage, prevPage } from "../../redux/characterSlice";
import Masonry from "react-masonry-css";
import "./styles.css"
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { NavLink } from "react-router-dom";
function Home() {
  const dispatch = useDispatch();
  

  const data = useSelector((state) => state.characters.items);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const page = useSelector((state) => state.characters.page);

  useEffect(() => {
    

      dispatch(getCharacters(page));
    
  }, [dispatch,page]);


  if(status ==="loading") {
    return <Loading />
  }
  if(status ==="failed") {
    return <Error message={error} />
  }
  return (
    <div>
      
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data?.results?.map((char) => (
          <div key={char.id}>
            <NavLink to={`/char/${char.id}`}>
            <img src={char.image} alt={char.name} className="character" />
            <div className="charName">{char.name}</div>
            </NavLink>
          </div>
        ))}
      </Masonry>
      <div className="addMore">

      <button onClick={() => dispatch(prevPage(page))} >Prev</button>
       <span>{page}</span> 
      <button onClick={() => dispatch(nextPage(page))} >Next</button>
      </div>
    </div>
  );
}

export default Home;
