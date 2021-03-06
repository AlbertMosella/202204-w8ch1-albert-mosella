import { useCallback, useEffect, useState } from "react";
import { StarShip } from "./interfaces/Starship";

function App() {
  const [numberOfStarships, setNumberOfStarships] = useState<number>(0);
  const [starShips, setStarShips] = useState<StarShip[]>([]);
  const [starShipsClass, setStarShipsClass] = useState<string[]>([]);

  const getStarShips = useCallback(
    () => async () => {
      const response: Response = await fetch(
        "https://swapi.dev/api/starships/"
      );
      const starShipsList = await response.json();
      setStarShips(starShipsList);
      setNumberOfStarships(starShipsList.count);
      console.log(starShips);
      setStarShipsClass(orderStarshipByClass(starShipsList.results));
    },
    [starShips]
  );

  const orderStarshipByClass = (starShips: StarShip[]) => {
    return starShips.map((ship) => ship.starship_class);
  };

  useEffect(() => {
    (async () => {
      getStarShips();
    })();
  }, [getStarShips]);

  return (
    <div id="background-container">
      <header id="header-title">Star Wars Test</header>
      <main id="main-container">
        <h2>Starships:</h2>
        <p id="total-ships">Total ships: {numberOfStarships}</p>
        <h2>Starships by class:</h2>
        <p>{starShipsClass}</p>
      </main>
    </div>
  );
}

export default App;
