// import React from 'react'

// const Recipemodel = () => {
//   return (
//     <div>Recipemodel</div>
//   )
// }

// export default Recipemodel



function RecipeModal({ recipe, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 mt-5 h-screen">
      <div className="bg-white rounded-lg w-3/4 h-4/5 overflow-scroll p-6 ">
        <div className="btn flex justify-end">
          <button

            className=" right-0 left-0 text-gray-600 hover:text-gray-800  "
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded mb-4" />
        <h3 className="text-xl font-semibold">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>
              {item.ingredient} - {item.measure}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold">Instructions:</h3>
        <p className="mb-4">{recipe.instructions}</p>
        <a
          href={recipe.video}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 border-2 border-black text-black p-2 rounded-2xl hover:bg-black hover:text-white"
        >
          Watch Video
        </a>
      </div>
    </div>
  );
}

export default RecipeModal;
