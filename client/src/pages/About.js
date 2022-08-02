import React from "react";
import Navbar from "../components/Navbar";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <Navbar>ABOUT ME</Navbar>
      <div className="about-image">
        <div className="about-image-container">
          <img
            src="https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.18169-9/17021874_1336840583044180_1587342284408684899_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=sqQumQgaJkwAX_JEns6&tn=fWvntMetaUzJrRkv&_nc_ht=scontent.fbkk5-1.fna&oh=00_AT80uM312XHeX7vdgNy56Q7f1jLbG5TjolRTv65DiufsDw&oe=63044C8C"
            alt="profile not found"
          />
        </div>
        <div className="about-name">
          <h1>
            Thanat Raktham
            {"   (Sun)"}
          </h1>
        </div>
        <div className="about-info">
          <fieldset>
            <legend>About Me</legend>
            <p>
              I am a third-year computer engineering student of Chulalongkorn
              University ﬁnding an opportunity to improve skills in web
              developer and game developer skills
            </p>
          </fieldset>
        </div>
        <div className="about-contact">
          <div>
            <a
              href="https://www.instagram.com/t_raktham/"
              target="_blank"
              rel="noreferrer"
              className="about-icon icon--instagram"
            >
              <i className="ri-instagram-line" />
            </a>
            <a
              href="https://www.facebook.com/thanat.raktham/"
              target="_blank"
              rel="noreferrer"
              className="about-icon icon--facebook"
            >
              <i className="ri-facebook-box-fill" />
            </a>
            <a
              href="https://github.com/thanatraktham"
              target="_blank"
              rel="noreferrer"
              className="about-icon icon--github"
            >
              <i className="ri-github-fill" />
            </a>
          </div>
          <div>
            <a
              href="mailto:thanat.sun19821@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="about-icon icon--mail"
            >
              <i className="ri-mail-line" />
            </a>
            <a
              href="tel:+66-080-600-5088"
              target="_blank"
              rel="noreferrer"
              className="about-icon icon--phone"
            >
              <i className="ri-phone-line" />
            </a>
            <a
              href="https://line.me/ti/p/Hy8x2te8T9"
              target="_blank"
              rel="noreferrer"
              className="about-icon icon--line"
            >
              <i className="ri-line-fill" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
