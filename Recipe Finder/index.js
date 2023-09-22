const searchField = document.getElementById("searchfield"); 
const searchBtn = document.getElementById("searchbtn"); 
const mealList = document.getElementById("meal-list"); 
const popupContainer = document.querySelector(".popup-container"); 
const mealDetailsContent = document.querySelector(".meals-details-container"); 
const closePopUp = document.getElementById("closepopup");


// Event listeners 

searchBtn.addEventListener("click", async () => {

    const ingridient = searchField.value.trim; 
    if(ingridient){
        const meals = await searchMealsByIngridient (ingridient); 
        dispplayMeals(meals);  
    }
    

}); 


mealList.addEventListener("click", async (e) => {
    const card = e.target.closest(".meal-item"); 

    if(card) {
        const mealId = card.dataset.id; 
        const meal = await getMealDetails(mealId); 

        if(meal){
            showMealDetailsPopup(meal)
        }
    }

}); 


//Function to search meals by ingridient

async function searchMealsByIngridient(ingridient){

    try {

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingridient}`); 
        const data = await response.json(); 
        return data.meals; 
    } catch (error) {

        console.error("There was a problem retrieving the data, try again.", error)
        
    }

}


//Function to fetch meal details by id 

async function getMealDetails(mealId){

    try {
        
       const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
       const data = await response.json(); 
       return data.meals[0]

    } catch (error) {
        console.error("There was a problem retrieving the data, try again.", error)
        
    }

}

//Function to display meals in meal list

function dispplayMeals(meals){
    mealList.innerHTML = ""; 

    if (meals){
        meals.forEach((meal) => {
            const mealItem = document.createElement("div");
            mealItem.classList.add("meal-item"); 
            mealItem.dataset.id = meal.idMeal; 
            mealItem.innerHTML = 
           
            ` <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}"> 

              <h3> ${meal.strMeal} </h3> 
            
            `; 

            mealList.appendChild(mealItem); 
        });

        
    } else{
        mealList.innerHTML = "<p> No meals found, try another ingridient"; 
    }

}


//Function to create and display meal details on popup


function showMealDetailsPopup (meal){

   mealDetailsContent.innerHTML = `


    <h2 class = "recipe-title"> ${meal.strMeal} </h2> 
    <p class = "recipe-category"> ${meal.strCategory} </p> 

    <div class = "recipe-instructions"> 
    
    <h3> Instructions : </h3> 
    <p> ${meal.strInstructions} </p>
 
    </div> 

    <div class = "recipe-image"> 
    
    <img src = "${meal.strMealThumb} " alt = "${meal.strMeal}"
    
    </div> 


    <div class = "recipe-video"> 
    <a href = "${meal.strYoutube}"
    target = "_blank">   Video Tutorial </a>
    
    </div> 

    `; 

    popupContainer.style.display = "block"; 
}


//Event listener for PopUp close button 

closePopUp.addEventListener("click", () => {
     popupContainer.style.display = "none"; 
})


//Event listener for search input 

searchField.addEventListener("keyup", (e) => {

if(e.target === "Enter"){
performsearch(); 

}
}); 


//Search Function

async function performsearch(){

    const ingridient = searchField.value.trim(); 
    if(ingridient){
        const meals = await searchMealsByIngridient(ingridient); 
        dispplayMeals(meals); 
    }

}


//Perform a serch on load 

window.addEventListener("load", () => {

    searchField.value = "chicken";
    performsearch();  
})

















