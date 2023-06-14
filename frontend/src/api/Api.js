import { getToken } from "../constant/Constant"
import { ApiRoute } from "../routes/ApiRoutes"
import { API_URL } from "./Url"

export const signup = async (signup_data)=>{
    const postHeader = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
        ,
        body:JSON.stringify(signup_data)
    }
    const response = await fetch(`${API_URL.AUTH_URL}${ApiRoute.auth_signup}`,postHeader)
    return await response.json();
}

export const login = async (login_data)=>{
    const postHeader = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
        ,
        body:JSON.stringify(login_data)
    }
    const response = await fetch(`${API_URL.AUTH_URL}${ApiRoute.auth_login}`,postHeader)
    return await response.json();
}

export const getEmployeeByCatgry = async(data)=>
{
    const postheader = {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${getToken()}`
        }
    }
    const response = await fetch(`${API_URL.Admin_URL}${ApiRoute.get_emp_category}?category=${data.category}&location=${data.location}`,postheader)

    return await response.json();
}   

export const getEmployeeByDept= async(data)=>
{
    const postheader = {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${getToken()}`
        }
    }
    const response = await fetch(`${API_URL.Admin_URL}${ApiRoute.get_emp_dept}?dept=${data.department}&currPage=${data.currPage}`,postheader)

    return await response.json();
}   

export const  getSingleEmployee = async(id)=>
{
    const postheader = {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${getToken()}`
        }
    }
    const response = await fetch(`${API_URL.Admin_URL}${ApiRoute.single_employee}?id=${id}`,postheader)

    return await response.json();
}

export const addEmployee =  async (add_data)=> {
    const postheader = {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${getToken()}`
        }
        ,
        body:JSON.stringify(add_data)
    }
    const response = await fetch(`${API_URL.Admin_URL}${ApiRoute.add_employee}`,postheader)
    return await response.json();
}

export const deleteEmployee =  async (id)=> {
    const postheader = {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${getToken()}`
        },
    }
    const response = await fetch(`${API_URL.Admin_URL}${ApiRoute.delete_employee}?id=${id}`,postheader)

    return await response.json();
}

export const updateEmployee =  async (data)=> {
    const postheader = {
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${getToken()}`
        }
        ,
        body:JSON.stringify(data)
    }
    const response = await fetch(`${API_URL.Admin_URL}${ApiRoute.update_employee}`,postheader)
    //console.log(data)
    //  console.log(`${API_URL.EMPLOYEE_URL}${ApiRoute.update_employee}`,postheader)
    return await response.json();
}

export const getUnassignEmployee =  async ()=> {
    const postheader = {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${getToken()}`
        }
    }
    const response = await fetch(`${API_URL.Admin_URL}${ApiRoute.get_unassign_emp}`,postheader)
    return await response.json();
}

export const getAllEmployee = async()=>{return true}
