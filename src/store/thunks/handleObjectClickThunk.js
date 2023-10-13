import { addInventoryItem } from "../slices/inventorySlice";
import { removeObject } from "../slices/gameStateSlice";

// This is a thunk action creator.
export const handleObjectClick = (objectId) => {
    //dispatch is provided by the redux store.
    //because we use a thunk we access the middleware dispatch without
    //importing it.
    return dispatch => {
        // Directly add the object to the inventory.
        dispatch(addInventoryItem({
            id: objectId
        }));

        // Then, remove object from game area
        dispatch(removeObject({ id: objectId }));
    };
}