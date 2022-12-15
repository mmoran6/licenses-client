import { Route, Routes } from 'react-router-dom';
import AvailableLicenses from '../pages/AvailableLicensesPage/AvailableLicenses';
import Home from '../pages/HomePage/Home';
import NotAvailableLicenses from '../pages/NotAvailableLicensesPage/NotAvailableLicenses';
import Licenses from "../pages/LicensesPage/Licenses"

const AppRoutes = () => {
    return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/available' element={<AvailableLicenses />} />
        <Route path='/notAvailable' element={<NotAvailableLicenses />} /> 
        <Route path='/:info' element={<Licenses />}/> 
    </Routes>
)
}

export default AppRoutes