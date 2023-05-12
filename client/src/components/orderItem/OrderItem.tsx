import { ApiPath } from "@/common/enums/apiPath";
import { Order, ProductPreview } from "@/common/types/types";
import { formatDate, getProductImage } from "@/helpers/helpers";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface OrderItemProps {
  item: Order;
}

export const OrderItem = ({ item }: OrderItemProps): React.ReactElement => {
  const { createdAt, products } = item.attributes;
  const [productsData, setProductsData] = useState<ProductPreview[]>([]);

  const fetchProduct = async (id: string): Promise<ProductPreview[]> => {
    const items = await fetch(
      `${ApiPath.API}/items?filters[id][$eq]=${id}&populate=image`,
      {
        method: "GET",
      },
    );
    const itemsData = await items.json();
    return itemsData.data;
  };

  useEffect(() => {
    const data = products.map(async (product) => {
      return await fetchProduct(product.id);
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.all(data).then((res) => {
      const items: ProductPreview[] = [];

      res.forEach((item) => {
        items.push({
          id: item[0].id,
          count: products.find((p) => p.id === item[0].id)?.count as number,
          attributes: {
            name: item[0].attributes.name,
            price: item[0].attributes.price,
            image: item[0].attributes.image,
          },
        });
      });

      setProductsData(items);
    });
  }, [products]);

  return (
    <>
      {productsData && (
        <Box sx={{ mb: 3 }}>
          <Typography>Date: {formatDate(createdAt)}</Typography>
          {productsData?.map((item) => (
            <Box key={uuidv4()}>
              <Box>
                <img
                  width="200"
                  height="200"
                  src={getProductImage(item.attributes.image)}
                  alt={item?.attributes?.name}
                />
              </Box>
              <Typography>{item?.attributes?.name}</Typography>
              <Typography>Count: {item?.count}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
