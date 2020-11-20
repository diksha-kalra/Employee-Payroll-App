let isUpdate=false;
let employeePayrollObj={};

let site_properties={
    home_page: "../pages/home.html",
    add_employee_payroll_page: "../pages/payrollform.html"
};

window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector('#name');
    name.addEventListener('input',function(){
        if(name.value.length==0){
            setTextValue('.text-error',"");
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.value;
            setTextValue('.text-error',"");
        }catch(e){
            setTextValue('.text-error',e);
        }
    });

    const startdate = document.querySelector("#startDate");
    startdate.addEventListener("input", function() {
    let date = new Date(Date.parse(getInputValueById('#month') + " " + getInputValueById('#day') + " " + getInputValueById('#year')));
        try {
                (new EmployeePayrollData()).startDate = new Date(Date.parse(date));
                setTextValue('.date-error', "");
        } catch (e) {
                setTextValue('.date-error', e);
        }
    });

    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input', function(){
    output.textContent=salary.value;
    });

    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateLocalStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    }
}

function createAndUpdateLocalStorage(){
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList==null){
        employeePayrollList=[];
    }
    if(employeePayrollList){
        let employeePayrollData=employeePayrollList.find(empData=>empData._id==employeePayrollObj._id);
        if(!employeePayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        }else{
            const index=employeePayrollList.map(empData=>empData._id).indexOf(employeePayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayrollData(employeePayrollData._id));
        }
    }else{
        employeePayrollList=[createEmployeePayrollData()];
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const setEmployeePayrollObject=()=>{
    employeePayrollObj._name=getInputValueById('#name');
    employeePayrollObj._profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender=getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary=getInputValueById('#salary');
    let date = getInputValueById('#month') + " " + getInputValueById('#day') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = new Date(date);
    employeePayrollObj._note=getInputValueById('#notes');
}

const createEmployeePayrollData=(id)=>{
    let employeePayrollData=new EmployeePayrollData();
    if(!id) employeePayrollData.id=createNewEmployeeId();
    else employeePayrollData.id=id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData=(employeePayrollData)=>{
    try{
        employeePayrollData.name=employeePayrollObj._name;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=employeePayrollObj._profilePic;
    employeePayrollData.gender=employeePayrollObj._gender;
    employeePayrollData.department=employeePayrollObj._department;
    employeePayrollData.salary=employeePayrollObj._salary;
    employeePayrollData.note=employeePayrollObj._note;
    try{
        employeePayrollData.startDate=new Date(Date.parse(employeePayrollObj._startDate));
    }catch(e){
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}

const getSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItems.forEach(item=>{
        if(item.checked) 
        selItems.push(item.value);
    });
    return selItems;
}

const createNewEmployeeId=()=>{
    let empID=localStorage.getItem("EmployeeID");
    empID=!empID ?1: (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}

const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-IN', options);
    return newDate;
}

const resetForm=()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const setSelectedIndex=(id,index)=>{
    const element=document.querySelector(id);
    element.selectedIndex=index;
}

const unsetSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked=false;
    });
}

const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}

const setTextValue=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
}

const checkForUpdate=()=>{
    const employeePayrollJSON=localStorage.getItem('editEmp');
    isUpdate=employeePayrollJSON ? true : false;
    if(! isUpdate) return;
    employeePayrollObj=JSON.parse(employeePayrollJSON);
    setForm();
}

const setForm=()=>{
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date=stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

const setSelectedValues=(propertyValue, value)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked=true;
            }
        }
        else if (item.value==value){
            item.checked=true;
        }
    });
}