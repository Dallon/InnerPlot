import { useEffect, useRef } from 'react';
import { Dispatch } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
const selectObjectsById = createSelector(
    state => state.gameState.objects.byId,
    byId => Object.values(byId)
  );

export const useGridContainer = (gridContainerRef) => {

    const objectsById = useSelector(selectObjectsById);
   
    useEffect(() => {
        if (!gridContainerRef.current) return;
        
       
    }, [objectsById]);

    return viewportRef;
}