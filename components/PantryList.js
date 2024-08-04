import React from "react";
import PantryItem from './PantryItem';

const PantryList = ({ items }) => {
  return (
		<div>
			{items.map(item => (
				<PantryItem key={item.itemId || index} item={item} />
			))}
		</div>
	);
};

export default PantryList;