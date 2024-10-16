import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./QuizBoard.module.css";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios, { formToJSON } from "axios";
import { useSignal } from "@preact/signals-react";
import { useLocation } from "react-router-dom";
import QuizBoardClinique from "./QuizBoardClinique";
import { useNavigate } from "react-router-dom";
import GoatLogo from "../compenent/layout/GoatLogo.png";
import externatlogo from "../compenent/layout/externatlogo.svg";
import courlogo from "../compenent/layout/courlogo.svg";
import groupelogo from "../compenent/layout/groupelogo.svg";
import A from "../compenent/layout/img/A.png";
import B from "../compenent/layout/img/B.png";
import C from "../compenent/layout/img/C.png";
import D from "../compenent/layout/img/D.png";
import E from "../compenent/layout/img/E.png";

import smileimoji from "../compenent/layout/img/smileimoji.png";
import sendcomentary from "../compenent/layout/img/sendcomentary.png";
import comment from "../compenent/layout/img/comment.png";
import dropright from "../compenent/layout/img/dropright.png";
import jadore from "../compenent/layout/img/jadore.png";
import { AiOutlineComment } from "react-icons/ai";
import BackdropQuiz from "./BackdropQuiz";
import UserService from "../compenent/layout/service/UserService";
import BackdropDeleteCour from "./BackdropDeleteCour";
import ModalDeleteFullDesc from "./ModalDeleteFullDesc";
import toast, { Toaster } from "react-hot-toast";
import Description from "./Description";
import ImageQcm from "./ImageQcm";
import { useMediaQuery } from "react-responsive";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { FaRegWindowClose } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { Margin, Style } from "@mui/icons-material";
import Picker from "emoji-picker-react";
import useLocalStorage from "use-local-storage";
import BackdropDoneQuiz from "./BackdropDoneQuiz";
import { faWhiskeyGlass } from "@fortawesome/free-solid-svg-icons";
import { IoIosArrowDropright } from "react-icons/io";
import { useStopwatch } from "react-timer-hook";
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoPauseCircleOutline } from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";

import BackdropSaveQuizPhone from "./BackdropSaveQuizPhone.jsx";
import { TfiClose } from "react-icons/tfi";
import { BsSave } from "react-icons/bs";
function QuizBoard(props) {
  const BASE_URL = "https://goatqcm-instance.com";
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const token = localStorage.getItem("tokengoat");
  let navigateLogin = useNavigate();
  let navigateEditeQcm = useNavigate();
  let navigateHome = useNavigate();
  let navigateDeleteQcmHandler = useNavigate();
  const years = [
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ];
  const [shoYearBackFromCliniqueParSujet, setshoYearBackFromCliniqueParSujet] =
    useState(false);
  const [ShowSideBare, setShowSideBare] = useState(false);
  const [ShowQcm, setShowQcm] = useState([]);

  let getQcms = useSignal([]);
  const resultGetLoadPropo = useSignal([]);
  const resultGetLoadQcms = useSignal([]);
  const [ShowPropositions, setShowPropositions] = useState([]);
  const currentIndex = useSignal(0);
  const [VisibiliteQcmIndex, setVisibiliteQcmIndex] = useState(0);
  //******multiple cours *****************************/
  const doneUplaodQcm = useSignal(true);
  let incCours = useSignal(0);
  let incCmntr = useSignal(0);
  //************************************************** */
  const [VisibilitePorpoIndex, setVisibilitePorpoIndex] = useState(0);
  const VisibleNextBtn = useSignal(true);
  const VisiblePrevBtn = useSignal(false);

  const COLORS = ["#fd5c63", "#50C878", "#FFC72C"];
  const [TrueInsertClr, setTrueInsertClr] = useState("");
  const [TrueInsertClrClick, setTrueInsertClrClick] = useState("");
  let [TrueFullInsertClr, setTrueFullInsertClr] = useState(false);
  let selectSaveIndex = useSignal([]);
  let AlphabetChoice = [A, B, C, D, E];
  let IndexAlphabetChoice = useSignal(-1);
  const [OpenBoardClinique, setOpenBoardClinique] = useState(false);
  const [VisibleParSujet, setVisibleParSujet] = useState(false);
  const [VisibleQmcContainer, setVisibleQmcContainer] = useState(false);
  const [GroupesPermut, setGroupesPermut] = useState([]);
  const [GetYearProps, setGetYearProps] = useState([]);
  const [VisibleGroupeChange, setVisibleGroupeChange] = useState("true");
  let getYear = useSignal("");
  let getGroupePerm = useSignal("");
  let getCurrentYear = "";
  let getCurrentGroupePerm = "";
  let getCasCliniqueLength = 0;
  const finalgetCasCliniqueLength = useSignal("");
  const [getlengthCasCliniqueParSjr, setgetlengthCasCliniqueParSjr] =
    useState("");
  /*const { state } = useLocation();
  const { courId, qcmType } = state;*/
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();
  const isParticipateAdmin = UserService.isParticipateAdmin();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  //******SideBare Change************************************* */
  //***************show descr***************************************** */
  const [qcmIdPropsQcmDesc, setQcmIdPropsQcmDesc] = useState("");

  const [ShowDescQcm, setShowDescQcm] = useState(false);
  const [ShowVerifierRpnsBtn, setShowVerifierRpnsBtn] = useState(true);
  const [ShowDescRpnsBtn, setShowDescRpnsBtn] = useState(false);
  const saveQcmIndex = useSignal([]);
  //******************************************************************** */
  //***********description methodes********************************************************* */
  //*****description variable********************** */
  const [file, setFile] = useState();
  const [fileEdite, setFileEdite] = useState();
  const [fileDisplay, setFileDisplay] = useState();
  const [FileDisplayEdite, setFileDisplayEdite] = useState("");
  const [LoadImage, setLoadImage] = useState("");
  const [description, setDescription] = useState("");
  const getFullDesc = useSignal();
  const [VisisbleDescUpdate, setVisisbleDescUpdate] = useState(false);
  const [visisbleDescInsert, setvisisbleDescInsert] = useState(false);
  const [FullDescEdite, setFullDescEdite] = useState({
    imageName: "",
    imageType: "",
    imageData: "",
    qcmDescription: "",
    qcmStandard: {},
  });
  //************************************************************************ */
  let saveAllQcms = useSignal([]);
  const userFinal = { id: "", name: "", lastname: "", password: "", role: "" };
  //*************commentary******************************************************************************** */
  const numberCommentaryQcm = useSignal([]);
  const [qcmCommentary, setQcmCommentary] = useState([]);
  const numbreCommentaryFinal = useSignal([]);
  const [visibleCommentaryStudent, setVisibleCommentaryStudent] =
    useState(false);

  const [CommentaryUpdate, setCommentaryUpdate] = useState({
    likes: "",
  });
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [ShowListQcms, setShowListQcms] = useState(false);
  //***************************************************************** */

  const [Commentary, setCommentary] = useState({
    commentaryStudent: "",
    ourUsers: {},
    qcmStandard: {},
  });

  //************************************************* */

  //****save propo selected******************************************* */
  let [savePropositions, setSavePropositions] = useState([]);
  let saveCurrentPropo = [];
  const [SaveVerfieReponses, setSaveVerfieReponses] = useState([]);
  const [SaveQcmIsAnswer, setSaveQcmIsAnswer] = useState([]);
  const [SaveClickSelectVerfieAll, setSaveClickSelectVerfieAll] = useState([]);
  const doneFirstUplaod = useSignal(false);
  //**********fin propo selected************************************* */
  //**timer*********************************************************** */
  let {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  const [ShowPlayBtn, setShowPlayBtn] = useState(false);
  const [ShowPauseBtn, setShowPauseBtn] = useState(true);

  //****************************************************************** */

  //*********commnetaire************************************************** */
  const getUser = async () => {
    console.log(userId);
    console.log(token);
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUserQcm.id = resultUserFinal.id),
        (saveUserQcm.name = resultUserFinal.name),
        (saveUserQcm.lastname = resultUserFinal.lastname),
        (saveUserQcm.password = resultUserFinal.password),
        (saveUserQcm.role = resultUserFinal.role),
        (save.ourUsers = userFinal);
    } catch (Exception) {
      console.log("user not found");
    }
  };
  //***************************************************************** **************************************/

  //********DoneQuiz********************************************* */
  const [ModalDoneQuizIsOpen, setModalDoneQuizIsOpen] = useState(false);
  //*****get qcm Commentary****************************************** */

  const getQcmCommentary = async (qcmId) => {
    const result = await axios.get(`${UserService.BASE_URL}/qcms/${qcmId}`);
    console.log(result.data);
    Commentary.qcmStandard = result.data;
  };
  //******************************************************************** */
  const [isDisabled, setDisabled] = useState(false);
  //***************************************************************************** */
  const [countJadore, setCountJadore] = useState(0);

  //******************************************************************* */
  //*****responde all ***********************************************// */
  const [IsRepondeAll, setIsRepondeAll] = useState(true);
  const IsRepondeAllSignal = useSignal(true);
  //****************************************************************** */
  //******percentage************************************** */
  const saveAllCouentSelect = useSignal([]);
  let [SavePercentageAmount, setSavePercentageAmount] = useState([]);
  let saveCurrentAmount = [];
  //********************************************************* */
  //*****save qcm******************************************* */
  const saveUserQcm = {
    id: "",
    name: "",
    lastname: "",
    password: "",
    role: "",
  };
  const [SaveQcmQuizz, setSaveQcmQuizz] = useState({
    nameQcmQuizz: "",
    qcmSujetTypeSelected: "",
    selectedSourceExmn: "",
    moduleId: "",
    moduleName: "",
    selectMultipleCours: "",
    qcmType: "",
    minYearQcm: "",
    maxYearQcm: "",
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
    ourUsers: {},
  });
  let [showSaveQcmBtn, setShowSaveQcmBtn] = useState(false);
  let [showUpdateQcmBtn, setShowUpdateQcmBtn] = useState(false);
  const [ModalSaveQuizzIsOpen, setModalSaveQuizzIsOpen] = useState(false);
  const [qcmQuizzName, setQcmQuizzName] = useState("");
  const doneFirstUplaodSaveQcm = useSignal(false);
  //********************************************************* */
  //****update qcmquizz************************************** */
  const [updateQcmQuizz, setUpdateQcmQuizz] = useState({
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
  });
  //********************************************************** */
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  const disableCopyPaste = (e) => {
    e.preventDefault();
  };
  //*********************************************************************** */
  const [modalDeleteCourIsOpen, setModalDeleteCourIsOpen] = useState(false);
  const qcmIddelete = useSignal("");
  //***get image from local distination and display it****** */
  const getFile = (e) => {
    setFile(e.target.files[0]);
    setFileDisplay(URL.createObjectURL(e.target.files[0]));
  };
  //*************************************************** */
  //***get image from local distination and display it****** */
  const getFileEdite = (e) => {
    setFileEdite(e.target.files[0]);
    setFileDisplayEdite(URL.createObjectURL(e.target.files[0]));
  };
  //*************************************************** */

  //****select liste qcms ***************************** */
  const [SelectQcmIndex, setSelectQcmIndex] = useState("");

  //***************************************************** */

  //****test if desc existe******************** */
  const testDescExsite = async (qcmId) => {
    const fullDescResult = await axios.get(
      `${BASE_URL}/fulldesc/descqcm/${qcmId}`
    );

    console.log(fullDescResult.data);
    if (fullDescResult.data !== null) {
      setFullDescEdite(fullDescResult.data);
      setFileDisplayEdite(
        `${BASE_URL}/image/${qcmId}/${fullDescResult.data.imageName}`
      );

      setLoadImage(fullDescResult.data);
      setvisisbleDescInsert(false);
      setVisisbleDescUpdate(true);
    } else {
      setvisisbleDescInsert(true);
      setVisisbleDescUpdate(false);
    }
    //getFullDesc.value = fullDescResult.data;
  };
  //******************************************* */
  ///*****update image************************************** */
  const UpdateImage = async (qcmId) => {
    console.log("update item");
    const formData = new FormData();
    formData.append("image", fileEdite);

    await axios
      .put(`${BASE_URL}/image/updateimage/${qcmId}`, formData)
      .then((res) => {
        console.log("success updating");
        setVisisbleDescUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */
  ///*****update description************************************** */
  const UpdateDesc = async (qcmId) => {
    console.log("update item");
    const formData = new FormData();
    formData.append("desc", FullDescEdite.qcmDescription);
    await axios
      .put(`${BASE_URL}/image/updatedesc/${qcmId}`, formData)
      .then((res) => {
        console.log("success updating");
        setVisisbleDescUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */
  //***store image to database*************************** */
  const AjouterImage = async (qcmId) => {
    testDescExsite(qcmId);

    const result = await axios.get(`${UserService.BASE_URL}/qcms/${qcmId}`);
    const formData = new FormData();
    console.log(result.data);
    console.log(file);
    formData.append("image", file);
    formData.append("qcmStandard", JSON.stringify(result.data));
    axios
      .post("https://goatqcm-instance.com/image/uploadimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setvisisbleDescInsert(false);
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */
  //***store description to database*************************** */
  const AjouterDesc = async (qcmId) => {
    testDescExsite(qcmId);
    const result = await axios.get(`${UserService.BASE_URL}/qcms/${qcmId}`);
    const formData = new FormData();
    formData.append("desc", description);
    formData.append("qcmStandard", JSON.stringify(result.data));
    axios
      .post("https://goatqcm-instance.com/image/uploadesc", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setvisisbleDescInsert(false);
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */
  //delete function*//////////////////////////////////////////////////////////
  const deleteFullDesc = async (qcmId) => {
    qcmIddelete.value = qcmId;
    setModalDeleteCourIsOpen(true);
  };

  function closeDeleteModalHandler() {
    setModalDeleteCourIsOpen(false);
  }
  ////////////////////////////////////////////////////////////////////////////
  //*****end of description methods**************************************************************************** */

  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************************* */
  function killCopy(e) {
    if (isParticipateAdmin) {
      console.log("is admin or partic");
    } else {
      return false;
    }
  }

  useEffect(() => {
    //***suizzDashboard********************************************** */
    console.log(props.QcmSujetTypeSelected); //parCours /parSujet
    console.log(props.SelectedSourceExmn); //Externat/Residanant
    console.log(props.moduleId); //module id
    console.log(props.selectMultipleCours); //cours Ids
    console.log(props.qcmType); //Qcm/casClinique/Qcm et casClinque
    console.log(props.minYearQcm); //minYear-parCours)
    console.log(props.maxYearQcm); //minMax-parCours)
    //************************************************************** */

    console.log(props.SaveQcmIsAnswer);
    console.log(props.SaveVerfieReponses);
    console.log(props.SaveClickSelectVerfieAll);
    console.log(props.SaveVerfieReponsesClinique);
    console.log(props.savePropositions);
    /* console.log(props.checkParSjtBiologieClinique);
     console.log(props.TrueFullInsertClr); 
     console.log(props.savePropositionsClinique);
    console.log(props.ExisteCasClinique);
    console.log(props.minMaxYearParSujetsFinal);
    console.log(props.QuizQcmQclinique);*/

    console.log(props.backFromCliniqueAllQcmCliniqueprSujet);
    if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
        console.log("hulaaaaaa");
        //setVisibleParSujet(true);
        setVisibleQmcContainer(true);
        //loadyearQcmsParSujet();
        loadQcms();
      }
      // if (props.goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt === true) {
      if (props.SelectedSourceExmn === "Externat Blida") {
        setVisibleParSujet(true);
        setVisibleQmcContainer(true);
        loadyearQcmsParSujet();
      } else if (props.SelectedSourceExmn === "Résidanat Blida") {
        console.log("weclom resdtn");
        setVisibleParSujet(true);
        setVisibleQmcContainer(true);
        loadyearQcmsParSujet();
        setVisibleGroupeChange(false);
      }
      //}
      // loadQcms();
      //} else if (props.QuizQcmQclinique === true) {
      /* setVisibleParSujet(true);
        setVisibleQmcContainer(true);*/

      //  }
    } else if (props.QcmSujetTypeSelected === "Par Cour") {
      setVisibleParSujet(false);
      setVisibleQmcContainer(true);
      loadQcms();
    }
  }, []);

  //***get years props*************************** *****************************/
  function loadyearQcmsParSujet() {
    setGetYearProps((GetYearProps) => props.minMaxYearParSujetsFinal);
  }
  //*************************************************************************** */
  //**load Qcm***************************************************************
  const loadQcms = async (doneLoadpropoBack) => {
    //**load Save propo************************************************ */
    if (
      props.backFromCliniqueAllQcmCliniqueprSujet === true &&
      doneFirstUplaod.value === false
    ) {
      doneFirstUplaod.value === true;
      console.log("hujaaaaaaaaa");
      setSavePropositions(props.savePropositions);
      setSaveVerfieReponses(props.SaveVerfieReponses);
      setTrueFullInsertClr(props.TrueFullInsertClr);
      setSaveClickSelectVerfieAll(props.SaveClickSelectVerfieAll);
      setSaveQcmIsAnswer(props.SaveQcmIsAnswer);
      setSavePercentageAmount(props.SavePercentageAmount);
      if (props.TrueFullInsertClr === true) {
        setSaveQcmIsAnswer(props.SaveClickSelectVerfieAll);
      }

      console.log(props.SaveClickSelectVerfieAll);
      console.log(props.TrueFullInsertClr);
    }
    //***************************************************************** */
    //**load Save propo************************************************ */
    if (
      props.commingFrom === "savequizz" &&
      doneFirstUplaodSaveQcm.value === false
    ) {
      doneFirstUplaodSaveQcm.value === true;
      console.log("hujaaaaaaaaa");
      setSavePropositions(props.savePropositions);
      setSaveVerfieReponses(props.SaveVerfieReponses);
      setSaveClickSelectVerfieAll(props.SaveClickSelectVerfieAll);
      setSaveQcmIsAnswer(props.SaveQcmIsAnswer);
      setSavePercentageAmount(props.SavePercentageAmount);
    }
    //***************************************************************** */

    //*** Qcm Type Qcm and Cas Clinique methodes---------------------------------------------- */
    if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
      if (props.QcmSujetTypeSelected === "Par Cour") {
        doneLoadpropoBack = true;
        doneUplaodQcm.value = doneLoadpropoBack;
        console.log(incCours.value);
        console.log(doneUplaodQcm.value);
        console.log(props.selectMultipleCours.length);

        while (
          doneUplaodQcm.value === true &&
          incCours.value < props.selectMultipleCours.length
        ) {
          doneUplaodQcm.value = false;
          try {
            const result = await axios.get(
              `${BASE_URL}/cours/${props.selectMultipleCours[incCours]}/qcms/${props.minYearQcm}/${props.maxYearQcm}/${props.SelectedSourceExmn}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            getQcms.value = result.data;
            saveAllQcms.value = result.data;
          } catch {
            console.log("qmc not find");
          }
          incCours.value = incCours.value + 1;
          if (saveAllQcms.value.length > 0) {
            for (let inc = 0; inc < getQcms.value.length; inc++) {
              setShowQcm((ShowQcm) => [...ShowQcm, getQcms.value[inc]]);
              numberCommentaryQcm.value[inc] = getQcms.value[inc].id;
              if (inc === getQcms.value.length - 1) {
                loadProposition();
                getCommentNbr(numberCommentaryQcm.value);
                doneUplaodQcm.value = false;
              }
            }
          } else {
            if (incCours.value <= props.selectMultipleCours.length) {
              doneUplaodQcm.value = true;
            }

            console.log("no clinique found");
          }
        }
        if (getQcms.value.length === 1) {
          VisibleNextBtn.value = false;
          VisiblePrevBtn.value = false;
        } else if (getQcms.value.length > 1) {
          setVisibiliteQcmIndex(0);
          VisibleNextBtn.value = true;
        }
      } else if (props.QcmSujetTypeSelected === "Par Sujet") {
        console.log("mamaaa");
        const getCurrentGroupePerm =
          document.getElementById("groupepermutation").value;
        const getCurrentYear = document.getElementById("year").value;
        try {
          const result = await axios.get(
            `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${getCurrentYear}/${getCurrentGroupePerm}/${props.SelectedSourceExmn}`
          );
          currentIndex.value = 0;
          setVisibiliteQcmIndex(0);
          setShowQcm([]);
          setShowPropositions([]);
          getQcms.value = result.data;
          setShowQcm(getQcms.value);

          if (getQcms.value.length === 1) {
            VisibleNextBtn.value = false;
            VisiblePrevBtn.value = false;
          } else if (getQcms.value.length > 1) {
            setVisibiliteQcmIndex(0);
            VisibleNextBtn.value = true;
          }
          console.log(getQcms.value);
          loadProposition();
        } catch {
          console.log("qmc not find");
        }
        //***get commentary number************************************* */
        for (let i = 0; i < getQcms.value.length; i++) {
          numberCommentaryQcm.value[i] = getQcms.value[i].id;
        }
        getCommentNbr(numberCommentaryQcm.value);
        //*************************************************************** */
      }
    }
    //-------------------------------------------------------------------------------------- */
    //*** Tous (Qcm,Cas Clinique methodes------------------------------------------------------ */
    else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      if (props.QcmSujetTypeSelected === "Par Cour") {
        console.log("par cours ");
        if (props.SelectedSourceExmn === "Externat Blida") {
          doneLoadpropoBack = true;
          doneUplaodQcm.value = doneLoadpropoBack;
          console.log(incCours.value);
          console.log(doneUplaodQcm.value);
          console.log(props.selectMultipleCours.length);

          while (
            doneUplaodQcm.value === true &&
            incCours.value < props.selectMultipleCours.length
          ) {
            doneUplaodQcm.value = false;
            try {
              const result = await axios.get(
                `${BASE_URL}/cours/${props.selectMultipleCours[incCours]}/qcms/${props.minYearQcm}/${props.maxYearQcm}/${props.SelectedSourceExmn}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              getQcms.value = result.data;
              saveAllQcms.value = result.data;
            } catch {
              console.log("qmc not find");
            }
            incCours.value = incCours.value + 1;
            if (saveAllQcms.value.length > 0) {
              for (let inc = 0; inc < getQcms.value.length; inc++) {
                setShowQcm((ShowQcm) => [...ShowQcm, getQcms.value[inc]]);
                numberCommentaryQcm.value[inc] = getQcms.value[inc].id;
                if (inc === getQcms.value.length - 1) {
                  loadProposition();
                  getCommentNbr(numberCommentaryQcm.value);
                  doneUplaodQcm.value = false;
                }
              }
            } else {
              if (incCours.value <= props.selectMultipleCours.length) {
                doneUplaodQcm.value = true;
              }
            }
          }

          if (props.ExisteCasClinique === true) {
            finalgetCasCliniqueLength.value = 1;
            setgetlengthCasCliniqueParSjr(
              finalgetCasCliniqueLength.value.length
            );
          } else {
            if (getQcms.value.length === 1) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = false;
            } else if (getQcms.value.length > 1) {
              setVisibiliteQcmIndex(0);
              VisibleNextBtn.value = true;
            }
          }

          //********************************************************************************* */

          //***get commentary number************************************* */
          for (let i = 0; i < getQcms.value.length; i++) {
            numberCommentaryQcm.value[i] = getQcms.value[i].id;
          }
          getCommentNbr(numberCommentaryQcm.value);
          //*************************************************************** */
        } else if (props.SelectedSourceExmn === "Résidanat Blida") {
          console.log("resdnt hulaa ");

          console.log(props.ExisteCasClinique);
          console.log(props.selectMultipleCours[0]);
          doneLoadpropoBack = true;
          doneUplaodQcm.value = doneLoadpropoBack;
          console.log(incCours.value);
          console.log(doneUplaodQcm.value);
          console.log(props.selectMultipleCours.length);

          while (
            doneUplaodQcm.value === true &&
            incCours.value < props.selectMultipleCours.length
          ) {
            doneUplaodQcm.value = false;
            try {
              const result = await axios.get(
                `${BASE_URL}/cours/${props.selectMultipleCours[incCours]}/qcms/${props.minYearQcm}/${props.maxYearQcm}/${props.SelectedSourceExmn}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              getQcms.value = result.data;
              saveAllQcms.value = result.data;
            } catch {
              console.log("qmc not find");
            }
            incCours.value = incCours.value + 1;
            if (saveAllQcms.value.length > 0) {
              for (let inc = 0; inc < getQcms.value.length; inc++) {
                setShowQcm((ShowQcm) => [...ShowQcm, getQcms.value[inc]]);
                numberCommentaryQcm.value[inc] = getQcms.value[inc].id;
                if (inc === getQcms.value.length - 1) {
                  loadProposition();
                  getCommentNbr(numberCommentaryQcm.value);
                  doneUplaodQcm.value = false;
                }
              }
            } else {
              if (incCours.value <= props.selectMultipleCours.length) {
                doneUplaodQcm.value = true;
              }
            }
          }

          if (props.ExisteCasClinique === true) {
            console.log("we ffff");
            finalgetCasCliniqueLength.value = 1;
            setgetlengthCasCliniqueParSjr(
              finalgetCasCliniqueLength.value.length
            );
          } else {
            if (getQcms.value.length === 1) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = false;
            } else if (getQcms.value.length > 1) {
              setVisibiliteQcmIndex(0);
              VisibleNextBtn.value = true;
            }
          }
        }

        //***get commentary number************************************* */
        for (let i = 0; i < getQcms.value.length; i++) {
          numberCommentaryQcm.value[i] = getQcms.value[i].id;
        }
        getCommentNbr(numberCommentaryQcm.value);
        //*************************************************************** */
        //****end par cours********************************** */
      } else if (props.QcmSujetTypeSelected === "Par Sujet") {
        if (props.SelectedSourceExmn === "Externat Blida") {
          console.log(getGroupePerm.value);

          if (props.checkParSjtBiologieClinique === "CliniqueParSujet") {
            console.log("we here clinque ");
            if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
              console.log(props.getYear);
              console.log(props.getGroupePerm);
              //****get clinique length***************************************** */
              const getresultCasClinqiue = await axios.get(
                `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${props.getYear}/${props.getGroupePerm}/${props.SelectedSourceExmn}`
              );
              getCasCliniqueLength = getresultCasClinqiue.data.length;
              finalgetCasCliniqueLength.value = getCasCliniqueLength;
              setgetlengthCasCliniqueParSjr(getresultCasClinqiue.data.length);
              console.log(finalgetCasCliniqueLength.value);
              try {
                const result = await axios.get(
                  `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${props.getYear}/${props.getGroupePerm}/${props.SelectedSourceExmn}`
                );
                currentIndex.value = 0;
                setVisibiliteQcmIndex(0);
                setShowQcm([]);
                setShowPropositions([]);
                getQcms.value = result.data;
                setShowQcm(getQcms.value);
                if (getQcms.value.length === 1) {
                  //hadi chufha apres
                  VisibleNextBtn.value = false;
                  VisiblePrevBtn.value = false;
                } else if (getQcms.value.length >= 1) {
                  setVisibiliteQcmIndex(0);
                  VisibleNextBtn.value = true;
                }
                console.log(getQcms.value);
                loadProposition();

                //***get length cas clinique******************************************** */

                //*********************************************************************** */
              } catch {
                console.log("qmc not find");
              }
              //***get commentary number************************************* */
              for (let i = 0; i < getQcms.value.length; i++) {
                numberCommentaryQcm.value[i] = getQcms.value[i].id;
              }
              getCommentNbr(numberCommentaryQcm.value);
              //*************************************************************** */
            } else {
              getCurrentGroupePerm =
                document.getElementById("groupepermutation").value;
              getCurrentYear = document.getElementById("year").value;

              const getresultCasClinqiue = await axios.get(
                `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${getCurrentYear}/${getCurrentGroupePerm}/${props.SelectedSourceExmn}`
              );
              getCasCliniqueLength = getresultCasClinqiue.data.length;
              finalgetCasCliniqueLength.value = getCasCliniqueLength;
              setgetlengthCasCliniqueParSjr(getCasCliniqueLength);
              console.log(finalgetCasCliniqueLength.value);
              try {
                const result = await axios.get(
                  `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${getCurrentYear}/${getCurrentGroupePerm}/${props.SelectedSourceExmn}`
                );
                currentIndex.value = 0;
                setVisibiliteQcmIndex(0);
                setShowQcm([]);
                setShowPropositions([]);
                getQcms.value = result.data;
                setShowQcm(getQcms.value);
                if (getQcms.value.length === 1) {
                  //hadi chufha apres
                  VisibleNextBtn.value = false;
                  VisiblePrevBtn.value = false;
                } else if (getQcms.value.length >= 1) {
                  setVisibiliteQcmIndex(0);
                  VisibleNextBtn.value = true;
                }
                console.log(getQcms.value);
                loadProposition();

                //***get length cas clinique******************************************** */

                //*********************************************************************** */
              } catch {
                console.log("qmc not find");
              }
              //***get commentary number************************************* */
              for (let i = 0; i < getQcms.value.length; i++) {
                numberCommentaryQcm.value[i] = getQcms.value[i].id;
              }
              getCommentNbr(numberCommentaryQcm.value);
              //*************************************************************** */
            }

            //******************************************************************** */
          } else if (props.checkParSjtBiologieClinique === "BiologieParSujet") {
            getCurrentYear = getYear.value;
            getCurrentGroupePerm = getGroupePerm.value;
            try {
              if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
                getCurrentYear = props.getYear;
                getCurrentGroupePerm = props.getGroupePerm;
              }
            } catch (Exception) {}
            console.log("we here biologie");
            console.log(getCurrentGroupePerm);
            try {
              const result = await axios.get(
                `${BASE_URL}/qcms/getqcqms/biologie/${props.moduleId}/${getCurrentYear}/Biologie`
              );
              currentIndex.value = 0;
              setVisibiliteQcmIndex(0);
              setShowQcm([]);
              setShowPropositions([]);
              getQcms.value = result.data;
              setShowQcm(getQcms.value);
              if (getQcms.value.length === 1) {
                //hadi chufha apres
                VisibleNextBtn.value = false;
                VisiblePrevBtn.value = false;
              } else if (getQcms.value.length >= 1) {
                setVisibiliteQcmIndex(0);
                VisibleNextBtn.value = true;
              }
              console.log(getQcms.value);
              loadProposition();
            } catch {
              console.log("qmc not find");
            }
            //***get commentary number************************************* */
            for (let i = 0; i < getQcms.value.length; i++) {
              numberCommentaryQcm.value[i] = getQcms.value[i].id;
            }
            getCommentNbr(numberCommentaryQcm.value);
            //*************************************************************** */
          }

          /////
        } else if (props.SelectedSourceExmn === "Résidanat Blida") {
          //  if (props.QuizQcmQclinique === true) {

          if (props.backFromCliniqueAllQcmCliniqueprSujet === false) {
            //************get length of cas clinique if existe***************************** */
            try {
              getYear.value = document.getElementById("year").value;
              const getresultCasClinqiue = await axios.get(
                `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${getYear}/${props.SelectedSourceExmn}`
              );
              //getCasCliniqueLength = getresultCasClinqiue.data.length;
              setgetlengthCasCliniqueParSjr(getresultCasClinqiue.data.length);
            } catch (Exception) {
              console.log("no cas clinique pr ParSujet Residanat");
              setgetlengthCasCliniqueParSjr(0);
            }
            //*************************************************************************************************** */
            const result = await axios.get(
              `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${getYear}/${props.SelectedSourceExmn}`
            );
            currentIndex.value = 0;
            setVisibiliteQcmIndex(0);
            setShowQcm([]);
            setShowPropositions([]);
            getQcms.value = result.data;
            setShowQcm(getQcms.value);

            if (getQcms.value.length === 1) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = false;
            } else if (getQcms.value.length >= 1) {
              setVisibiliteQcmIndex(0);
              VisibleNextBtn.value = true;
            }
            //***************************** */
            console.log(getQcms.value);
            loadProposition();
            //***get commentary number************************************* */
            for (let i = 0; i < getQcms.value.length; i++) {
              numberCommentaryQcm.value[i] = getQcms.value[i].id;
            }
            getCommentNbr(numberCommentaryQcm.value);
            //*************************************************************** */
          } else if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
            setVisibleParSujet(true);
            setVisibleGroupeChange(false);

            //***********get length cas clinique*************************************** */
            try {
              const getresultCasClinqiue = await axios.get(
                `${BASE_URL}/casclinique/getcasclinique/${props.moduleId}/${props.getYear}/${props.SelectedSourceExmn}`
              );
              getCasCliniqueLength = getresultCasClinqiue.data.length;
            } catch (Exception) {
              console.log("no cas clinique pr ParSujet Residanat");
              setgetlengthCasCliniqueParSjr(0);
            }
            //*********************************************************************** */
            const result = await axios.get(
              `${BASE_URL}/qcms/getqcqms/${props.moduleId}/${props.getYear}/${props.SelectedSourceExmn}`
            );
            currentIndex.value = 0;
            setVisibiliteQcmIndex(0);
            setShowQcm([]);
            setShowPropositions([]);
            getQcms.value = result.data;
            setShowQcm(getQcms.value);
            if (getCasCliniqueLength === 0) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = false;
            } else if (getCasCliniqueLength >= 1) {
              setVisibiliteQcmIndex(0);
              VisibleNextBtn.value = true;
            }
            console.log(getQcms.value);
            loadProposition();
            //***get commentary number************************************* */
            for (let i = 0; i < getQcms.value.length; i++) {
              numberCommentaryQcm.value[i] = getQcms.value[i].id;
            }
            getCommentNbr(numberCommentaryQcm.value);
          }
          //*************************************************************** */
          //   }
        }
      }
    }
    //***end Tous (Qcm,Cas Clinique------------------------------------------------- */
  };
  //********************************************************************** */
  //**load Proposition***************************************************************
  const loadProposition = async () => {
    if (props.QcmSujetTypeSelected === "Par Cour") {
      for (let increment = 0; increment < getQcms.value.length; increment++) {
        //****save verifier reponses******************************** */
        if (!props.backFromCliniqueAllQcmCliniqueprSujet) {
          if (props.commingFrom === "quizz") {
            setSaveVerfieReponses((repVerifier) => [...repVerifier, ""]);
            setSaveQcmIsAnswer((QcmIsAnswer) => [...QcmIsAnswer, ""]);
            setSaveClickSelectVerfieAll((clickSelect) => [...clickSelect, ""]);
            setSavePercentageAmount((percentage) => [...percentage, ""]);
          }
        }
        const result = await axios.get(
          `${BASE_URL}/qcms/${getQcms.value[increment].id}/reponses`
        );
        if (increment === getQcms.value.length - 1) {
          if (props.qcmType === "Qcm") {
            if (props.commingFrom === "quizz") {
              console.log("hupaa");
              setShowSaveQcmBtn(true);
              setShowUpdateQcmBtn(false);
            } else if (props.commingFrom === "savequizz") {
              setShowSaveQcmBtn(false);
              setShowUpdateQcmBtn(true);
            }
          }
          console.log("get all prpos");
          doneUplaodQcm.value = true;
          if (incCours.value < props.selectMultipleCours.length) {
            loadQcms(doneUplaodQcm.value);
          }
        }
        resultGetLoadPropo.value[increment] = result.data;
        //***save propositions*************************************************** */
        if (!props.backFromCliniqueAllQcmCliniqueprSujet) {
          if (props.commingFrom === "quizz") {
            saveCurrentPropo = [];
            resultGetLoadPropo.value[increment].forEach((element, index) => {
              saveCurrentPropo[index] = "";
            });
            setSavePropositions((p) => [...p, saveCurrentPropo]);
          }
        }
        //*********************************************************************** */
        setShowPropositions((p) => [...p, resultGetLoadPropo.value[increment]]);
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      console.log("mmom");
      for (let i = 0; i < getQcms.value.length; i++) {
        //**save verifier reponses***************************************** */
        if (!props.backFromCliniqueAllQcmCliniqueprSujet) {
          setSaveVerfieReponses((repVerifier) => [...repVerifier, ""]);
          setSaveQcmIsAnswer((QcmIsAnswer) => [...QcmIsAnswer, ""]);
          setSaveClickSelectVerfieAll((clickSelect) => [...clickSelect, ""]);
          setSavePercentageAmount((percentage) => [...percentage, ""]);
        }
        const result = await axios.get(
          `${BASE_URL}/qcms/${getQcms.value[i].id}/reponses`
        );

        resultGetLoadPropo.value[i] = result.data;
        //***save propositions*************************************************** */
        if (!props.backFromCliniqueAllQcmCliniqueprSujet) {
          saveCurrentPropo = [];
          resultGetLoadPropo.value[i].forEach((element, index) => {
            saveCurrentPropo[index] = "";
          });
          setSavePropositions((p) => [...p, saveCurrentPropo]);
        }
        //*********************************************************************** */
        setShowPropositions((p) => [...p, resultGetLoadPropo.value[i]]);
      }
    }

    /*console.log(resultGetLoadPropo.value.length);
    console.log(getQcms.value.length);
    console.log(resultGetLoadPropo.value);*/
  };
  //********************************************************************** */
  //********handel qcm change**********************************************
  const handlePrevClick = () => {
    setVisibleCommentaryStudent(false);

    currentIndex.value = currentIndex.value - 1;
    setSelectQcmIndex(currentIndex.value);
    setVisibiliteQcmIndex(currentIndex.value);
    setVisibilitePorpoIndex(currentIndex.value);
    console.log(currentIndex.value);

    if (currentIndex.value > 0) {
      VisiblePrevBtn.value = true;
    } else {
      VisiblePrevBtn.value = false;
    }
    VisibleNextBtn.value = true;

    if (TrueFullInsertClr === true) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
    } else if (saveQcmIndex.value[currentIndex.value] === currentIndex.value) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
      setTrueInsertClrClick(true);
      setTrueInsertClr(currentIndex.value);
    } else {
      setShowDescRpnsBtn(false);
      setShowVerifierRpnsBtn(true);
    }
    setShowDescQcm(false);
    setDisabled(false);
  };

  const handleNextClick = () => {
    setVisibleCommentaryStudent(false);
    currentIndex.value = currentIndex.value + 1;
    setSelectQcmIndex(currentIndex.value);
    setVisibiliteQcmIndex(currentIndex.value);
    setVisibilitePorpoIndex(currentIndex.value);
    VisibleNextBtn.value = true;
    VisiblePrevBtn.value = true;
    //*****check if kayn cas clinique*********************** */
    if (props.QcmSujetTypeSelected === "Par Cour") {
      if (currentIndex.value === ShowQcm.length - 1) {
        if (props.ExisteCasClinique === false) {
          VisibleNextBtn.value = false;
          if (ShowQcm.length === 1) {
            VisiblePrevBtn.value = false;
          }
        } else if (props.ExisteCasClinique === true) {
          VisibleNextBtn.value = true;
        }
      } else if (currentIndex.value === ShowQcm.length) {
        setOpenBoardClinique(true);
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (currentIndex.value === ShowQcm.length - 1) {
        if (finalgetCasCliniqueLength.value === 0) {
          VisibleNextBtn.value = false;
          if (ShowQcm.length === 1) {
            VisiblePrevBtn.value = false;
          }
        } else if (finalgetCasCliniqueLength.value > 0) {
          VisibleNextBtn.value = true;
        }
      } else if (currentIndex.value === ShowQcm.length) {
        setOpenBoardClinique(true);
      }
    }
    //************************************************************************ */
    if (TrueFullInsertClr === true) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
    } else if (saveQcmIndex.value[currentIndex.value] === currentIndex.value) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
      setTrueInsertClrClick(true);
      setTrueInsertClr(currentIndex.value);
    } else {
      setShowDescRpnsBtn(false);
      setShowVerifierRpnsBtn(true);
    }
    setShowDescQcm(false);
    setDisabled(false);
    selectSaveIndex.value = [];
  };

  const deleteQcmHndler = async (getQcmId) => {
    await axios.delete(`${BASE_URL}/qcms/${getQcmId}`).then((res) => {
      navigateDeleteQcmHandler(`/home`);
    });
  };
  //********************************************************************************** */
  //*****par sujets Methodes********************************************************* */
  const SelectYearHndlerChange = async (e) => {
    if (props.SelectedSourceExmn === "Externat Blida") {
      console.log(props.SelectedSourceExmn);
      getYear.value = document.getElementById("year").value;
      const result = await axios.get(
        `${BASE_URL}/qcms/get_groupes_year/${props.moduleId}/${getYear}/${props.SelectedSourceExmn}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      document.getElementById("groupepermutation").options[0].selected = true;
      setGroupesPermut(result.data);
      console.log(result.data);
      if (props.QcmSujetTypeSelected === "Par Cours") {
        setVisibleQmcContainer(false);
      } else {
        console.log("is par sjuets ");
      }
      console.log(getYear);
    } else if (props.SelectedSourceExmn === "Résidanat Blida") {
      loadQcms();
    }
  };
  //********************************************************************************** */
  const SelectGroupePermHndlerChange = async (e) => {
    setVisibleParSujet(true);
    loadQcms();
    setVisibleQmcContainer(true);
    getGroupePerm.value = document.getElementById("groupepermutation").value;
    console.log(getGroupePerm.value);
  };
  //********************************************************************************** */
  //****description******************************************************************* */
  const handeldescription = async (qcmId) => {
    console.log(qcmId);
    setShowDescQcm(true);
    setQcmIdPropsQcmDesc(qcmId);
  };
  //*********************************************************************************** */

  const handYearClick = () => {
    if (props.backFromCliniqueAllQcmCliniqueprSujet === true) {
      window.location.reload();
    }
  };
  //********commentary Section****************************************************************** */
  //**get nbr commentary******************************************
  const getCommentNbr = async (qcmsIds) => {
    //console.log(qcmsIds);

    for (let i = 0; i < qcmsIds.length; i++) {
      const result = await axios.get(
        `${BASE_URL}/commentary/qcm/${qcmsIds[i]}`
      );
      numbreCommentaryFinal.value[incCmntr.value] = result.data.length;
      incCmntr.value = incCmntr.value + 1;
    }

    //numberCommentaryQcm
  };

  //********************************************************************** */
  //**commentary student************************************ */
  const handleCommentaryBtn = (qcmId) => {
    console.log(qcmId);
    getQcmCommentary(qcmId);
    getUser();

    getCommentaryQcm(qcmId);
    setVisibleCommentaryStudent(true);
  };
  //************************************************************ */
  //**get all commentary of qcms******************************************
  const getCommentaryQcm = async (qcmId) => {
    const result = await axios.get(`${BASE_URL}/commentary/qcm/${qcmId}`);
    console.log(result.data);
    setQcmCommentary(result.data);
  };
  //********************************************************************** */
  //****************submit qcm ****************************************/

  const handlejadorebtn = async (commentaryId, commentaryLikes, qcmId) => {
    setCountJadore(commentaryLikes + 1);
    CommentaryUpdate.likes = commentaryLikes + 1;
    await axios
      .put(`${BASE_URL}/commentary/${commentaryId}`, CommentaryUpdate)
      .then((res) => {
        getCommentaryQcm(qcmId);
      })
      .catch((err) => console.log(err));
  };
  //**********************************************************************

  //**************************************************************** */
  const handlesendComment = async () => {
    console.log(userFinal);

    Commentary.commentaryStudent = inputStr;
    console.log(Commentary);
    console.log(inputStr);
    axios
      .post("https://goatqcm-instance.com/commentary", Commentary, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getCommentaryQcm(Commentary.qcmStandard.id);
        setInputStr("");
      })
      .catch((err) => console.log(err));
  };
  //**************************************************************** */
  //***close commentay************************************************ */
  const handleCloseCommentaryBtn = () => {
    setVisibleCommentaryStudent(false);
  };
  //******************************************************************* */
  const handlePorpoClick = (e) => {
    //console.log(props.selectMultipleCours);
    console.log(savePropositions); // save id of each proposition clicked
    console.log(SaveClickSelectVerfieAll); //save qcmIndex that have minimum one proposition has been cliked.
    console.log(SaveVerfieReponses); //save qcmIndex that has verifier button Clicked.
    console.log(SaveQcmIsAnswer); //save index qcmIndex that has verifier all reponses button clicked.
    console.log(SavePercentageAmount); //save somme of all propo
  };

  //***handle propo click**************************************************** */
  const handlePropoClick = async (e, propoId, QcmIndex, indexPropo, qcmId) => {
    //initialiser TrueFullInsertClr************************
    setTrueFullInsertClr(false);
    //save proposition selected **********************************************
    // Clone the current state
    const updatedArray = savePropositions.map((innerArray) => [...innerArray]);

    if (updatedArray[QcmIndex][indexPropo] !== propoId) {
      updatedArray[QcmIndex][indexPropo] = propoId;
    } else {
      updatedArray[QcmIndex][indexPropo] = "";
    }
    setSavePropositions(updatedArray);
    //************************************************************************** */
    const updatedClickedVerefieAll = [...SaveClickSelectVerfieAll];
    updatedClickedVerefieAll[QcmIndex] = QcmIndex;
    setSaveClickSelectVerfieAll(updatedClickedVerefieAll);
    //*************************************************************************** */

    //****augmenter slect count******************************************** */
    await axios
      .put(`https://goatqcm-instance.com/reponses/countselect/${propoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {})
      .catch((err) => console.log(err));
    //************************************************************************* */

    //******get all selected click********************************************** */
    const result = await axios.get(`${BASE_URL}/qcms/${qcmId}/reponses`);
    saveAllCouentSelect.value = result.data;
    saveCurrentAmount = [];
    saveAllCouentSelect.value.forEach((element, index) => {
      saveCurrentAmount[index] = saveAllCouentSelect.value[index].countSelect;
    });
    console.log(saveCurrentAmount);
    const sum = saveCurrentAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    //*************************************************************************** */
    //********update perentage array******************************************** */
    const updatedCalcAmountCountSelect = [...SavePercentageAmount];
    updatedCalcAmountCountSelect[QcmIndex] = sum;
    setSavePercentageAmount(updatedCalcAmountCountSelect);
    //*************************************************************************** */

    console.log(updatedCalcAmountCountSelect);

    //********************************************************************** */
  };

  //********************************************************************** */
  //**handleClickiVerifieReponse****************************************** */
  const handleClickiVerifieReponse = (QcmIndex) => {
    setTrueInsertClrClick(true);
    setShowVerifierRpnsBtn(false);

    const updatedClickedVerefie = [...SaveVerfieReponses];
    updatedClickedVerefie[QcmIndex] = QcmIndex;
    setSaveVerfieReponses(updatedClickedVerefie);

    //***this qcm is has been answer************************* */
    const updatedIsAnswer = [...SaveQcmIsAnswer];
    updatedIsAnswer[QcmIndex] = QcmIndex;
    setSaveQcmIsAnswer(updatedIsAnswer);
    //*********************************************************** */
  };
  //********************************************************************** */
  //****handle all reponses****************************************************************** */
  const handleClickiVerifieReponseAll = () => {
    console.log(SaveClickSelectVerfieAll);
    //*****check done reponde all qcmss****************************** */
    let incrIndex = 0;
    let isEmpty = false;
    while (incrIndex < SaveClickSelectVerfieAll.length && isEmpty === false) {
      if (SaveClickSelectVerfieAll[incrIndex] === "") {
        isEmpty = true;
        console.log(incrIndex);
        setIsRepondeAll(false);
        IsRepondeAllSignal.value = false;
      }
      incrIndex = incrIndex + 1;
    }
    ///********************************************************************* */
    console.log(IsRepondeAll);
    if (IsRepondeAllSignal.value === false) {
      setModalDoneQuizIsOpen(true);
    }
  };

  //********************************************************************** */
  /*****done Quiz******************************************** */
  function closeModalDoneQuizHandler() {
    setModalDoneQuizIsOpen(false);
  }
  //**************************************************** */
  function handlerConfirmShowAllReponse() {
    //***this qcm is has been answer************************* */

    setSaveQcmIsAnswer(SaveClickSelectVerfieAll);
    //*********************************************************** */
    setTrueFullInsertClr(true);
    //setShowVerifierRpnsBtn(false);
    setModalDoneQuizIsOpen(false);
  }
  function handlerCancelShowAllReponse() {
    setModalDoneQuizIsOpen(false);
  }
  //*********************************************************** */
  const handleItemClick = (qcmId, qcmIndex) => {
    currentIndex.value = qcmIndex;
    setVisibleCommentaryStudent(false);

    setSelectQcmIndex(currentIndex.value);
    setVisibiliteQcmIndex(currentIndex.value);
    setVisibilitePorpoIndex(currentIndex.value);
    VisibleNextBtn.value = true;
    VisiblePrevBtn.value = true;

    //*****check if kayn cas clinique*********************** */
    if (props.QcmSujetTypeSelected === "Par Cour") {
      if (currentIndex.value === ShowQcm.length - 1) {
        if (props.ExisteCasClinique === false) {
          VisibleNextBtn.value = false;
          if (ShowQcm.length === 1) {
            VisiblePrevBtn.value = false;
          }
        } else if (props.ExisteCasClinique === true) {
          VisibleNextBtn.value = true;
        }
      } else if (currentIndex.value === ShowQcm.length) {
        setOpenBoardClinique(true);
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (currentIndex.value === ShowQcm.length - 1) {
        if (finalgetCasCliniqueLength.value === 0) {
          VisibleNextBtn.value = false;
          if (ShowQcm.length === 1) {
            VisiblePrevBtn.value = false;
          }
        } else if (finalgetCasCliniqueLength.value > 0) {
          VisibleNextBtn.value = true;
        }
      } else if (currentIndex.value === ShowQcm.length) {
        setOpenBoardClinique(true);
      }
    }
    //**************************************************** */

    if (TrueFullInsertClr === true) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
    } else if (saveQcmIndex.value[currentIndex.value] === currentIndex.value) {
      setShowDescRpnsBtn(true);
      setShowVerifierRpnsBtn(false);
      setTrueInsertClrClick(true);
      setTrueInsertClr(currentIndex.value);
    } else {
      setShowDescRpnsBtn(false);
      setShowVerifierRpnsBtn(true);
    }
    setShowDescQcm(false);
    setDisabled(false);
    selectSaveIndex.value = [];
    if (currentIndex.value === 0) {
      VisiblePrevBtn.value = false;
    }
  };
  //***************************************************************************************** */
  //***show qcms liste*********************************** */
  const handleShowListeQcms = () => {
    setShowListQcms(!ShowListQcms);
  };

  //*********************************************************** */
  //**save qcm funtions************************************************************ */
  const handleSaveQcmQuizz = () => {
    handleSaveQcm();
  };
  const handleSaveQcm = async () => {
    //****get user*************************************** */
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUserQcm.id = resultUserFinal.id),
        (saveUserQcm.name = resultUserFinal.name),
        (saveUserQcm.lastname = resultUserFinal.lastname),
        (saveUserQcm.username = resultUserFinal.username),
        (saveUserQcm.password = resultUserFinal.password),
        (saveUserQcm.role = resultUserFinal.role);
    } catch (Exception) {
      console.log("user not found");
    }
    //***************************************************** */
    SaveQcmQuizz.ourUsers = saveUserQcm;
    SaveQcmQuizz.nameQcmQuizz = qcmQuizzName;
    SaveQcmQuizz.qcmSujetTypeSelected = props.QcmSujetTypeSelected;
    SaveQcmQuizz.selectedSourceExmn = props.SelectedSourceExmn;
    SaveQcmQuizz.moduleId = props.moduleId;
    SaveQcmQuizz.moduleName = props.moduleName;
    SaveQcmQuizz.selectMultipleCours = JSON.stringify(
      props.selectMultipleCours
    );
    SaveQcmQuizz.qcmType = props.qcmType;
    SaveQcmQuizz.minYearQcm = props.minYearQcm;
    SaveQcmQuizz.maxYearQcm = props.maxYearQcm;
    SaveQcmQuizz.savePropositions = JSON.stringify(savePropositions);
    SaveQcmQuizz.saveClickSelectVerfieAll = JSON.stringify(
      SaveClickSelectVerfieAll
    );
    SaveQcmQuizz.saveVerfieReponses = JSON.stringify(SaveVerfieReponses);
    SaveQcmQuizz.saveQcmIsAnswer = JSON.stringify(SaveQcmIsAnswer);
    SaveQcmQuizz.savePercentageAmount = JSON.stringify(SavePercentageAmount);

    await axios
      .post("https://goatqcm-instance.com/qcmquizz", SaveQcmQuizz, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {})
      .catch((err) => console.log(err));

    setModalSaveQuizzIsOpen(false);
  };
  //******************************************************************************* */
  //***update qcm quizz************************************************************* */
  const handleUpdateQcmQuizz = async () => {
    //***************************************************** */

    const qcmQuizzId = localStorage.getItem("qcmquizzid");
    console.log(qcmQuizzId);
    updateQcmQuizz.savePropositions = JSON.stringify(savePropositions);
    updateQcmQuizz.saveClickSelectVerfieAll = JSON.stringify(
      SaveClickSelectVerfieAll
    );
    updateQcmQuizz.saveVerfieReponses = JSON.stringify(SaveVerfieReponses);
    updateQcmQuizz.saveQcmIsAnswer = JSON.stringify(SaveQcmIsAnswer);
    updateQcmQuizz.savePercentageAmount = JSON.stringify(SavePercentageAmount);

    console.log(updateQcmQuizz.savePercentageAmount);
    await axios
      .put(
        `https://goatqcm-instance.com/qcmquizz/${qcmQuizzId}`,
        updateQcmQuizz,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success("succes modification!");
      })
      .catch((err) => console.log(err));
  };

  //********************************************************************************* */
  const closeModalSaveQcmQuizHandler = () => {
    setModalSaveQuizzIsOpen(false);
  };

  return (
    <>
      {!OpenBoardClinique && (
        <>
          <NavigationBar changeetatsidebar={etatsidebare} />
          <div className={classes.addingdiv}>
            <div className={classes.sidebare}>
              {ShowSideBare && <Sidebar />}
            </div>

            {VisibleQmcContainer && isDesktopOrLaptop && (
              <div
                className={classes.contanerspace}
                data-theme={isDark ? "dark" : "light"}
              >
                {VisibleParSujet && isDesktopOrLaptop && (
                  <div
                    className={`${classes.parsujetscontainer} `}
                    style={{
                      width: 310,
                      height: 50,
                      margintop: 50,
                      marginBottom: 10,
                    }}
                  >
                    <select
                      defaultValue="year"
                      style={{ width: 100 }}
                      className={`form-select`}
                      id="year"
                      aria-label="Default select example"
                      onChange={SelectYearHndlerChange}
                      onClick={(e) => {
                        handYearClick();
                      }}
                    >
                      <option value="year" disabled="disabled">
                        Année
                      </option>
                      {GetYearProps.map((year, index) => (
                        <option value={year} key={index}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {VisibleGroupeChange && (
                      <select
                        style={{ width: 190 }}
                        className={` form-select`}
                        id="groupepermutation"
                        aria-label="Default select example"
                        defaultValue="groupe"
                        onChange={SelectGroupePermHndlerChange}
                      >
                        <option value="groupe" disabled="disabled">
                          Groupe/Permutaion
                        </option>
                        {GroupesPermut.map((groupepermutation, index) => (
                          <option key={index}>{groupepermutation}</option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
                <div className={classes.container_save_qcm_timer}>
                  <div className={classes.full_save_qcm}>
                    {showSaveQcmBtn && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setModalSaveQuizzIsOpen(true);
                        }}
                      >
                        Sauvegarder Qcm
                      </button>
                    )}
                    {showUpdateQcmBtn && (
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          handleUpdateQcmQuizz();
                        }}
                      >
                        Save modification
                      </button>
                    )}
                  </div>
                  <div className={classes.fullchronotime}>
                    <div className={classes.timediv}>
                      <span>
                        {props.qcmAndCliniqueTimer === true
                          ? props.watchValues[0].hours
                          : hours}
                        :
                      </span>
                      <span>
                        {props.qcmAndCliniqueTimer === true
                          ? props.watchValues[1].minutes
                          : minutes}
                        :
                      </span>
                      <span>
                        {props.qcmAndCliniqueTimer === true
                          ? props.watchValues[2].seconds
                          : seconds}
                      </span>
                    </div>
                    <div className={classes.timetbns}>
                      {ShowPlayBtn && (
                        <a>
                          <IoPlayCircleOutline
                            onClick={(e) => {
                              {
                                start();
                              }
                              setShowPauseBtn(true);
                              setShowPlayBtn(false);
                            }}
                            style={{ width: 30, height: 30 }}
                          />
                        </a>
                      )}

                      {ShowPauseBtn && (
                        <a>
                          <IoPauseCircleOutline
                            onClick={(e) => {
                              setShowPlayBtn(true);
                              setShowPauseBtn(false);
                              {
                                pause();
                              }
                            }}
                            style={{ width: 30, height: 30 }}
                          />
                        </a>
                      )}
                      <a>
                        <MdOutlineReplay
                          onClick={() => {
                            {
                              reset();
                            }
                          }}
                          style={{ width: 30, height: 30 }}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <div className={classes.fullqcmcontainer_commentary}>
                  <div
                    className={`${classes.quizcontainer} card text-white py-1`}
                  >
                    <div
                      className={`${classes.qcmpropocontainer} card-body text-black`}
                      data-theme={isDark ? "dark" : "light"}
                    >
                      {ShowQcm.map((qcm, index) => {
                        if (index === VisibiliteQcmIndex) {
                          return (
                            <div key={index}>
                              <div className={`${classes.qcmInfoHeader} `}>
                                <div className={`${classes.qcmInfo} `}>
                                  <ul
                                    className={`${classes.ulcatogorycourname} "list-group"`}
                                  >
                                    <img
                                      src={courlogo}
                                      height="30%"
                                      width="20"
                                    />
                                    <li className="list-group-item">
                                      {qcm.coursMed.coursName}
                                    </li>
                                    <img
                                      src={externatlogo}
                                      height="50%"
                                      width="20"
                                    />
                                    <li className="list-group-item">
                                      {qcm.category}
                                    </li>
                                    <img
                                      src={groupelogo}
                                      height="50%"
                                      width="20"
                                    />
                                    <li className="list-group-item">
                                      ({qcm.qcmGroupe}) {qcm.qcmYear}
                                    </li>
                                  </ul>
                                </div>
                                <div className={`${classes.goatlogo} `}>
                                  <img src={GoatLogo} height="40" width="70" />
                                </div>
                              </div>
                              <div
                                className={`${classes.qcmnbr_commentary_div} `}
                              >
                                <div>
                                  <li
                                    className={`${classes.nmbrqcm} list-group-item`}
                                    style={{ color: "#007FFF" }}
                                  >
                                    Question {index + 1} sur {ShowQcm.length}
                                  </li>
                                </div>
                                <div className={`${classes.commentary} `}>
                                  <span className={`${classes.nbrComent} `}>
                                    {numbreCommentaryFinal.value[index]}
                                  </span>
                                  <img
                                    src={comment}
                                    height="50%"
                                    width="20"
                                    onClick={(e) => {
                                      handleCommentaryBtn(qcm.id);
                                    }}
                                  />
                                </div>
                              </div>
                              {isParticipateAdmin && (
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-warning btn-sm"
                                    onClick={() =>
                                      navigateEditeQcm(`/editeqcm`, {
                                        state: {
                                          qcmId: qcm.id,
                                          cours_id: props.courId,
                                          qcmSource: props.SelectedSourceExmn,
                                        },
                                      })
                                    }
                                  >
                                    Edite Qcm
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-info btn-sm"
                                    onClick={(e) => deleteQcmHndler(qcm.id)}
                                  >
                                    Delete Qcm
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{ marginLeft: 5 }}
                                    onClick={(e) => testDescExsite(qcm.id)}
                                  >
                                    Ajouter Commentaire
                                  </button>
                                </div>
                              )}
                              {visisbleDescInsert && (
                                <div className={classes.imgdescdiv}>
                                  <div className={classes.fulldescription}>
                                    <div className={classes.imagediv}>
                                      <img src={fileDisplay} />
                                      <input
                                        type="file"
                                        onChange={getFile}
                                      ></input>
                                    </div>
                                    <div className={classes.descarea}>
                                      <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        onChange={(e) =>
                                          setDescription(e.target.value)
                                        }
                                      ></textarea>
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    className={`${classes.updtimage} btn btn-primary`}
                                    onClick={(e) => AjouterImage(qcm.id)}
                                  >
                                    Ajouter Image
                                  </button>

                                  <button
                                    className={`${classes.updtdesc} btn btn-primary`}
                                    type="submit"
                                    onClick={(e) => AjouterDesc(qcm.id)}
                                  >
                                    Ajouter Commentaire
                                  </button>
                                </div>
                              )}
                              {VisisbleDescUpdate && (
                                <div className={classes.imgdescdiv}>
                                  <div className={classes.fulldescription}>
                                    <div className={classes.imagediv}>
                                      <img
                                        src={FileDisplayEdite}
                                        onChange={getFileEdite}
                                      />
                                      <input
                                        type="file"
                                        onChange={getFileEdite}
                                      ></input>
                                    </div>
                                    <div className={classes.descarea}>
                                      <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        value={FullDescEdite.qcmDescription}
                                        onChange={(e) =>
                                          setFullDescEdite({
                                            ...FullDescEdite,
                                            qcmDescription: e.target.value,
                                          })
                                        }
                                      ></textarea>
                                    </div>
                                  </div>
                                  <button
                                    type="submit"
                                    className={`${classes.updtimage} btn btn-primary`}
                                    onClick={(e) => UpdateImage(qcm.id)}
                                  >
                                    Update Image
                                  </button>
                                  <button
                                    type="button"
                                    className={`${classes.deeletefulldesc} btn btn-danger`}
                                    onClick={(e) => deleteFullDesc(qcm.id)}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className={`${classes.updtdesc} btn btn-primary`}
                                    type="submit"
                                    onClick={(e) => UpdateDesc(qcm.id)}
                                  >
                                    Update Commentaire
                                  </button>
                                </div>
                              )}
                              <div
                                onCopy={disableCopyPaste}
                                onCut={disableCopyPaste}
                                onPaste={disableCopyPaste}
                                style={{
                                  userSelect: "none",
                                }}
                                className={`${classes.qcmfeild}  table-hover shadow`}
                              >
                                <p>{qcm.qcmContent}</p>
                              </div>
                              <ImageQcm qcmId={qcm.id} />
                            </div>
                          );
                        }
                      })}

                      <div
                        className={`${classes.propofeild} card table-hover shadow`}
                      >
                        {ShowPropositions.map((Proposition, QcmPropoIndex) => {
                          if (QcmPropoIndex === VisibiliteQcmIndex) {
                            return (
                              <>
                                <ul
                                  onCopy={disableCopyPaste}
                                  onCut={disableCopyPaste}
                                  onPaste={disableCopyPaste}
                                  style={{
                                    userSelect: "none",
                                  }}
                                  key={QcmPropoIndex}
                                  multiple={true}
                                  className={`${classes.ulpropo} list-group list-group-flush`}
                                >
                                  {Proposition.map((propo, indexPropo) => (
                                    <li
                                      key={indexPropo}
                                      value={propo.id}
                                      style={{
                                        backgroundColor:
                                          SaveVerfieReponses[
                                            VisibiliteQcmIndex
                                          ] === VisibiliteQcmIndex
                                            ? propo.reponseBool === true
                                              ? COLORS[1]
                                              : savePropositions[
                                                  VisibiliteQcmIndex
                                                ][indexPropo] === propo.id &&
                                                propo.reponseBool === false
                                              ? COLORS[0]
                                              : ""
                                            : (SaveClickSelectVerfieAll[
                                                VisibiliteQcmIndex
                                              ] === VisibiliteQcmIndex &&
                                                TrueFullInsertClr === true) ||
                                              SaveQcmIsAnswer[
                                                VisibiliteQcmIndex
                                              ] === VisibiliteQcmIndex
                                            ? propo.reponseBool === true
                                              ? COLORS[1]
                                              : savePropositions[
                                                  VisibiliteQcmIndex
                                                ][indexPropo] === propo.id &&
                                                propo.reponseBool === false
                                              ? COLORS[0]
                                              : ""
                                            : "",
                                      }}
                                      className={
                                        savePropositions[VisibiliteQcmIndex][
                                          indexPropo
                                        ] === propo.id
                                          ? "list-group-item active  "
                                          : "list-group-item"
                                      }
                                      onClick={(e) => {
                                        handlePropoClick(
                                          e,
                                          propo.id,
                                          VisibiliteQcmIndex,
                                          indexPropo,
                                          propo.qcmStandard.id
                                        );
                                      }}
                                    >
                                      <img
                                        src={
                                          AlphabetChoice[
                                            (IndexAlphabetChoice =
                                              IndexAlphabetChoice + 1)
                                          ]
                                        }
                                        height="30"
                                        width="30"
                                      />
                                      {propo.propositionQcm}
                                      {SaveQcmIsAnswer[VisibiliteQcmIndex] ===
                                        VisibiliteQcmIndex && (
                                        <div
                                          className={`${classes.percentage} `}
                                        >
                                          {(
                                            (propo.countSelect * 100) /
                                            SavePercentageAmount[
                                              VisibiliteQcmIndex
                                            ]
                                          ).toFixed(0)}
                                          %
                                        </div>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                                <div className={`${classes.btnfooter} `}>
                                  {VisiblePrevBtn.value && (
                                    <button
                                      type="button"
                                      className={`${classes.btnPrecdent} btn btn-warning`}
                                      onClick={handlePrevClick}
                                    >
                                      Précédent
                                    </button>
                                  )}
                                  {SaveQcmIsAnswer[VisibiliteQcmIndex] ===
                                    "" && (
                                    <button
                                      type="button"
                                      className={`${classes.BntVerifierrpnse} btn btn-warning`}
                                      onClick={(e) => {
                                        handleClickiVerifieReponse(
                                          VisibiliteQcmIndex
                                        );

                                        setTrueInsertClr(VisibiliteQcmIndex);

                                        saveQcmIndex.value[VisibiliteQcmIndex] =
                                          VisibiliteQcmIndex;
                                        console.log(
                                          saveQcmIndex.value[VisibiliteQcmIndex]
                                        );
                                      }}
                                    >
                                      Vérifer la réponse
                                    </button>
                                  )}
                                  {(SaveQcmIsAnswer[VisibiliteQcmIndex] ===
                                    VisibiliteQcmIndex ||
                                    SaveVerfieReponses[VisibiliteQcmIndex] ===
                                      VisibiliteQcmIndex) && (
                                    <button
                                      type="button"
                                      disabled={isDisabled}
                                      className={`${classes.BntVerifierrpnse} btn btn-warning`}
                                      onClick={(e) => {
                                        handeldescription(
                                          Proposition[0].qcmStandard.id
                                        );
                                      }}
                                    >
                                      Explication
                                    </button>
                                  )}
                                  {VisibleNextBtn.value ? (
                                    <button
                                      type="button"
                                      className={`${classes.btnsuivant} btn btn-warning`}
                                      onClick={handleNextClick}
                                    >
                                      Suivant
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className={`${classes.btnsuivant} btn btn-warning`}
                                      onClick={(e) => {
                                        handleClickiVerifieReponseAll();
                                      }}
                                    >
                                      Voir tous les reponses
                                    </button>
                                  )}
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${classes.qcmsliste}`}
                    data-theme={isDark ? "dark" : "light"}
                  >
                    <div className={`${classes.qcmsliste_header}`}>
                      <h6>Liste Qcms</h6>
                    </div>
                    <ul className="list-group">
                      {ShowQcm.map((Qcm, QcmIndex) => (
                        <li
                          key={QcmIndex}
                          value={Qcm.id}
                          className={
                            SelectQcmIndex === QcmIndex
                              ? "list-group-item active  "
                              : "list-group-item"
                          }
                          onClick={(e) => {
                            handleItemClick(Qcm.id, QcmIndex);
                          }}
                        >
                          Question {QcmIndex + 1}
                          {SaveClickSelectVerfieAll[QcmIndex] === QcmIndex && (
                            <div className={classes.vl_select}></div>
                          )}
                          {SaveQcmIsAnswer[QcmIndex] === QcmIndex && (
                            <div className={classes.vl_answer}></div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {visibleCommentaryStudent && (
                    <div className={`${classes.commentarydiv}`}>
                      {qcmCommentary.map((commentary, index) => (
                        <div id={index}>
                          <div className={`${classes.commentary_likes}`}>
                            <div
                              className={`${classes.eachcommentary} card`}
                              style={{ backgroundColor: "#F5F5F5" }}
                            >
                              <h6>
                                {commentary.ourUsers.name}{" "}
                                {commentary.ourUsers.lastname}
                              </h6>
                              {commentary.commentaryStudent}
                            </div>
                            <div className={`${classes.likes}`}>
                              <div className={`${classes.btnjadore}`}>
                                <button
                                  onClick={(e) => {
                                    {
                                      handlejadorebtn(
                                        commentary.id,
                                        commentary.likes,
                                        commentary.qcmStandard.id
                                      );
                                    }
                                  }}
                                >
                                  j'adore
                                </button>
                              </div>

                              <div className={`${classes.btnjadore_icon}`}>
                                <h6>{commentary.likes}</h6>

                                <img src={jadore} height="50%" width="20" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div
                        className={`${classes.inputcommentary} input-group `}
                      >
                        <div className={`${classes.custom_search} `}>
                          <input
                            type="text"
                            className={`${classes.custom_search_input} form-control`}
                            placeholder="Commenter"
                            value={inputStr}
                            onChange={(e) => setInputStr(e.target.value)}
                          />
                          <div
                            className={`${classes.custom_search_botton} picker-container`}
                          >
                            <div className={`${classes.imojiicon_btnsend} `}>
                              <img
                                className="emoji-icon"
                                src={smileimoji}
                                height="70%"
                                width="25"
                                onClick={() => setShowPicker((val) => !val)}
                              />
                              <img
                                onClick={(e) => {
                                  handlesendComment();
                                }}
                                src={sendcomentary}
                                height="70%"
                                width="25"
                              />
                            </div>
                          </div>
                          <div className={`${classes.pickerdiv} `}></div>
                        </div>
                      </div>
                      {showPicker && (
                        <Picker
                          style={{ width: "100%" }}
                          onEmojiClick={(emojiObject) => {
                            setInputStr(
                              (prevMsg) => prevMsg + emojiObject.emoji
                            );
                            setShowPicker(false);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
                {ShowDescQcm && (
                  <Description qcmIdPropsQcmDesc={qcmIdPropsQcmDesc} />
                )}
              </div>
            )}

            {VisibleQmcContainer && isTabletOrMobile && (
              <div className={classes.modal}>
                <div className={classes.contanerspace_phone}>
                  <div className={classes.fullqcmcontainer_commentary}>
                    <div
                      className={`${classes.quizcontainer_phone} card text-white py-1`}
                      data-theme={isDark ? "dark" : "light"}
                    >
                      <div className={classes.headerquizz_phone}>
                        <div className={classes.fullchronotime_phone}>
                          <div className={classes.timediv_phone}>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[0].hours
                                : hours}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[1].minutes
                                : minutes}
                              :
                            </span>
                            <span>
                              {props.qcmAndCliniqueTimer === true
                                ? props.watchValues[2].seconds
                                : seconds}
                            </span>
                          </div>
                          <div className={classes.timetbns_phone}>
                            {ShowPlayBtn && (
                              <a>
                                <IoPlayCircleOutline
                                  onClick={(e) => {
                                    {
                                      start();
                                    }
                                    setShowPauseBtn(true);
                                    setShowPlayBtn(false);
                                  }}
                                  style={{ width: 20, height: 20 }}
                                />
                              </a>
                            )}

                            {ShowPauseBtn && (
                              <a>
                                <IoPauseCircleOutline
                                  onClick={(e) => {
                                    setShowPlayBtn(true);
                                    setShowPauseBtn(false);
                                    {
                                      pause();
                                    }
                                  }}
                                  style={{ width: 20, height: 20 }}
                                />
                              </a>
                            )}
                            <a>
                              <MdOutlineReplay
                                onClick={() => {
                                  {
                                    reset();
                                  }
                                }}
                                style={{ width: 20, height: 20 }}
                              />
                            </a>
                          </div>
                        </div>
                        <div className={classes.full_save_close_quizz}>
                          <div className={classes.full_save_qcm_phone}>
                            {showSaveQcmBtn && (
                              <BsSave
                                onClick={() => {
                                  setModalSaveQuizzIsOpen(true);
                                }}
                              />
                            )}
                            {showUpdateQcmBtn && (
                              <BsSave
                                onClick={() => {
                                  handleUpdateQcmQuizz();
                                }}
                              />
                            )}
                          </div>

                          <div className={`${classes.closequizz_phone} `}>
                            <li
                              className={`${classes.homebtn} list-group-item`}
                            >
                              <TfiClose
                                onClick={(e) => {
                                  navigateHome("/goatqcm", {
                                    state: {
                                      getUserName: username,
                                      userId: userId,
                                    },
                                  });
                                }}
                              />
                            </li>
                          </div>
                        </div>
                      </div>

                      {VisibleParSujet && (
                        <div
                          className={`${classes.parsujetscontainer_phone} `}
                          style={{ width: 200, height: 40, marginLeft: 5 }}
                        >
                          <select
                            defaultValue="year"
                            style={{ width: 100, fontSize: 15 }}
                            className={`form-select`}
                            id="year"
                            aria-label="Default select example"
                            onChange={SelectYearHndlerChange}
                          >
                            <option value="year" disabled="disabled">
                              Année
                            </option>
                            {GetYearProps.map((year, index) => (
                              <option value={year} key={index}>
                                {year}
                              </option>
                            ))}
                          </select>
                          {VisibleGroupeChange && (
                            <select
                              style={{ width: 110, fontSize: 15 }}
                              className={` form-select`}
                              id="groupepermutation"
                              aria-label="Default select example"
                              defaultValue="groupe"
                              onChange={SelectGroupePermHndlerChange}
                            >
                              <option value="groupe" disabled="disabled">
                                Groupe
                              </option>
                              {GroupesPermut.map((groupepermutation, index) => (
                                <option key={index}>{groupepermutation}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      )}

                      <div
                        className={`${classes.qcmpropocontainer_phone} card-body text-black`}
                        data-theme={isDark ? "dark" : "light"}
                      >
                        {ShowQcm.map((qcm, index) => {
                          if (index === VisibiliteQcmIndex) {
                            return (
                              <div key={index}>
                                <div className={`${classes.modulediv_phone} `}>
                                  <div className={`${classes.child_phone} `}>
                                    <li
                                      className={`${classes.modulename} list-group-item`}
                                    >
                                      {props.moduleName}
                                    </li>
                                  </div>
                                </div>
                                <hr className={`${classes.hr_phone} `} />
                                <div
                                  className={`${classes.qcmInfoHeader_phone} `}
                                >
                                  <div
                                    className={`${classes.qcmInfocatgrp_phone} `}
                                  >
                                    <li className="list-group-item">
                                      {qcm.category}-
                                    </li>

                                    <li className="list-group-item">
                                      ({qcm.qcmGroupe}) {qcm.qcmYear}
                                    </li>
                                  </div>
                                </div>
                                <hr className={`${classes.hr_phone} `} />
                                <div
                                  className={`${classes.qcmcourqcmnbr_phone} `}
                                >
                                  <div
                                    className={`${classes.qcmcourimgname_phone} `}
                                  >
                                    <img
                                      src={courlogo}
                                      height="30%"
                                      width="20"
                                    />
                                    <li
                                      className={`${classes.courname_phone} list-group-item`}
                                    >
                                      {qcm.coursMed.coursName}
                                    </li>
                                  </div>
                                  <hr className={`${classes.hr_phone} `} />
                                  <div
                                    className={`${classes.qcmnbr_commentary_div_phone} `}
                                  >
                                    <div className={`${classes.nmbrqcm_phone}`}>
                                      <li
                                        className="list-group-item"
                                        style={{ color: "#007FFF" }}
                                      >
                                        Question {index + 1} sur{" "}
                                        {ShowQcm.length}
                                      </li>
                                    </div>
                                    <div
                                      className={`${classes.commentary_phone} `}
                                    >
                                      <span
                                        className={`${classes.nbrComent_phone} `}
                                      >
                                        {numbreCommentaryFinal.value[index]}
                                      </span>
                                      <img
                                        src={comment}
                                        height="10%"
                                        width="20"
                                        onClick={(e) => {
                                          handleCommentaryBtn(qcm.id);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {isParticipateAdmin && (
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-warning btn-sm"
                                      onClick={() =>
                                        navigateEditeQcm(`/editeqcm`, {
                                          state: {
                                            qcmId: qcm.id,
                                            cours_id: props.courId,
                                            qcmSource: props.SelectedSourceExmn,
                                          },
                                        })
                                      }
                                    >
                                      Edite Qcm
                                    </button>
                                    <button
                                      type="submit"
                                      className="btn btn-info btn-sm"
                                      onClick={(e) => deleteQcmHndler(qcm.id)}
                                    >
                                      Delete Qcm
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      style={{ marginLeft: 5 }}
                                      onClick={(e) => testDescExsite(qcm.id)}
                                    >
                                      Ajouter Commentaire
                                    </button>
                                  </div>
                                )}
                                {visisbleDescInsert && (
                                  <div className={classes.imgdescdiv}>
                                    <div className={classes.fulldescription}>
                                      <div className={classes.imagediv}>
                                        <img src={fileDisplay} />
                                        <input
                                          type="file"
                                          onChange={getFile}
                                        ></input>
                                      </div>
                                      <div className={classes.descarea}>
                                        <textarea
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          onChange={(e) =>
                                            setDescription(e.target.value)
                                          }
                                        ></textarea>
                                      </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className={`${classes.updtimage} btn btn-primary`}
                                      onClick={(e) => AjouterImage(qcm.id)}
                                    >
                                      Ajouter Image
                                    </button>

                                    <button
                                      className={`${classes.updtdesc} btn btn-primary`}
                                      type="submit"
                                      onClick={(e) => AjouterDesc(qcm.id)}
                                    >
                                      Ajouter Commentaire
                                    </button>
                                  </div>
                                )}
                                {VisisbleDescUpdate && (
                                  <div className={classes.imgdescdiv}>
                                    <div className={classes.fulldescription}>
                                      <div className={classes.imagediv}>
                                        <img
                                          src={FileDisplayEdite}
                                          onChange={getFileEdite}
                                        />
                                        <input
                                          type="file"
                                          onChange={getFileEdite}
                                        ></input>
                                      </div>
                                      <div className={classes.descarea}>
                                        <textarea
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          value={FullDescEdite.qcmDescription}
                                          onChange={(e) =>
                                            setFullDescEdite({
                                              ...FullDescEdite,
                                              qcmDescription: e.target.value,
                                            })
                                          }
                                        ></textarea>
                                      </div>
                                    </div>
                                    <button
                                      type="submit"
                                      className={`${classes.updtimage} btn btn-primary`}
                                      onClick={(e) => UpdateImage(qcm.id)}
                                    >
                                      Update Image
                                    </button>
                                    <button
                                      type="button"
                                      className={`${classes.deeletefulldesc} btn btn-danger`}
                                      onClick={(e) => deleteFullDesc(qcm.id)}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className={`${classes.updtdesc} btn btn-primary`}
                                      type="submit"
                                      onClick={(e) => UpdateDesc(qcm.id)}
                                    >
                                      Update Commentaire
                                    </button>
                                  </div>
                                )}
                                <div
                                  className={`${classes.qcmfeild_phone} table-hover shadow`}
                                  data-theme={isDark ? "dark" : "light"}
                                  onCopy={disableCopyPaste}
                                  onCut={disableCopyPaste}
                                  onPaste={disableCopyPaste}
                                  style={{
                                    userSelect: "none",
                                  }}
                                >
                                  <p>{qcm.qcmContent}</p>
                                </div>
                                <ImageQcm qcmId={qcm.id} />
                              </div>
                            );
                          }
                        })}
                        <div
                          className={`${classes.propofeild_phone} card table-hover shadow`}
                        >
                          {ShowPropositions.map(
                            (Proposition, QcmPropoIndex) => {
                              if (QcmPropoIndex === VisibiliteQcmIndex) {
                                return (
                                  <>
                                    <ul
                                      onCopy={disableCopyPaste}
                                      onCut={disableCopyPaste}
                                      onPaste={disableCopyPaste}
                                      style={{
                                        userSelect: "none",
                                      }}
                                      key={QcmPropoIndex}
                                      multiple={true}
                                      className={`${classes.ulpropo_phone} list-group list-group-flush`}
                                      data-theme={isDark ? "dark" : "light"}
                                    >
                                      {Proposition.map((propo, indexPropo) => (
                                        <li
                                          key={indexPropo}
                                          value={propo.id}
                                          style={{
                                            backgroundColor:
                                              SaveVerfieReponses[
                                                VisibiliteQcmIndex
                                              ] === VisibiliteQcmIndex
                                                ? propo.reponseBool === true
                                                  ? COLORS[1]
                                                  : savePropositions[
                                                      VisibiliteQcmIndex
                                                    ][indexPropo] ===
                                                      propo.id &&
                                                    propo.reponseBool === false
                                                  ? COLORS[0]
                                                  : ""
                                                : (SaveClickSelectVerfieAll[
                                                    VisibiliteQcmIndex
                                                  ] === VisibiliteQcmIndex &&
                                                    TrueFullInsertClr ===
                                                      true) ||
                                                  SaveQcmIsAnswer[
                                                    VisibiliteQcmIndex
                                                  ] === VisibiliteQcmIndex
                                                ? propo.reponseBool === true
                                                  ? COLORS[1]
                                                  : savePropositions[
                                                      VisibiliteQcmIndex
                                                    ][indexPropo] ===
                                                      propo.id &&
                                                    propo.reponseBool === false
                                                  ? COLORS[0]
                                                  : ""
                                                : "",
                                          }}
                                          className={
                                            savePropositions[
                                              VisibiliteQcmIndex
                                            ][indexPropo] === propo.id
                                              ? "list-group-item active  "
                                              : "list-group-item"
                                          }
                                          onClick={(e) => {
                                            handlePropoClick(
                                              e,
                                              propo.id,
                                              VisibiliteQcmIndex,
                                              indexPropo,
                                              propo.qcmStandard.id
                                            );
                                          }}
                                        >
                                          <img
                                            src={
                                              AlphabetChoice[
                                                (IndexAlphabetChoice =
                                                  IndexAlphabetChoice + 1)
                                              ]
                                            }
                                            height="30"
                                            width="30"
                                          />
                                          {propo.propositionQcm}
                                          {SaveQcmIsAnswer[
                                            VisibiliteQcmIndex
                                          ] === VisibiliteQcmIndex && (
                                            <div
                                              className={`${classes.percentage_phone} `}
                                            >
                                              {(
                                                (propo.countSelect * 100) /
                                                SavePercentageAmount[
                                                  VisibiliteQcmIndex
                                                ]
                                              ).toFixed(0)}
                                              %
                                            </div>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                    <div
                                      className={`${classes.btnfooter_phone} `}
                                    >
                                      {VisiblePrevBtn.value && (
                                        <GrPrevious
                                          className={classes.btnPrecdent_phone}
                                          type="button"
                                          onClick={handlePrevClick}
                                        />
                                      )}
                                      {SaveQcmIsAnswer[VisibiliteQcmIndex] ===
                                        "" && (
                                        <FaRegCheckCircle
                                          className={`${classes.BntVerifierrpnse_phone} `}
                                          onClick={(e) => {
                                            handleClickiVerifieReponse(
                                              VisibiliteQcmIndex
                                            );

                                            setTrueInsertClr(
                                              VisibiliteQcmIndex
                                            );

                                            saveQcmIndex.value[
                                              VisibiliteQcmIndex
                                            ] = VisibiliteQcmIndex;
                                            console.log(
                                              saveQcmIndex.value[
                                                VisibiliteQcmIndex
                                              ]
                                            );
                                          }}
                                        />
                                      )}
                                      {(SaveQcmIsAnswer[VisibiliteQcmIndex] ===
                                        VisibiliteQcmIndex ||
                                        SaveVerfieReponses[
                                          VisibiliteQcmIndex
                                        ] === VisibiliteQcmIndex) && (
                                        <button
                                          type="button"
                                          className={`${classes.button_10} `}
                                          onClick={(e) => {
                                            handeldescription(
                                              Proposition[0].qcmStandard.id
                                            );
                                          }}
                                        >
                                          Explication
                                        </button>
                                      )}
                                      {VisibleNextBtn.value ? (
                                        <div>
                                          <GrNext
                                            className={classes.btnsuivant_phone}
                                            type="button"
                                            onClick={handleNextClick}
                                          />
                                        </div>
                                      ) : (
                                        <IoCheckmarkDoneSharp
                                          className={classes.btnsuivant_phone}
                                          onClick={(e) => {
                                            handleClickiVerifieReponseAll();
                                          }}
                                        />
                                      )}
                                    </div>
                                  </>
                                );
                              }
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {ShowDescQcm && (
                    <Description qcmIdPropsQcmDesc={qcmIdPropsQcmDesc} />
                  )}
                </div>
                <div
                  className={`${classes.full_listeqcm_phone}`}
                  data-theme={isDark ? "dark" : "light"}
                  style={{ width: ShowListQcms ? 180 : 10 }}
                >
                  {ShowListQcms && (
                    <div className={`${classes.listeqcm_phone}`}>
                      <div className={`${classes.qcmsliste_header_phone}`}>
                        <h6>Liste Qcms</h6>
                      </div>
                      <ul className="list-group">
                        {ShowQcm.map((Qcm, QcmIndex) => (
                          <li
                            key={QcmIndex}
                            value={Qcm.id}
                            className={
                              SelectQcmIndex === QcmIndex
                                ? "list-group-item active  "
                                : "list-group-item"
                            }
                            onClick={(e) => {
                              handleItemClick(Qcm.id, QcmIndex);
                            }}
                          >
                            Question {QcmIndex + 1}
                            {SaveClickSelectVerfieAll[QcmIndex] ===
                              QcmIndex && (
                              <div className={classes.vl_select_phone}></div>
                            )}
                            {SaveQcmIsAnswer[QcmIndex] === QcmIndex && (
                              <div className={classes.vl_answer_phone}></div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className={`${classes.iconlistqcm}`}>
                    <img
                      src={dropright}
                      height="30"
                      width="30"
                      onClick={(e) => {
                        handleShowListeQcms();
                      }}
                    />
                  </div>
                </div>
                {visibleCommentaryStudent && (
                  <div className={`${classes.commentarydiv_phone} `}>
                    <li
                      className={`${classes.close_commentary_phone} list-group-item`}
                    >
                      <FaRegWindowClose
                        onClick={(e) => {
                          handleCloseCommentaryBtn();
                        }}
                      />
                    </li>
                    {qcmCommentary.map((commentary, index) => (
                      <div id={index}>
                        <div className={`${classes.commentary_likes_phone}`}>
                          <div
                            className={`${classes.eachcommentary_phone} card`}
                            style={{ backgroundColor: "#F5F5F5" }}
                          >
                            <h6>
                              {commentary.ourUsers.name}{" "}
                              {commentary.ourUsers.lastname}
                            </h6>
                            <h5>{commentary.commentaryStudent}</h5>
                          </div>
                          <div className={`${classes.likes_phone}`}>
                            <div className={`${classes.btnjadore_phone}`}>
                              <button
                                onClick={(e) => {
                                  {
                                    handlejadorebtn(
                                      commentary.id,
                                      commentary.likes,
                                      commentary.qcmStandard.id
                                    );
                                  }
                                }}
                              >
                                j'adore
                              </button>
                            </div>

                            <div className={`${classes.btnjadore_icon_phone}`}>
                              <h6>{commentary.likes}</h6>

                              <img src={jadore} height="50%" width="20" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className={`${classes.inputcommentary_phone} input-group `}
                    >
                      <div className={`${classes.custom_search_phone} `}>
                        <input
                          type="text"
                          className={`${classes.custom_search_input_phone} form-control`}
                          placeholder="Commenter"
                          value={inputStr}
                          onChange={(e) => setInputStr(e.target.value)}
                        />
                        <div
                          className={`${classes.custom_search_botton_phone} picker-container`}
                        >
                          <div
                            className={`${classes.imojiicon_btnsend_phone} `}
                          >
                            <img
                              className="emoji-icon"
                              src={smileimoji}
                              height="70%"
                              width="25"
                              onClick={() => setShowPicker((val) => !val)}
                            />
                            <img
                              onClick={(e) => {
                                handlesendComment();
                              }}
                              src={sendcomentary}
                              height="70%"
                              width="25"
                            />
                          </div>
                        </div>
                        <div className={`${classes.pickerdiv_phone} `}></div>
                      </div>
                    </div>

                    {showPicker && (
                      <Picker
                        style={{ width: "100%" }}
                        onEmojiClick={(emojiObject) => {
                          setInputStr((prevMsg) => prevMsg + emojiObject.emoji);
                          setShowPicker(false);
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {VisibleQmcContainer && isTabletOrMobile && <BackdropQuiz />}
            {modalDeleteCourIsOpen && (
              <ModalDeleteFullDesc
                onCancel={closeDeleteModalHandler}
                onConfirm={closeDeleteModalHandler}
                qcmId_delete={qcmIddelete.value}
              />
            )}
            {modalDeleteCourIsOpen && (
              <BackdropDeleteCour onCancel={closeDeleteModalHandler} />
            )}
          </div>
          {isDesktopOrLaptop && ModalDoneQuizIsOpen && (
            <>
              <div className={classes.card_done_quiz}>
                <div className={classes.card_done_quiz_btns}>
                  <h6>
                    {" "}
                    Il y a des questions à laquelle vous n'avez pas répondu dans
                    cette quizz
                  </h6>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handlerConfirmShowAllReponse}
                  >
                    je sais,Afficher les reponses
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handlerCancelShowAllReponse}
                  >
                    Retour au Quiz
                  </button>
                </div>
              </div>
            </>
          )}
          {isDesktopOrLaptop && ModalDoneQuizIsOpen && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}
          {isDesktopOrLaptop && ModalSaveQuizzIsOpen && (
            <>
              <div className={classes.save_quizz}>
                <div className={classes.save_quizz_conetent}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="nome de quizz"
                    onChange={(e) => setQcmQuizzName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleSaveQcmQuizz}
                  >
                    Save Qcm Quizz
                  </button>
                </div>
              </div>
            </>
          )}
          {isDesktopOrLaptop && ModalSaveQuizzIsOpen && (
            <BackdropDoneQuiz onCancel={closeModalSaveQcmQuizHandler} />
          )}
          {isTabletOrMobile && ModalDoneQuizIsOpen && (
            <>
              <div className={classes.card_done_quiz_phone}>
                <div className={classes.card_done_quiz_btns_phone}>
                  <h6>
                    {" "}
                    Il y a des questions à laquelle vous n'avez pas répondu dans
                    cette quizz
                  </h6>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handlerConfirmShowAllReponse}
                  >
                    je sais,Afficher les reponses
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handlerCancelShowAllReponse}
                  >
                    Retour au Quiz
                  </button>
                </div>
              </div>
            </>
          )}
          {isTabletOrMobile && ModalDoneQuizIsOpen && (
            <BackdropDoneQuiz onCancel={closeModalDoneQuizHandler} />
          )}
          {isTabletOrMobile && ModalSaveQuizzIsOpen && (
            <>
              <div className={classes.save_quizz_phone}>
                <div className={classes.save_quizz_conetent_phone}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="nome de quizz"
                    onChange={(e) => setQcmQuizzName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleSaveQcmQuizz}
                  >
                    Save Qcm Quizz
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={closeModalSaveQcmQuizHandler}
                  >
                    cancel
                  </button>
                </div>
              </div>
            </>
          )}
          {isTabletOrMobile && ModalSaveQuizzIsOpen && (
            <BackdropSaveQuizPhone onCancel={closeModalSaveQcmQuizHandler} />
          )}
        </>
      )}
      {OpenBoardClinique && (
        <QuizBoardClinique
          selectMultipleCours={props.selectMultipleCours}
          moduleName={props.moduleName}
          qcmType={props.qcmType}
          TrueFullInsertClr={TrueFullInsertClr}
          QcmSujetTypeSelected={props.QcmSujetTypeSelected}
          getYear={getYear.value || props.getYear}
          minYearQcm={props.minYearQcm}
          maxYearQcm={props.maxYearQcm}
          getGroupePerm={getGroupePerm.value || props.getGroupePerm}
          minMaxYearParSujetsFinal={props.minMaxYearParSujetsFinal}
          moduleId={props.moduleId}
          ExisteCasClinique={props.ExisteCasClinique}
          SelectedSourceExmn={props.SelectedSourceExmn}
          checkParSjtBiologieClinique={props.checkParSjtBiologieClinique}
          savePropositions={savePropositions}
          SaveVerfieReponses={SaveVerfieReponses}
          doneGetAllClinique={props.doneGetAllClinique}
          IsRepondeAllSignal={IsRepondeAllSignal.value}
          SaveClickSelectVerfieAll={SaveClickSelectVerfieAll}
          SaveQcmIsAnswer={SaveQcmIsAnswer}
          savePropositionsClinique={props.savePropositionsClinique}
          SaveVerfieReponsesClinique={props.SaveVerfieReponsesClinique}
          SaveQcmIsAnswerClinique={props.SaveQcmIsAnswerClinique}
          TrueFullInsertClrClinique={props.TrueFullInsertClrClinique}
          SavePercentageCliniqueAmount={props.SavePercentageCliniqueAmount}
          SaveClickSelectVerfieAllClinique={
            props.SaveClickSelectVerfieAllClinique
          }
          SavePercentageAmount={SavePercentageAmount}
          test={true}
          qcmAndCliniqueTimer={true}
          watchValues={[
            {
              hours:
                props.isPassQcmClinique !== undefined
                  ? props.watchValues[0].hours
                  : hours,
            },
            {
              minutes:
                props.isPassQcmClinique !== undefined
                  ? props.watchValues[1].minutes
                  : minutes,
            },
            {
              seconds:
                props.isPassQcmClinique !== undefined
                  ? props.watchValues[2].seconds
                  : seconds,
            },
          ]}
          commingFrom={props.commingFrom}
        />
      )}
    </>
  );
}
export default QuizBoard;
