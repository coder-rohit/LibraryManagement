import Navbar from '../Navbars/Navbar'
import { Row, Col, Table } from 'react-bootstrap'
import style from "../../moduleCSS/Admin.module.css"
import { FaUserGraduate, FaCoins } from "react-icons/fa"
import { IconContext } from 'react-icons/lib/esm/iconContext'
import { ImBooks } from 'react-icons/im'
import { SiBookstack } from 'react-icons/si'
import SideNavbar from '../Navbars/SideNavbar' 
import { useEffect, useState } from 'react'
//cookies
import { useCookies } from 'react-cookie'
import Footer from '../Navbars/Footer'
// axios
const axios = require('axios').default;

export default function Dashboard() {

    const [cookies] = useCookies(['username']);
    const [apiData, setapiData] = useState([])    

    useEffect(() => {
        (cookies.username !== "undefined") && getData()
        async function getData() {
            console.log(cookies.username)
            await axios.post('http://localhost:8001/dashboardData', {
                username: cookies.username
            })
            .then(function (response) {
                setapiData(response.data)
            })
            .catch(function (error) {
                console.log(error.message)
            })
        }
    }, [cookies])

    return (
        <>
            <Row>
                <Col>
                    <SideNavbar />
                </Col>
                <Col xl={9}>
                    <Navbar page="Book" placeholder="Book ID, Name or Author"/>
                    <div className="mainContentContainer">
                        <h2>Welcome, {apiData.adminName} </h2>
                        <h6 style={{ color: "grey" }}>Dashboard</h6>
                        <div className={style.totalCards}>
                            <div className={style.tcard}>
                                <Row>
                                    <Col className={style.cardIconContainer}>
                                        <div>
                                            <IconContext.Provider value={{ color: "white", size: "28px" }}>
                                                <ImBooks />
                                            </IconContext.Provider>
                                        </div>
                                    </Col>
                                    <Col className={style.cardTextContainer}>
                                        <h2>{apiData.booksCount}</h2>
                                        <h6>Books</h6>
                                    </Col>
                                </Row>
                            </div>
                            <div className={style.tcard}>
                                <Row>
                                    <Col className={style.cardIconContainer}>
                                        <div style={{ backgroundColor: "#19AFFB" }}>
                                            <IconContext.Provider value={{ color: "white", size: "28px" }}>
                                                <FaUserGraduate />
                                            </IconContext.Provider>
                                        </div>
                                    </Col>
                                    <Col className={style.cardTextContainer}>
                                        <h2>{apiData.studentsCount}</h2>
                                        <h6>Students</h6>
                                    </Col>
                                </Row>
                            </div>
                            <div className={style.tcard}>
                                <Row>
                                    <Col className={style.cardIconContainer}>
                                        <div style={{ backgroundColor: "#F46841" }}>
                                            <IconContext.Provider value={{ color: "white", size: "28px" }}>
                                                <SiBookstack />
                                            </IconContext.Provider>
                                        </div>
                                    </Col>
                                    <Col className={style.cardTextContainer}>
                                        <h2>2</h2>
                                        <h6>On Rent</h6>
                                    </Col>
                                </Row>
                            </div>
                            <div className={style.tcard}>
                                <Row>
                                    <Col className={style.cardIconContainer}>
                                        <div style={{ backgroundColor: "#6E6BFA" }}>
                                            <IconContext.Provider value={{ color: "white", size: "28px" }}>
                                                <FaCoins />
                                            </IconContext.Provider>
                                        </div>
                                    </Col>
                                    <Col className={style.cardTextContainer}>
                                        <h2>$64</h2>
                                        <h6>Revenue</h6>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <Row>
                            <Col className={style.quickViewTablesCol} style={{ paddingRight: "10px" }}>
                                <div className={style.quickViewTables}>
                                    <div className={style.quickViewTablesHeader}>
                                        <h5>New Students</h5>
                                    </div>
                                    <div className={style.quickViewTableDiv}>
                                        <Table hover bordered>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Address</th>
                                                    <th>Username</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    apiData.student && apiData.student.map((student, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{student.sno}</td>
                                                                <td>{student.name}</td>
                                                                <td>{student.address}</td>
                                                                <td>@{student.username}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                            <Col className={style.quickViewTablesCol}>
                                <div className={style.quickViewTables}>
                                    <div className={style.quickViewTablesHeader}>
                                        <h5>Latest Books</h5>
                                    </div>
                                    <div className={style.quickViewTableDiv}>
                                        <Table hover bordered>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Title</th>
                                                    <th>Cost</th>
                                                    <th>Inventory</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    apiData.books && apiData.books.map((books, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{books.bid}</td>
                                                                <td>{books.name}</td>
                                                                <td>${books.cost}</td>
                                                                <td style={{ textAlign: "center" }}>{books.quantity}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Col className={style.quickViewTablesCol}>
                            <div className={style.quickViewTables}>
                                <div className={style.quickViewTablesHeader}>
                                    <h5>Last Activities (Top 10)</h5>
                                </div>
                                <div className={style.quickViewTableDiv}>
                                    <Table hover bordered>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Username</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td >Larry the Bird</td>
                                                <td >Larry the Bird</td>
                                                <td>@twitter</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </div>
                    <Footer/>
                </Col>

            </Row>
        </>
    )
}