import "./home.scss";
import Featured from "../../components/featured/Featured";
import Trust from "../../components/trust/Trust";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import check from "../../images/check.png";
import { cards, projects } from "../../dummyData";
import webVideo from "../../images/videoBg.mp4";
import ProjectCard from "../../components/projectCard/ProjectCard";

function Home() {
  return (
    <div className="home">
      <Featured />
      <Trust />

      <Slide slidesToShow={3} arrowsScroll={1}>
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src={check} alt="" />
              The best for every budget
            </div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <div className="title">
              <img src={check} alt="" />
              The best for every budget
            </div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <div className="title">
              <img src={check} alt="" />
              The best for every budget
            </div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <div className="item">
            <video src={webVideo} controls loop autoPlay />
          </div>
        </div>
      </div>

      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard item={card} key={card.id} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
