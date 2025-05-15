// Array to store expenses
let expenses = [];

// Function to add a new expense
function addExpense() {
    const categoryInput = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    
    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);
    
    if (!category || isNaN(amount) || amount < 0) {
        alert('Please enter valid category and amount');
        return;
    }
    
    const expense = {
        category: category,
        amount: amount
    };
    
    expenses.push(expense);
    updateExpensesList();
    
    // Clear inputs
    categoryInput.value = '';
    amountInput.value = '';
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesList();
}

// Function to update the expenses list in the UI
function updateExpensesList() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <span>${expense.category}: $${expense.amount.toFixed(2)}</span>
            <button onclick="deleteExpense(${index})" class="btn delete-btn">Delete</button>
        `;
        expensesList.appendChild(expenseItem);
    });
}

// Function to calculate statistics
function calculateStats() {
    // Calculate total amount
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalAmount').textContent = `Total Amount: $${total.toFixed(2)}`;
    
    // Calculate average daily expense
    const averageDaily = total / 30;
    document.getElementById('averageDaily').textContent = 
        `Average Daily Expense: $${averageDaily.toFixed(2)}`;
    
    // Find top 3 expenses
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);
    
    const topExpensesList = document.getElementById('topExpensesList');
    topExpensesList.innerHTML = '';
    
    topExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount.toFixed(2)}`;
        topExpensesList.appendChild(li);
    });
} 