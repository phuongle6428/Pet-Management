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
        <td><button type="button" class="btn btn-warning" onclick="editPet(event,'${item.id}')">Edit</button>
        </td>
      </tr>
    `
  })
}
renderTableData(petsData)
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
renderOption(document.getElementById("input-type").value)
// Trigger when select type
document.getElementById("input-type").addEventListener("change", function(e){
  renderOption(e.currentTarget.value)
})
// edit pet
const editPet = (e,id) => {
  e.preventDefault();
  document.getElementById("container-form").classList.remove("hide")
  let inputData = []
  const [...inputDCollection] = document.getElementsByClassName("form-control")
  const [...inputCCollection] = document.getElementsByClassName("custom-control-input")
  inputData = [...inputDCollection,...inputCCollection];
  const keyArray = ["id", "name", "age", "type", "weight", "length", "color", "breed","vaccinated","dewormed","sterilized"]
  let inputKey = keyArray.reduce((prev,current,index)=>{
    prev[current] = inputData[index]
    return prev
  }, {})
  let petData = {}
  for( let i = 0; i < petsData.length; i++){
    if(petsData[i].id === id){
      petData = petsData[i];
      break;
    }
  }
  for ( let key in inputKey){
    if(inputKey[key].type == "checkbox"){
      inputKey[key].checked = petData[key]
    } else inputKey[key].value = petData[key]
  }
  // submit click
  const submitClick = (event) => {
    event.preventDefault()
    for(let key in inputKey){
      if(inputKey[key].type == "checkbox"){
        petData[key] = inputKey[key].checked
      } else {
        petData[key] = inputKey[key].value
      }
    }
    // luu du lieu vao local storage
    saveToStorage(petsData)
    //render lai du lieu
    renderTableData(petsData)
    // 
    document.getElementsByTagName("form")[0].reset()
    document.getElementById("container-form").classList.add("hide")
    document.getElementById("submit-btn").removeEventListener("click",submitClick)
  }
  document.getElementById("submit-btn").addEventListener("click", submitClick)
}
