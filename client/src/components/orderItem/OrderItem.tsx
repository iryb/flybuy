import { ApiPath } from "@/common/enums/apiPath";
import { Order, ProductPreview } from "@/common/types/types";
import { formatDate, formatPrice, getProductImage } from "@/helpers/helpers";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

interface OrderItemProps {
  item: Order;
}

export const OrderItem = ({ item }: OrderItemProps): React.ReactElement => {
  const { t } = useTranslation();
  const {
    id,
    attributes: { createdAt, products },
  } = item;
  const [productsData, setProductsData] = useState<ProductPreview[]>([]);

  const fetchProduct = async (sku: string): Promise<ProductPreview[]> => {
    const items = await fetch(
      `${ApiPath.API}/items?filters[sku][$eq]=${sku}&populate=image`,
      {
        method: "GET",
      },
    );
    const itemsData = await items.json();
    return itemsData.data;
  };

  useEffect(() => {
    const data = products.map(async (product) => {
      return await fetchProduct(product.sku);
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.all(data).then((res) => {
      const items: ProductPreview[] = [];

      if (res.length > 1) {
        res.forEach((item) => {
          const {
            id,
            attributes: { name, price, image, sku },
          } = item[0];
          items.push({
            id,
            count: products.find((p) => p.id === id)?.count as number,
            attributes: {
              name,
              price,
              image,
              size: products.find((p) => p.sku === sku)?.size as string,
              sku,
            },
          });
        });
      } else {
        const {
          id,
          attributes: { name, price, image, sku },
        } = res[0][0];
        items.push({
          id,
          count: 1,
          attributes: {
            name,
            price,
            image,
            size: products[0].size,
            sku,
          },
        });
      }

      setProductsData(items);
    });
  }, [products]);

  return (
    <>
      {productsData && (
        <Box className={styles.orderItem}>
          <Typography className={styles.title}>
            {t("order")} #{id}
          </Typography>
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
                    {t("count")}: {item?.count}
                  </Typography>
                  <Typography className={styles.size}>
                    {t("size")}: {item?.attributes.size}
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
