import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Slider from "react-slick";

// img, icons
import { BiChat, BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";

// api
import { newsApi } from "../api/api.news";
import moment from "moment";

const categoryImageList = [
  "Beach",
  "danautoba",
  "indonesia",
  "sumatera",
  "holiday",
  "travelling",
  "food",
];
const getRandomImage = () => {
  return `https://source.unsplash.com/random/500/?${
    categoryImageList[(Math.random() * categoryImageList.length) | 0]
  }`;
};

function TrendingSlider() {
  const [trendingNewsList, setTrendingNewsList] = useState([]);
  const getTrendingNewsList = async (payload) => {
    const result = await newsApi.getNewsList(payload);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setTrendingNewsList(result.data);
    } else {
      setTrendingNewsList([]);
    }
  };

  useEffect(() => {
    getTrendingNewsList({
      is_trending: true,
      status: "PUBLISH",
      limit: 3,
      offset: 0,
    });
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  var cardStyle = {
    height: "320px",
    backgroundSize: "cover",
    backgroudPosition: "center",
    borderRadius: "8px",
  };

  var iconStats = {
    fontSize: "16px",
  };

  return (
    <Slider {...settings}>
      {trendingNewsList.map((data, i) => {
        return (
          <Link to={`/article/${data.news_url}`} className="link" key={i}>
            <div className="px-2">
              <Card
                style={{
                  ...cardStyle,
                  backgroundImage: `url(${data.image_url || getRandomImage()})`,
                }}
              >
                <Card.Body className="slide-stats">
                  <ul className="list-unstyled">
                    <li>
                      <BiHeart style={iconStats} /> {data.total_likes}
                    </li>
                    <li>
                      <BiChat style={iconStats} /> {data.total_comment}
                    </li>
                    <li>
                      {data.posted_at
                        ? moment(data.posted_at).format("DD MMM YYYY")
                        : "-"}
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <h4 className="text-white fw-bold text-center m-3">
                {data.title}
              </h4>
            </div>
          </Link>
        );
      })}
    </Slider>
  );
}

export default TrendingSlider;
