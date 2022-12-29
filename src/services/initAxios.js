import axios from 'axios'

class Axios {
    constructor() {
        this.axios = axios.create({
            baseURL: `http://localhost:5005/api`
        })
    }

    getInfoCities() {
        return this.axios.get('/infoUser').then((response) => response.data)
    }

    getIdCity() {
        return this.axios.get('/idCity').then((response) => response.data)
    }

    getRelUserGroup() {
        return this.axios.get('/relUserGroup').then((response) => response.data)
    }

    getIdUser() {
        return this.axios.get('/idUser').then((response) => response.data)
    }

}

export default Axios