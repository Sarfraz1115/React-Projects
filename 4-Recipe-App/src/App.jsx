import Card from "./components/Card"
import Navbar from "./components/Navbar"
import { useState } from "react";
import RecipeModal from "./components/Recipemodel";

function App() {
  const [inputval, setinputval] = useState('');
  const [cardData, setcardData] = useState([])
  const [error, seterror] = useState(null);
  const [selectrecipe, seSelesctRecipe] = useState(null);
  const [Loading, setLoading] = useState(false);



  const searching = async (inputval) => {
    try {
      seterror(null);
      setLoading(true);
      // setcardData([]);

      const url = (`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputval}`);
      let response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Recipe not found OR Please check spelling");
        } else {
          throw new Error("something problem in fetching");
        }
      }
      let data = await response.json();

      console.log(data);

      if (data.meals) {
        const formatdata = data.meals.map((meal) => ({
          image: meal.strMealThumb,
          title: meal.strMeal,
          dish: meal.strArea,
          video: meal.strYoutube,
          recipe: meal.strInstructions,
          ingredients: Array.from({ length: 20 }, (_, i) => ({
            ingredient: meal[`strIngredient${i + 1}`],
            measure: meal[`strMeasure${i + 1}`]
          })).filter((item) => item.ingredient),
          instructions: meal.strInstructions,

        }));
        setcardData(formatdata);
      }
      else {
        seterror("No recipes found")
      }

    } catch (err) {
      console.log("something error ", err);
      seterror(err.message);
    }
    finally {
      setLoading(false);
    }
  }



  const handleRecipe = (recipe) => {
    seSelesctRecipe(recipe);
  }

  const closemodel = () => {
    seSelesctRecipe(null);
  }

  const handlechange = (e) => {
    e.preventDefault();
    setinputval(e.target.value);
  }

  return (
    <>
      <Navbar
        inputval={inputval}
        setinputval={setinputval}
        onSearch={searching}
      />
      {error && (
        <div className="text-red-500 text-center mt-4">
          {error}
        </div>
      )}
      <div className="container w-4/5 block m-auto mt-12 mb-12">


        {/* {!error && cardData && (
          <div className="grid grid-cols-4 gap-12 ">
            {cardData.map((item, index) => (
              <Card
                key={index}
                image={item.image}
                title={item.title}
                dish={item.dish}
                vidolink={item.video}
                onrecipeclick={() => handleRecipe(item)}
              />
            ))}
          </div>
        )} */}

        {
          Loading ? (
            <h2  className="text-center font-bold text-2xl"  >Fetching Recipes Data</h2>) : cardData.length > 0 ? (
              <div className="grid grid-cols-4 gap-12 ">
                {cardData.map((item, index) => (
                  <Card
                    key={index}
                    image={item.image}
                    title={item.title}
                    dish={item.dish}
                    vidolink={item.video}
                    onrecipeclick={() => handleRecipe(item)}
                  />
                ))}
              </div>
            ) : (
            <p  className="text-center font-bold text-2xl" >Search the Recipes</p>

          )
        }


        <div className="box">
          {selectrecipe && (
            < RecipeModal recipe={selectrecipe} onClose={closemodel} />
          )
          }
        </div>


      </div>

    </>
  )
}

export default App
