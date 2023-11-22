import { createSlice } from '@reduxjs/toolkit';
import { removeInventoryItem } from './inventorySlice';

const playerSlice = createSlice({
    name: 'player',
    initialState: {
        equippedWearing: {
            torso: null,
            hands: null,
            head: null,
            legs: null,
            feet: null,
            rings: null,
            necklace: null,
            eyes: null,
        },
        bonuses: {
            expMultiplier: 1,
            growthSpeedBonus: 0,
            harvestYieldBonus: 0,
            waterEfficiencyBonus: 0,
            seedDiscoveryBonus: 0,
            weatherTolerance: 0,
            fertilizerEfficiency: 0,
            pestResistence: 0,
            staminaBonus: 0,
            marketPriceBonus: 0,
        },

        equippedHolding: null, // ID of the currently equipped item
    },
    reducers: {
        equipWearing: (state, action) => {
            const { itemId, location } = action.payload;
            if (state.equippedWearing.hasOwnProperty(location)) {
                state.equippedWearing[location] = itemId;
            } else {
                console.warn(`Invalid location: ${location}`);
            }
        },
        equipHolding: (state, action) => {
            const { itemId } = action.payload;
            state.equippedHolding = itemId;
        },
    },
});

// Thunk to equip an item if it's in the inventory
 export const equipItemIfInInventory = (itemId, type, location) => (dispatch, getState) => {
    const state = getState();
    const inventory = state.inventory.byId;
    const playerLevel = state.player.level;
    const item = state.inventory.items[itemId]; // Assume items have a 'levelRequirement' property

    if (!inventory.includes(itemId)) {
        console.log('Item not in inventory');
        return;
    }

    if (playerLevel < item.levelRequirement) {
        console.log('Player level too low to equip this item');
        return;
    }

    if (type === 'wearing' && location) {
        dispatch(equipWearing({ itemId, location }));
    } else if (type === 'holding') {
        dispatch(equipHolding({ itemId }));
    }
};

// Helper function to apply bonuses
function applyBonuses(state, bonuses) {
    Object.keys(bonuses).forEach(bonusKey => {
        if (state.bonuses.hasOwnProperty(bonusKey)) {
            state.bonuses[bonusKey] += bonuses[bonusKey];
        }
    });
}

// Thunk action for consuming an item
export const consumeItem = (itemId) => (dispatch, getState) => {
    const inventoryItems = getState().inventory.byId;
    console.log(inventoryItems);
    const item = inventoryItems[itemId];
    console.log(item);
    // Check if the item exists and is consumable
    if (item && item.itemType === 'consumable') {
      // Apply bonuses if any
      if (item.bonuses) {
        applyBonuses(getState().player.bonuses, item.bonuses);
      }
  
      // Decrease the quantity or remove the item if quantity is 1 or undefined
      if (item.quantity && item.quantity > 1) {
        // Dispatch an action to decrement the item quantity
        dispatch(removeInventoryItem({ itemId: item.id, removeAll: false }));
        console.log(getState().inventory.byId);
      } else {
        // Dispatch an action to remove the item
        dispatch(removeInventoryItem({ itemId: item.id, removeAll: true }));
        console.log(getState().inventory.byId);
      }
    }
  };
  

export const { equipHolding, equipWearing } = playerSlice.actions;
export const  playerReducer  = playerSlice.reducer;

