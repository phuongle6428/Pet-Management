'use strict';
const dataTable = getBreedStorage()
const renderBreed = () => {
  let renderBreedTable = document.getElementById("tbody")
  renderBreedTable.innerHTML = ""
  let i = 1
  console.log(dataTable)
  dataTable.forEach(item => {
    item.breeds.forEach(value => {
      renderBreedTable.innerHTML += `
        <tr>
          <th scope="row">${i++}</th>
          <td>${value}</td>
          <td>${item.type}</td>
          <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${item.type}','${value}')">Delete</button>
          </td>
        </tr>
      `
    })
  })
}
renderBreed()
const deleteBreed = (type,value) => {
  dataTable.forEach(item => {
    if( item.type == type) {
      const newarr = item.breeds.filter((breed)=> {
        if(breed === value) {
          return false
        } else return true
      })
      item.breeds = [...newarr]
    }
  })
  saveBreedStorage(dataTable)
  renderBreed()
}
// Add breed

const addBreed = (e) => {
  e.preventDefault();
  const breedName = document.getElementById("input-breed")
  const animalType = document.getElementById("input-type")
  const newBreed = {
    type: animalType.value,
    breed: breedName.value
  }
  if(!animalType.value){
    alert("Please select type")
    return
  }
  if(!breedName.value){
    alert("Please enter breed name")
    return
  }
  dataTable.forEach(item => {
    if( item.type == newBreed.type) {
      item.breeds.push(newBreed.breed)
    }
  })
  saveBreedStorage(dataTable)
  renderBreed()
}
document.getElementById("submit-btn").addEventListener("click", addBreed)