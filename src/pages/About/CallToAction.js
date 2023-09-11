import React from "react";
import { useNavigate } from "react-router-dom";

function CallToAction({ calltoaction }) {
  const navigate = useNavigate();
  return (
    <div className="about-details" ref={calltoaction}>
      <li>
        <b>Step into the Spotlight:</b> Ready to showcase your creative
        brilliance? Whether you're an aspiring filmmaker, a seasoned content
        creator, or someone with a story to tell, it's time to step into the
        spotlight. Join us on YouFeat and let your videos take center stage.
      </li>
      <li>
        <b>Unleash Your Creativity:</b> Don't let your ideas stay confined – set
        them free through the magic of video storytelling. Embrace the power of
        creative expression and embark on a journey of imagination, innovation,
        and inspiration.
      </li>
      <li>
        <b> Connect and Collaborate:</b> Become part of a vibrant community that
        thrives on collaboration. Connect with fellow creators, exchange ideas,
        and collaborate on projects that push the boundaries of creativity.
        Together, we're shaping the future of storytelling.
      </li>
      <li>
        <b>Celebrate Your Achievements:</b> Your hard work deserves to be
        celebrated. Whether it's a compelling narrative, stunning visuals, or a
        fresh perspective, we're here to honor your achievements. Share your
        videos, gain recognition, and make an impact.
      </li>
      <li>
        <b>Join the Movement:</b> It's more than just a platform; it's a
        movement that celebrates creativity, empowers voices, and sparks change.
        Join us on YouFeat and be part of a community that's redefining the art
        of storytelling.
      </li>
      <li>
        <b> Start Your Journey:</b> Your journey starts with a single step and
        that step is joining YouFeat. Let your videos become stories, your
        stories become inspiration, and your inspiration become a movement. The
        stage is set; it's time for you to shine.
      </li>
      <li>
        <b>Join Us Today:</b> Let your creativity soar, your stories be heard,
        and your dreams come alive. Welcome to YouFeat Nigeria Limited, where
        every video has a story, and every story matters. Join us and be part of
        a creative revolution.
        <br />
        <span
          onClick={() => navigate("../signup")}
          style={{
            color: "purple",
            textDecoration: "underline",
            cursor: "pointer",
          }}>
          SignUp
        </span>
      </li>
    </div>
  );
}

export default CallToAction;
