import { useEffect, useState } from "react";
import classes from "./Description.module.css";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import UserService from "../compenent/layout/service/UserService";

import { useSignal } from "@preact/signals-react";
function Description(props) {
  //******************************************************************* */

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const isParticipateAdmin = UserService.isParticipateAdmin();
  const existDescreption = useSignal();
  const existImage = useSignal("");
  const existeImageName = useSignal("");
  //************************************************************************ */
  const [FullDescription, setFullDescription] = useState({
    imageName: "",
    imageType: "",
    imageData: "",
    qcmDescription: "",
    qcmStandard: {},
  });
  const [SrcImageLink, setSrcImageLink] = useState("");
  const [displyImage, setDiplayImage] = useState(false);
  const [displayDesc, setDisplayDesc] = useState(false);
  function killCopy(e) {
    if (isParticipateAdmin) {
      console.log("is admin or partic");
    } else {
      return false;
    }
  }
  useEffect(() => {
    document.onmousedown = killCopy;
    console.log("we hereee");
    console.log(props.qcmIdPropsQcmDesc);
    getFullDesc(props.qcmIdPropsQcmDesc);
  }, []);

  const getFullDesc = async (qcmId) => {
    try {
      const fullDescResult = await axios.get(
        `https://goatqcm-instance.com/fulldesc/descqcm/${qcmId}`
      );
      existDescreption.value = fullDescResult.data.qcmDescription;
      existImage.value = fullDescResult.data.imageData;
      existeImageName.value = fullDescResult.data.imageName;
      console.log(existDescreption.value);
      console.log(fullDescResult.data.imageName);
      setFullDescription(fullDescResult.data);
    } catch (Exception) {}

    console.log(existeImageName.value.length);
    if (existeImageName.value.length !== 0) {
      setSrcImageLink(
        `https://goatqcm-instance.com/image/${props.qcmIdPropsQcmDesc}/${existeImageName.value}`
      );

      setDiplayImage(true);
    } else {
      setDiplayImage(false);
    }

    if (existDescreption.value !== null) {
      setDisplayDesc(true);
    } else {
      setDisplayDesc(false);
    }
  };

  return (
    <>
      {isDesktopOrLaptop && (
        <div className={`${classes.fulldesccontainer} `}>
          <div className={`${classes.desccontainer} shadow `}>
            {displyImage && (
              <div className={`${classes.imagedesc} shadow `}>
                <img src={SrcImageLink} />
              </div>
            )}
            {displayDesc && (
              <div className={`${classes.carddesc} table-hover  `}>
                <p className="card-text">{FullDescription.qcmDescription}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className={`${classes.desccontainer_phone} shadow `}>
          {displyImage && (
            <div className={`${classes.imagedesc_phone} shadow `}>
              <img src={SrcImageLink} />
            </div>
          )}
          {displayDesc && (
            <div className={`${classes.carddesc_phone} table-hover  `}>
              <p className="card-text">{FullDescription.qcmDescription}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Description;
