import { useParams } from "react-router-dom"
import features from "../../data/features.txt";
import detailstxt from "../../data/details.txt"
import { useEffect, useState } from "react";
import * as d3Fetch from 'd3-fetch'
import './Licenses.css'
import Accordion from 'react-bootstrap/Accordion';

function Licenses() {
    const { info } = useParams()
    const [licenseList, setLicenseList] = useState()
    const [dictionaryCSV, setDictionaryCSV] = useState([])
    const [detailsList, setDetailsList] = useState()
    const names = []
    const infoAboutLicense = []
    const namesAndFeatures = []
    let counter = 0

    const filtered = licenseList?.filter(license => license.PortAtServer === info)

    const data = () => {
        fetch(features)
            .then(response => response.json())
            .then(data => {
                setLicenseList(data)
            })
    }

    const details = () => {
        fetch(detailstxt)
            .then(response => response.json())
            .then(data => {
                setDetailsList(data)
            })
    }

    const dictionary = async () => {
        const data = await d3Fetch.csv('/dictionary-table.csv')
        setDictionaryCSV(data)
    }

    const mapNames = () => {
        filtered?.map((elementFiltered) => {
            dictionaryCSV?.map((elementDictionary) => {
                if (elementDictionary.JTB === elementFiltered.Feature) {
                    names.push(elementDictionary.name)
                    const obj = {
                        name: elementDictionary.name,
                        feature: elementFiltered.Feature
                    }
                    namesAndFeatures.push(obj)
                }
            })

        })
    }


    const moreInfo = () => { ///////buscar la manera de recoger a las personas que la utilizan y que solo salgan en sus licencias
        filtered?.map(elementFiltered => {
            detailsList?.map(elementDetails => {
                if (elementFiltered.Feature === elementDetails.Feature) {
                    infoAboutLicense.push(elementDetails)
                }
            })
        })
    }

    function secondsToString(seconds) {
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        var second = seconds % 60;
        second = (second < 10)? '0' + second : second;
        return hour + ':' + minute + ':' + second;
      }



    useEffect(() => {
        data()
        dictionary()
        details()
    }, [])

    mapNames()
    moreInfo()

    return (
        <div className="licenses-container">
            <h2>Licencias de {info}</h2>
            <Accordion>
                {
                    namesAndFeatures.map((element, index) => {
                        counter = 0
                        return (
                            <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{element.name}</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        infoAboutLicense.map((person, key) => {
                                            if (person.Feature === element.feature) {
                                                counter++
                                                const dateString = person.CheckedOutDate.substr(6)
                                                const currentTime = new Date(parseInt(dateString))

                                                const dateString1 = person.SnapShotDate.substr(6) 
                                                const dateString2 = person.CheckedOutDate.substr(6)

                                               
                                                const currentTime1 = new Date(parseInt(dateString1))
                                                const currentTime2 = new Date(parseInt(dateString2))

                                                const dif = currentTime1.getTime() - currentTime2.getTime()
                                                const parseDate = new Date(parseInt(dif))
                                                const timeInUse = parseDate.toLocaleTimeString()
                                 

                                                return (
                                                    <div key={person.UserName} className="accordion-body-content">
                                                      <p>{person.UserName}</p>
                                                      <p>Checked out license at {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()} </p>
                                                      <p>Hours used {timeInUse}</p>
                                                    </div>
                                               
                                                )
                                            }   
                                        }) 
                                    }
                                    {
                                        counter === 0 ? <p style={{color: "#bf1525"}}>No hay nadie usando la licencia</p> : null
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}

export default Licenses

