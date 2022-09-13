import React from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import usersProductsService from "../../service/usersProductsService"
import Button from "@mui/material/Button";
const ProductUsersList = ({ openList, setOpenList, product, allUsers, allUsersProducts, onUpdate }) => {
    console.log("allUsers", product)
    console.log("allUsers", allUsers)
    console.log("allUsersProducts", allUsersProducts)

    const handleClose = () => {
        setOpenList(false);
    };
    return (
        <div>
            {product && <div>
                <Dialog open={openList} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
                            All Users
                        </DialogContentText>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            <div>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Avatar alt="" src={product.image} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={product.descriptionen} secondary={product.descriptionar} />
                                </ListItem>


                            </div>

                        </Box>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: "100%",
                                marginBottom: "5%",
                            }}
                        >
                            {allUsers.map((user) => {
                                return <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <Checkbox
                                                    checked={allUsersProducts.find(up => (up.userid == user.userid) && (up.productid == product.id)) ? true : false}
                                                    edge="start"
                                                    tabIndex={-1}
                                                    disableRipple
                                                    onClick={async (e) => {
                                                        if (e.target.checked) {
                                                            let data = {
                                                                id: 0,
                                                                userid: user.userid,
                                                                productid: product.id,
                                                                quantity: 0,
                                                                costprice: 0,
                                                                salesprice: 0
                                                            }
                                                            await usersProductsService._save(data)
                                                            onUpdate()
                                                        }

                                                        else {
                                                            const userProduct = allUsersProducts.find(up => (up.userid == user.userid) && (up.productid == product.id))
                                                            if(!userProduct) return;
                                                            await usersProductsService._delete(userProduct.id)
                                                            onUpdate()
                                                        }

                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemIcon>
                                                <Avatar alt="" src={user.logo} />
                                            </ListItemIcon>
                                            <ListItemText primary={user.publishednameen} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            })}

                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>}
        </div >
    )
}
export default ProductUsersList