import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { ApiPath } from "@enums/apiPath";
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
import { CartItem } from "@/common/types/types";
import { formatStringCapitalize, formatPrice } from "@helpers/helpers";
import { Quantity } from "@/components/general/quantity/Quantity";
import { v4 as uuidv4 } from "uuid";
import { addToCartById } from "@/store/cart/slice";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const Product = (): React.ReactElement => {
  const { t } = useTranslation();
  const { itemId } = useParams() as { itemId: string };
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<CartItem>();
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("");
  const [error, setError] = useState<string>();

  const descreaseCount = (): void => {
    setCount(Math.max(count - 1, 1));
  };

  const increaseCount = (): void => {
    setCount(count + 1);
  };

  async function getItem(): Promise<void> {
    const item = await fetch(
      `${ApiPath.ROOT}/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      },
    );

    const itemData = await item.json();
    setItem(itemData.data);
  }

  const handleSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    size: string,
  ): void => {
    setSize(size);
  };

  const handleAddToCart = (): void => {
    if (!item) return;
    if (!size) {
      setError(t("chooseSizeError"));
      return;
    } else {
      setError("");
    }
    dispatch(
      addToCartById({ id: item.id, count, size, price: item.attributes.price }),
    );
  };

  useEffect(() => {
    getItem().catch((err) => console.log(err));
  }, [itemId]);

  return (
    <>
      {item && (
        <Box className={styles.section}>
          <Container>
            <Grid container spacing={8}>
              {item.attributes.image.data && (
                <Grid item sm={5} xs={12}>
                  <img
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    src={`${ApiPath.ROOT}${item.attributes.image.data.attributes.formats.medium.url}`}
                    alt={item.attributes.name}
                    className={styles.mainImage}
                  />
                </Grid>
              )}
              <Grid item sm={7} xs={12}>
                <Typography variant="h2" className={styles.productTitle}>
                  {item.attributes.name}
                </Typography>
                {item.attributes.category && (
                  <Typography className={styles.category}>
                    {formatStringCapitalize(item.attributes.category)}
                  </Typography>
                )}
                <Typography className={styles.price}>
                  {formatPrice(item.attributes.price)}
                </Typography>
                <Typography className={styles.description}>
                  {item.attributes.fullDescription}
                </Typography>
                <Quantity
                  callbackDecrease={descreaseCount}
                  callbackIncrease={increaseCount}
                  quantity={count}
                />
                <Box className={styles.sizeContainer}>
                  <Typography>{t("selectSize")}:</Typography>
                  <ToggleButtonGroup
                    exclusive
                    onChange={handleSizeChange}
                    value={size}
                    className={styles.sizeButtons}
                  >
                    {item.attributes?.size?.data.map((item) => (
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
