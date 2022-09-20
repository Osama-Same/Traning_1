import React from 'react'
import NavbarProduct from "./NavbarProduct"

function MainToolBar({ mainState, setMainState ,user }) {
    if (!mainState) return <div>No State</div>
    let disp = <div></div>

    if (!mainState.selectedUser) {
        disp = <div>
            Select a user
        </div>

    }
    else if (mainState.selectedUser) {
        disp = <div>
            <NavbarProduct mainState={mainState} setMainState={setMainState} user={user}/>
        </div>
    }

    return (
        <div>
            {disp}
        </div>
    )

}
export default MainToolBar