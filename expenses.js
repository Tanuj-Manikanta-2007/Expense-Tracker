let trackerList = JSON.parse(localStorage.getItem('trackerList')) || [];


function renderExpense() {
  let expenseHtml = '';
  let sumn = 0;
  trackerList.forEach((item, index) => {
    const name = item.itemName;
    const price = Number(item.itemPrice);
    const quantity = Number(item.itemQuantity);
    const total = price * quantity;
    sumn += total;
    expenseHtml += `
    <div> ${name} </div>
    <div> ₹${price}</div> 
    <div> ₹${price} * ${quantity} = ₹${total}</div>
    <div > <button onclick = "deleteItem(${index})" class ="delete-button"> Delete </button> </div>
    `
  });
  document.querySelector('.expense').innerHTML = `<div> <h3> THE EXPENSENCE = ${sumn} </h3> </div>`;
  document.querySelector('.output').innerHTML = expenseHtml;
}

function Add() {
  const elementName = document.querySelector('.iname');
  const elementPrice = document.querySelector('.iprice');
  const elementQuantity = document.querySelector('.iquantity');
  
  const itemName = elementName.value.trim()
  const itemPrice = parseFloat(elementPrice.value);
  const itemQuantity = parseInt(elementQuantity.value);
  if (!itemName || isNaN(itemPrice)) {
    alert("Please enter a valid name and price.");
    return;
  }
  
  if (isNaN(itemQuantity) || itemQuantity <= 0) {
    itemQuantity = 1;
  }
  const item = {
    itemName : itemName,
    itemPrice : itemPrice,
    itemQuantity : itemQuantity
  };
  
  trackerList.push(item);
  localStorage.setItem('trackerList',JSON.stringify(trackerList));
  renderExpense();

  elementName.value = '';
  elementPrice.value = '';
  elementQuantity.value = '';
}

function deleteItem(index) {
  trackerList.splice(index,1);
  localStorage.setItem('trackerList',JSON.stringify(trackerList));
  renderExpense();
}
function clearAll() {
  if (trackerList.length === 0) {
    alert("There are no items to clear!");
    return;
  }

  const confirmClear = confirm("Are you sure you want to clear all items?");
  if (confirmClear) {
    trackerList = [];
    localStorage.removeItem('trackerList');
    renderExpense();
  }
}


renderExpense();