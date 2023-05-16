import { ApiPath } from "@/common/enums/apiPath";
import { Order, ProductPreview } from "@/common/types/types";
import { formatDate, formatPrice, getProductImage } from "@/helpers/helpers";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import styles from "./styles.module.scss";

interface OrderItemProps {
  item: Order;
}

export const OrderItem = ({ item }: OrderItemProps): React.ReactElement => {
  const { id } = item;
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
        <Box className={styles.orderItem}>
          <Typography className={styles.title}>Order #{id}</Typography>
          <Typography className={styles.date}>
            <CalendarMonthIcon />
            <span>{formatDate(createdAt)}</span>
          </Typography>
          {productsData?.map((item) => (
            <Box key={uuidv4()} className={styles.details}>
              <Box className={styles.image}>
                <img
                  width="200"
                  height="200"
                  src={getProductImage(item.attributes.image)}
                  alt={item?.attributes?.name}
                />
              </Box>
              <Box className={styles.detailsText}>
                <Box className={styles.leftCol}>
                  <Typography className={styles.name}>
                    {item?.attributes?.name}
                  </Typography>
                  <Typography className={styles.count}>
                    {item?.count} item
                  </Typography>
                </Box>
                <Box className={styles.rightCol}>
                  <Typography className={styles.price}>
                    {formatPrice(item?.count * item?.attributes.price)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
