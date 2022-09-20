import React, { useState, useEffect } from 'react'
import unitsService from '../../service/unitsService'
import UnitsTable from './UnitsTable'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Units({ user }) {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        update();

    }, []);
    const update = async () => {
        setLoading(true)
        const _units = await unitsService._get();
        console.log(_units);
        setUnits(_units);
        setLoading(false)
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
                <div>
                    {user &&

                        <div
                            className="container"
                            style={{ marginTop: "5%", marginBottom: "5%" }}
                        >
                            {
                                user && (user.authorization === 'admin') &&
                                <UnitsTable units={units} setUnits={setUnits} />
                            }
                        </div>}
                </div>
            }</div>)
}