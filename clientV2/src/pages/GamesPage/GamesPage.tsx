import classes from './GamesPage.module.css'
import { Container, Grid, GridCol } from "@mantine/core";
import { useEffect, useState } from "react";
import { GetDuelsInProgress } from ".";
import { Duel } from "@/utils/models/duel";
import { Error, Sucess } from "@/utils/utils";
export default function GamesPage() {
    const [duelProgress, setDuelProgress] = useState<Duel[] | undefined>([]);

    const fetchDuelsInProgress = async () => {
        try {
            const res = await GetDuelsInProgress();
            setDuelProgress(res)
        } catch (error) {
            Error(`${error}`)
        }        
    }
    useEffect(() => {
        fetchDuelsInProgress();
    }, [])
    return (
        <Container className={classes.responsiveContainer}>
            <Grid gutter='sm' columns={12}>
                <GridCol span={6}>
                </GridCol>
                <GridCol span={3}>
                </GridCol>
                <GridCol span={3}>              
                </GridCol>
            </Grid>
        </Container>
    )
}