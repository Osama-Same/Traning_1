import React from 'react'
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea} from '@mui/material';
function UserCard({ mainState, setMainState, user }) {

    if (!user) return <div>No User Profile</div>
    return (
        <>
            <Box
                sx={{
                    width: 400,
                    maxWidth: "100%",
                    marginBottom: "5%",
                }}
            >
                <Card >
                    <CardActionArea
                        onClick={() => {
                            const newState = { ...mainState };
                            newState.stage = 'product';
                            newState.selectedUser = user;
                            setMainState(newState)
                        }}
                    >
                        <div className="card text-center">
                            <div className="card-header">
                                {user.publishednameen}
                            </div>
                            <div className="card-body">
                                <CardMedia
                                    component="img"
                                    width="100"
                                    height="200"
                                    image={user.logo}
                                    alt="green iguana"
                                />
                            </div>
                            <div className="card-footer text-muted">
                                {user.publishednamear}
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </Box>
        </>
    )

}
export default UserCard