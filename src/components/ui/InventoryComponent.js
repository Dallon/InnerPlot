import React, { useContext } from 'react';
import { useInventoryContainer } from '../../hooks/useInventoryContainer';
import AppContext from '../../contexts/AppContext';


const InventoryComponent = () => {
  const { appRef, inventoryContainerRef } = useContext(AppContext);
  
  useInventoryContainer(appRef, inventoryContainerRef);

};

export default InventoryComponent;