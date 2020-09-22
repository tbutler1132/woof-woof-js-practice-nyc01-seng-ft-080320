document.addEventListener('DOMContentLoaded', function(e){

//Step 1, 2: Display all dogs
    const renderDogs = (dogArray) =>{
        dogArray.forEach(dog => 
            renderDog(dog))
    }
    
    const renderDog = (dogObj) =>{
        const dogBar = document.querySelector('#dog-bar')
        const dogSpan = document.createElement('span')
        dogSpan.dataset.id = dogObj.id
        dogSpan.innerHTML = `${dogObj.name}`
        dogBar.append(dogSpan)
    }

    const displayDogs = () =>{
        fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(dogs => {
            renderDogs(dogs)
            }
        )
    }

    const displayDog = (index) =>{
        fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(dog => {
            renderDogInfo(dog[index])
            }
        )
    }

//Step 3: Show more info
    //Create Div
    //Run render div in displayDogs
    //Create click listener to show/hide div

    
    const clickHandler = () =>{
        document.addEventListener('click', function(e){
            if (e.target.matches('span')){
                const dogIndex = parseInt(e.target.dataset.id) - 1
                displayDog(dogIndex)
                const dogInfoDiv = document.querySelector('#dog-info')
            }
            else if (e.target.matches('button')){
                const id = e.target.parentElement.dataset.id
                if (e.target.textContent === "Good dog!"){
                    toggleGoodBad("false", id)
                }
                else {
                    toggleGoodBad("true", id)
                }
            }
        })
    }
    
    const renderDogInfo = (dog) =>{
        const dogInfoDiv = document.querySelector('#dog-info')
        dogInfoDiv.dataset.id = dog.id
        dogInfoDiv.style.display = 'block'
        if (dog.isGoodDog === true){
            dogInfoDiv.innerHTML = 
            `<img src=${dog.image}>
            <h2>${dog.name}</h2>
            <button>Good dog!</button>
            `
        }    
        else if (dog.isGoodDog === false){
            dogInfoDiv.innerHTML = 
            `<img src=${dog.image}>
            <h2>${dog.name}</h2>
            <button>Bad dog!</button>
            `
        }    
    }

//Step 4: Toggle Good Dog

    const toggleGoodBad = (goodOrBad, id) => {
    
        const options = {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({isGoodDog: goodOrBad})
        }

        fetch('http://localhost:3000/pups/' + id, options)
        .then(response => response.json())
        .then(dog => updateButton(dog))

    }

const updateButton = (dog) =>{
    const dogInfoDiv = document.querySelector('#dog-info')
    const button = dogInfoDiv.querySelector('button')
        if (dog.isGoodDog === true ){
            button.textContent = "Good dog!"
        }
        else {
            button.textContent = "Bad dog!"
        }
}



//Function Invocations
displayDogs()
clickHandler()

})