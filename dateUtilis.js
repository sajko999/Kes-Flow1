// utils/dateUtils.js
function getMonthKey(date = new Date()){
return `${date.getFullYear()}-${String(
date.getMonth() + 1
).padStart(2, "0")}`;
}

function formatMonth(monthKey){
const [y, m] = monthKey.split("-");
return new Date(y, m - 1).toLocaleString("sr-Latn-RS", {
month: "long",
year: "numeric",
});
}