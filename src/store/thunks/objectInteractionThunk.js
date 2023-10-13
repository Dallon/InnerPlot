import { addObject, removeObject } from './objectsSlice';
import { addInventoryItem } from './inventorySlice';

// Combined thunk action to handle item click
export const handleObjectClick = (object) => (dispatch) => {
  // Remove object from game state
  dispatch(removeObject(object.id));

  // Add object to inventory
  dispatch(addInventoryItem(object));
};
