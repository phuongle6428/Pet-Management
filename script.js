'use strict';
let pets = getFromStorage() || [];
let bmiShow = false
const getEle = (selector) => {
  return document.getElementById(selector)
}
// first render
renderTableData(pets)
renderOption(document.getElementById("input-type").value)
// 
const petInput = {
  id: getEle("input-id"),
  name: getEle("input-name"),
  age: getEle("input-age"),
  type: getEle("input-type"),
  weight: getEle("input-weight"),
  length: getEle("input-length"),
  color: getEle("input-color-1"),
  breed: getEle("input-breed"),
  vaccinated: getEle("input-vaccinated"),
  dewormed: getEle("input-dewormed"),
  sterilized: getEle("input-sterilized"),
}
// Validate
const checkValidate = (input, ...param) => {
  const mess = []
  param.forEach((item) => {
    const spanText = item.func(...item.arg)
    if (spanText) {
      mess.push(spanText)
    }
  })
  mess.forEach(item => {
    input.nextElementSibling.appendChild(item)
  })
}
const validate = {
  require: function (item) {
    if (item.value === "") {
      const spanNode = document.createElement("span")
      const spanText = document.createTextNode("Missing value")
      spanNode.appendChild(spanText)
      return spanNode
    }
  },
  checkId: function (item) {
    let result = pets.every(value => {
      if (value.id == item.value) {
        return false
      } else return true
    })
    if(!result){
      const spanNode = document.createElement("span")
      const spanText = document.createTextNode("ID must unique!")
      spanNode.appendChild(spanText)
      return spanNode
    }
  },
  between: function (item, min, max) {
    if (!item.value) {
      return null
    }
    if (!(item.value > min && item.value < max)) {
      const spanNode = document.createElement("span")
      const spanText = document.createTextNode(` ${item.name} must be between ${min} and ${max}!`)
      spanNode.appendChild(spanText)
      return spanNode
    }
  },
  choose: function (item) {
    if (!item.value) {
      const spanNode = document.createElement("span")
      const spanText = document.createTextNode(` Please select ${item.name}!`)
      spanNode.appendChild(spanText)
      return spanNode
    }
  },
}
const getValidate = (item) => {
  checkValidate(item.id, { func: validate.require, arg: [item.id] }, { func: validate.checkId, arg: [item.id] });
  checkValidate(item.name, { func: validate.require, arg: [item.name] },);
  checkValidate(item.age, { func: validate.require, arg: [item.age] }, { func: validate.between, arg: [item.age, 1, 15] });
  checkValidate(item.type, { func: validate.choose, arg: [item.type] },);
  checkValidate(item.weight, { func: validate.require, arg: [item.weight] }, { func: validate.between, arg: [item.weight, 1, 15] });
  checkValidate(item.length, { func: validate.require, arg: [item.length] }, { func: validate.between, arg: [item.length, 1, 100] });
  checkValidate(item.color, { func: validate.require, arg: [item.color] },);
  checkValidate(item.breed, { func: validate.choose, arg: [item.breed] },);
}
// Tao bang
function renderTableData(petArr,bmiShow = false) {
  let dataTable = getEle("tbody")
  dataTable.innerHTML = ""
  petArr.forEach(item => {
    let myDate = new Date(item.date)
    if(bmiShow){
      var bmi = () => {
        if(item.type == "Dog"){
          return (item.weight * 703) / item.length**2
        } else return (item.weight * 886) / item.length**2
      }
    }
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
        <td>${bmiShow? bmi().toFixed(2) : "?"}</td>
        <td>${myDate.getDate()}/${myDate.getMonth()+1}/${myDate.getFullYear()}</td>
        <td><button type="button" class="btn btn-danger" onclick=deletePet("${item.id}")>Delete</button>
        </td>
      </tr>
    `
  })
}
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
// delete pet
const deletePet = (id) => {
  let pass = []
  pets.forEach(item => {
    if(item.id !== id){
      pass.push(item)
    }
  })
  pets = [...pass]
  renderTableData(pets)
  saveToStorage(pets)
}
// button show health pets
const showHealthPets = (e) => {
  
  let eTarget = e.currentTarget
  if(eTarget.innerHTML == "Show Healthy Pet"){
    let pass = []
    pets.forEach(item => {
      if(item.sterilized || item.vaccinated || item.dewormed){
        pass.push(item)
      }
    })
    renderTableData(pass)
    eTarget.innerHTML = "Show All Pet"
  } else if(eTarget.innerHTML == "Show All Pet"){
    renderTableData(pets)
    eTarget.innerHTML = "Show Healthy Pet"
  }
}
document.getElementById("healthy-btn").addEventListener("click", showHealthPets)
// Calculate BMI
const calBMI = () => {
  bmiShow = true
  renderTableData(pets,bmiShow)
  bmiShow = false
}
document.getElementById("bmi-btn").addEventListener("click", calBMI)
// form submit
document.getElementById("submit-btn").addEventListener('click', function (e) {
  e.preventDefault();
  const errorNodes = document.getElementsByClassName("error-mess")
  const errorArray = [...errorNodes];  
  // Reset
  errorArray.forEach(item => {
    item.innerHTML = ""
  })
  // Begin
  getValidate(petInput)
  let valResult = errorArray.every(item => {
    if (item.childNodes.length > 0) {
      return false
    } else return true
  })
  if (!valResult) {
    return
  } else {
    const data = {
      id: getEle("input-id").value,
      name: getEle("input-name").value,
      age: parseInt(getEle("input-age").value),
      type: getEle("input-type").value,
      weight: parseInt(getEle("input-weight").value),
      length: parseInt(getEle("input-length").value),
      color: getEle("input-color-1").value,
      breed: getEle("input-breed").value,
      vaccinated: getEle("input-vaccinated").checked,
      dewormed: getEle("input-dewormed").checked,
      sterilized: getEle("input-sterilized").checked,
      date: new Date(),
    }
    pets.push(data)
    saveToStorage(pets)
    document.getElementsByTagName("form")[0].reset()
  }
  renderTableData(pets)
});
// nav active
document.getElementById("sidebar").addEventListener("click",function(){
  getEle("sidebar").classList.toggle("active")
})
// Trigger when select type
document.getElementById("input-type").addEventListener("change", function(e){
  renderOption(e.currentTarget.value)
})

