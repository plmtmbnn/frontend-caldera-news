import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
// import Slider from "react-slick";

// img, icons
import { BiChat, BiHeart } from "react-icons/bi";
import { Link } from "react-router-dom";

// api
import { newsApi } from "../api/api.news";
import util from '../helper/util';

import newsImage from '../assets/news-image.jpg';
import danauToba from '../assets/danau-toba.jpg';

import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const getImage = (image_url) => {
  if(image_url){
    const current = 
    `${process.env.REACT_APP_API_END_POINT}/news/image/news/${image_url}`;
    return(current);
  } else {
    return newsImage;
  }
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

  var urls = [];

  const showNews = () => {
    const result = [];
    urls = [];

    trendingNewsList.map((data, i) => {
      const newsUrl = `/article/${data.news_url}`;
      urls.push(newsUrl);
      result.push(
        <Slide index={i} key={data.id+String(Math.random())}>
          <div className="px-2" key={data.id+String(Math.random())}>
            <Link
            onClick={()=>{
              window.scrollTo(0, 0);
            }}
            to={urls[i]} 
            className="link"
            key={data.id+String(Math.random())}>
            <Card
              style={{
                ...cardStyle,
                backgroundImage: `url(${getImage(data.image_url)})`,
              }}
              key={i}
            >
              <Card.Body className="slide-stats">
                <ul className="list-unstyled">
                  <li>
                    <BiHeart style={iconStats} /> {Math.floor((Math.random() * 500))} 
                    {/* {data.total_likes} */}
                  </li>
                  <li>
                    <BiChat style={iconStats} /> {data.total_comment}
                  </li>
                  <li>
                    {data.posted_at
                      ? util.indonesiaFormat(data.posted_at)
                      : "-"}
                  </li>
                </ul>
              </Card.Body>
            </Card>
            <h4 className="text-white fw-bold text-center m-3">
              {data.title}
            </h4>
            </Link>
          </div>
        </Slide>
        
      );
    })

    return result;
  }

  return (
    <>
    <CarouselProvider
        naturalSlideWidth = {50}
        naturalSlideHeight = {window.screen.width <= 760 ? 65 : 25}
        totalSlides={3}
        isPlaying={true}
        interval={5000}
      >
        <Slider>
        {showNews()}
        </Slider>
      </CarouselProvider>

      {/* <Slider {...settings} key={String(Math.random())}>
      {
        trendingNewsList.length === 0 ?
        <div className="px-2" key={String(Math.random())}>
                <Card
                  style={{
                    ...cardStyle,
                    backgroundImage: `url(${danauToba})`,
                  }}
                >
                  <Card.Body className="slide-stats">
                  </Card.Body>
                </Card>
                <h4 className="text-white fw-bold text-center m-3">
                  {'caldera.id | Mengulas Sedalam Kaldera'}
                </h4>
        </div>
        :
        showNews()
      }
      </Slider> */}
    </>
    
  );
}

export default TrendingSlider;
