import { useEffect } from "react";
import * as PIXI from 'pixi.js';
import { useDispatch, useSelector } from "react-redux";
import { clearToBeRemoved } from "../store/slices/gameStateSlice";
import { createSelector } from "@reduxjs/toolkit";


const selectObjectsToRemove = createSelector(
    state => state.gameState.objects.toBeRemoved,
    toBeRemoved => Object.values(toBeRemoved),
  );


 export const useRemoveItems = (containerRef) => {
    const toBeRemoved = useSelector(selectObjectsToRemove);
    const dispatch = useDispatch();

    useEffect(() => {
        // remove the object from the container 
        toBeRemoved.forEach(id => {
            const sprite = containerRef.current.getChildByName(id);

            console.log("the id of the sprite being removed is" + sprite);
            if(sprite) {
                console.log("the sprite being removed is: "+ sprite);
                containerRef.current.removeChild(sprite);  
        //clear the array in redux after the removal
                        dispatch(clearToBeRemoved());
            }
        }); 
    },[toBeRemoved, containerRef.current]);



};
