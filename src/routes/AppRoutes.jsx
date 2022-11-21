import { Route, Routes } from 'react-router-dom';
import AvailableLicenses from '../pages/AvailableLicensesPage/AvailableLicenses';
import Home from '../pages/HomePage/Home';
import NotAvailableLicenses from '../pages/NotAvailableLicensesPage/NotAvailableLicenses';

const AppRoutes = () => {
    return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/available' element={<AvailableLicenses />} />
        <Route path='/notAvailable' element={<NotAvailableLicenses />} /> 
    </Routes>
)
}

export default AppRoutes