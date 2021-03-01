const BASE_URL = "http://localhost:3000/pups/"

document.addEventListener("DOMContentLoaded",()=> {
    init()
    const toggleButton = document.getElementById("good-dog-filter")
    toggleButton.addEventListener("click",showOnlyGoodDogs)



})

const init = () => {
    console.log("init")
    fetch(BASE_URL).then(res => res.json()).then(dogs => dogs.forEach(renderDogBar))
}

const renderDogBar = (dog)=>{
    const dogBar = document.getElementById('dog-bar')
    
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.dataset.dogId = dog.id
    dogSpan.addEventListener('click', ()=>{
        showDogDetail(event,dog)
    })
    dogBar.append(dogSpan)
    
}

const showDogDetail = (event,dog) => {
    const dogInfo = document.getElementById('dog-info')
    dogInfo.innerHTML = ""
    const dogImg = document.createElement('img')
        dogImg.src = dog.image
    const dogName = document.createElement('h2')
        dogName.innerText = dog.name
    const goodBtn = document.createElement('button')
        updateButtonText(dog,goodBtn)
        goodBtn.addEventListener("click",()=>{
            toggleGoodDog(dog,goodBtn)
        })
    
    dogInfo.append(dogImg,dogName,goodBtn)
}


const toggleGoodDog = (dog, goodBtn) => {

    let newDogState = true
    if(goodBtn.innerText == "Good Dog!") {
        newDogState = false
    } else {
        newDogState = true
    }

    let goodDog = {
        "isGoodDog": newDogState
      }
    let reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(goodDog)
    }
    fetch(BASE_URL+dog.id,reqObj)
    .then(res =>res.json())
    .then(updatedDog => { updateButtonText(updatedDog,goodBtn)
    })
}

function updateButtonText (dog,button) {
    if(dog.isGoodDog){
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    } 
}

function showOnlyGoodDogs() {
    const dogBar = document.getElementById('dog-bar')
    dogBar.innerHTML=""
    if(event.target.innerText == "Filter good dogs: ON"){
        event.target.innerText = "Filter good dogs: OFF"
        init()
        return
    } 
    event.target.innerText = "Filter good dogs: ON"

    fetch(BASE_URL).then(res => res.json()).then(dogs => filterOutBadDogs(dogs))

}

const filterOutBadDogs = (dogs) => {
    const goodDogs = dogs.filter(function(dog){return dog.isGoodDog === true})
    goodDogs.forEach(renderDogBar)
}



