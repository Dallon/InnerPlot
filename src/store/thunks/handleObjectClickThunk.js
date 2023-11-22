
import { addInventoryItem } from "../slices/inventorySlice";
import { removeObject } from "../slices/itemsSlice";

export const handleObjectClick = (item) => {
  return (dispatch) => {  // This dispatch is provided automatically by Redux when the thunk is invoked.
    console.log("handleObjectClick");

    // Dispatch remove object
    dispatch(removeObject(item.id));
    
    // Dispatch add to inventory
    dispatch(addInventoryItem( {itemURL: item.url, itemId: item.id,  itemAssetKey: item.assetKey, quantity: item.quantity,
       levelReq:item.levelReq, itemType:item.itemType, bonuses:item.bonuses, location:item.location}));

  };
};
