import React, { useState, useEffect } from 'react'
import registerdUsersService from '../../service/registerdUsersService'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';
const Home = ({ user }) => {
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        update()
    }, [])
    const update = async () => {
        setLoading(true);
        const _users = await registerdUsersService._get()
        setusers(_users)
        setLoading(false);
    }

    return (
        <div>
            {loading ?
                <Box sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CircularProgress /> Loading...
                </Box>
                :
                <>
                    {user && <div className='container' style={{ marginTop: "5%", marginBottom: "5%" }}>
                        <div class="row ">
                            {users.map((user) => {
                                return (
                                    <div className="col-6">
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={user.logo}
                                                    alt="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {user.publishednameen}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {user.contactinfoen}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Share
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    }
                </>
            }
        </div>
    )
}

export default Home