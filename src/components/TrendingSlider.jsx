import React from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";

// img, icons
import bgImg from "../assets/dummy-img.jpg";

import { BiChat, BiHeart } from "react-icons/bi";

function TrendingSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  var cardStyle = {
    height: "320px",
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroudPosition: "center",
    borderRadius: "8px",
  };

  var iconStats = {
    fontSize: "16px",
  };

  return (
    <Slider {...settings}>
      <div className="px-2">
        <Card style={cardStyle}>
          <Card.Body className="slide-stats">
            <ul className="list-unstyled">
              <li>
                <BiHeart style={iconStats} /> 79
              </li>
              <li>
                <BiChat style={iconStats} /> 122
              </li>
              <li>12 jam</li>
            </ul>
          </Card.Body>
        </Card>
        <h4 className="text-white fw-bold text-center m-3">
          Ngeri-Ngeri Sedap Jadi Film Pertama Tika Panggabean dengan Latar
          Budaya Batak
        </h4>
      </div>
      <div className="px-2">
        <Card style={cardStyle}>
          <Card.Body className="slide-stats">
            <ul className="list-unstyled">
              <li>
                <BiHeart style={iconStats} /> 79
              </li>
              <li>
                <BiChat style={iconStats} /> 122
              </li>
              <li>12 jam</li>
            </ul>
          </Card.Body>
        </Card>
        <h4 className="text-white fw-bold text-center m-3">
          Ngeri-Ngeri Sedap Jadi Film Pertama Tika Panggabean dengan Latar
          Budaya Batak
        </h4>
      </div>
    </Slider>
  );
}

export default TrendingSlider;
