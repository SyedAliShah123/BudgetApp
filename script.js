let expenses = [];
let totalAmount = 0;
//---->
const totalBudget = document.getElementById("totalBudget");
const showBudget = document.getElementById("Total-Budget");
//--->
const categorySelect = document.getElementById("select-category");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("Date-input");
const addbtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("Expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

addbtn.addEventListener("click", function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === "") {
        alert("Please select a category");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid number");
        return;
    }
    if (date === "") {
        alert("Please select a date");
        return;
    }

    expenses.push({ category, amount, date });
   
    showBudget.innerHTML =  totalBudget.value;
 
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function() {
        const index = expenses.findIndex(expense => expense.date === dateCell.textContent);
        const expense = expenses[index];
        expenses.splice(index, 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);

        updateTable(); 
    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

    updateTable(); 
});

function updateTable() {
    expensesTableBody.innerHTML = "";

    for (const expense of expenses) {
    
        const remainingBalance = totalBudget.value - totalAmount;
        const balance = document.getElementById("Remaining-Balance");
        balance.innerHTML = +remainingBalance;
//____>
        const newRow = expensesTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            const index = expenses.findIndex(item => item.date === dateCell.textContent);
            const expense = expenses[index];
            expenses.splice(index, 1);

            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;

            expensesTableBody.removeChild(newRow);

            updateTable(); 
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    }
}

updateTable();
  
