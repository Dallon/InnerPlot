import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToBeRemoved } from "../store/slices/gameStateSlice";
import { createSelector } from "@reduxjs/toolkit";


const selectObjectsToRemove = createSelector(
    state => state.gameState.objects.toBeRemoved,
    toBeRemoved => Object.values(toBeRemoved),
  );
  
  export const useRemoveItems = (objectContainerRef, itemContainerRefs) => {
    const toBeRemoved = useSelector(selectObjectsToRemove);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if(!itemContainerRefs){
        return;
      }
      let removalOccurred = false; 
  
      toBeRemoved.forEach(id => {
        // Access the item's container directly using its ID

        console.log('toBeRemoved contains:', toBeRemoved);


        if (typeof id === 'object') {
          console.error('Received an object for ID:', id);
          return;
        }
        const itemContainerToRemove = itemContainerRefs[id];
  
        if (itemContainerToRemove) {
          console.log("The id of the sprite container being removed is: " + id);
          objectContainerRef.current.removeChild(itemContainerToRemove);
          removalOccurred = true;
      } else if(id) {
          console.log("Container not found for ID: " + id);
      } else {
          console.log("Attempted to remove an item, but the ID was undefined.");
      }
      });
  
      // If we've removed at least one item, clear the toBeRemoved list
      if (removalOccurred) {
        dispatch(clearToBeRemoved());
      }
    }, [toBeRemoved, dispatch]);
  };
  