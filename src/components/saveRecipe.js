import React from "react";

export default function saveRecipe() {
  return (
    <div>
      <form>
        <label>Receptnamn</label>
        <br />
        <input type="text" />
        <br />

        <label>Kategori</label>
        <br />
        <input type="text" />
        <br />

        <label>Beskrivning</label>
        <br />
        <input type="text" />
        <br />

        <label>Tid</label>
        <br />
        <input type="text" />
        <br />

        <label>Ingrediens</label>
        <br />
        <input type="text" />
        <br />

        <label>Instruktioner</label>
        <br />
        <input type="text" />
        <br />

        <input type="submit" value="Spara" />
      </form>
    </div>
  );
}
