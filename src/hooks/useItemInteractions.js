import { useDispatch } from 'react-redux';

// Function to generate a unique ID
const generateUniqueID = () => Date.now().toString();

export const useItemInteractions = () => {


  console.log(`useItemInteractions is running`);//debugging

  const dispatch = useDispatch();


  // General event handler for item clicks
  const handleItemClick = (item, interactionType, currentMode, equippedItems) => {
    // Check if the item ID already exists in the inventory
    const existingItem = inventory.byId[item.id];
  
    if (interactionType === 'leftClick') {
      if (item.retrievable) {
        if (existingItem) {
          // Increment count or update existing item
        } else {
          // Add new item to inventory
          const newItem = {
            id: item.id,  // Reuse the existing ID
            name: item.name,
            icon: item.icon
          };
          dispatch(addItem(newItem));
        }
      } else if (currentMode === 'gardening') {
        // Handle gardening-specific logic
      } else if (currentMode === 'combat') {
        // Handle combat-specific logic
      }
    } else if (interactionType === 'rightClick') {
      // Handle right-click actions
    } else if (interactionType === 'drag') {
      // Handle drag-and-drop actions
    }
  
    // Check for equipped items that may modify behavior
    if (equippedItems.includes('SpecialGloves')) {
      // Modify behavior based on equipped "SpecialGloves"
    }
  };

  return { handleItemClick };
};