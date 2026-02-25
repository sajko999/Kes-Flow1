let invest=JSON.parse(localStorage.getItem("invest")) || [];
let expenses=JSON.parse(localStorage.getItem("expenses")) || [];

let activeMonth=localStorage.getItem("activeMonth") || getMonthKey();
// ELEMENTI
const monthEl=document.getElementById("currentMonth");
const totalEl=document.getElementById("total");
const listEl=document.getElementById("expensesList")
const warningEl=document.getElementById("investmentWarning");


// DODAVANJE RASHODA 
function addExpense(name,amount,category){
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const newExpense = { 
    id: Date.now(),
    name,
    amount: Number(amount),
    category,
    month: activeMonth
  };
   expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}


document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (!name || !amount || !category) {
    alert("Popuni sva polja");
    return;
  }
  addExpense(name, amount, category);

  expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  this.reset();
  renderExpenses();
  renderCategoryPercentages();
  console.log("Rashod dodat");
console.log(JSON.parse(localStorage.getItem("expenses")));

});
// PROMENA MESECA 
function changeMonth(direction){
       const [y,m]=activeMonth.split("-").map(Number);
       const date=new Date(y,m-1+direction,1);
       activeMonth=getMonthKey(date);

       localStorage.setItem("activeMonth", activeMonth);
       renderExpenses();
       renderCategoryPercentages(); 
}
// RENDER RASHODA
function renderExpenses(){
    monthEl.textContent=formatMonth(activeMonth);
    
    const monthlyExpenses=expenses.filter(e=>e.month === activeMonth);
    let total=0;
    listEl.innerHTML="";
    monthlyExpenses.forEach(e=>{
         total+=e.amount;
    listEl.innerHTML+=`<li> ${e.name} - ${e.amount}  RSD</li>`;
    });
    totalEl.textContent=total;
    renderInvestmentWarning();
}

// INVESTMENT Warning 
function renderInvestmentWarning(){
  const count=invest.filter(i=>i.month===activeMonth).length;
  warningEl.textContent=count<3
  ? warningEl.textContent=`Uneto ${count}/3 investicije ovog meseca`
  : warningEl.textContent="Investicioni cilj dostignut";
}
// KATEGORIJE 
const CATEGORIES = [
  "Hrana",
  "Piće",
  "Trening",
  "Prevoz",
  "Računi",
  "Izlasci",
  "Kupovina",
  "Ostalo"
];
// SABIRANJE PO KATEGORIJAMA 
function calculateCategoryTotals(month=activeMonth) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const monthlyExpenses = expenses.filter(e => e.month === month);
  const totals = {};

  monthlyExpenses.forEach(exp => {
    if (!totals[exp.category]) {
      totals[exp.category] = 0;
    }
    totals[exp.category] += Number(exp.amount);
  });

  return totals;
}

function getCurrentMonth() {
  return activeMonth;
}

function getMonthlyExpenses() {
  
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const currentMonth = getCurrentMonth();

  return expenses.filter(e => e.month === currentMonth);
}

// PRIKAZ U PROCENTIMA 
function renderCategoryPercentages() {
  const container = document.getElementById("categoryList");
  container.innerHTML = "";

  const totals = calculateCategoryTotals();
  const totalSpent = Object.values(totals).reduce((a, b) => a + b, 0);

  if (totalSpent === 0) {
    container.innerHTML = "<p>Nema rashoda za ovaj mesec</p>";
    return;
  }

  Object.keys(totals).forEach(category => {
    const percent = ((totals[category] / totalSpent) * 100).toFixed(1);

    const item = document.createElement("div");
    item.className = "category-item";

    item.innerHTML = `
      <div class="category-header">
        <span>${category}</span>
        <span>${percent}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
    `;

    container.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryPercentages();
});

renderExpenses();


