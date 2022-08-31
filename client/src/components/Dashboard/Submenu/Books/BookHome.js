import { Table } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

export default function BookHome() {

    const [book, setBook] = useState([])

    useEffect(() => {
        axios.post('http://localhost:8001/books')
            .then(function (response) {
                setBook(response.data)
            })
            .catch(function(error){
                console.log(error)
            })
    },[])

    return (
        <>
            <Row>
                <Col>
                    <SideNavbar />
                </Col>
                <Col xl={9}>
                    <Navbar page="Book" />
                    <div className="mainContentContainer">
                        <Table hover bordered>
                            <thead>
                                <tr>
                                    <th>BID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Cost</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    book.map((book) => {
                                        return (
                                            <tr key={book.bid}>
                                                <td>{book.bid}</td>
                                                <td>{book.name}</td>
                                                <td>{book.author}</td>
                                                <td>{book.cost}</td>
                                                <td>{book.quantity}</td>
                                            </tr>

                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </>
    )
}