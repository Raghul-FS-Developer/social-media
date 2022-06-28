import React, { useState, useEffect } from "react";
import "../styles/share.css";
import { MdPermMedia } from "react-icons/md";
import axios from "axios";
import db from "../db";
import { AiFillTags } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { BsEmojiSmileFill, BsSunsetFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function Share() {
  const [user1, setUser1] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    let getData = async () => {
      let res = await axios.get(`${db}getauser/${currentUser}`);
      setUser1(res.data.data);
    };
    getData();
  }, []);

  const myStorage = window.localStorage;
  const navigate = useNavigate();
  const userId = myStorage.getItem("userId");
  const currentUser = myStorage.getItem("user");

  let handlenav = () => {
    navigate(`/profile/${currentUser}`);
    window.location.reload()
  };
  const [image, setImage] = useState("");

  if(image == undefined){
    setImage('')

};

  const formdata = new FormData();

  const handleShare = async (e) => {
    e.preventDefault();

    formdata.append("userId", userId);
    formdata.append("disc", value);
    formdata.append("Image", image);

    let res = await axios.post(`${db}post`, formdata);
    if (res.data.statuscode === 200) {
      window.location.reload();
    }
  };

  return (
    <form className="share" onSubmit={handleShare}>
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user1
                ? user1
                : "https://globalcenters.columbia.edu/themes/custom/columbia/assets/img/people-default.svg"
            }
            onClick={handlenav}
          />
          <input
            className="shareInput"
            placeholder={`what's in your mind ${currentUser}?`}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <hr className="shareHr" />

        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <MdPermMedia color="tomato" className="shareIcon" />
              <label style={{ cursor: "pointer" }} className="shareOptionText">
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                upload a photo
              </label>
            </div>
            <div className="shareOption">
              <AiFillTags color="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <HiLocationMarker color="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <BsEmojiSmileFill color="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </div>
      </div>
    </form>
  );
}

export default Share;
