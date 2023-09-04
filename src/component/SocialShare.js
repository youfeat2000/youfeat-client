import React from "react";
import { BiLinkAlt } from "react-icons/bi";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

function SocialShare({ userUrl, setUserUrl }) {
  const CopyUrl = () => {
    navigator.clipboard
      .writeText(userUrl)
      .then(() => alert("url copied to clipboard"))
      .catch(() => alert("error"))
      .finally(() => setUserUrl(null));
  };
  const close = () => {
    setUserUrl(null);
  };
  return (
    <>
      {userUrl && (
        <div className="share">
          <div>
            <h1 onClick={close}>&times;</h1>

            <h3>Share to</h3>
            <br />
            <ul>
              <li style={{ display: "flex", flexDirection: "column" }}>
                <i onClick={CopyUrl}>
                  <BiLinkAlt />
                </i>
                <span
                  style={{
                    color: "grey",
                    fontSize: "smaller",
                    textAlign: "center",
                  }}>
                  Link
                </span>
              </li>
              <FacebookShareButton
                url={userUrl}
                onClick={close}
                style={{ display: "flex", flexDirection: "column" }}>
                <FacebookIcon round={true} size={45} />
                <span
                  style={{
                    color: "grey",
                    fontSize: "smaller",
                    textAlign: "center",
                  }}>
                  Facebook
                </span>
              </FacebookShareButton>

              <TwitterShareButton
                url={userUrl}
                onClick={close}
                style={{ display: "flex", flexDirection: "column" }}>
                <TwitterIcon round={true} size={45} />
                <span
                  style={{
                    color: "grey",
                    fontSize: "smaller",
                    textAlign: "center",
                  }}>
                  Twitter
                </span>
              </TwitterShareButton>

              <LinkedinShareButton
                url={userUrl}
                onClick={close}
                style={{ display: "flex", flexDirection: "column" }}>
                <LinkedinIcon round={true} size={45} />
                <span
                  style={{
                    color: "grey",
                    fontSize: "smaller",
                    textAlign: "center",
                  }}>
                  Linkedin
                </span>
              </LinkedinShareButton>

              <WhatsappShareButton
                url={userUrl}
                onClick={close}
                style={{ display: "flex", flexDirection: "column" }}>
                <WhatsappIcon round={true} size={45} />
                <span
                  style={{
                    color: "grey",
                    fontSize: "smaller",
                    textAlign: "center",
                  }}>
                  Whatsapp
                </span>
              </WhatsappShareButton>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default SocialShare;
