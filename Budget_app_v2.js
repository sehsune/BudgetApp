//  BUDGET HEADER ElEMENTS :

const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");

const expenseEl = document.querySelector(".budget-dashboard #expense");
const incomeEl = document.getElementById("income");


const expe = document.getElementById("expe");
const expenseList = document.querySelector("#expense .list");
const incomeList = document.querySelector("#income .list");

const dash = document.querySelector(".dash-title");


const bob = document.getElementById("bob");

// DASHBOARD ELEMENTS
//SELECT BUTTONS 
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

//INPUT BUTTONS
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");
const addIncome = document.querySelector(".add-income");
const addExpense = document.querySelector(".add-expense");
const deletke = document.querySelector("entry .deletke");

// LISTS TOGGLE

expenseBtn.addEventListener("click", function () {
    console.log("elo");
    active(expenseBtn);
    color(expenseBtn);
    uncolor(incomeBtn);
    inactive(incomeBtn);
    show(expenseEl);
    hide(incomeEl);



})

incomeBtn.addEventListener("click", function () {
    console.log("siema")
    active(incomeBtn);
    color(incomeBtn);
    uncolor(expenseBtn);
    inactive(expenseBtn);
    show(incomeEl);
    hide(expenseEl);

})



function color(element) {
    element.classList.add("colorq")
}
function uncolor(element) {
    element.classList.remove("colorq")
}

function active(element) {
    element.classList.add("active")
}

function show(element) {
    element.classList.remove("hide")
}

function hide(element) {
    element.classList.add("hide")
}

function inactive(element) {
    element.classList.add("show")
}

// ADD EXPENSE/ INCOME TO LIST 

let ENTRY_LIST = [];

function clearInput(InputsArray) {
    InputsArray.forEach(input => {
        input.value = "";
    })
}



function updateUI() {
    income = calculateTotal("income", ENTRY_LIST);
    outcome = calculateTotal("expense", ENTRY_LIST);
    balance = income - outcome;

    incomeTotalEl.textContent = (income);
    outcomeTotalEl.textContent = (outcome);
    balanceEl.textContent = (balance);
    clearElement([expenseList, incomeList]);

    ENTRY_LIST.forEach((entry, index) => {
        if (entry.type == "expense") {
            showEntry(expenseList, entry.type, entry.title, entry.amount, index)
        } else if (entry.type == "income") {
            showEntry(incomeList, entry.type, entry.title, entry.amount, index)
        }

    });
}

function showEntry(list, type, title, amount, id) {

    const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: ${amount} zł    <button>Delete</button></div>
                    </li>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}







function calculateTotal(type, ENTRY_LIST) {
    let sum = 0;

    ENTRY_LIST.forEach(entry => {
        if (entry.type == type) {
            sum += entry.amount;
        }
    })

    return sum;
}
function calculateBalance(income, outcome) {
    return income - outcome;
}


function clearElement(elements) {
    elements.forEach(element => {
        element.innerHTML = "";
    })
}




addIncome.addEventListener("click", function () {
    if (!incomeTitle.value || !incomeAmount) return;

    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value),
    }

    ENTRY_LIST.push(income);
    console.log(ENTRY_LIST);

    updateUI();
    clearInput([incomeTitle, incomeAmount]);

})

addExpense.addEventListener("click", function () {
    if (!expenseTitle.value || !expenseAmount.value) return;

    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseInt(expenseAmount.value)
    }
    ENTRY_LIST.push(expense);
    console.log(ENTRY_LIST);

    updateUI();
    clearInput([expenseTitle, expenseAmount])
})

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);

function deleteOrEdit(event) {
    const targetBtn = event.target;

    const entry = targetBtn.parentNode;

    deleteEntry(entry);

}



function deleteEntry(entry) {
    ENTRY_LIST.splice(entry.id, 1);

    updateUI();
}