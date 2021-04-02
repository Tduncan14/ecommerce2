
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
    }




}