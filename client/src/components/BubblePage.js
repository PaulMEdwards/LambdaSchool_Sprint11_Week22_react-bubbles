import React, { useState, useEffect } from "react";
import Axios from "axios";

import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const api_uri = 'http://localhost:5000/api';
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axiosWithAuth()
      .get(api_uri+'/colors')
      .then(res => {
        console.log(`BubblePage: fetchData -> res.data`, res.data);
        setColorList(res.data);
      })
      .catch(err => {
        console.log(`BubblePage: fetchData -> err`, err);
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
