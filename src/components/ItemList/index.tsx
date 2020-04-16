import React from "react";

interface Props {
  data: string[];
}
const ItemList = React.memo((props: Props) => {
  const { data } = props;
  console.log('itemList',data)
  return (
    <ul>
      {data &&
        data.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
    </ul>
  );
});

export default ItemList;
