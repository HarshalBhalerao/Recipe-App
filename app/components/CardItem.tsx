import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

type Recipe = {
  id: number;
  title: string;
  ingredients: string;
  description: string;
  imgUrl: string;
};

// Default image used when image does not exist or query results in 404 status code
const defaultImageUrl =
  "https://images.pexels.com/photos/4105287/pexels-photo-4105287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

/**
 * displayImage function
 * @description Returns imgUrl string, if it does not exist then returns defaultImage
 * @param imgUrl
 * @returns string
 */
const displayImage = (imgUrl: string) => {
  if (imgUrl) {
    return imgUrl;
  } else {
    return defaultImageUrl;
  }
};

const CardItem = ({ item }: { item: Recipe }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 6 }}>
      <Link
        href={{
          pathname: "/recipes/[id]",
          query: { id: item?.id },
        }}
        as={`recipes/${item?.id}`}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={displayImage(item.imgUrl)}
            alt={item.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="flex justify-center items-center m-auto"
            >
              {item.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default CardItem;
