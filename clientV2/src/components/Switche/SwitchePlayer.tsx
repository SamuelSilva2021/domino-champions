import { Group, Switch, Text } from '@mantine/core';
import classes from './SwitchePlayer.module.css';
import React, { useState } from 'react';

interface Props {
    InitialChecked: boolean
    setActive: (isActive: boolean) => void
}

export function SwitchePlayer({ InitialChecked, setActive }: Props) {
    const [checked, setChecked] = useState(InitialChecked);
    const [title, setTitle] = useState(checked ? 'Desabilitar jogador' : 'Habilitar jogador');

    const handleChange = (checked: boolean) => {
        const title = checked ? 'Desabilitar jogador' : 'Habilitar jogador'
        setChecked(checked)
        setTitle(title)
        setActive(checked)
    }
    return (
        <div style={{ marginTop: 15 }}>
            <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl">
                <div>
                    <Text>{title}</Text>
                </div>
                <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    className={classes.switch}
                    size="lg"
                    checked={checked}
                    onChange={(event) => handleChange(event.currentTarget.checked)} 
                />
            </Group>
        </div>
    );
}