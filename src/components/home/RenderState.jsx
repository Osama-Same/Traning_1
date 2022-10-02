import React from 'react'
import ItemCard from "./ItemCard"
import NewOrderForm from "./NewOrderForm"
import OrdersTable from "./OrdersTable"
import CurrentOrder from "./Currentorder"

function RenderState({ mainState, setMainState }) {
    console.log("mainState", mainState)
    if (!mainState) return <div>No State</div>
    let renderArr = [];
    if (mainState.stage == 'user') {
        renderArr = mainState.allUsersProfiles;
    }
    else if (mainState.stage == 'product') {
        renderArr = mainState.selectedUser.userProducts;
    }
    else if (mainState.stage == 'neworder') {
        return (<NewOrderForm mainState={mainState} setMainState={setMainState} />)
    }
    else if (mainState.stage == 'currentorder') {
        return (<CurrentOrder mainState={mainState} setMainState={setMainState} />)
    }
    else if (mainState.stage == 'allorders') {
        let userOrder = mainState.selectedUser.orders
        return (<OrdersTable mainState={mainState} setMainState={setMainState} userOrder={userOrder} />)
    }


    return (
        <div className='row'>
            {renderArr.map(item => (
                <div className='col-md-4'>
                    <ItemCard key={item.id} mainState={mainState} setMainState={setMainState} item={item} />
                </div>
            ))}

        </div>
    )

}
export default RenderState