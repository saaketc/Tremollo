import React from "react";
import { Typography, Container } from "@material-ui/core";
import background from "../illustrations/guitar-about.jpg";
import "../styles/auth.css";
import Footer from "./footer";

const About = () => {
  return (
    <Container>
      <div className="container-bg">
        <img src={background} className="bg" alt="" />
      </div>

      <div className="div-about" style={{ color: 'black' }}>
        <br/>
        <br/>
        <Typography variant="h4" style={{fontWeight:600}}>Who are we?</Typography>
        <br />

        <Typography variant="p" style={{fontWeight:500}}>
          We are a team of crazy, passionate and committed people who love to
          solve problems in fun and exciting ways. <br /><br/>
          We believe problem-solving is not just a business or a painful
          experience but rather a beautiful and adventurous journey. <br /><br/>
          We are excited and proud to call ourselves a made in India company.
        </Typography>
        <br />
        <br />
        <Typography variant="h4" style={{fontWeight:600}}>Our mission statement</Typography>
        <br />
        <Typography variant="p" style={{fontWeight:500}}>
          "We believe that music connects everyone with love and empathy.
          Everyone has the right to speak this language of love and happiness.{" "}
          <br />
          We want to create a musical ecosystem such that no artist has to ever
          leave his passion and love for music while giving music lovers the
          best experience they can ever have." <br />
          <br /> We need you to make tremollo better and make our mission
          possible
          <br /> so that we can help many more such independent artists to make
          their dream of living the music a reality.
        </Typography>
        <br />
        <br />
        <Typography variant="h5" style={{fontWeight:500}}>
          You can always connect with us or give us your valuable feedback!
        </Typography>
        <br />

        <Typography variant="p">
          If you care for a better service
          <br /> please do write to us at  <span style={{fontWeight:600}}>feedback@tremollo.co</span>
        </Typography>
        <br />
        <br />
        <Typography variant="p">
          For any queries reach us out at  <br />
          <span style={{fontWeight:600}}>support@tremollo.co </span>
        </Typography>

        <br />
        <br />
        <Typography variant="p" style={{fontWeight:600}}>
          "Happy music-loving and sharing!" <br />
          "And yes we love you too :)"
        </Typography>
      </div>
      <Footer/>
    </Container>
  );
};

export default About;
