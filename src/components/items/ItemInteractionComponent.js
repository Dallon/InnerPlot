import { useDispatch, useSelector } from "react-redux";

export const ItemInteractionComponent = ({ item }) => {
    const dispatch = useDispatch();
    const userMode = useSelector(selectUserMode);
  
    const handleClick = () => {
      if (item.isInInventory) {
        if (userMode === 'EQUIP' && item.isEquipable) {
          // Logic to equip the item
        } else {
          // Other inventory-related actions
          //consumeables etc
        }
      } else {
        // The item is on the ground or game world
        if (userMode === 'PICKUP') {
          // Logic to pick up the item
        } else if (userMode === 'INTERACTION' && item.isInteractive) {
          // Logic for interactive items
        }
      }
    }
  
    return (
      <div onClick={handleClick}>
        {item.name}
      </div>
    );
  }