document.addEventListener("DOMContentLoaded", function (event) {
  const expenseForm = document.getElementById("expense-form");
  const expenseInput = document.getElementById("expense-name");

  const expenseAmountInput = document.getElementById("expense-amount");

  let expenseList = document.getElementById("expense-list");

  let totalExpense = document.getElementById("total-amount");

  let expenses = localStorage.getItem("savedExpenses");
  if (expenses) {
    try {
      expenses = JSON.parse(localStorage.getItem("savedExpenses"));
      renderExpense();
    } catch (error) {
      expenses = [];
    }
  }

  let totalAmount = calculateTotal();

  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const expenseName = expenseInput.value.trim();
    const expenseAmount = parseInt(expenseAmountInput.value);
    if (expenseAmount != "" && !isNaN(expenseAmount) && expenseAmount > 0) {
      const newExpense = {
        id: Date.now(),
        name: expenseName,
        amount: expenseAmount,
      };
      expenses.push(newExpense);

      saveExpense(expenses);
      expenseInput.value = "";
      expenseAmountInput.value = "";
      renderExpense();

      updateTotal();
    }
  });

  function saveExpense(expenses) {
    localStorage.setItem("savedExpenses", JSON.stringify(expenses));
  }

  function renderExpense() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");

      li.innerHTML = `<span>${expense.name} - $${expense.amount}</span><button data-id="${expense.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
    updateTotal();
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalExpense.textContent = totalAmount;
  }

  expenseList.addEventListener("click", function (event) {
    if (event.target.tagName == "BUTTON") {
      const expenseId = parseInt(event.target.getAttribute("data-id"));

      expenses = expenses.filter((expense) => expenseId !== expense.id);
      console.log(expenses);
      saveExpense();
      renderExpense();
      updateTotal();
    }
  });
});
