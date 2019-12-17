import React, { useState, useEffect } from "react";
// import Axios from "axios";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "black",
  code: { hex: "#000000" }
};

const ColorList = ({ colors, updateColors, colorToUpdate, setColorToUpdate }) => {
  const api_uri = 'http://localhost:5000/api';

  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  useEffect(() => {
    console.log(`ColorList -> colors`, colors);
  }, [colors]);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = (color) => {
    console.log(`ColorList: addColor -> color`, color);
    setAdding(true);

    axiosWithAuth()
    .post(`${api_uri}/colors`, color)
    .then(res => {
      console.log(`ColorList: addColor -> res.data`, res.data);
    })
    .catch(err => {
      console.log(`ColorList: saveEdit -> err`, err);
    });

    setColorToUpdate(!colorToUpdate);
    setAdding(false);
  }

  const saveEdit = (e) => {
    e.preventDefault();
    console.log(`ColorList: saveEdit -> colorToEdit`, colorToEdit);

    axiosWithAuth()
    .put(`${api_uri}/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(`ColorList: saveEdit -> res.data`, res.data);
      const updatedColors = colors.map(c => {
        if (c.id === res.data.id) {
          return colorToEdit;
        } else {
          return c;
        }
      });
      updateColors(updatedColors);
    })
    .catch(err => {
      console.log(`ColorList: saveEdit -> err`, err);
    });

    setColorToEdit(initialColor);
    setEditing(false);
  };

  const deleteColor = (color) => {
    setEditing(false);

    axiosWithAuth()
    .delete(`${api_uri}/colors/${color.id}`)
    .then(res => {
      console.log(`ColorList: deleteColor -> res`, res);
      const updatedColors = colors.filter(c => c.id !== res.data);
      updateColors(updatedColors);
    })
    .catch(err => {
      console.error(`ColorList: deleteColor -> err`, err)
    });
  };

  return (
    <div className="colors-wrap">
      <h1>Colors</h1>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteColor(color)
              }}>
              x
              </span>&nbsp;&nbsp;&nbsp;
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <div className="editColor">
          <form onSubmit={(e) => saveEdit(e, colorToEdit.id)}>
            <legend>Edit Color</legend>
            <label>
              Color Name:
              <input
                onChange={(e) =>
                  setColorToEdit({ ...colorToEdit, color: e.target.value })
                }
                value={colorToEdit.color}
              />
            </label>
            <label>
              Hex Code:
              <input
                onChange={(e) =>
                  setColorToEdit({
                    ...colorToEdit,
                    code: { hex: e.target.value }
                  })
                }
                value={colorToEdit.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {!adding &&
      <div className="button-row block">
        <button onClick={() => setAdding(true)}>Add</button>
      </div>
      }
      {adding && (
        <div className="addColor">
          <form onSubmit={(e) => {
            e.preventDefault();
            addColor(colorToAdd);
            }}>
            <legend>Add Color</legend>
            <label>
              Color Name:
              <input
                onChange={(e) =>
                  setColorToAdd({ ...colorToAdd, color: e.target.value })
                }
                value={colorToAdd.color}
              />
            </label>
            <label>
              Hex Code:
              <input
                onChange={(e) =>
                  setColorToAdd({
                    ...colorToAdd,
                    code: { hex: e.target.value }
                  })
                }
                value={colorToAdd.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">Add</button>
              <button onClick={() => setAdding(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ColorList;
