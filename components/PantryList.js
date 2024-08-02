import React from "react";
import PantryItem from './PantryItem';

const PantryList = ({ items }) => {
  return (
		<div>
			{items.map(item => (
				<PantryItem key={item.id} item={item} />
			))}
		</div>
	);
};

export default PantryList;