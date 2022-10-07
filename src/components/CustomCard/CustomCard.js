import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import weatherIcon from "assets/image/weather-img.png";
import { weatherCodeToText } from "utils/formatter";
import wallpaperImg from "assets/image/wallpaper.jpg";
import "./CustomCard.scss";
import { useNavigate } from "react-router-dom";

export default function CustomCard(props) {
  let navigateTo = useNavigate();
  const { weatherData, variant } = props;

  return (
    <Card
      sx={{
        marginBottom: 3,
        paddingTop: 2,
        width: variant === "lg" ? "70vw" : "20vw",
      }}
    >
      <CardActionArea
        onClick={
          variant === "not-clickable"
            ? null
            : () => navigateTo(`/hourly-forecast/${weatherData.date}`)
        }
      >
        <CardMedia
          component="img"
          height="140"
          image={variant === "lg" ? wallpaperImg : weatherIcon}
          alt="weather"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant={variant === "lg" ? "h3" : "h5"}
            component="div"
          >
            {weatherData?.date ? weatherData?.date : weatherData?.time}
          </Typography>
          <Typography
            variant={variant === "lg" ? "body1" : "body2"}
            color="text.secondary"
          >
            {weatherCodeToText(weatherData?.weatherCode)}
          </Typography>
          <Typography
            variant={variant === "lg" ? "body1" : "body2"}
            color="text.secondary"
          >
            {weatherData?.temp
              ? weatherData?.temp + "°C"
              : weatherData?.minTemp + "°C - " + weatherData?.maxTemp + "°C"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
