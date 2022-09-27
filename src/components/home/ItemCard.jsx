import React from 'react'
import UserCard from "./UserCard"
import ProductCard from "./ProductCard"

function ItemCard({ mainState, setMainState, item }) {

    let disp = <div></div>
    if (mainState.stage == 'user') {
        disp = <UserCard mainState={mainState} setMainState={setMainState} user={item} />
    }
    else if (mainState.stage == 'product') {
        disp = <ProductCard mainState={mainState} setMainState={setMainState} userProduct={item} />
    }
  
    return (
        <div>
            {disp}
        </div>
    )

}
export default ItemCard