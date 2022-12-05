import Form from 'react-bootstrap/Form';
import './SearchBar.css'

const SearchBar = () => {
    return (
        <Form className="search-bar">
            <div>
                <Form.Control type="text" />
            </div>
            <div className="iconSearch">
                <img src='https://www.systemuicons.com/images/icons/search.svg'></img>
            </div>
        </Form>
    )
}

export default SearchBar