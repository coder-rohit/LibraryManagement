// import { Table } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import style from '../../../../moduleCSS/BookHome.module.css'
import Footer from "../../../Navbars/Footer"
import ShowDialogBox from "../../../ShowDialogBox.js"

export default function BookHome() {

    const [book, setBook] = useState([])
    const [rerender, setRerender] = useState(1)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [searchResults, setSearchResults] = useState(undefined)

    useEffect(() => {
        axios.post('http://localhost:8001/books')
            .then(function (response) {
                setBook(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    const searchBookCatalogue = (e) => {
        (e.target.value === "") ? setSearchResults(undefined) : hitSearchAPI(e)
        setSearchKeyword(e.target.value)
        async function hitSearchAPI(e) {
            await axios.post(`http://localhost:8001/searchBook`, {
                name: e.target.value
            })
                .then(function (response) {
                    setSearchResults(response.data);
                    console.log(searchResults)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function filterByPrice(value) {
        if (searchResults) {
            (value === "High") ? searchResults.sort((a, b) => (a.cost - b.cost ? -1 : 1)) : (value === "Relevance") ? searchResults.sort((a, b) => a.bid - b.bid) : searchResults.sort((a, b) => a.cost - b.cost)
            setRerender(rerender + 1)
        } else {
            (value === "High") ? book.sort((a, b) => (a.cost - b.cost ? -1 : 1)) : (value === "Relevance") ? book.sort((a, b) => a.bid - b.bid) : book.sort((a, b) => a.cost - b.cost)
            setRerender(rerender + 1)
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <SideNavbar />
                </Col>
                <Col xl={9} >
                    <Navbar page="Book" placeholder="Book ID, Name or Author" />
                    <div className="mainContentContainer">
                        <div className={style.filterBar}>
                            <div className={style.filterBarInfo}>
                                <p>BOOK INVENTORY </p>
                                <p> ({book.length} Books Found)</p>
                            </div>
                            <div className={style.bookFilter}>
                                <select onChange={(e) => filterByPrice(e.target.value)} name="" id="">
                                    <option defaultValue value="Relevance">By Relevance</option>
                                    <option value="High">Price: High to low</option>
                                    <option value="Low">Price: Low to High</option>
                                </select>
                                <input type="text" placeholder="Search Books" value={searchKeyword} onChange={(e) => searchBookCatalogue(e)} />
                            </div>

                        </div>
                        <Row className={style.bookCatalogue}>
                            {
                                book && (searchResults) ? searchResults.map((book, i) => {
                                    return (
                                        <div key={i}>
                                            <BookCatalogue bookAllDetails={book} title={book.name} author={book.author} cost={book.cost} discount={book.discount} bid={book.bid} image={book.image} />
                                        </div>
                                    )
                                }) : book.map((book, i) => {
                                    return (
                                        <div key={i}>
                                            <BookCatalogue bookAllDetails={book} title={book.name} author={book.author} cost={book.cost} discount={book.discount} bid={book.bid} image={book.image} />
                                        </div>
                                    )
                                })
                            }
                        </Row>
                    </div>
                    <Footer />
                </Col>
            </Row>
        </>
    )
}


const BookCatalogue = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <>
            <Col>
                <div>
                    <div className={style.CardImage}>
                        <div className={style.bid}>
                            {props.bid}
                        </div>
                        <img src={require(`../../../../images/bookImages/${props.image}.jpeg`)} alt="" />
                    </div>
                    <div className={style.CardDetails}>
                        <div>
                            <h6>{props.title}</h6>
                            <p>by {props.author}</p>
                        </div>
                        <div className={style.CardPrice}>
                            <h5>₹{Math.round(props.cost - [(props.cost / 100) * props.discount])}</h5>
                            <p>₹{props.cost}</p> <span className={style.discount}>({props.discount}% Off)</span>
                        </div>
                        <h5 style={{ fontSize: "16px" }}>Rent @ ₹{Math.round(props.cost - [(props.cost / 100) * 90])}/month</h5>
                        <div className={style.rentBuyBtn}>
                            <button onClick={handleShow}>Book Details</button>
                        </div>
                    </div>
                </div>
                {(show === true) && <ShowDialogBox bookID={props.bid} show={show} handleCloseFunction={handleClose} bookAllDetails={props.bookAllDetails} />}
            </Col>
        </>
    )
}