import { Route, Routes } from 'react-router-dom';
import Home from '../pages/HomePage/Home';
import Licenses from "../pages/LicensesPage/Licenses"

const AppRoutes = () => {
    return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:info' element={<Licenses />}/> 
    </Routes>
)
}

export default AppRoutes