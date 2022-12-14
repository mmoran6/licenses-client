import { useEffect, useState } from "react";
import details from "../../data/details.txt";
import features from "../../data/features.txt"
import Card from "../../components/Card/Card";
import './Home.css'


const Home = () => {
  const [license, setLicense] = useState()
  const [name, setName] = useState([])


  //leer txt con licencias
  const data = () => {
    fetch(features)
      .then(response => response.json())
      .then(data => {
        setLicense(data)
        single(data)
      })
  }



  const single = (array) => {
    const single = []
    
    array?.forEach((element) => {
      if (!(single.includes(element.PortAtServer))) {
        single.push(element.PortAtServer)
      }
    })

    setName(single)
  }


  useEffect(() => {
    data()
    single(license)
  }, []);


  return (
    <div className="main-content">
      {/* <Aside info={name}></Aside>
    
        {
          dictionaryCSV !== undefined && (
            dictionaryCSV.map((element, index) => <Card element={element} key={index} className="card"></Card>)
          )
        }
       */}
      <div className="card-container">
        {
          name.map(element => <Card key={element} info={element}></Card>)
        }
      </div>
    </div>
  )
}

export default Home