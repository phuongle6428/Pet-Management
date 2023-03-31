'use strict';
const getFromStorage= () => {
  const petsData = JSON.parse(localStorage.getItem("petsData"))
  return petsData
}
const saveToStorage = (petsData) => {
  const petsDataJSON = JSON.stringify(petsData)
  localStorage.setItem("petsData",petsDataJSON)
}
const getBreedStorage = () => {
  const breedsDefault = [
    {type: "Dog", breeds: ["Mixed Breed","Husky","Doberman Pinscher"]},
    {type: "Cat", breeds: ["Tabby","Mixed Breed","Domestic Short Hair"]},
  ]

  if(!JSON.parse(localStorage.getItem("breedsData"))){
    localStorage.setItem("breedsData",JSON.stringify(breedsDefault))
  }
  const breedsData = JSON.parse(localStorage.getItem("breedsData"))
  return breedsData
}
const saveBreedStorage = (breedsData) => {
  const breedsDataJSON = JSON.stringify(breedsData)
  localStorage.setItem("breedsData",breedsDataJSON)
}