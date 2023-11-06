import { Skeleton } from "@mui/material";
import clsx from "clsx";
import React, { useState } from "react";

interface ImageProps {
  src: string;
  width: string;
  height: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

export const Image = ({
  src,
  width,
  height,
  alt,
  className,
  onClick,
}: ImageProps): React.ReactElement => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{ maxWidth: "100%" }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx(className, loading ? "loading" : "")}
        onClick={onClick}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};
