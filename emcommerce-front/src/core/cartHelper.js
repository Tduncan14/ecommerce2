
// adding an product to the localstorage /cart
export const addItem = (item,next) => {

    let cart = []


// Make sure you have the window object
    if(typeof window !== 'undefined'){

        if(localStorage.getItem('cart')){

            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.push({
            ...item, count:1
        })


    // creates a new array with no duplicates (sets no dupicates)
        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {

            return cart.find(p => p._id === id)
        })


        localStorage.setItem('cart', JSON.stringify(cart))
       next();


    }




}

//  method total items in cart


export const itemTotal = () => {

    if(typeof window !== 'undefined'){

         if(localStorage.getItem('cart')){


            return JSON.parse(localStorage.getItem('cart')).length

        }
    }

    return 0;
}

//  grabs items from localstorage


export const getCart = () => {

    if(typeof window !== "undefined"){

        if(localStorage.getItem('cart')){

            console.log(localStorage.getItem('cart'))

            return JSON.parse(localStorage.getItem('cart'))
        }


    }


     return [];

}