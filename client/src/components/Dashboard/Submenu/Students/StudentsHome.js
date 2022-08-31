import { Table } from "react-bootstrap"
import Navbar from "../../../Navbars/Navbar"
import SideNavbar from "../../../Navbars/SideNavbar"
import { Row, Col } from 'react-bootstrap'
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

export default function StudentsHome() {

    const [students, setStudents] = useState([])

    useEffect(() => {
        axios.post('http://localhost:8001/students')
            .then(function (response) {
                setStudents(response.data)
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
                    <Navbar page="Student" />
                    <div className="mainContentContainer">
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
                                {
                                    students.map((student) => {
                                        return (
                                            <tr key={student.sno}>
                                                <td>{student.sno}</td>
                                                <td>{student.name}</td>
                                                <td>{student.username}</td>
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