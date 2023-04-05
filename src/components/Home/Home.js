import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters } from "../../redux/characterSlice";
import Masonry from "react-masonry-css";
import "./styles.css"
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  const data = useSelector((state) => state.characters.items);
  const isLoading = useSelector((state) => state.characters.isLoading);
  const error = useSelector((state) => state.characters.error);

  if(isLoading) {
    return <Loading />
  }
  if(error) {
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
            <img src={char.image} alt={char.name} className="character" />
            <div className="charName">{char.name}</div>
            
          </div>
        ))}
      </Masonry>
      <ul className="card"></ul>
    </div>
  );
}

export default Home;
