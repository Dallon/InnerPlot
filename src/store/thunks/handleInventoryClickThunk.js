import { equipItemIfInInventory, consumeItem } from "../slices/playerSlice";
export const handleInventoryClick = (item) => {

    console.log(item);
    return (dispatch, getState) => {
        console.log(item.itemType)
      switch (item.itemType) {
        case 'equippable':
          dispatch(equipItemIfInInventory(item.id, item.itemType, item.location));
          break;
        case 'consumable':
            console.log(item.id);
          dispatch(consumeItem(item.id));
          break;
        case 'usable': // Assuming 'usable' items perform an action but don't provide a bonus
        //   dispatch(useItem(item.id));
          break;
        default:
          console.log('Item is neither equippable nor consumable nor usable');
          // Handle other types of items or do nothing
      }
    };
  };
