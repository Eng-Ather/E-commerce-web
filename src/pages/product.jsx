import { useEffect, useState } from "react"
// import axios from "axios"
import Card from "../component/card"
import Chips from "../component/chips"

function Product(){

    const [products, setProducts] = useState([])
    const [searchItem, setsearchItem] = useState('');
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([]);
    const [chosenCategory, setChosenCategory] = useState("All");


    // all product API
    useEffect(()=>{

      const url =
      chosenCategory === "All"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${chosenCategory}`;

        const a = fetch(url)
     .then((response) => response.json())

     .then((response) => {           //here data refer the object fect with the help of API
       console.log(response.products)
       setLoading(false)
       setProducts(response.products);
       
      //  console.log(product);
       
       })

     .catch((error)=>{
        console.log(error)
       setLoading(false)
     });
    }, [chosenCategory])

        // catagory wise product API
        useEffect(()=>{
          const b = fetch(`https://dummyjson.com/products/categories`)
       .then((res) => res.json())
  
       .then((res) => {           //here data refer the object fect with the help of API
         console.log(res)
         setCategories(res);
         
         setLoading(false);
         })
  
       .catch((error)=>{
          console.log(error)
         setLoading(false)
       }); 

      }, [])

      console.log(products);
      
  
      // Filter products based on search term
      const filteredProducts = products.filter(data =>
      data.title.toLowerCase().includes(searchItem.toLowerCase()))

      // console.log(filteredProducts);
      

    return(

        <div className="text-l">
            {loading ? (<h1 className="text-center text-3xl">Loading....</h1>)
             : (
              // chips to show catagory
              <div>
                <input
          placeholder="Search with product name"
          onChange={(e) => setsearchItem(e.target.value)}
          className="min-w-full font-semibold p-2 border rounded mx-auto my-2 py-1.5 ring-1 ring-inset ring-orange-400 placeholder:text-orange-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        />
              <div className="flex gap-3 flex-wrap">
                <Chips
                  onClick={() => setChosenCategory("All")}
                  isChosen={chosenCategory === "All"}
                  category={{
                    slug: "All",
                    name: "All",
                  }}
                 />
                  {categories.map((category) => (
                  <Chips
                    onClick={() => setChosenCategory(category.slug)}
                    isChosen={category.slug === chosenCategory}
                    category={category}
                    key={category.slug}
                  />
                ))}
              </div>

              

            <div className="flex flex-wrap -m-4 my-4">
            {/* {products.map((fatchedItem) => (<Card key={fatchedItem.id} item={fatchedItem}/>))} */}
             
             {filteredProducts.map((fatchedItem) => (<Card key={fatchedItem.id} item={fatchedItem}/>))}
             </div>
        </div>
      )}
    </div>
  );
}
export default Product