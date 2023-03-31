'use strict';
const petsData = getFromStorage()
function renderTableData(petArr) {
  let dataTable = document.getElementById("tbody")
  dataTable.innerHTML = ""
  petArr.forEach(item => {
    let myDate = new Date(item.date)
    dataTable.innerHTML += `
      <tr>
        <th scope="row">P00${item.id}</th>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.type}</td>
        <td>${item.weight} kg</td>
        <td>${item.length} cm</td>
        <td>${item.breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${item.color}"></i>
        </td>
        <td><i class="bi bi-${item.vaccinated ? "check" : "x"}-circle-fill"></i></td>
        <td><i class="bi bi-${item.dewormed ? "check" : "x"}-circle-fill"></i></td>
        <td><i class="bi bi-${item.sterilized ? "check" : "x"}-circle-fill"></i></td>
        <td>${myDate.getDate()}/${myDate.getMonth()+1}/${myDate.getFullYear()}</td>
      </tr>
    `
  })
}
renderTableData(petsData)
renderOption(document.getElementById("input-type").value)
// find pet
const findPets = (e) => {
  e.preventDefault();
  let inputData = []
  let inputKey = {}
  const [...inputDCollection] = document.getElementsByClassName("form-control")
  const [...inputCCollection] = document.getElementsByClassName("custom-control-input")
  inputDCollection.forEach(item => {
    inputData.push(item.value)
  })
  inputCCollection.forEach(item => {
    inputData.push(item.checked)
  })
  const keyArray = ["id", "name", "type","breed","vaccinated","dewormed","sterilized"]
  inputData.forEach((item,index) => {
    if(item){
      inputKey[keyArray[index]] = item
    }
  })
  let resultPets = petsData.filter(item => {
    let result = true
    for ( let key in inputKey){
      if(inputKey[key] !== item[key]){
        result = false
      } 
    }
    return result
  })
  renderTableData(resultPets)
}

document.getElementById("find-btn").addEventListener("click", findPets)
// Render option
function renderOption(key){
  const breedsOption = getBreedStorage()
  let options = []
  if(!key) {
    let duplicateOption = []
    breedsOption.forEach(item => {
      duplicateOption.push(...item.breeds)
    })
    options = [...new Set(duplicateOption)]
  } else {
    for(let i = 0; i < breedsOption.length; i++){
      if(breedsOption[i].type == key){
        options = [...breedsOption[i].breeds]
      }
    }
  }
  document.getElementById("input-breed").innerHTML = `<option value="">Select Breed</option>`
  options.forEach(item => {
    document.getElementById("input-breed").innerHTML += `<option>${item}</option>`
  })
}
// Trigger when select type
document.getElementById("input-type").addEventListener("change", function(e){
  renderOption(e.currentTarget.value)
})