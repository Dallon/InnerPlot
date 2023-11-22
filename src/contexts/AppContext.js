import React from 'react';

//Create a context with default values (set to null)
const AppContext = React.createContext({
    appRef: null,
    inventoryContainerRef: null
});

export default AppContext;