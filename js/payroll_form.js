let isUpdate=false;
let employeePayrollObj={};

window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length==0){
            textError.textContent="";
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.value;
            textError.textContent="";
        }catch(e){
            textError.textContent=e;
        }
    });

const startdate = document.querySelector("#startDate");
startdate.addEventListener("input", function() {
let date = new Date(Date.parse(getInputValueById('#month') + " " + getInputValueById('#day') + " " + getInputValueById('#year')));
    try {
            (new EmployeePayrollData()).startDate = date;
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

const save = () => {
    console.log("inside save");
    try{
        let employeePayrollData=createEmployeePayroll();
        console.log(employeePayrollData);
        createAndUpdateLocalStorage(employeePayrollData);
        console.log("after local storage");
    }catch(e){
        console.log(e);
        return;
    }
}

function createAndUpdateLocalStorage(employeePayrollData){
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList==null){
        employeePayrollList=[];
    }
    if(employeePayrollData!=undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList=[employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayroll=()=>{
    let employeePayrollData=new EmployeePayrollData();
    employeePayrollData.id= createNewEmployeeId();
    employeePayrollData.name=getInputValueById('#name');
    employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary=getInputValueById('#salary');
    let date = getInputValueById('#month') + " " + getInputValueById('#day') + " " + getInputValueById('#year');
    employeePayrollData.startDate = new Date(date);
    employeePayrollData.note=getInputValueById('#notes');
    alert(employeePayrollData.toString());
    return employeePayrollData;
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