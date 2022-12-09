import { useEffect, useState } from "react";
import details from "../../data/details.txt";
import features from "../../data/features.txt";
import * as d3Fetch from 'd3-fetch'

const Home = () => {
  const [license, setLicense] = useState()
  const [name, setName] = useState([])
  const [rows, setRows] = useState([])

  //leer txt con licencias
  const data = () => {
    fetch(features)
      .then(response => response.json())
      .then(data => console.log(data))
  }


  const single = (array) => {

    const single = []
    array.forEach((element) => {

      if (!(single.includes(element.PortAtServer))) {
        console.log("entro")
        single.push(element.PortAtServer)
      }
    })

    setName(single)

    console.log(single)
  }

  const dictionary = () => {
    d3Fetch.csv('/dictionary-table.csv').then((data) => {
      console.log(data);
    }) 
  }
 

  useEffect(() => {
    data()
    dictionary()
  }, []);


  return (
    <>
      <h1>hola</h1>

    </>
  )
}

export default Home