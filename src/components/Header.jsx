import { React } from 'react';
import { Container, Box, } from '@mui/material';
import { TabsUnstyled, TabUnstyled, TabsListUnstyled, TabPanelUnstyled } from '@mui/base';

import Clients from './Clients';
import Rooms from './Rooms';
import Workers from './Workers';

const Header = () => {

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', color: 'indigo', fontSize: '30px' }}>
                <h1>Hotel Service</h1>
            </Box>
            <Box>
                <TabsUnstyled defaultValue={0}>
                    <TabsListUnstyled>
                        <TabUnstyled>Rooms</TabUnstyled>
                        <TabUnstyled>Clients</TabUnstyled>
                        <TabUnstyled>Workers</TabUnstyled>
                    </TabsListUnstyled>
                    <TabPanelUnstyled value={0}>
                        <Rooms />
                    </TabPanelUnstyled>
                    <TabPanelUnstyled value={1}>
                        <Clients />
                    </TabPanelUnstyled>
                    <TabPanelUnstyled value={2}>
                        <Workers />
                    </TabPanelUnstyled>
                </TabsUnstyled>
            </Box>
        </Container>
    )
}

export default Header;