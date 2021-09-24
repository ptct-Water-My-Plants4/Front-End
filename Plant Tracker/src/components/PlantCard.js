// import axios from "axios";
import React, { useState } from "react";
import EditMenu from "./EditMenu";

export default function PlantCard(props) {
  const { plant, deleteHandler, setPlants } = props;
  const [edit, toggleEdit] = useState(false);

  const editToggler = () => {
    toggleEdit(true);
  };

  return (
    <div>
      <h2>{plant.nickname}</h2>
      <p>Species {plant.species}</p>
      <p>id: {plant.plant_id}</p>
      <h3>must be watered: {plant.h2oFrequency}</h3>
      {!edit ? (
        <div>
          <button onClick={editToggler}>Edit</button>
          <button onClick={() => deleteHandler(plant.id)}>Delete</button>
        </div>
      ) : (
        <EditMenu
          plant={plant}
          edit={edit}
          toggleEdit={toggleEdit}
          setPlants={setPlants}
        />
      )}
    </div>
  );
}