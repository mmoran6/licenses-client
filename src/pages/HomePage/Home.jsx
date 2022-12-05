import { useEffect, useState } from "react";
import details from "../../data/details.txt";
import features from "../../data/features.txt";

const Home = () => {
  const [license, setLicense] = useState()
  const [name, setName] = useState([])
  const data = () => {
    const request = new XMLHttpRequest();
    request.open("GET", features, true);
    request.send(null);
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader("Content-Type");
        if (type.indexOf("text") !== 1) {
          console.log(JSON.parse(request.responseText));
          setLicense(JSON.parse(request.responseText));
          single(JSON.parse(request.responseText))
        }
      }
    };

  }

  const single = (array) => {

    const single = []
    array.forEach((element)=>{
      
      if (!(single.includes(element.PortAtServer))){
        console.log("entro")
        single.push(element.PortAtServer)
      } 
    })

    setName(single)
    
    console.log(single)
    console.log("-----------------")
    console.log(license)
  }


  useEffect(() => {
    data()
  }, []);
  return (<div>

    {/* {license.length ? (
      license.map(licen => (
        <CardLicense license={licen} />
      ))
    ) : (
      <p>Loading Licencias...</p>
    )}
     */}
  </div>




  )
}

export default Home