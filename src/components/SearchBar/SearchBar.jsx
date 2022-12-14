import Form from 'react-bootstrap/Form';
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <Form className="search-bar">
            <div>
                <Form.Control type="text" />
            </div>
            <div className="iconSearch">
                <SearchIcon></SearchIcon>
            </div>
        </Form>
    )
}

export default SearchBar