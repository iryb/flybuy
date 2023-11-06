import { ApiPath, ROOT } from "@/common/enums/apiPath";
import { Order, ProductPreview } from "@/common/types/types";
import { formatDate, formatPrice, getProductImage } from "@/helpers/helpers";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

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
  const language = useAppSelector((state) => state.settings.language);

  const fetchProduct = async (sku: string): Promise<ProductPreview[]> => {
    let query = `${ROOT}${ApiPath.ITEMSAPI}?filters[sku][$eq]=${sku}`;
    if (language) {
      query += `&locale=${language}`;
    }
    const items = await fetch(query, {
      method: "GET",
    });
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
            attributes: { name, price, image, sku, slug },
          } = item[0];
          items.push({
            id,
            count: products.find((p) => p.sku === sku)?.count as number,
            attributes: {
              name,
              price,
              image,
              size: products.find((p) => p.sku === sku)?.size as string,
              sku,
              slug,
            },
          });
        });
      } else {
        const {
          id,
          attributes: { name, price, image, sku, slug },
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
            slug,
          },
        });
      }

      setProductsData(items);
    });
  }, [products, language]);

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
            <Box key={item.id} className={styles.details}>
              <Box className={styles.image}>
                <Link // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  to={`/item/${item.attributes.slug}`}
                >
                  <img
                    width="200"
                    height="200"
                    src={getProductImage(item.attributes.image)}
                    alt={item?.attributes?.name}
                  />
                </Link>
              </Box>
              <Box className={styles.detailsText}>
                <Box className={styles.leftCol}>
                  <Link // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    to={`/item/${item.attributes.slug}`}
                    className={styles.productLink}
                  >
                    <Typography className={styles.name}>
                      {item?.attributes?.name}
                    </Typography>
                  </Link>
                  <Typography className={styles.count}>
                    {t("count")}: {item?.count}
                  </Typography>
                  {item?.attributes.size && (
                    <Typography className={styles.size}>
                      {t("size")}: {item?.attributes.size}
                    </Typography>
                  )}
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
