document.addEventListener("DOMContentLoaded", function (event) {
  let storedExpense = localStorage.getItem("expense");
  let expenses = [];

  if (storedExpense) {
    try {
      expenses = JSON.parse(storedExpense);
    } catch (e) {
      console.error("Failed to parse expense data:", e);
      expenses = [];
    }
  }

  const expenseForm = document.getElementById("expense-form");
  const expenseInput = document.getElementById("expense-name");

  const expenseAmountInput = document.getElementById("expense-amount");

  let expenseList = document.getElementById("expense-list");

  let totalExpense = document.getElementById("total-amount");

  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const expenseName = expenseInput.value.trim();
    const expenseAmount = parseInt(expenseAmountInput.value);
    if (expenseAmount != "" && !isNaN(expenseAmount) && expenseAmount > 0) {
      const newExpense = {
        id: Date.now,
        name: expenseName,
        amount: expenseAmount,
      };
      expenses.push(newExpense);
      const li = document.createElement("li");
      li.classList.add("data-id");
      li.innerHTML = `<span>${expenseName} - ${expenseAmount}</span>`;
      expenseList.appendChild(li);

      saveExpense(expenses);
    }
  });

  renderExpense();
  function saveExpense(expenses) {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }

  function renderExpense() {
    console.log(storedExpense);

    storedExpense.forEach((expense) => {
      const li = document.createElement("li");
      li.classList.add("data-id");
      li.innerHTML = `<span>${expense.name} - ${expense.amount}</span>`;
      expenseList.appendChild(li);
    });
  }
});
