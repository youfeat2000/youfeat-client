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
              <i onClick={CopyUrl}>
                <BiLinkAlt />
              </i>
              <FacebookShareButton url={userUrl} onClick={close}>
                <FacebookIcon round={true} size={45} />
              </FacebookShareButton>

              <TwitterShareButton url={userUrl} onClick={close}>
                <TwitterIcon round={true} size={45} />
              </TwitterShareButton>

              <LinkedinShareButton url={userUrl} onClick={close}>
                <LinkedinIcon round={true} size={45} />
              </LinkedinShareButton>

              <WhatsappShareButton url={userUrl} onClick={close}>
                <WhatsappIcon round={true} size={45} />
              </WhatsappShareButton>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default SocialShare;
