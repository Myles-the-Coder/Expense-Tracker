const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

//Add transaction
function addTransaction(e) {
  e.preventDefault()

  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter text and amount')
    // form.innerHTML = `
    // <div class="message-container" id="message">
    //       <h3>Please enter a text and amount</h3>
    //       <button class="btn close" id="btn close">X</button>
    //     </div>
    // `
    // const closeBtn = document.getElementById('btn close')
    // const message = document.getElementById('message')
    
    // if(closeBtn && message) {
    //   closeBtn.addEventListener('click', () => {
    //     message.classList.add('.close')
    //   })
    // }
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    }
   
    transactions.push(transaction)

    addTransactionDOM(transaction)

    updateValues()

    updateLocalStorage()

    text.value = ''
    amount.value = ''
  }
}

//Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000)
}

//Add transactions to DOM list
function addTransactionDOM(transaction) {
  //Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="btn delete" onclick="removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item)
}

//Update the balance, income, and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount)

  const total = (amounts.reduce((acc, item) => (acc += item), 0)).toFixed(2)

  const income = amounts
  .filter(transaction => transaction > 0)
  .reduce((acc, item) => (acc += item), 0).toFixed(2)

  const expense = (amounts
  .filter(transaction => transaction < 0)
  .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2)

  money_plus.innerText = '$' + income
  money_minus.innerText = '$' + expense
  balance.innerText = '$' + total
}

//Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id)

  updateLocalStorage()
  init()
}

//Close message
function closeMessage() {
  const message = document.getElementById('message')

  message.style.opacity = 0
}

//Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

//Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM)
  updateValues()
}

init()

form.addEventListener('submit', addTransaction)