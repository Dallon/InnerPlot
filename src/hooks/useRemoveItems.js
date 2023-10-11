import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToBeRemoved } from "../store/slices/gameStateSlice";
import { createSelector } from "@reduxjs/toolkit";


const selectObjectsToRemove = createSelector(
    state => state.gameState.objects.toBeRemoved,
    toBeRemoved => Object.values(toBeRemoved),
  );
  
  export const useRemoveItems = (containerRef, itemContainerRefs) => {
    const toBeRemoved = useSelector(selectObjectsToRemove);
    const dispatch = useDispatch();
  
    useEffect(() => {
      let removalOccurred = false; // Track if at least one item was removed
  
      toBeRemoved.forEach(id => {
        // Access the item's container directly using its ID
        const itemContainerToRemove = itemContainerRefs[id];
  
        if (itemContainerToRemove) {
          console.log("The id of the sprite container being removed is: " + id);
          containerRef.current.removeChild(itemContainerToRemove);
          removalOccurred = true;
        } else {
          console.log("Container not found for ID: " + id);
        }
      });
  
      // If we've removed at least one item, clear the toBeRemoved list
      if (removalOccurred) {
        dispatch(clearToBeRemoved());
      }
    }, [toBeRemoved, containerRef, itemContainerRefs, dispatch]);
  };
  