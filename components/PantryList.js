import React from "react";
import PantryItem from './PantryItem';
import { defaultConfig } from "next/dist/server/config-shared";

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