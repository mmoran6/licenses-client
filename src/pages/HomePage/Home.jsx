import { useEffect, useState } from "react";
import details from "../../data/details.txt";
import features from "../../data/features.txt";
import Card from "../../components/Card/Card";
import "./Home.css";

const Home = () => {
  const [license, setLicense] = useState();
  const [name, setName] = useState([]);
  const [stockLicense, setStockLicense] = useState([]);
  const [reload, setReload] = useState(false);
  let counter = [];
  const featuresLSinic = localStorage.getItem("features");
  const featuresLS = JSON.parse(featuresLSinic);

  //leer txt con licencias
  const data = () => {
    fetch(features)
      .then((response) => response.json())

      .then((data) => {
        setLicense(data);
        single(data);
        localStorage.setItem("features", JSON.stringify(data));
      });
  };

  const single = (array) => {
    const single = [];
    array?.forEach((element) => {
      if (!single.includes(element.PortAtServer)) {
        single.push(element.PortAtServer);
        
      }
    });

    setName(single);
    localStorage.setItem("name", JSON.stringify(name));
    console.log(name);
   
  };

  

  useEffect(() => {
    data();

  }, []);
  
  

  return (
    <div className="main-content">
      <div className="card-container">
        {localStorage.setItem("name", JSON.stringify(name))}
        


        {name.map((element) => (
          <Card key={element} info={element} name={name} license={license}></Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
