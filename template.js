function categoryColor(newTask) {
  let salesCategory;
  let itCategory;
  let productionCategory;
  let managementCategory;
  let designCategory;
  let marketingCategory;

  if (newTask.category === 'Sales') { // Sales (lightcoral)
    salesCategory = document.getElementsByClassName('category-task');
    return salesCategory[0].style.backgroundColor = '#f08080';
  } else if (newTask.category === 'IT') { // IT (lightblue)
    itCategory = document.getElementsByClassName('category-task'); 
    return itCategory[0].style.backgroundColor = '#add8e6';
  } else if (newTask.category === 'Production') { // Production (lightgreen)
    productionCategory = document.getElementsByClassName('category-task');
    return productionCategory[0].style.backgroundColor = '#90ee90';
  } else if (newTask.category === 'Management') { // Management (grey)
    managementCategory = document.getElementsByClassName('category-task');
    return managementCategory[0].style.backgroundColor = '#808080';
  } else if (newTask.category === 'Design') { // Design (orange)
    designCategory = document.getElementsByClassName('category-task');
    return designCategory[0].style.backgroundColor = '#ffa600';
  } else if (newTask.category === 'Marketing') {  // Marketing (yellow)
    marketingCategory = document.getElementsByClassName('category-task');
    return marketingCategory[0].style.backgroundColor = '#ffff00';
  }
}

function newTaskTemp(newTask) {
  return /*html*/ `
  <div class=' backlog-task-Container'>
    <div class='task-img-name-email '>
      <div class='category-task'>
        ${categoryColor(newTask)}
      </div>
      <div id="user_pic"></div>
      <div id="which_user"></div>
    </div>
    <div class='taskCategory'>
      <h5>${newTask.category}</h5>
    </div>
    <div class='taskDescription '>
      <p>${newTask.description}</p>
  </div>
     </div>
  `;
}