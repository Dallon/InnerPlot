//InventoryComponent.js
import { createSelector } from 'reselect';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadPNGAsTexture } from '../../utils/loadPNGAsTexture';

const GridItem = ({ item }) => {
    const [texture, setTexture] = useState(null);

    useEffect(() => {
        const loadTexture = async () => {
            const loadedTexture = await loadPNGAsTexture(item.url);
            setTexture(loadedTexture);
        };
        loadTexture();
    }, [item]);

    // Replace this with method of displaying the PixiJS texture.
    return (
        <div className="grid-item">
            {/* Placeholder */}
        </div>
    );
}

const selectInventoryItems = createSelector(
    state => state.gameState.inventory.byId,
    byId => Object.values(byId),
    // state => state.gameState.objects.byId,
    // byId => Object.values(byId),
);


const InventoryComponent = () => {

    const items = useSelector(selectInventoryItems);

    return (
        <div className="inventory-grid">
            {items.map((item, index) => (
                <GridItem key={index} item={item} />
            ))}
        </div>
    );
}
