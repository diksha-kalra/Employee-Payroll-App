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

    // const startdate = document.querySelector("#startDate");
    // const day = document.querySelector("#day");
    // const month = document.querySelector("#month");
    // const year = document.querySelector("#year");
    // const dateError = document.querySelector(".date-error");
    // startdate.addEventListener("input", function() {
    //     try {
    //         new EmployeePayrollData().startDate = new Date(
    //             Date.UTC(month.value - 1, day.value,year.value));
    //         dateError.textContent = "";
    //     } catch (e) {
    //         dateError.textContent = e;
    //     }
    // });

    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input', function(){
        output.textContent=salary.value;
    });

    // const startDate=document.querySelector("#startDate");
    // let date=getInputValueById("#day")+" "+getInputValueById("#month")+" "+getInputValueById("#year");
    // const dateError=document.querySelector('.date-error');
    // startDate.addEventListener("input", function(){
    //     try{
    //         new EmployeePayrollData().date=Date.parse(date);
    //         dateError.textContent="";
    //     }catch(e){
    //         dateError.textContent=e;
    //     }
    // });
});

// const save = () => {
//     try {
//         let employeePayrollData = createEmployeePayroll();
//     } catch (e) {
//         return;
//     }
// }
// const createEmployeePayroll = () => {
//     let employeePayrollData = new EmployeePayroll();
//     try{
//         employeePayrollData.name = getInputValueById('#name');
//     }catch(e){
//         setTextValue('.text-error',e);
//         throw e;
//     }
//     employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
//     employeePayrollData.department = getSelectedValues('[name=department]');
//     employeePayrollData.salary = getInputValueById('#salary');
//     let date = getInputValueById('#day') + "" + getInputValueById('#month') + "" + getInputValueById('#year');
//     employeePayrollData.startDate=Date.parse(date);
//     alert(employeePayrollData.toString());
//     return employeePayrollData;
//}


save = () => {
    let employeePayrollData=new EmployeePayrollData();
    try{
        employeePayrollData.name=getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    empDept=document.querySelectorAll('.checkbox:checked');
    let empDeptValues=[];
    for(let i=0;i<empDept.length;i++){
        if(empDept[i].checked){
            empDeptValues.push(empDept[i].value);
        }
    }
    employeePayrollData.department=empDeptValues;
    employeePayrollData.salary=getInputValueById('#salary');
    let day = document.querySelector('#day').value;
    let month = document.querySelector('#month').value;
    let year = document.querySelector('#year').value;
    let startDate = new Date(year, month-1, day);
    employeePayrollData.startDate=startDate;
    employeePayrollData.note=getInputValueById('#notes');
    alert(employeePayrollData.toString());
}

