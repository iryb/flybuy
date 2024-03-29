import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ApiPath, ROOT } from "@enums/apiPath";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Badge,
} from "@mui/material";
import { formatPrice, getProductImage } from "@helpers/helpers";
import { Quantity } from "@/components/general/quantity/Quantity";
import { v4 as uuidv4 } from "uuid";
import { addToCartById } from "@/store/cart/slice";
import { useTranslation } from "react-i18next";
import { useFetch } from "@/hooks/hooks";
import clsx from "clsx";
import { Loader } from "@components/general/loader/Loader";

import styles from "./styles.module.scss";

export const Product = (): React.ReactElement => {
  const { t } = useTranslation();
  const { slug } = useParams() as { slug: string };
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("");
  const [error, setError] = useState<string>();

  const {
    data: item,
    loading,
    error: requestErr,
  } = useFetch(`${ROOT}${ApiPath.ITEMSAPI}&filters[slug][$eq]=${slug}`);

  const descreaseCount = (): void => {
    setCount(Math.max(count - 1, 1));
  };

  const increaseCount = (): void => {
    setCount(count + 1);
  };

  const handleSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    size: string,
  ): void => {
    setSize(size);
  };

  const handleAddToCart = (): void => {
    if (!item) return;
    if (item[0].attributes.size) {
      if (!size) {
        setError(t("chooseSizeError"));
        return;
      } else {
        setError("");
      }
    }
    dispatch(
      addToCartById({
        id: item[0].id,
        count,
        size,
        price: item[0].attributes.price,
        sku: item[0].attributes.sku,
      }),
    );
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  if (requestErr) return <p>Error</p>;

  if (loading) return <Loader />;

  return (
    <>
      {item && (
        <Box className={clsx("page", styles.section)}>
          <Container>
            <Grid container spacing={8}>
              {item[0].attributes.image.data && (
                <Grid
                  item
                  sm={5}
                  xs={12}
                  className={styles.desktopImgContainer}
                >
                  <img
                    src={getProductImage(item[0].attributes.image)}
                    alt={item[0].attributes.name}
                    className={styles.mainImage}
                  />
                </Grid>
              )}
              <Grid item sm={7} xs={12}>
                <Typography variant="h2" className={styles.productTitle}>
                  {item[0].attributes.name}
                </Typography>
                {item[0].attributes.image.data && (
                  <Box className={styles.mobileImgContainer}>
                    <img
                      src={getProductImage(item[0].attributes.image)}
                      alt={item[0].attributes.name}
                      className={styles.mainImage}
                    />
                  </Box>
                )}
                <Typography className={styles.price}>
                  {formatPrice(item[0].attributes.price)}
                </Typography>
                <Typography
                  className={clsx("textFormatted", styles.description)}
                >
                  {item[0].attributes.fullDescription}
                </Typography>
                <Quantity
                  callbackDecrease={descreaseCount}
                  callbackIncrease={increaseCount}
                  quantity={count}
                />
                {item[0].attributes?.size && (
                  <Box className={styles.sizeContainer}>
                    <Typography>{t("selectSize")}:</Typography>
                    <ToggleButtonGroup
                      exclusive
                      onChange={handleSizeChange}
                      value={size}
                      className={styles.sizeButtons}
                    >
                      {item[0].attributes?.size?.data.map((item: any) => (
                        <ToggleButton value={item.size} key={uuidv4()}>
                          {item.count < 10 && (
                            <Badge
                              color="error"
                              badgeContent={t("lowStock")}
                              sx={{
                                ".MuiBadge-badge": {
                                  padding: "3px",
                                  height: "30px",
                                  marginTop: "-15px",
                                },
                              }}
                            >
                              <Typography>{item.size}</Typography>
                            </Badge>
                          )}
                          {item.count >= 10 && (
                            <Typography>{item.size}</Typography>
                          )}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Box>
                )}
                {error && (
                  <Typography className="error message">{error}</Typography>
                )}
                <Button onClick={handleAddToCart} className={styles.button}>
                  {t("addToCardText")}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};
