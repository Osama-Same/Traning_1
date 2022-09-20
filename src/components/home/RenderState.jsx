import React from 'react'
import ItemCard from "./ItemCard"
import OrderForm from "./OrderForm"
import OrderUserList from "./OrderUserList"
function RenderState({ mainState, setMainState }) {
    console.log('mainState', mainState);

    if (!mainState) return <div>No State</div>

    let renderArr = [];
    if (mainState.stage == 'user') {
        renderArr = mainState.allUsersProfiles;
    }
    else if (mainState.stage == 'product') {
        renderArr = mainState.selectedUser.userProducts;
        console.log("mainState.selectedUser.usersOrders", mainState.selectedUser.usersOrders)
    }
    else if (mainState.stage == 'order') {

        return (<OrderForm mainState={mainState} setMainState={setMainState} />)

    } else if (mainState.stage == 'orderUser') {
        let userOrder = mainState.selectedUser.usersOrders
        return (<OrderUserList mainState={mainState} setMainState={setMainState} userOrder={userOrder} />)
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