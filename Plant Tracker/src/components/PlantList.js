import axios from "axios";
import React, { useState } from "react";
import PlantCard from "./PlantCard";


export default function PlantList(props) {
  const { plants, setPlants } = props;
  console.log(plants);

  //Search state
  const [searchTerm, setSearchTerm] = useState("");
  //search onChange Helper
  const change = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const deleteHandler = (id) => {
    axios
      .delete(`https://fakeapi.com`)
      .then((res) => {
        console.log("Deleted:", res);
        axios
          .get("https://fakeapi.com")
          .then((res) => setPlants(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
     <div className="search">
        <input
          type="text"
          placeholder="Search by plant name or species"
          name="search"
          value={searchTerm}
          onChange={change}
        />
      </div>
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