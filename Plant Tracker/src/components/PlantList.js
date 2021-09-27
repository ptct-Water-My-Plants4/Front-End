import axios from "axios";
import React, { useState } from "react";
import PlantCard from "./PlantCard";


export default function PlantList(props) {
  const { plants, setPlants } = props;
  console.log(plants);

  // Search state if/when search function is implemented
  const [searchTerm, setSearchTerm] = useState("");
  const change = (evt) => {
    setSearchTerm(evt.target.value);
  };

if (change === 0) {
  return null
}




  const deleteHandler = () => {
    axios
      .delete(`https://ptct-water-my-plants4.herokuapp.com/api/plants/${plants.plant_id}`)
      .then((res) => {
        console.log("Deleted:", res);
        axios
          .get("https://ptct-water-my-plants4.herokuapp.com/api/plants")
          .then((res) => setPlants(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="plantListContainer">
        {plants
          .filter((plant) => {
            if (searchTerm === "") {
              return plant;
            } else if (
              plant.nickname
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase()) ||
              plant.species
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return plant;
            } else return null;
          })
          .map((plant, index) => (
            <div className="plant-list" key={index}>
              <PlantCard
                plant={plant}
                key={index}
                deleteHandler={deleteHandler}
                setPlants={setPlants}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
