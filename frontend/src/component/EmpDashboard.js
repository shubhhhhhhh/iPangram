import { useEffect, useState } from "react"
import { getSingleEmployee } from "../api/Api";
import { Container, Navbar ,Table} from "react-bootstrap";

export default function EmpDashboard() {
    const [data,setData] = useState();
    useEffect(()=>{
        // console.log(sessionStorage.getItem("idinfo"))
        getSingleEmployee(JSON.parse(sessionStorage.getItem("idinfo"))).then(res=>{
            // console.log(res)
            setData(res.body[0])
        })
    },[])


    return (
        <>
            <Navbar>
                <Container>
                    <Table striped="columns">
                        <thead>
                            <tr>
                                <th>DEPARTMENT</th>
                                <th>CATEGORY</th>
                                <th>LOCATION</th>
                                <th>SALARY</th>
                                <th>EMPLOYEE ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                            </tr>
                        </thead>
                        <tbody>
                                    {data && <tr >
                                        <td>{data.department}</td>
                                        <td>{data.category}</td>
                                        <td>{data.location}</td>
                                        <td>{data.salary}</td>
                                        <td>{data.emplyId}</td>
                                        <td>{data.personalData.firstName + data.personalData.lastName}</td>
                                        <td>{data.personalData.email}</td>
                                        <td>{data.personalData.role}</td>
                                    </tr>}
                        </tbody>
                    </Table>
                </Container>
            </Navbar>
        </>
    )
}