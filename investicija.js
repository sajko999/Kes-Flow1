let invest=JSON.parse(localStorage.getItem("invest"))|| [];
const investList=document.getElementById("investList");

// DODAVANJE INVESTICIJE 
function addInvest(name,amount){
    const newInvest={
        id: Date.now(),
        name:name,
        amount:Number(amount),
        month:getMonthKey()
    };
    invest.push(newInvest);
    localStorage.setItem("invest",JSON.stringify(invest));

    renderInvest();
}
// RENDER INVESTICIJE 
function renderInvest(){
    let activeMonth=localStorage.getItem("activeMonth")|| getMonthKey();
    let filterInvest=invest.filter(item=>item.month===activeMonth);
    investList.innerHTML="";

    filterInvest.forEach(e => {
        investList.innerHTML+=`<li>${e.name} - ${e.amount}  RSD</li>`;
    });
}
document.getElementById("investForm").addEventListener("submit",function (e){
    e.preventDefault();

    const name = document.getElementById("invName").value;
    const amount = document.getElementById("invAmount").value;
    if(!name || !amount){
        alert("Popuni sva polja!");
        return;
    }

    addInvest(name,amount);
    invest=JSON.parse(localStorage.getItem("invest"))|| [];
    this.reset();
})
renderInvest();