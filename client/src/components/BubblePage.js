import React, { useState, useEffect } from "react";
// import Axios from "axios";

import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const api_uri = 'http://localhost:5000/api';

  const [colorList, setColorList] = useState([]);
  const [colorToUpdate, setColorToUpdate] = useState(false)

  useEffect(() => {
    axiosWithAuth()
    .get(api_uri+'/colors')
    .then(res => {
      console.log(`BubblePage: fetchData useEffect -> res.data`, res.data);
      setColorList(res.data);
    })
    .catch(err => {
      console.log(`BubblePage: fetchData useEffect -> err`, err);
    });
  }, [colorToUpdate]);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        colorToUpdate={colorToUpdate}
        setColorToUpdate={setColorToUpdate}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
