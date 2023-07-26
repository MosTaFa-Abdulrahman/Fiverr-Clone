import "./slide.scss";
import Slider from "infinite-react-carousel";

// From Home Page
function Slide({ children, slidesToShow, arrowsScroll }) {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} dots>
          {children}
        </Slider>
      </div>
    </div>
  );
}

export default Slide;
