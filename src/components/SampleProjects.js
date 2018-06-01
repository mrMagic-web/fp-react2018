import React from 'react';
import {sampleProjects} from '../reducers/page_elements';
import categories from '../reducers/product_categories';
import { language } from '../helpers';
import Slider from "react-slick";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

class Custom extends React.Component {
    render(){
        var settings = {
            dots: false,
            autoplay: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                }
              }
            ]
          };
        return (
          <div className="sample">
            <div className="container">
              {/* <h2>{sampleProjects[language]}</h2> */}
              <Slider {...settings}>
                {categories[this.props.category].portfolio.map(prod => <img alt={prod} key={prod} src={`http://www.fastpack.dk/wp-content/uploads/${prod}.jpg`} />)}
              </Slider>
            </div>
          </div>
        )
    }
}
export default Custom;