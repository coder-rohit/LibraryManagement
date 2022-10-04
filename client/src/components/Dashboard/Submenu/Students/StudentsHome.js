import { Table } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import style from "../../../../moduleCSS/BookHome.module.css"

export default function StudentsHome() {

    const [students, setStudents] = useState([])

    useEffect(() => {
        axios.post('http://localhost:8001/students')
            .then(function (response) {
                setStudents(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <SideNavbar />
                </Col>
                <Col xl={9}>
                    <Navbar page="Student" placeholder="Student ID or Name"/>
                    <div className="mainContentContainer">
                    <div className={style.filterBar}>
                            <div className={style.filterBarInfo}>
                                <p>STUDENTS </p>
                                <p> ({students.length} Students Found)</p>
                            </div>
                            <div className={style.bookFilter}>
                                <select name="" id="">
                                    <option value="High">Latest First</option>
                                    <option defaultValue value="Low">Oldest First</option>
                                </select>
                                <input type="text" placeholder="Search Names" />
                            </div>

                        </div>
                        <Table hover bordered className="mt-3">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Username</th>
                                    <th>Books</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((student) => {
                                        return (
                                            <tr key={student.sno}>
                                                <td>{student.sno}</td>
                                                <td>{student.name}</td>
                                                <td>{student.username}</td>
                                                <td>{
                                                    
                                                    }</td>
                                                <td>{student.address}</td>
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