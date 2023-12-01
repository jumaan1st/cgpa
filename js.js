let sgpa = [-1, -1, -1, -1, -1, -1, -1, -1];
let cgpa = 0;
const calculate = (marks, credit, sem) => {
    let numerator = 0, denominator = 0;
    for (let i = 0; i < marks.length; i++) {
        let grade = (marks[i] == 100) ? 10 : Math.floor((marks[i] / 10) + 1)
        numerator += grade * credit[i];
        denominator += credit[i];
    }
    sgpa[sem - 1] = Math.round((numerator / denominator) * 100) / 100;
    update();
}
const update = () => {
    let numerator = 0, denominator = 0;
    for (let i = 0; i < 8; i++) {
        if (sgpa[i] != -1) {
            numerator += sgpa[i];
            denominator++;
        }
    }
    cgpa = (numerator / denominator).toFixed(2)
}
const showcredit=(sem)=>{
    let element=document.getElementById(`sgpa-${sem}`);
    let check=element.getAttribute("class").split(" ")
    if(!check.includes("visible")){
        element.classList.add("visible")
    }
}
const formdata = (sem, subs) => {
    let marks = [], credits = [];
    for (let i = 1; i <= subs; i++) {
        let formId = `form-${sem}`;
        let credit = parseFloat(document.getElementById(`${formId}`).elements[`${sem}-sub-${i}-credits`].value);
        let mark = parseFloat(document.getElementById(`${formId}`).elements[`${sem}-sub-${i}-marks`].value);
        credits.push(credit);
        marks.push(mark);
    }
    calculate(marks,credits,sem);
    document.getElementById("cgpa").innerHTML=`CGPA: ${cgpa}`;
    document.getElementById(`sgpa-${sem}`).innerHTML=`SGPA: ${sgpa[sem-1]}`;
    showcredit(sem);
}
