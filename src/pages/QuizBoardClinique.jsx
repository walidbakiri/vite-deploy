import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./QuizBoardClinique.module.css";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSignal } from "@preact/signals-react";
import { useLocation } from "react-router-dom";
import QuizBoard from "./QuizBoard";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import A from "../compenent/layout/img/A.png";
import B from "../compenent/layout/img/B.png";
import C from "../compenent/layout/img/C.png";
import D from "../compenent/layout/img/D.png";
import E from "../compenent/layout/img/E.png";
import GoatLogo from "../compenent/layout/GoatLogo.png";
import externatlogo from "../compenent/layout/externatlogo.svg";
import courlogo from "../compenent/layout/courlogo.svg";
import groupelogo from "../compenent/layout/groupelogo.svg";
import UserService from "../compenent/layout/service/UserService";
import ModalDeleteFullDescClinique from "./ModalDeleteFullDescClinique";
import BackdropDeleteCour from "./BackdropDeleteCour";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import DescriptionClinique from "./DescriptionClinique";
import { useMediaQuery } from "react-responsive";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Backdrop from "./Backdrop";
import ModalDeleteCasClinique from "./ModalDeleteCasClinique";
import ModalDeleteQcmCasClinique from "./ModalDeleteQcmCasClinique";
import ImageClinique from "./ImageClinique";
import useLocalStorage from "use-local-storage";
import BackdropDoneQuiz from "./BackdropDoneQuiz";
import { IoMdArrowDropdown } from "react-icons/io";
import dropright from "../compenent/layout/img/dropright.png";
import { useStopwatch } from "react-timer-hook";
import { IoPlayCircleOutline } from "react-icons/io5";

import { IoPauseCircleOutline } from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";
import { BsSave } from "react-icons/bs";
import BackdropSaveQuizPhone from "./BackdropSaveQuizPhone";
function QuizBoardClinique(props) {
  const BASE_URL = "https://goatqcm-instance.com";
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const token = localStorage.getItem("tokengoat");
  //******************************************************************* */
  let valueee = false;
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  const savWAL = useSignal([]);
  let navigateEditeQcm = useNavigate();
  let backFromCliniqueAllQcmCliniqueprSujet = useSignal(true);
  let { module_id } = useParams();
  let { cours_id } = useParams();
  const [ShowSideBare, setShowSideBare] = useState(false);
  const [ShowQcm, setShowQcm] = useState([]);
  const [ShowPorposition, setShowPorposition] = useState([]);
  let getQcms = useSignal([]);
  const QuizQcmQclinique = true;
  const resultGetLoadQcms = useSignal([]);
  const currentIndex = useSignal(0);
  let qcmNumber = useSignal(0);
  const [QcmIndex, setQcmIndex] = useState(0);
  const [VisibiliteCasCliniqueIndex, setVisibiliteCasCliniqueIndex] =
    useState(0);
  const valeurnom = ["walid", "bakiri"];
  const VisibleNextBtn = useSignal(true);
  const VisiblePrevBtn = useSignal(false);
  let [SelectIndex, setSelectIndex] = useState(-1);
  const COLORS = ["#fd5c63", "#50C878"];
  const [backGroundBtn, setBackGroundBtn] = useState("#F0F0F0");
  const [TrueInsertClr, setTrueInsertClr] = useState("");
  const [TrueInsertClrClick, setTrueInsertClrClick] = useState("");
  const [TrueFullInsertClrClinique, setTrueFullInsertClrClinique] =
    useState("");
  const [SlectCliniquePropo, setSlectCliniquePropo] = useState("");
  const selectSaveIndex = useSignal([]);
  let AlphabetChoice = [A, B, C, D, E];
  let IndexAlphabetChoice = useSignal(-1);
  const { state } = useLocation();
  const { courId, qcmType } = state;
  let incrmnt = 0;
  let incrClnTable = 0;
  //***cas clinique variable****************** */
  let incFullCas = useSignal(0);
  let getCasClinique = useSignal([]);
  const [ShowCasClinique, setShowCasClinique] = useState([]);
  const [OpenBoardQcm, setOpenBoardQcm] = useState(false);
  //*************par sujets************************************* */
  const [VisibleParSujet, setVisibleParSujet] = useState(false);
  const [VisibleQmcContainer, setVisibleQmcContainer] = useState(false);
  const [GetYearProps, setGetYearProps] = useState([]);
  const [GroupesPermut, setGroupesPermut] = useState([]);
  const [ShowGroupePermExternat, setShowGroupePermExternat] = useState(true);
  const isParticipateAdmin = UserService.isParticipateAdmin();
  let navigateHome = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  //********************************************* ******************/
  //***************show descr***************************************** */
  const qcmIdPropsQcmDesc = useSignal("");
  const [ShowDescQcm, setShowDescQcm] = useState(false);
  const [ShowVerifierRpnsBtn, setShowVerifierRpnsBtn] = useState(true);
  const [ShowDescRpnsBtn, setShowDescRpnsBtn] = useState(false);
  const saveCaseCliniqueIndex = useSignal([]);
  const qcmNumberOfClinique = useSignal([]);
  let saveQcmIndex = useSignal([]);
  const [clickedVrfBtn, setCickedVrfBtn] = useState(false);
  const incrtValue = useSignal(0);
  const saveIncrValueOfeachClinique = useSignal([]);

  const [ModalDeleteCliniqueIsOpen, setModalDeleteCliniqueIsOpen] =
    useState(false);
  const currentCasCliniqueId = useSignal("");
  const getTrueFullInsertClr = useSignal(false);
  const [ModalDeleteQcmCliniqueIsOpen, setModalDeleteQcmCliniqueIsOpen] =
    useState(false);
  const currentQcmCasCliniqueId = useSignal("");
  //******************************************************************** */
  const saveAllCasClinique = useSignal([]);
  const donePropoShow = useSignal(true);
  let incCour = useSignal(0);

  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  //************************************************************************* */
  const saveCurrentSelet = useSignal([]);
  //*****responde all ***********************************************// */
  const [IsRepondeAll, setIsRepondeAll] = useState(true);
  const IsRepondeAllSignal = useSignal(true);
  const [ModalDoneQuizIsOpen, setModalDoneQuizIsOpen] = useState(false);
  const [ShowNoSelectPropoMessage, setShowNoSelectPropoMessage] =
    useState(false);
  const IsRepondeAllSignalQcm = useSignal(true);
  let SaveQcmIsAnsw = useSignal([]);
  const getSavVal = useSignal([]);
  //****************************************************************** */
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
  const [modalDeleteCourIsOpen, setModalDeleteCourIsOpen] = useState(false);
  const qcmIddelete = useSignal("");
  const currentQcmIdOfPropo = useSignal("");
  let clnqIdexeCurrent = useSignal(0);
  let indexCurrentCalinique = useSignal(0);

  //****save propo selected******************************************* */
  let [savePropositionsClinique, setSavePropositionsClinique] = useState([]);
  let saveCurrentPropo = [];
  let saveCurrentVerifier = [];
  let saveCurrentQcmIsAnswer = [];
  let saveCurrentPecentage = [];
  let saveCurrentVerifierAll = [];
  const [SaveVerfieReponsesClinique, setSaveVerfieReponsesClinique] = useState(
    []
  );
  let saveCurrentQcmIsAnswr = useSignal([]);
  let saveCurrentVerRep = useSignal([]);
  let saveCurrentVerRepAll = useSignal([]);
  let saveCurrentPecentagefinal = useSignal([]);
  let incClinique = useSignal(0);
  const doneGetAllClinique = useSignal(false);
  const doneFirstUplaod = useSignal(false);
  const saveCurrentQcms = useSignal([]);
  const saveCurrentClinique = useSignal([]);
  const [
    SaveClickSelectVerfieAllClinique,
    setSaveClickSelectVerfieAllClinique,
  ] = useState([]);
  let [SaveQcmIsAnswerClinique, setSaveQcmIsAnswerClinique] = useState([]);
  const [SelectcasCliniqueIndex, setSelectcasCliniqueIndex] = useState("");
  let [CasCliniqueClicked, setCasCliniqueClicked] = useState("");
  let [saveDoneLoadQcmsCasClinique, setSaveDoneLoadQcmsCasClinique] = useState(
    []
  );
  let saveLastCliniqueOpenIndex = useSignal(0);
  const [ShowListQcms, setShowListQcms] = useState(false);
  //******percentage************************************** */
  const saveAllCouentSelect = useSignal([]);
  let [SavePercentageCliniqueAmount, setSavePercentageCliniqueAmount] =
    useState([]);
  let saveCurrentAmount = [];
  //********************************************************* */
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
  //*******save cas clinique******************************************** */
  const saveUserCasClinique = {
    id: "",
    name: "",
    lastname: "",
    password: "",
    role: "",
  };

  const [SaveCasCliniqueQuizz, setSaveCasCliniqueQuizz] = useState({
    nameCasCliniqueQuizz: "",
    qcmSujetTypeSelected: "",
    selectedSourceExmn: "",
    moduleId: "",
    moduleName: "",
    selectMultipleCours: "",
    qcmType: "",
    minYearQcm: "",
    maxYearQcm: "",
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",
    ourUsers: {},
  });

  const [SaveQcmCasCliniqueQuizz, setSaveQcmCasCliniqueQuizz] = useState({
    nameQcmCasCliniqueQuizz: "",
    qcmSujetTypeSelected: "",
    selectedSourceExmn: "",
    moduleId: "",
    moduleName: "",
    selectMultipleCours: "",
    qcmType: "",
    minYearQcm: "",
    maxYearQcm: "",
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
    existeCasClinique: "",
    doneGetAllClinique: "",
    ourUsers: {},
  });
  const doneFirstUplaodSaveQcm = useSignal(false);
  const [ModalSaveQuizzIsOpen, setModalSaveQuizzIsOpen] = useState(false);
  let [casCliniqueQuizzName, setCasCliniqueQuizzName] = useState("");
  let [showSaveCasCliniqueBtn, setShowSaveCasCliniqueBtn] = useState(false);
  let [showUpdateCasCliniqueBtn, setShowUpdateCasCliniqueBtn] = useState(false);
  let [showSaveQcmCasCliniqueBtn, setShowSaveQcmCasCliniqueBtn] =
    useState(false);
  let [showUpdateQcmCasCliniqueBtn, setShowUpdateQcmCasCliniqueBtn] =
    useState(false);
  let isPassQcmClinique = useSignal(true);
  const [veriferAllreponseClicked, setVeriferAllreponseClicked] =
    useState(false);
  //****update qcmquizz************************************** */
  const [updateCasCliniqueQuizz, setUpdateCasCliniqueQuizz] = useState({
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",
  });
  //********************************************************** */
  //****update qcmquizz************************************** */
  const [updateQcmCasCliniqueQuizz, setUpdateQcmCasCliniqueQuizz] = useState({
    savePropositions: "",
    saveClickSelectVerfieAll: "",
    saveVerfieReponses: "",
    saveQcmIsAnswer: "",
    savePercentageAmount: "",
    savePropositionsClinique: "",
    saveClickSelectVerfieAllClinique: "",
    saveVerfieReponsesClinique: "",
    saveQcmIsAnswerClinique: "",
    savePercentageCliniqueAmount: "",
  });
  //********************************************************** */
  //************************************************************************ */
  const disableCopyPaste = (e) => {
    e.preventDefault();
  };
  //*********************************************************************** */
  //******************************************************************* */
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
  //****test if desc existe******************** */
  const testDescExsite = async (qcmId) => {
    const fullDescResult = await axios.get(
      `https://goatqcm-instance.com/fulldesc/clinique/descqcm/${qcmId}`
    );

    console.log(fullDescResult.data);
    if (fullDescResult.data !== null) {
      setFullDescEdite(fullDescResult.data);
      setFileDisplayEdite(
        `https://goatqcm-instance.com/image/clinique/${qcmId}/${fullDescResult.data.imageName}`
      );

      setLoadImage(fullDescResult.data);
      setvisisbleDescInsert(false);
      setVisisbleDescUpdate(true);
      setFileDisplay(false);
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
      .put(
        `https://goatqcm-instance.com/image/clinique/updateimage/${qcmId}`,
        formData
      )
      .then((res) => {
        toast.success("Succes Editing");
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
      .put(
        `https://goatqcm-instance.com/image/clinique/updatedesc/${qcmId}`,
        formData
      )
      .then((res) => {
        console.log("success updating");
        toast.success("Succes Editing");
        setVisisbleDescUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  //************************************************************ */
  //***store image to database*************************** */
  const AjouterImage = async (qcmId) => {
    testDescExsite(qcmId);

    const result = await axios.get(`${BASE_URL}/qcmsclinique/${qcmId}`);
    const formData = new FormData();
    console.log(result.data);
    console.log(file);
    formData.append("image", file);
    formData.append("qcmStandard", JSON.stringify(result.data));
    axios
      .post(
        "https://goatqcm-instance.com/image/clinique/uploadimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success("Image Commentaire inseré avec succes");
        setvisisbleDescInsert(false);
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */
  //***store description to database*************************** */
  const AjouterDesc = async (qcmId) => {
    testDescExsite(qcmId);
    const result = await axios.get(
      `https://goatqcm-instance.com/qcmsclinique/${qcmId}`
    );
    console.log(result.data);
    const formData = new FormData();
    formData.append("desc", description);
    formData.append("qcmStandard", JSON.stringify(result.data));
    axios
      .post("https://goatqcm-instance.com/image/clinique/uploadesc", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Commentaire inseré avec succes");
        setvisisbleDescInsert(false);
      })
      .catch((err) => console.log(err));
  };
  //******************************************************* */
  //delete function*//////////////////////////////////////////////////////////
  const deleteFullDesc = async (qcmId) => {
    qcmIddelete.value = qcmId;
    setModalDeleteCourIsOpen(true);
    setVisisbleDescUpdate(false);
  };

  function closeDeleteModalHandler() {
    setModalDeleteCourIsOpen(false);
  }
  //****description******************************************************************* */
  const handeldescription = async (qcmId) => {
    qcmIdPropsQcmDesc.value = qcmId;
    setShowDescQcm(true);
  };
  //*********************************************************************************** */
  ////////////////////////////////////////////////////////////////////////////
  //*****end of description methods**************************************************************************** */
  function killCopy(e) {
    if (isParticipateAdmin) {
      console.log("is admin or partic");
    } else {
      return false;
    }
  }
  useEffect(() => {
    //for timer**************************
    localStorage.setItem("passQcmCasClinique", true);
    //**************************************** */

    console.log(localStorage.getItem("DoneClinqueShow"));
    console.log(props.doneGetAllClinique);
    //document.onmousedown = killCopy;

    console.log(props.minYearQcm);
    console.log(props.maxYearQcm);
    setTrueFullInsertClrClinique(props.showAllReponses);
    console.log(props.QcmSujetTypeSelected);
    console.log(props.minMaxYearParSujetsFinal);
    console.log(props.getYear);
    console.log(props.getGroupePerm);
    console.log(props.SelectedSourceExmn);
    if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
        setVisibleParSujet(true);
        //setVisibleQmcContainer(true);
        loadyearQcmsParSujet();
      } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
        loadCasClinique();
        setVisibleQmcContainer(true);
      }
    } else if (props.QcmSujetTypeSelected === "Par Cour") {
      console.log("par coursss");
      setVisibleParSujet(false);
      setVisibleQmcContainer(true);
      loadCasClinique();
    }

    if (props.SelectedSourceExmn === "Résidanat Blida") {
      setShowGroupePermExternat(false);
    }
    if (props.qcmType === "Cas Clinique") {
      setShowGroupePermExternat(true);
    }

    // loadProposition();
  }, []);
  //******par sujet methodes****************************************** */
  //***get years props*************************** *****************************/
  function loadyearQcmsParSujet() {
    setGetYearProps(props.minMaxYearParSujetsFinal);
  }
  //*************************************************************************** */
  //*****par sujets Methodes********************************************************* */
  const SelectYearHndlerChange = async (e) => {
    const getYear = document.getElementById("year").value;
    console.log(getYear);
    const result = await axios.get(
      `https://goatqcm-instance.com/casclinique/get_groupes_year/${props.moduleId}/${getYear}/${props.SelectedSourceExmn}`
    );
    document.getElementById("groupepermutation").options[0].selected = true;
    setGroupesPermut(result.data);
    console.log(result.data);

    setVisibleQmcContainer(false);
    /*if (VisibiliteCasCliniqueIndex === ShowCasClinique.length) {
      VisibleNextBtn.value = false;
    } else if (VisibiliteCasCliniqueIndex < ShowCasClinique.length) {
      VisibleNextBtn.value = true;
    }*/
  };
  //********************************************************************************** */
  const SelectGroupePermHndlerChange = async (e) => {
    currentIndex.value = 0;
    // getCasClinique.value = [];
    setTrueFullInsertClrClinique(false);
    loadCasClinique();

    setVisibleQmcContainer(true);
  };

  //********************************************************************************** */
  //************************************************************************ */
  //**load cour***************************************************************
  const loadCasClinique = async (doneGetPropo) => {
    //***************************************************** */
    if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      VisiblePrevBtn.value = true;
    }
    if (props.QcmSujetTypeSelected === "Par Cour") {
      if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
        doneGetPropo = true;
        donePropoShow.value = doneGetPropo;
        console.log(props.selectMultipleCours);
        while (
          donePropoShow.value === true &&
          incCour.value < props.selectMultipleCours.length
        ) {
          console.log("get clinique of this cour");
          console.log(props.selectMultipleCours[incCour.value]);
          donePropoShow.value = false;
          try {
            const result = await axios.get(
              `https://goatqcm-instance.com/cours/${
                props.selectMultipleCours[incCour.value]
              }/qcmsclinique/${props.minYearQcm}/${props.maxYearQcm}/${
                props.SelectedSourceExmn
              }`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            saveAllCasClinique.value = result.data;
          } catch {
            console.log("casClinique not find");
          }
          incCour.value = incCour.value + 1;
          console.log(saveAllCasClinique.value);
          if (saveAllCasClinique.value.length > 0) {
            for (
              let incEachCasClinique = 0;
              incEachCasClinique < saveAllCasClinique.value.length;
              incEachCasClinique++
            ) {
              setShowCasClinique((casClinique) => [
                ...casClinique,
                saveAllCasClinique.value[incEachCasClinique],
              ]);

              getCasClinique.value[incFullCas.value] =
                saveAllCasClinique.value[incEachCasClinique];
              console.log();

              incFullCas.value = incFullCas.value + 1;

              if (incEachCasClinique === saveAllCasClinique.value.length - 1) {
                loadQcmsCasClinique();
              }
            }
          } else {
            if (incCour.value <= props.selectMultipleCours.length) {
              donePropoShow.value = true;
            }

            console.log("no clinique found");
          }
        }

        //******************************************** */
        if (getCasClinique.value.length === 1) {
          VisibleNextBtn.value = false;
        } else if (getCasClinique.value.length >= 1) {
          VisibleNextBtn.value = true;
        }
        //******************************************* */
      } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
        //********cas clinique multiple cours************************ */
        doneGetPropo = true;
        donePropoShow.value = doneGetPropo;
        console.log(props.selectMultipleCours);
        //***set done upload all cas clinique*********************** */
        if (
          incCour.value === props.selectMultipleCours.length
          //|| localStorage.getItem("DoneClinqueShow") === true
        ) {
          //localStorage.setItem("DoneClinqueShow", true);
          doneGetAllClinique.value = true;
        }
        //***done upload cas clinique******************************** */
        while (
          donePropoShow.value === true &&
          incCour.value < props.selectMultipleCours.length
        ) {
          console.log("get clinique of this cour");
          console.log(props.selectMultipleCours[incCour.value]);
          donePropoShow.value = false;
          try {
            const result = await axios.get(
              `https://goatqcm-instance.com/cours/${
                props.selectMultipleCours[incCour.value]
              }/qcmsclinique/${props.minYearQcm}/${props.maxYearQcm}/${
                props.SelectedSourceExmn
              }`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            saveAllCasClinique.value = result.data;
          } catch {
            console.log("casClinique not find");
          }
          incCour.value = incCour.value + 1;
          console.log(saveAllCasClinique.value);
          if (saveAllCasClinique.value.length > 0) {
            for (
              let incEachCasClinique = 0;
              incEachCasClinique < saveAllCasClinique.value.length;
              incEachCasClinique++
            ) {
              setShowCasClinique((casClinique) => [
                ...casClinique,
                saveAllCasClinique.value[incEachCasClinique],
              ]);

              getCasClinique.value[incFullCas.value] =
                saveAllCasClinique.value[incEachCasClinique];
              console.log();

              incFullCas.value = incFullCas.value + 1;

              if (incEachCasClinique === saveAllCasClinique.value.length - 1) {
                loadQcmsCasClinique();
              }
            }
          } else {
            if (incCour.value <= props.selectMultipleCours.length) {
              donePropoShow.value = true;
            }

            console.log("no clinique found");
          }
        }

        //******************************************** */
        if (getCasClinique.value.length === 1) {
          VisibleNextBtn.value = false;
        } else if (getCasClinique.value.length >= 1) {
          VisibleNextBtn.value = true;
        }
        //******************************************* */
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      if (props.qcmType !== "Tous (Qcm,Cas Clinique)") {
        const getCurrentGroupePerm =
          document.getElementById("groupepermutation").value;
        const getCurrentYear = document.getElementById("year").value;
        try {
          const result = await axios.get(
            `https://goatqcm-instance.com/casclinique/getcasclinique/${props.moduleId}/${getCurrentYear}/${getCurrentGroupePerm}/${props.SelectedSourceExmn}`
          );
          setShowCasClinique([]);
          setShowPorposition([]);
          // setShowQcm([]);
          setVisibiliteCasCliniqueIndex(0);
          setQcmIndex(0);

          getCasClinique.value = result.data;
          setShowCasClinique(getCasClinique.value);
          console.log(getCasClinique.value);
          console.log(getCasClinique.value.length);

          if (getCasClinique.value.length === 1) {
            VisibleNextBtn.value = false;
            VisiblePrevBtn.value = false;
          } else if (getCasClinique.value.length > 1) {
            setVisibiliteCasCliniqueIndex(0);
            VisibleNextBtn.value = true;
          }

          loadQcmsCasClinique();
        } catch {
          console.log("casClinique not find");
        }
      } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
        if (props.SelectedSourceExmn === "Externat Blida") {
          if (props.checkParSjtBiologieClinique === "CliniqueParSujet") {
            try {
              const result = await axios.get(
                `https://goatqcm-instance.com/casclinique/getcasclinique/${props.moduleId}/${props.getYear}/${props.getGroupePerm}/${props.SelectedSourceExmn}`
              );
              console.log(props.getYear);
              console.log(props.getGroupePerm);
              setShowCasClinique([]);
              setShowPorposition([]);
              // setShowQcm([]);
              setVisibiliteCasCliniqueIndex(0);
              setQcmIndex(0);

              getCasClinique.value = result.data;
              setShowCasClinique(getCasClinique.value);
              console.log(getCasClinique.value);
              console.log(getCasClinique.value.length);

              if (getCasClinique.value.length === 1) {
                VisibleNextBtn.value = false;
                VisiblePrevBtn.value = false;
              } else if (getCasClinique.value.length > 1) {
                setVisibiliteCasCliniqueIndex(0);
                VisibleNextBtn.value = true;
              }

              loadQcmsCasClinique();
            } catch {
              console.log("casClinique not find");
            }
          } else if (props.checkParSjtBiologieClinique === "BiologieParSujet") {
            try {
              const result = await axios.get(
                `https://goatqcm-instance.com/casclinique/getcasclinique/biologie/${props.moduleId}/${props.getYear}/Biologie`
              );

              setShowCasClinique([]);
              setShowPorposition([]);
              // setShowQcm([]);
              setVisibiliteCasCliniqueIndex(0);
              setQcmIndex(0);

              getCasClinique.value = result.data;
              setShowCasClinique(getCasClinique.value);
              console.log(getCasClinique.value);
              console.log(getCasClinique.value.length);

              if (getCasClinique.value.length === 1) {
                VisibleNextBtn.value = false;
                VisiblePrevBtn.value = false;
              } else if (getCasClinique.value.length > 1) {
                setVisibiliteCasCliniqueIndex(0);
                VisibleNextBtn.value = true;
              }

              loadQcmsCasClinique();
            } catch {
              console.log("casClinique not find");
            }
          }
        } else if (props.SelectedSourceExmn === "Résidanat Blida") {
          try {
            const result = await axios.get(
              `https://goatqcm-instance.com/casclinique/getcasclinique/${props.moduleId}/${props.getYear}/${props.SelectedSourceExmn}`
            );
            console.log(props.getYear);
            console.log(props.getGroupePerm);
            setShowCasClinique([]);
            setShowPorposition([]);
            // setShowQcm([]);
            setVisibiliteCasCliniqueIndex(0);
            setQcmIndex(0);

            getCasClinique.value = result.data;
            setShowCasClinique(getCasClinique.value);
            console.log(getCasClinique.value);
            console.log(getCasClinique.value.length);

            if (getCasClinique.value.length === 1) {
              VisibleNextBtn.value = false;
              VisiblePrevBtn.value = true;
            } else if (getCasClinique.value.length > 1) {
              setVisibiliteCasCliniqueIndex(0);
              VisibleNextBtn.value = true;
            }

            loadQcmsCasClinique();
          } catch {
            console.log("casClinique not find");
          }
        }
      }
    }
  };
  //********************************************************************** */
  //**load Qcm***************************************************************
  const loadQcmsCasClinique = async () => {
    if (props.doneGetAllClinique === true && doneFirstUplaod.value === false) {
      doneFirstUplaod.value = true;
      console.log("la racinee");
      setSavePropositionsClinique(props.savePropositionsClinique);
      setSaveVerfieReponsesClinique(props.SaveVerfieReponsesClinique);
      setSaveQcmIsAnswerClinique(props.SaveQcmIsAnswerClinique);
      setTrueFullInsertClrClinique(props.TrueFullInsertClrClinique);
      setSavePercentageCliniqueAmount(props.SavePercentageCliniqueAmount);
      setSaveClickSelectVerfieAllClinique(
        props.SaveClickSelectVerfieAllClinique
      );
    }
    if (
      props.commingFrom === "savequizz" &&
      doneFirstUplaodSaveQcm.value === false
    ) {
      doneFirstUplaodSaveQcm.value = true;
      console.log(props.savePropositionsClinique);
      console.log(props.SaveVerfieReponsesClinique);
      console.log(props.SavePercentageCliniqueAmount);
      console.log(props.SaveClickSelectVerfieAllClinique);
      console.log(props.SaveQcmIsAnswerClinique);

      setSavePropositionsClinique(props.savePropositionsClinique);
      setSaveVerfieReponsesClinique(props.SaveVerfieReponsesClinique);
      setSaveQcmIsAnswerClinique(props.SaveQcmIsAnswerClinique);
      setSavePercentageCliniqueAmount(props.SavePercentageCliniqueAmount);
      setSaveClickSelectVerfieAllClinique(
        props.SaveClickSelectVerfieAllClinique
      );
    }

    if (props.QcmSujetTypeSelected === "Par Cour") {
      console.log(getCasClinique.value.length);

      for (
        let clnqIdex = clnqIdexeCurrent.value;
        clnqIdex < getCasClinique.value.length;
        clnqIdex++
      ) {
        //***initlaiszation************************************** */
        saveCurrentVerifier = [];
        saveCurrentVerifierAll = [];
        saveCurrentQcmIsAnswer = [];
        saveCurrentPecentage = [];
        //********************************************************* */
        const result = await axios.get(
          `https://goatqcm-instance.com/casclinique/${getCasClinique.value[clnqIdex].id}/qcms`
        );
        qcmNumberOfClinique.value[clnqIdex] = result.data.length;
        console.log(qcmNumberOfClinique.value[clnqIdex]);
        getQcms.value[clnqIdex] = result.data;
        setShowQcm((qcm) => [...qcm, getQcms.value[clnqIdex]]);
        //*******comming from save quizz***************************************** */
        if (!props.doneGetAllClinique) {
          if (props.commingFrom !== "savequizz") {
            getQcms.value[clnqIdex].forEach((element, index) => {
              saveCurrentVerifier[index] = "";
              saveCurrentVerifierAll[index] = "";
              saveCurrentQcmIsAnswer[index] = "";
              saveCurrentPecentage[index] = "";
            });

            saveCurrentVerRep.value[clnqIdex] = saveCurrentVerifier;
            saveCurrentVerRepAll.value[clnqIdex] = saveCurrentVerifierAll;
            saveCurrentQcmIsAnswr.value[clnqIdex] = saveCurrentQcmIsAnswer;
            saveCurrentPecentagefinal.value[clnqIdex] = saveCurrentPecentage;

            setSaveVerfieReponsesClinique(saveCurrentVerRep.value);
            setSaveClickSelectVerfieAllClinique(saveCurrentVerRepAll.value);
            setSaveQcmIsAnswerClinique(saveCurrentQcmIsAnswr.value);
            setSavePercentageCliniqueAmount(saveCurrentPecentagefinal.value);
          }
        }
        //********done save empty propo***************************** */
        if (clnqIdex === getCasClinique.value.length - 1) {
          console.log("done upload qcmss");
          clnqIdexeCurrent.value = getCasClinique.value.length;
          loadProposition();
          setSaveDoneLoadQcmsCasClinique([
            ...saveDoneLoadQcmsCasClinique,
            true,
          ]);
        }
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      for (
        let clnqIdex = 0;
        clnqIdex < getCasClinique.value.length;
        clnqIdex++
      ) {
        //***initlaiszation************************************** */
        saveCurrentVerifier = [];
        saveCurrentVerifierAll = [];
        saveCurrentQcmIsAnswer = [];
        saveCurrentPecentage = [];
        //********************************************************* */
        const result = await axios.get(
          `https://goatqcm-instance.com/casclinique/${getCasClinique.value[clnqIdex].id}/qcms`
        );
        qcmNumberOfClinique.value[clnqIdex] = result.data.length;
        console.log(qcmNumberOfClinique.value[clnqIdex]);
        getQcms.value[clnqIdex] = result.data;
        setShowQcm((qcm) => [...qcm, getQcms.value[clnqIdex]]);
        if (!props.doneGetAllClinique) {
          //****verifier reponses******************************** */
          getQcms.value[clnqIdex].forEach((element, index) => {
            saveCurrentVerifier[index] = "";
            saveCurrentVerifierAll[index] = "";
            saveCurrentQcmIsAnswer[index] = "";
            saveCurrentPecentage[index] = "";
          });

          saveCurrentVerRep.value[clnqIdex] = saveCurrentVerifier;
          saveCurrentVerRepAll.value[clnqIdex] = saveCurrentVerifierAll;
          saveCurrentQcmIsAnswr.value[clnqIdex] = saveCurrentQcmIsAnswer;
          saveCurrentPecentagefinal.value[clnqIdex] = saveCurrentPecentage;

          setSaveVerfieReponsesClinique(saveCurrentVerRep.value);
          setSaveClickSelectVerfieAllClinique(saveCurrentVerRepAll.value);
          setSaveQcmIsAnswerClinique(saveCurrentQcmIsAnswr.value);
          setSavePercentageCliniqueAmount(saveCurrentPecentagefinal.value);
        }
        //********done save empty propo***************************** */
      }
      console.log(getQcms.value);
      //setShowQcm(getQcms.value);
      console.log(getQcms.value);
      loadProposition();
    }
  };
  //********************************************************************** */
  //**load Proposition***************************************************************
  const loadProposition = async () => {
    saveCurrentQcms.value = [];

    if (props.QcmSujetTypeSelected === "Par Cour") {
      for (
        let clncIdex = indexCurrentCalinique.value;
        clncIdex < getCasClinique.value.length;
        clncIdex++
      ) {
        saveCurrentClinique.value[clncIdex] = [];

        for (
          let qcmIndex = 0;
          qcmIndex < getQcms.value[clncIdex].length;
          qcmIndex++
        ) {
          await axios
            .get(
              `https://goatqcm-instance.com/qcmsclinique/${getQcms.value[clncIdex][qcmIndex].id}/reponsesqcmClinique`
            )
            .then((result) => {
              //getQcms.value[clncIdex][qcmIndex][qcmIndex] = result.data;
              getQcms.value[clncIdex][qcmIndex][qcmIndex] = result.data;
              //****fill **********************************************/
              if (!props.doneGetAllClinique) {
                saveCurrentPropo = [];
                result.data.forEach((element, index) => {
                  saveCurrentPropo[index] = "";
                });
              }

              //******************************************************** */
              console.log("fin get propo");
            });
          //***********save empty propo ****************************************** */
          if (!props.doneGetAllClinique) {
            saveCurrentClinique.value[clncIdex].push(saveCurrentPropo);

            if (qcmIndex === getQcms.value[clncIdex].length - 1) {
              console.log("meme length");
              setSavePropositionsClinique((prevState) => [
                ...prevState,
                saveCurrentClinique.value[clncIdex],
              ]);
            }
          }
        }

        setShowPorposition((p) => [...p, getQcms.value[clncIdex]]);
        if (clncIdex === getCasClinique.value.length - 1) {
          console.log("done upload qcmss");
          indexCurrentCalinique.value = getCasClinique.value.length;
          const doneLoadPropo = true;
          loadCasClinique(doneLoadPropo);
          //*****save quizz**************************************** */
          if (props.qcmType === "Cas Clinique") {
            if (props.commingFrom === "quizz") {
              console.log("hupaa");
              setShowSaveCasCliniqueBtn(true);
              setShowUpdateCasCliniqueBtn(false);
            } else if (props.commingFrom === "savequizz") {
              setShowSaveCasCliniqueBtn(false);
              setShowUpdateCasCliniqueBtn(true);
            }
          } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
            if (props.commingFrom === "quizz") {
              setShowSaveQcmCasCliniqueBtn(true);
              setShowUpdateQcmCasCliniqueBtn(false);
            } else if (props.commingFrom === "savequizz") {
              setShowSaveQcmCasCliniqueBtn(false);
              setShowUpdateQcmCasCliniqueBtn(true);
            }
          }
        }
      }
    } else if (props.QcmSujetTypeSelected === "Par Sujet") {
      for (
        let clncIdex = 0;
        clncIdex < getCasClinique.value.length;
        clncIdex++
      ) {
        saveCurrentClinique.value[clncIdex] = [];

        for (
          let qcmIndex = 0;
          qcmIndex < getQcms.value[clncIdex].length;
          qcmIndex++
        ) {
          await axios
            .get(
              `https://goatqcm-instance.com/qcmsclinique/${getQcms.value[clncIdex][qcmIndex].id}/reponsesqcmClinique`
            )
            .then((result) => {
              //getQcms.value[clncIdex][qcmIndex][qcmIndex] = result.data;
              getQcms.value[clncIdex][qcmIndex][qcmIndex] = result.data;
              //****fill **********************************************/
              if (!props.doneGetAllClinique) {
                saveCurrentPropo = [];
                result.data.forEach((element, index) => {
                  saveCurrentPropo[index] = "";
                });
              }

              //******************************************************** */
              console.log("fin get propo");
            });

          //***********save empty propo ****************************************** */
          if (!props.doneGetAllClinique) {
            saveCurrentClinique.value[clncIdex].push(saveCurrentPropo);
            if (qcmIndex === getQcms.value[clncIdex].length - 1) {
              console.log("meme length");
              setSavePropositionsClinique((prevState) => [
                ...prevState,
                saveCurrentClinique.value[clncIdex],
              ]);
            }
            //********done save empty propo***************************** */
          }
          /******done all***************************************************** */
        }
        setShowPorposition((p) => [...p, getQcms.value[clncIdex]]);
        //***set done upload all cas clinique*********************** */
        if (
          clncIdex ===
          getCasClinique.value.length - 1
          //||localStorage.getItem("DoneClinqueShow") === true
        ) {
          //localStorage.setItem("DoneClinqueShow", true);
          doneGetAllClinique.value = true;
        }
        //***done upload cas clinique******************************** */
      }
    }
  };
  //********************************************************************** */
  const handlePrevClick = () => {
    currentIndex.value = currentIndex.value - 1;
    setSelectcasCliniqueIndex(currentIndex.value);
    setVisibiliteCasCliniqueIndex(currentIndex.value);
    //setVisibilitePorpoIndex(currentIndex.value);
    setQcmIndex(0);
    if (currentIndex.value === -1) {
      console.log(currentIndex.value);
      setOpenBoardQcm(true);
    }
    console.log(currentIndex.value);
    if (props.qcmType === "Cas Clinique") {
      if (currentIndex.value > 0) {
        VisiblePrevBtn.value = true;
      } else if (currentIndex.value === 0) {
        VisiblePrevBtn.value = false;
      }
    } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      if (currentIndex.value === 0) {
        VisiblePrevBtn.value = true;
        console.log(VisiblePrevBtn.value);
      }
    }
    setShowDescRpnsBtn(false);
    setShowVerifierRpnsBtn(true);
    try {
      if (saveCaseCliniqueIndex.value[currentIndex.value][0] === 0) {
        console.log("first qcm is check prevbtn walid");
        console.log(saveCaseCliniqueIndex.value[currentIndex.value][0]);
        setTrueInsertClr(0);
        setSlectCliniquePropo(currentIndex.value);
        setTrueInsertClrClick(true);

        setShowDescRpnsBtn(true);
        setShowVerifierRpnsBtn(false);
      }
    } catch (Exception) {
      console.log("first not chek reponse");
    }
    setShowDescQcm(false);
    VisibleNextBtn.value = true;
    setvisisbleDescInsert(false);
    setVisisbleDescUpdate(false);
  };

  //************************************************************************* */
  const handleNextClick = () => {
    //saveIncrValueOfeachClinique.value[VisibiliteCasCliniqueIndex] = 0;

    /*if (
      saveIncrValueOfeachClinique.value[VisibiliteCasCliniqueIndex] ===
      qcmNumberOfClinique.value[VisibiliteCasCliniqueIndex]
    ) {*/
    incrtValue.value = 0;
    saveQcmIndex.value = [];

    currentIndex.value = currentIndex.value + 1;
    setSelectcasCliniqueIndex(currentIndex.value);
    setVisibiliteCasCliniqueIndex(currentIndex.value);
    setQcmIndex(0);
    console.log(currentIndex.value);
    if (currentIndex.value === ShowCasClinique.length - 1) {
      VisibleNextBtn.value = false;
    }
    VisiblePrevBtn.value = true;

    setShowDescRpnsBtn(false);
    setShowVerifierRpnsBtn(true);
    try {
      if (saveCaseCliniqueIndex.value[currentIndex.value][0] === 0) {
        console.log("first qcm is check nextbtn walid");
        console.log(saveCaseCliniqueIndex.value[currentIndex.value][0]);
        setTrueInsertClr(0);
        setSlectCliniquePropo(currentIndex.value);
        setTrueInsertClrClick(true);

        setShowDescRpnsBtn(true);
        setShowVerifierRpnsBtn(false);
      }
    } catch (Exception) {
      console.log("first not chek reponse");
    }
    setShowDescQcm(false);

    /*} else {
      toast.error(
        "Il y a une question à laquelle vous n'avez pas répondu dans ce cas Clinique "
      );
    }*/
    setvisisbleDescInsert(false);
    setVisisbleDescUpdate(false);
  };
  //*************************************************************************** */
  //delete function cas cliqnieu*//////////////////////////////////////////////////////////
  const DeleteCasClinique = async (casCliniqueId) => {
    currentCasCliniqueId.value = casCliniqueId;
    setModalDeleteCliniqueIsOpen(true);
  };

  function closeDeleteModalHandler() {
    setModalDeleteCliniqueIsOpen(false);
  }
  ////////////////////////////////////////////////////////////////////////////
  //delete function*//////////////////////////////////////////////////////////
  const DeleteQcmClinque = async (qcmId) => {
    currentQcmCasCliniqueId.value = qcmId;
    setModalDeleteQcmCliniqueIsOpen(true);
  };

  function closeDeleteqcmCliniqueModalHandler() {
    setModalDeleteQcmCliniqueIsOpen(false);
  }
  ////////////////////////////////////////////////////////////////////////////
  //******************************************************************* */
  const handlePorpoClick = (e) => {
    console.log(savePropositionsClinique);
    console.log(SaveClickSelectVerfieAllClinique);
    console.log(SaveVerfieReponsesClinique);
    console.log(SaveQcmIsAnswerClinique);
    console.log(SavePercentageCliniqueAmount);
  };
  //***handle propo click**************************************************** */
  const handlePropoClick = async (
    VisibiliteCasCliniqueIndex,
    QcmIndex,
    indexPropofinal,
    propoId,
    qcmId
  ) => {
    //************************************************************************** */
    const updatedClickedVerefieAllfinal = [...SaveClickSelectVerfieAllClinique];
    updatedClickedVerefieAllfinal[VisibiliteCasCliniqueIndex][QcmIndex] =
      QcmIndex;
    setSaveClickSelectVerfieAllClinique(updatedClickedVerefieAllfinal);

    //************************************************************************* */

    const updatedArray = savePropositionsClinique.map((innerArray) => [
      ...innerArray,
    ]);

    if (
      updatedArray[VisibiliteCasCliniqueIndex][QcmIndex][indexPropofinal] !==
      propoId
    ) {
      updatedArray[VisibiliteCasCliniqueIndex][QcmIndex][indexPropofinal] =
        propoId;
    } else {
      updatedArray[VisibiliteCasCliniqueIndex][QcmIndex][indexPropofinal] = "";
    }

    setSavePropositionsClinique(updatedArray);

    //****augmenter slect count******************************************** */
    await axios
      .put(
        `https://goatqcm-instance.com/reponses/countselectclinique/${propoId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
    //************************************************************************* */

    //******get all selected click********************************************** */
    const result = await axios.get(
      `${BASE_URL}/qcmsclinique/${qcmId}/reponsesqcmClinique`
    );
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
    const updatedCalcAmountCountSelect = [...SavePercentageCliniqueAmount];
    updatedCalcAmountCountSelect[VisibiliteCasCliniqueIndex][QcmIndex] = sum;
    setSavePercentageCliniqueAmount(updatedCalcAmountCountSelect);
    //*************************************************************************** */
  };

  //**handleClickiVerifieReponse****************************************** */
  const handleClickiVerifieReponse = (VisibiliteCasCliniqueIndex, QcmIndex) => {
    //**desc******************** */

    const updatedClickedVerefie = [...SaveVerfieReponsesClinique];
    updatedClickedVerefie[VisibiliteCasCliniqueIndex][QcmIndex] = QcmIndex;
    setSaveVerfieReponsesClinique(updatedClickedVerefie);

    //****qcm is awnswer******************************************** */
    const updatedQcmIsAnswerClinique = [...SaveQcmIsAnswerClinique];
    updatedQcmIsAnswerClinique[VisibiliteCasCliniqueIndex][QcmIndex] = QcmIndex;
    setSaveQcmIsAnswerClinique(updatedQcmIsAnswerClinique);
    //****************************************************** */
  };
  //********************************************************************** */
  //****handle all reponses****************************************************************** */
  const handleClickiVerifieReponseAll = () => {
    //**check all select cas clinique***************************************** */
    let incrementClinique = 0;
    let incrQcmIndex = 0;
    let isEmpty = false;
    while (
      incrementClinique < SaveClickSelectVerfieAllClinique.length &&
      isEmpty === false
    ) {
      while (
        incrQcmIndex <
          SaveClickSelectVerfieAllClinique[incrementClinique].length &&
        isEmpty === false
      ) {
        if (
          SaveClickSelectVerfieAllClinique[incrementClinique][incrQcmIndex] ===
          ""
        ) {
          isEmpty = true;
          console.log(incrQcmIndex);
          setIsRepondeAll(false);
          IsRepondeAllSignal.value = false;
        }
        incrQcmIndex = incrQcmIndex + 1;
      }

      incrementClinique = incrementClinique + 1;
    }
    console.log(IsRepondeAll);
    //******************************************************************** */
    //*****check done reponde all qcmss****************************** */
    if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      let incrIndexQcm = 0;
      let isEmptyQcm = false;
      while (
        incrIndexQcm < props.SaveClickSelectVerfieAll.length &&
        isEmptyQcm === false
      ) {
        if (props.SaveClickSelectVerfieAll[incrIndexQcm] === "") {
          isEmptyQcm = true;
          console.log(incrIndexQcm);

          IsRepondeAllSignalQcm.value = false;
        }
        incrIndexQcm = incrIndexQcm + 1;
      }
    }
    ///********************************************************************* */
    if (
      IsRepondeAllSignal.value === false &&
      IsRepondeAllSignalQcm.value === false
    ) {
      setModalDoneQuizIsOpen(true);
      setShowNoSelectPropoMessage(
        "Il y a des questions à laquelle vous n'avez pas répondu dans cette quizz (Qcms,et CasClinique)"
      );
    } else if (IsRepondeAllSignal.value === false) {
      setShowNoSelectPropoMessage(
        "Il y a une question à laquelle vous n'avez pas répondu dans ces cas Clinique"
      );

      setModalDoneQuizIsOpen(true);
    } else if (IsRepondeAllSignalQcm.value === false) {
      console.log("immm  heree");
      setShowNoSelectPropoMessage(
        "Il y a des questions à laquelle vous n'avez pas répondu dans cette quizz"
      );
      setModalDoneQuizIsOpen(true);
    }
  };

  //********************************************************************** */
  /*****done Quiz******************************************** */
  function closeModalDoneQuizHandler() {
    setModalDoneQuizIsOpen(false);
  }
  //************confirme true verifier reponses************************************ */
  function handlerConfirmShowAllReponse() {
    setSaveQcmIsAnswerClinique(SaveClickSelectVerfieAllClinique);
    //*****set if verier all reponse true**************************** */
    setVeriferAllreponseClicked(true);
    //********************************************************************* */
    setTrueFullInsertClrClinique(true);
    localStorage.setItem("IsCkickShowAllReponsesClinique", true);
    saveCurrentSelet.value = [];
    setModalDoneQuizIsOpen(false);
  }
  function handlerCancelShowAllReponse() {
    setModalDoneQuizIsOpen(false);
  }
  //*********************************************************** */
  //*********************************************************** */
  const handleItemClick = (casCliniqueId, casCliniqueIndex) => {
    setQcmIndex(0);
    incrtValue.value = 0;
    saveQcmIndex.value = [];
    currentIndex.value = casCliniqueIndex;
    setSelectcasCliniqueIndex(casCliniqueIndex);
    console.log(casCliniqueIndex);
    setVisibiliteCasCliniqueIndex(casCliniqueIndex);
    VisiblePrevBtn.value = true;
    VisibleNextBtn.value = true;
    if (currentIndex.value === ShowCasClinique.length - 1) {
      VisibleNextBtn.value = false;
      VisiblePrevBtn.value = true;
    } else if (currentIndex.value === 0) {
      if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
        VisibleNextBtn.value = true;
        VisiblePrevBtn.value = true;
      } else {
        VisibleNextBtn.value = true;
        VisiblePrevBtn.value = false;
      }
    }
    try {
      if (saveCaseCliniqueIndex.value[currentIndex.value][0] === 0) {
        console.log("first qcm is check nextbtn walid");
        console.log(saveCaseCliniqueIndex.value[currentIndex.value][0]);
        setTrueInsertClr(0);
        setSlectCliniquePropo(currentIndex.value);
        setTrueInsertClrClick(true);

        setShowDescRpnsBtn(true);
        setShowVerifierRpnsBtn(false);
      }
    } catch (Exception) {
      console.log("first not chek reponse");
    }

    //***drope down************************************** */

    try {
      setCasCliniqueClicked(
        CasCliniqueClicked.filter(
          (clinique) => clinique !== saveLastCliniqueOpenIndex.value
        )
      );
    } catch (Exception) {
      console.log("not click yet");
    }
    if (CasCliniqueClicked[casCliniqueIndex] !== casCliniqueIndex) {
      setCasCliniqueClicked(casCliniqueIndex);
    } else if (CasCliniqueClicked === casCliniqueIndex) {
      setCasCliniqueClicked(
        CasCliniqueClicked.filter((clinique) => clinique !== casCliniqueIndex)
      );
    }

    saveLastCliniqueOpenIndex.value = casCliniqueIndex;
  };
  //********************************************************* */
  const handlQcmClickNav = (indexqcmClnq) => {
    setQcmIndex(indexqcmClnq);
  };
  //******************************************************************** */
  //***show qcms liste*********************************** */
  const handleShowListeQcms = () => {
    setShowListQcms(!ShowListQcms);
  };
  //******************************************************** */
  const handleSaveCasCliniqueQuizzBtn = () => {
    if (props.qcmType === "Cas Clinique") {
      handleSaveCasCliniqueQuizz();
    } else if (props.qcmType === "Tous (Qcm,Cas Clinique)") {
      handleSaveQcmCasCliniqueQuizz();
    }
  };
  const handleSaveCasCliniqueQuizz = async () => {
    //****get user*************************************** */
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUserCasClinique.id = resultUserFinal.id),
        (saveUserCasClinique.name = resultUserFinal.name),
        (saveUserCasClinique.lastname = resultUserFinal.lastname),
        (saveUserCasClinique.username = resultUserFinal.username),
        (saveUserCasClinique.password = resultUserFinal.password),
        (saveUserCasClinique.role = resultUserFinal.role);
    } catch (Exception) {
      console.log("user not found");
    }
    //***************************************************** */
    SaveCasCliniqueQuizz.ourUsers = saveUserCasClinique;
    SaveCasCliniqueQuizz.nameCasCliniqueQuizz = casCliniqueQuizzName;
    SaveCasCliniqueQuizz.qcmSujetTypeSelected = props.QcmSujetTypeSelected;
    SaveCasCliniqueQuizz.selectedSourceExmn = props.SelectedSourceExmn;
    SaveCasCliniqueQuizz.moduleId = props.moduleId;
    SaveCasCliniqueQuizz.moduleName = props.moduleName;
    SaveCasCliniqueQuizz.selectMultipleCours = JSON.stringify(
      props.selectMultipleCours
    );
    SaveCasCliniqueQuizz.qcmType = props.qcmType;
    SaveCasCliniqueQuizz.minYearQcm = props.minYearQcm;
    SaveCasCliniqueQuizz.maxYearQcm = props.maxYearQcm;
    SaveCasCliniqueQuizz.savePropositionsClinique = JSON.stringify(
      savePropositionsClinique
    );
    SaveCasCliniqueQuizz.saveClickSelectVerfieAllClinique = JSON.stringify(
      SaveClickSelectVerfieAllClinique
    );
    SaveCasCliniqueQuizz.saveVerfieReponsesClinique = JSON.stringify(
      SaveVerfieReponsesClinique
    );
    SaveCasCliniqueQuizz.saveQcmIsAnswerClinique = JSON.stringify(
      SaveQcmIsAnswerClinique
    );
    SaveCasCliniqueQuizz.savePercentageCliniqueAmount = JSON.stringify(
      SavePercentageCliniqueAmount
    );

    await axios
      .post(
        "https://goatqcm-instance.com/cliniquequizz",
        SaveCasCliniqueQuizz,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {})
      .catch((err) => console.log(err));

    setModalSaveQuizzIsOpen(false);
  };
  //********************************************************************* */
  const handleSaveQcmCasCliniqueQuizz = async () => {
    //****get user*************************************** */
    try {
      const resultUserFinal = await UserService.getUserByuserName(
        username,
        token
      );
      (saveUserCasClinique.id = resultUserFinal.id),
        (saveUserCasClinique.name = resultUserFinal.name),
        (saveUserCasClinique.lastname = resultUserFinal.lastname),
        (saveUserCasClinique.username = resultUserFinal.username),
        (saveUserCasClinique.password = resultUserFinal.password),
        (saveUserCasClinique.role = resultUserFinal.role);
    } catch (Exception) {
      console.log("user not found");
    }
    //***************************************************** */
    console.log(casCliniqueQuizzName);
    console.log(props.QcmSujetTypeSelected);
    console.log(props.SelectedSourceExmn);
    console.log(props.moduleId);
    console.log(props.moduleName);
    console.log(props.selectMultipleCours);

    SaveQcmCasCliniqueQuizz.ourUsers = saveUserCasClinique;
    SaveQcmCasCliniqueQuizz.nameQcmCasCliniqueQuizz = casCliniqueQuizzName;
    SaveQcmCasCliniqueQuizz.qcmSujetTypeSelected = props.QcmSujetTypeSelected;
    SaveQcmCasCliniqueQuizz.selectedSourceExmn = props.SelectedSourceExmn;
    SaveQcmCasCliniqueQuizz.moduleId = props.moduleId;
    SaveQcmCasCliniqueQuizz.moduleName = props.moduleName;
    SaveQcmCasCliniqueQuizz.selectMultipleCours = JSON.stringify(
      props.selectMultipleCours
    );
    SaveQcmCasCliniqueQuizz.qcmType = props.qcmType;
    SaveQcmCasCliniqueQuizz.minYearQcm = props.minYearQcm;
    SaveQcmCasCliniqueQuizz.maxYearQcm = props.maxYearQcm;
    //***proposition cas clinique*********************************************** */
    SaveQcmCasCliniqueQuizz.savePropositionsClinique = JSON.stringify(
      savePropositionsClinique
    );
    SaveQcmCasCliniqueQuizz.saveClickSelectVerfieAllClinique = JSON.stringify(
      SaveClickSelectVerfieAllClinique
    );
    SaveQcmCasCliniqueQuizz.saveVerfieReponsesClinique = JSON.stringify(
      SaveVerfieReponsesClinique
    );
    SaveQcmCasCliniqueQuizz.saveQcmIsAnswerClinique = JSON.stringify(
      SaveQcmIsAnswerClinique
    );
    SaveQcmCasCliniqueQuizz.savePercentageCliniqueAmount = JSON.stringify(
      SavePercentageCliniqueAmount
    );
    //************************************************************************** */
    //*****proposition Qcm CasClinique****************************************** */
    SaveQcmCasCliniqueQuizz.savePropositions = JSON.stringify(
      props.savePropositions
    );
    SaveQcmCasCliniqueQuizz.saveClickSelectVerfieAll = JSON.stringify(
      props.SaveClickSelectVerfieAll
    );
    SaveQcmCasCliniqueQuizz.saveVerfieReponses = JSON.stringify(
      props.SaveVerfieReponses
    );
    if (veriferAllreponseClicked === true) {
      SaveQcmCasCliniqueQuizz.saveQcmIsAnswer = JSON.stringify(
        props.SaveClickSelectVerfieAll
      );
    } else if (veriferAllreponseClicked === false) {
      SaveQcmCasCliniqueQuizz.saveQcmIsAnswer = JSON.stringify(
        props.SaveQcmIsAnswer
      );
    }

    SaveQcmCasCliniqueQuizz.savePercentageAmount = JSON.stringify(
      props.SavePercentageAmount
    );
    //*************************************************************************** */
    SaveQcmCasCliniqueQuizz.existeCasClinique = true;
    SaveQcmCasCliniqueQuizz.doneGetAllClinique = true;
    await axios
      .post(
        "https://goatqcm-instance.com/qcmcliniquequizz",
        SaveQcmCasCliniqueQuizz,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {})
      .catch((err) => console.log(err));

    setModalSaveQuizzIsOpen(false);
  };
  //********************************************************************* */

  //**************************************************** */
  //****update cas clinique*********************************** */

  const handleUpdateCasCliniqueQuizz = async () => {
    const qcmQuizzId = localStorage.getItem("qcmquizzid");

    //****update cas clinique*********************************** */
    updateCasCliniqueQuizz.savePropositionsClinique = JSON.stringify(
      savePropositionsClinique
    );
    updateCasCliniqueQuizz.saveClickSelectVerfieAllClinique = JSON.stringify(
      SaveClickSelectVerfieAllClinique
    );
    updateCasCliniqueQuizz.saveVerfieReponsesClinique = JSON.stringify(
      SaveVerfieReponsesClinique
    );
    updateCasCliniqueQuizz.saveQcmIsAnswerClinique = JSON.stringify(
      SaveQcmIsAnswerClinique
    );
    updateCasCliniqueQuizz.savePercentageCliniqueAmount = JSON.stringify(
      SavePercentageCliniqueAmount
    );

    await axios
      .put(
        `https://goatqcm-instance.com/cliniquequizz/${qcmQuizzId}`,
        updateCasCliniqueQuizz,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success("succes modification!");
      })
      .catch((err) => console.log(err));
  };

  //************************************************************** */
  /*****done Quiz******************************************** */
  const closeModalSaveQcmQuizHandler = () => {
    setModalSaveQuizzIsOpen(false);
  };

  //**************************************************** */
  //****save cas clinique*********************************** */
  const handleUpdateQcmCasCliniqueQuizz = async () => {
    const qcmQuizzId = localStorage.getItem("qcmquizzid");

    //*****update qcm ************************************************************** */
    updateQcmCasCliniqueQuizz.savePropositions = JSON.stringify(
      props.savePropositions
    );
    updateQcmCasCliniqueQuizz.saveClickSelectVerfieAll = JSON.stringify(
      props.SaveClickSelectVerfieAll
    );
    updateQcmCasCliniqueQuizz.saveVerfieReponses = JSON.stringify(
      props.SaveVerfieReponses
    );
    if (veriferAllreponseClicked === true) {
      updateQcmCasCliniqueQuizz.saveQcmIsAnswer = JSON.stringify(
        props.SaveClickSelectVerfieAll
      );
    } else if (veriferAllreponseClicked === false) {
      updateQcmCasCliniqueQuizz.saveQcmIsAnswer = JSON.stringify(
        props.SaveQcmIsAnswer
      );
    }
    updateQcmCasCliniqueQuizz.savePercentageAmount = JSON.stringify(
      props.SavePercentageAmount
    );
    //*********************************************************************************** */
    //****update cas clinque******************************************************* */
    updateQcmCasCliniqueQuizz.savePropositionsClinique = JSON.stringify(
      savePropositionsClinique
    );
    updateQcmCasCliniqueQuizz.saveClickSelectVerfieAllClinique = JSON.stringify(
      SaveClickSelectVerfieAllClinique
    );
    updateQcmCasCliniqueQuizz.saveVerfieReponsesClinique = JSON.stringify(
      SaveVerfieReponsesClinique
    );
    updateQcmCasCliniqueQuizz.saveQcmIsAnswerClinique = JSON.stringify(
      SaveQcmIsAnswerClinique
    );
    updateQcmCasCliniqueQuizz.savePercentageCliniqueAmount = JSON.stringify(
      SavePercentageCliniqueAmount
    );
    //****************************************************************************** */
    await axios
      .put(
        `https://goatqcm-instance.com/qcmcliniquequizz/${qcmQuizzId}`,
        updateQcmCasCliniqueQuizz,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success("succes modification!");
      })
      .catch((err) => console.log(err));
  };

  //************************************************************** */

  return (
    <>
      {!OpenBoardQcm && (
        <>
          <NavigationBar changeetatsidebar={etatsidebare} />
          <div className={classes.addingdiv}>
            <div className={classes.sidebare}>
              {ShowSideBare && <Sidebar />}
            </div>
            {VisibleParSujet && (
              <div
                className={`${classes.parsujetscontainer} `}
                style={{ width: 310, height: 50, marginLeft: 10 }}
              >
                <select
                  defaultValue="year"
                  style={{ width: 100 }}
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
              </div>
            )}
            {VisibleQmcContainer && isDesktopOrLaptop && (
              <div
                className={classes.contanerspace}
                data-theme={isDark ? "dark" : "light"}
              >
                <div className={classes.container_save_casclinique_timer}>
                  <div className={classes.full_save_casclinique}>
                    {showSaveCasCliniqueBtn && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setModalSaveQuizzIsOpen(true);
                        }}
                      >
                        Sauvegarder CasClinique
                      </button>
                    )}
                    {showUpdateCasCliniqueBtn && (
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          handleUpdateCasCliniqueQuizz();
                        }}
                      >
                        Save modification
                      </button>
                    )}
                    {showSaveQcmCasCliniqueBtn && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setModalSaveQuizzIsOpen(true);
                        }}
                      >
                        Sauvegarder Quizz
                      </button>
                    )}
                    {showUpdateQcmCasCliniqueBtn && (
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          handleUpdateQcmCasCliniqueQuizz();
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
                <button
                  onClick={(e) => {
                    handlePorpoClick();
                  }}
                >
                  test
                </button>
                <div
                  className={`${classes.quizcontainer} card text-white  py-1`}
                >
                  <div
                    className={`${classes.cliniqueqcmcontainer} card-body text-black`}
                    data-theme={isDark ? "dark" : "light"}
                  >
                    {ShowCasClinique.map((CasClinique, indexCasClinique) => {
                      if (indexCasClinique === VisibiliteCasCliniqueIndex)
                        return (
                          <div key={indexCasClinique}>
                            <div className={`${classes.qcmInfoHeader}`}>
                              <div className={`${classes.qcmInfo} `}>
                                <ul
                                  className={`${classes.ulcatogorycourname} "list-group"`}
                                >
                                  <img src={courlogo} height="30%" width="20" />
                                  <li className="list-group-item">
                                    {CasClinique.coursMed.coursName}
                                  </li>
                                  <img
                                    src={externatlogo}
                                    height="50%"
                                    width="20"
                                  />
                                  <li className="list-group-item">
                                    {CasClinique.category}
                                  </li>
                                  <img
                                    src={groupelogo}
                                    height="50%"
                                    width="20"
                                  />
                                  {ShowGroupePermExternat && (
                                    <li className="list-group-item">
                                      ({CasClinique.casCliniqueGroupe})
                                    </li>
                                  )}
                                  <li className="list-group-item">
                                    {CasClinique.casCliniqueYear}
                                  </li>
                                  <div className={`${classes.goatlogo} `}>
                                    <img
                                      src={GoatLogo}
                                      height="40"
                                      width="70"
                                    />
                                  </div>
                                </ul>
                              </div>
                            </div>
                            <li
                              className={`${classes.nmbrqcm} list-group-item`}
                              style={{ color: "#007FFF" }}
                            >
                              CasClinique {indexCasClinique + 1} sur{" "}
                              {ShowCasClinique.length}
                            </li>
                            {isParticipateAdmin && (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={(e) =>
                                  DeleteCasClinique(CasClinique.id)
                                }
                              >
                                Delete CasClinique
                              </button>
                            )}
                            <div
                              className={`${classes.cascliniquecontent} shadow `}
                              onCopy={disableCopyPaste}
                              onCut={disableCopyPaste}
                              onPaste={disableCopyPaste}
                              style={{
                                userSelect: "none",
                              }}
                            >
                              <p>{CasClinique.casCliniqueContent}</p>
                            </div>
                            <ImageClinique cliniqueId={CasClinique.id} />
                          </div>
                        );
                    })}

                    {ShowQcm.map((qcm, index) => {
                      if (index === VisibiliteCasCliniqueIndex) {
                        return (
                          <div className={classes.btnqcmclinique}>
                            <ul>
                              {qcm.map((qcmCln, indexqcmClnq) => (
                                <button
                                  style={{
                                    backgroundColor: backGroundBtn,
                                  }}
                                  onClick={(e) => {
                                    setQcmIndex(indexqcmClnq);
                                    console.log(indexqcmClnq);
                                  }}
                                  value={indexqcmClnq}
                                >
                                  {indexqcmClnq + 1}
                                </button>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                    })}

                    {ShowQcm.map((qcmClinique, indexClinique) => {
                      if (indexClinique === VisibiliteCasCliniqueIndex) {
                        return (
                          <div key={VisibiliteCasCliniqueIndex}>
                            {qcmClinique.map((qcm, indexqcm) => {
                              if (indexqcm === QcmIndex) {
                                return (
                                  <div key={indexqcm}>
                                    {isParticipateAdmin && (
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-warning btn-sm"
                                          onClick={() =>
                                            navigateEditeQcm(
                                              `/editefullcasclinique`,
                                              {
                                                state: {
                                                  qcmId: qcm.id,
                                                  cours_id: courId,
                                                  casClinique_id:
                                                    qcm.casClinique.id,
                                                  qcmSource:
                                                    props.SelectedSourceExmn,
                                                },
                                              }
                                            )
                                          }
                                        >
                                          Edite Qcm
                                        </button>
                                        {isParticipateAdmin && (
                                          <button
                                            type="button"
                                            className="btn btn-secondary"
                                            style={{ marginLeft: 5 }}
                                            onClick={(e) =>
                                              testDescExsite(qcm.id)
                                            }
                                          >
                                            Ajouter Commentaire
                                          </button>
                                        )}
                                        {isParticipateAdmin && (
                                          <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={(e) =>
                                              DeleteQcmClinque(qcm.id)
                                            }
                                          >
                                            Delete qcm
                                          </button>
                                        )}
                                      </div>
                                    )}
                                    {visisbleDescInsert && (
                                      <div className={classes.imgdescdiv}>
                                        <div
                                          className={classes.fulldescription}
                                        >
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
                                        <div
                                          className={classes.fulldescription}
                                        >
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
                                              value={
                                                FullDescEdite.qcmDescription
                                              }
                                              onChange={(e) =>
                                                setFullDescEdite({
                                                  ...FullDescEdite,
                                                  qcmDescription:
                                                    e.target.value,
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
                                          onClick={(e) =>
                                            deleteFullDesc(qcm.id)
                                          }
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
                                      className={`${classes.qcmfeild} table-hover shadow`}
                                      onCopy={disableCopyPaste}
                                      onCut={disableCopyPaste}
                                      onPaste={disableCopyPaste}
                                      style={{
                                        userSelect: "none",
                                      }}
                                    >
                                      <p>{qcm.qcmCliniqueContent}</p>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        );
                        //}
                      }
                    })}
                    <div
                      className={`${classes.propofeild} card table-hover shadow`}
                    >
                      {ShowPorposition.map(
                        (PropositionClinique, QcmPropoIndex) => {
                          if (QcmPropoIndex === VisibiliteCasCliniqueIndex) {
                            return (
                              <div key={QcmPropoIndex}>
                                {PropositionClinique.map(
                                  (propofina, indexPropo) => {
                                    if (indexPropo === QcmIndex) {
                                      return (
                                        <div key={indexPropo}>
                                          <ul
                                            onCopy={disableCopyPaste}
                                            onCut={disableCopyPaste}
                                            onPaste={disableCopyPaste}
                                            style={{
                                              userSelect: "none",
                                            }}
                                            multiple={true}
                                            className={`${classes.ulpropo} list-group list-group-flush`}
                                          >
                                            {propofina[indexPropo].map(
                                              (propo, indexPropofinal) => {
                                                currentQcmIdOfPropo.value =
                                                  propo.qcmClinique.id;

                                                return (
                                                  <li
                                                    key={indexPropofinal}
                                                    value={propo.id}
                                                    style={{
                                                      backgroundColor:
                                                        SaveVerfieReponsesClinique[
                                                          VisibiliteCasCliniqueIndex
                                                        ][QcmIndex] === QcmIndex
                                                          ? propo.reponseBoolClinique ===
                                                            true
                                                            ? COLORS[1]
                                                            : savePropositionsClinique[
                                                                VisibiliteCasCliniqueIndex
                                                              ][QcmIndex][
                                                                indexPropofinal
                                                              ] === propo.id &&
                                                              propo.reponseBoolClinique ===
                                                                false
                                                            ? COLORS[0]
                                                            : ""
                                                          : (TrueFullInsertClrClinique ===
                                                              true &&
                                                              SaveClickSelectVerfieAllClinique[
                                                                VisibiliteCasCliniqueIndex
                                                              ][QcmIndex] ===
                                                                QcmIndex) ||
                                                            SaveQcmIsAnswerClinique[
                                                              VisibiliteCasCliniqueIndex
                                                            ][QcmIndex] ===
                                                              QcmIndex
                                                          ? propo.reponseBoolClinique ===
                                                            true
                                                            ? COLORS[1]
                                                            : savePropositionsClinique[
                                                                VisibiliteCasCliniqueIndex
                                                              ][QcmIndex][
                                                                indexPropofinal
                                                              ] === propo.id &&
                                                              propo.reponseBoolClinique ===
                                                                false
                                                            ? COLORS[0]
                                                            : ""
                                                          : "",
                                                    }}
                                                    className={
                                                      savePropositionsClinique[
                                                        VisibiliteCasCliniqueIndex
                                                      ][QcmIndex][
                                                        indexPropofinal
                                                      ] === propo.id
                                                        ? "list-group-item active"
                                                        : "list-group-item"
                                                    }
                                                    onClick={() => {
                                                      handlePropoClick(
                                                        VisibiliteCasCliniqueIndex,
                                                        QcmIndex,
                                                        indexPropofinal,
                                                        propo.id,
                                                        propo.qcmClinique.id
                                                      );
                                                    }}
                                                  >
                                                    <img
                                                      src={
                                                        AlphabetChoice[
                                                          (IndexAlphabetChoice =
                                                            IndexAlphabetChoice +
                                                            1)
                                                        ]
                                                      }
                                                      height="60%"
                                                      width="40"
                                                    />
                                                    {
                                                      propo.propositionQcmClinique
                                                    }
                                                    {SaveQcmIsAnswerClinique[
                                                      VisibiliteCasCliniqueIndex
                                                    ][QcmIndex] ===
                                                      QcmIndex && (
                                                      <div
                                                        className={`${classes.percentage} `}
                                                      >
                                                        {(
                                                          (propo.countSelect *
                                                            100) /
                                                          SavePercentageCliniqueAmount[
                                                            VisibiliteCasCliniqueIndex
                                                          ][QcmIndex]
                                                        ).toFixed(0)}
                                                        %
                                                      </div>
                                                    )}
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </div>
                                      );
                                    }
                                  }
                                )}

                                <div className={classes.btnfooter}>
                                  {SaveQcmIsAnswerClinique[
                                    VisibiliteCasCliniqueIndex
                                  ][QcmIndex] === "" && (
                                    <button
                                      type="button"
                                      className={`${classes.BntVerifierrpnse} btn btn-warning`}
                                      onClick={(e) => {
                                        handleClickiVerifieReponse(
                                          VisibiliteCasCliniqueIndex,
                                          QcmIndex
                                        );

                                        //*******descreption**************************** */
                                        saveQcmIndex.value[QcmIndex] = QcmIndex;
                                        saveCaseCliniqueIndex.value[
                                          VisibiliteCasCliniqueIndex
                                        ] = saveQcmIndex.value;
                                        console.log(saveQcmIndex.value);
                                        console.log(
                                          saveCaseCliniqueIndex.value
                                        );
                                      }}
                                    >
                                      Vérifer la réponse
                                    </button>
                                  )}
                                  {(SaveVerfieReponsesClinique[
                                    VisibiliteCasCliniqueIndex
                                  ][QcmIndex] === QcmIndex ||
                                    SaveQcmIsAnswerClinique[
                                      VisibiliteCasCliniqueIndex
                                    ][QcmIndex] === QcmIndex) && (
                                    <button
                                      type="button"
                                      className={`${classes.BntVerifierrpnse} btn btn-warning`}
                                      onClick={(e) => {
                                        handeldescription(
                                          currentQcmIdOfPropo.value
                                        );
                                      }}
                                    >
                                      Explication
                                    </button>
                                  )}

                                  {qcmType === "Cas Clinique" &&
                                    VisibiliteCasCliniqueIndex + 1 ===
                                      ShowQcm.length && (
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
                                  {qcmType === "Tous (Qcm,Cas Clinique)" &&
                                    VisibiliteCasCliniqueIndex + 1 ===
                                      ShowQcm.length && (
                                      <button
                                        type="button"
                                        className={`${classes.btnsuivant} btn btn-warning`}
                                        onClick={(e) => {
                                          handleClickiVerifieReponseAll();
                                        }}
                                      >
                                        Afficher tous les reponses
                                      </button>
                                    )}

                                  {VisibleNextBtn.value && (
                                    <button
                                      type="button"
                                      className={`${classes.btnsuivant} btn btn-warning`}
                                      onClick={handleNextClick}
                                    >
                                      Suivant
                                    </button>
                                  )}
                                  {VisiblePrevBtn.value && (
                                    <button
                                      type="button"
                                      className={`${classes.btnPrecdent} btn btn-warning`}
                                      onClick={handlePrevClick}
                                    >
                                      Précédent
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        }
                      )}
                    </div>
                  </div>
                  <div className={`${classes.qcmsliste}`}>
                    <div className={`${classes.qcmsliste_header}`}>
                      <h6>Liste CasClinique</h6>
                    </div>
                    <ul>
                      {ShowCasClinique.map((casClinique, casCliniqueIndex) => (
                        <>
                          <div key={casCliniqueIndex}>
                            <li
                              key={casCliniqueIndex}
                              value={casClinique.id}
                              className={
                                SelectcasCliniqueIndex === casCliniqueIndex
                                  ? "list-group-item active  "
                                  : "list-group-item"
                              }
                            >
                              <ul
                                className={`${classes.ul_clinique_clinique} list-group`}
                              >
                                <div
                                  onClick={(e) => {
                                    handleItemClick(
                                      casClinique.id,
                                      casCliniqueIndex
                                    );
                                  }}
                                >
                                  <a className={`${classes.title_casclinique}`}>
                                    Cas Clinique {casCliniqueIndex + 1}
                                  </a>
                                  <a>
                                    <IoMdArrowDropdown />
                                  </a>
                                </div>
                                {CasCliniqueClicked === casCliniqueIndex && (
                                  <>
                                    {ShowQcm.map((qcm, index) => {
                                      if (index === casCliniqueIndex) {
                                        return (
                                          <ul
                                            className={`${classes.ul_qcms_clinique}`}
                                          >
                                            {qcm.map((qcmCln, indexqcmClnq) => (
                                              <div
                                                key={indexqcmClnq}
                                                className={`${classes.div_qcm}`}
                                              >
                                                <a
                                                  onClick={(e) =>
                                                    handlQcmClickNav(
                                                      indexqcmClnq
                                                    )
                                                  }
                                                >
                                                  Question {indexqcmClnq + 1}
                                                </a>
                                                {SaveClickSelectVerfieAllClinique[
                                                  casCliniqueIndex
                                                ][indexqcmClnq] ===
                                                  indexqcmClnq && (
                                                  <div
                                                    className={
                                                      classes.vl_select
                                                    }
                                                  ></div>
                                                )}
                                                {SaveQcmIsAnswerClinique[
                                                  casCliniqueIndex
                                                ][indexqcmClnq] ===
                                                  indexqcmClnq && (
                                                  <div
                                                    className={
                                                      classes.vl_answer
                                                    }
                                                  ></div>
                                                )}
                                              </div>
                                            ))}
                                          </ul>
                                        );
                                      }
                                    })}
                                  </>
                                )}
                              </ul>
                            </li>
                          </div>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>

                {ShowDescQcm && (
                  <DescriptionClinique
                    qcmIdPropsQcmDesc={qcmIdPropsQcmDesc.value}
                  />
                )}
              </div>
            )}
            {VisibleQmcContainer && isTabletOrMobile && (
              <div className={classes.modal}>
                <div className={classes.contanerspace_phone}>
                  <div
                    className={`${classes.quizcontainer_phone} card text-white  py-1`}
                  >
                    <div
                      className={classes.headerquizz_phone}
                      data-theme={isDark ? "dark" : "light"}
                    >
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
                          {showSaveCasCliniqueBtn && (
                            <BsSave
                              onClick={() => {
                                setModalSaveQuizzIsOpen(true);
                              }}
                            />
                          )}
                          {showUpdateCasCliniqueBtn && (
                            <BsSave
                              onClick={() => {
                                handleUpdateCasCliniqueQuizz();
                              }}
                            />
                          )}
                          {showSaveQcmCasCliniqueBtn && (
                            <BsSave
                              onClick={() => {
                                setModalSaveQuizzIsOpen(true);
                              }}
                            />
                          )}
                          {showUpdateQcmCasCliniqueBtn && (
                            <BsSave
                              onClick={() => {
                                handleUpdateQcmCasCliniqueQuizz();
                              }}
                            />
                          )}
                        </div>

                        <div className={`${classes.closequizz_phone} `}>
                          <li
                            className={`${classes.homebtn_phone} list-group-item`}
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

                    <div
                      className={`${classes.cliniqueqcmcontainer_phone} card-body text-black`}
                      data-theme={isDark ? "dark" : "light"}
                    >
                      {ShowCasClinique.map((CasClinique, indexCasClinique) => {
                        if (indexCasClinique === VisibiliteCasCliniqueIndex)
                          return (
                            <div key={indexCasClinique}>
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
                                    {CasClinique.category}-
                                  </li>
                                  <li className="list-group-item">
                                    {ShowGroupePermExternat && (
                                      <>({CasClinique.casCliniqueGroupe})- </>
                                    )}
                                    {CasClinique.casCliniqueYear}
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
                                  <img src={courlogo} height="30%" width="20" />
                                  <li
                                    className={`${classes.courname_phone} list-group-item`}
                                  >
                                    {CasClinique.coursMed.coursName}
                                  </li>
                                </div>
                                <hr className={`${classes.hr_phone} `} />
                                {isParticipateAdmin && (
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={(e) =>
                                      DeleteCasClinique(CasClinique.id)
                                    }
                                  >
                                    Delete CasClinique
                                  </button>
                                )}
                                <li
                                  className={`${classes.nmbrqcm} list-group-item`}
                                  style={{ color: "#007FFF" }}
                                >
                                  CasClinique {indexCasClinique + 1} sur{" "}
                                  {ShowCasClinique.length}
                                </li>
                              </div>

                              <div
                                className={`${classes.cascliniquecontent_phone} shadow `}
                                onCopy={disableCopyPaste}
                                onCut={disableCopyPaste}
                                onPaste={disableCopyPaste}
                                style={{
                                  userSelect: "none",
                                }}
                              >
                                <p>{CasClinique.casCliniqueContent}</p>
                              </div>
                              <ImageClinique cliniqueId={CasClinique.id} />
                            </div>
                          );
                      })}

                      {ShowQcm.map((qcm, index) => {
                        if (index === VisibiliteCasCliniqueIndex) {
                          return (
                            <div className={classes.btnqcmclinique_phone}>
                              <ul>
                                {qcm.map((qcmCln, indexqcmClnq) => (
                                  <button
                                    onClick={(e) => {
                                      setQcmIndex(indexqcmClnq);
                                      console.log(indexqcmClnq);
                                      try {
                                        if (
                                          saveCaseCliniqueIndex.value[
                                            VisibiliteCasCliniqueIndex
                                          ][indexqcmClnq] === indexqcmClnq
                                        ) {
                                          console.log(indexqcmClnq);
                                          console.log(
                                            VisibiliteCasCliniqueIndex
                                          );

                                          setShowDescRpnsBtn(true);
                                          setShowVerifierRpnsBtn(false);
                                          setSlectCliniquePropo(
                                            VisibiliteCasCliniqueIndex
                                          );
                                          setTrueInsertClrClick(true);
                                          setTrueInsertClr(indexqcmClnq);
                                        } else {
                                          setShowDescRpnsBtn(false);
                                          setShowVerifierRpnsBtn(true);
                                        }
                                      } catch (Exception) {
                                        console.log(
                                          "no check in this clinique"
                                        );
                                      }
                                      setShowDescQcm(false);

                                      setvisisbleDescInsert(false);
                                      setVisisbleDescUpdate(false);
                                    }}
                                    value={indexqcmClnq}
                                  >
                                    {indexqcmClnq + 1}
                                  </button>
                                ))}
                              </ul>
                            </div>
                          );
                        }
                      })}

                      {ShowQcm.map((qcmClinique, indexClinique) => {
                        if (indexClinique === VisibiliteCasCliniqueIndex) {
                          return (
                            <div key={VisibiliteCasCliniqueIndex}>
                              {qcmClinique.map((qcm, indexqcm) => {
                                if (indexqcm === QcmIndex) {
                                  return (
                                    <div key={indexqcm}>
                                      {isParticipateAdmin && (
                                        <div>
                                          <button
                                            type="button"
                                            className="btn btn-warning btn-sm"
                                            onClick={() =>
                                              navigateEditeQcm(
                                                `/editefullcasclinique`,
                                                {
                                                  state: {
                                                    qcmId: qcm.id,
                                                    cours_id: courId,
                                                    casClinique_id:
                                                      qcm.casClinique.id,
                                                    qcmSource:
                                                      props.SelectedSourceExmn,
                                                  },
                                                }
                                              )
                                            }
                                          >
                                            Edite Qcm
                                          </button>
                                          {isParticipateAdmin && (
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              style={{ marginLeft: 5 }}
                                              onClick={(e) =>
                                                testDescExsite(qcm.id)
                                              }
                                            >
                                              Ajouter Commentaire
                                            </button>
                                          )}
                                          {isParticipateAdmin && (
                                            <button
                                              type="button"
                                              className="btn btn-danger"
                                              onClick={(e) =>
                                                DeleteQcmClinque(qcm.id)
                                              }
                                            >
                                              Delete qcm
                                            </button>
                                          )}
                                        </div>
                                      )}
                                      {visisbleDescInsert && (
                                        <div className={classes.imgdescdiv}>
                                          <div
                                            className={classes.fulldescription}
                                          >
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
                                            onClick={(e) =>
                                              AjouterImage(qcm.id)
                                            }
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
                                          <div
                                            className={classes.fulldescription}
                                          >
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
                                                value={
                                                  FullDescEdite.qcmDescription
                                                }
                                                onChange={(e) =>
                                                  setFullDescEdite({
                                                    ...FullDescEdite,
                                                    qcmDescription:
                                                      e.target.value,
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
                                            onClick={(e) =>
                                              deleteFullDesc(qcm.id)
                                            }
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
                                        onCopy={disableCopyPaste}
                                        onCut={disableCopyPaste}
                                        onPaste={disableCopyPaste}
                                        style={{
                                          userSelect: "none",
                                        }}
                                      >
                                        <p>{qcm.qcmCliniqueContent}</p>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          );
                          //}
                        }
                      })}
                      <div className={classes.propofeild_phone}>
                        {ShowPorposition.map(
                          (PropositionClinique, QcmPropoIndex) => {
                            if (QcmPropoIndex === VisibiliteCasCliniqueIndex) {
                              return (
                                <div key={QcmPropoIndex}>
                                  {PropositionClinique.map(
                                    (propofina, indexPropo) => {
                                      if (indexPropo === QcmIndex) {
                                        return (
                                          <div
                                            className={
                                              classes.propofeild_ul_phone
                                            }
                                            key={indexPropo}
                                          >
                                            <ul
                                              onCopy={disableCopyPaste}
                                              onCut={disableCopyPaste}
                                              onPaste={disableCopyPaste}
                                              style={{
                                                userSelect: "none",
                                              }}
                                              multiple={true}
                                              className={`${classes.ulpropo_phone} list-group list-group-flush`}
                                            >
                                              {propofina[indexPropo].map(
                                                (propo, indexPropofinal) => {
                                                  currentQcmIdOfPropo.value =
                                                    propo.qcmClinique.id;
                                                  console.log(
                                                    currentQcmIdOfPropo.value
                                                  );
                                                  return (
                                                    <li
                                                      key={indexPropofinal}
                                                      value={propo.id}
                                                      style={{
                                                        backgroundColor:
                                                          SaveVerfieReponsesClinique[
                                                            VisibiliteCasCliniqueIndex
                                                          ][QcmIndex] ===
                                                          QcmIndex
                                                            ? propo.reponseBoolClinique ===
                                                              true
                                                              ? COLORS[1]
                                                              : savePropositionsClinique[
                                                                  VisibiliteCasCliniqueIndex
                                                                ][QcmIndex][
                                                                  indexPropofinal
                                                                ] ===
                                                                  propo.id &&
                                                                propo.reponseBoolClinique ===
                                                                  false
                                                              ? COLORS[0]
                                                              : ""
                                                            : (TrueFullInsertClrClinique ===
                                                                true &&
                                                                SaveClickSelectVerfieAllClinique[
                                                                  VisibiliteCasCliniqueIndex
                                                                ][QcmIndex] ===
                                                                  QcmIndex) ||
                                                              SaveQcmIsAnswerClinique[
                                                                VisibiliteCasCliniqueIndex
                                                              ][QcmIndex] ===
                                                                QcmIndex
                                                            ? propo.reponseBoolClinique ===
                                                              true
                                                              ? COLORS[1]
                                                              : savePropositionsClinique[
                                                                  VisibiliteCasCliniqueIndex
                                                                ][QcmIndex][
                                                                  indexPropofinal
                                                                ] ===
                                                                  propo.id &&
                                                                propo.reponseBoolClinique ===
                                                                  false
                                                              ? COLORS[0]
                                                              : ""
                                                            : "",
                                                      }}
                                                      className={
                                                        savePropositionsClinique[
                                                          VisibiliteCasCliniqueIndex
                                                        ][QcmIndex][
                                                          indexPropofinal
                                                        ] === propo.id
                                                          ? "list-group-item active"
                                                          : "list-group-item"
                                                      }
                                                      onClick={() => {
                                                        handlePropoClick(
                                                          VisibiliteCasCliniqueIndex,
                                                          QcmIndex,
                                                          indexPropofinal,
                                                          propo.id,
                                                          propo.qcmClinique.id
                                                        );
                                                      }}
                                                    >
                                                      <img
                                                        src={
                                                          AlphabetChoice[
                                                            (IndexAlphabetChoice =
                                                              IndexAlphabetChoice +
                                                              1)
                                                          ]
                                                        }
                                                        height="60%"
                                                        width="40"
                                                      />
                                                      {
                                                        propo.propositionQcmClinique
                                                      }
                                                      {SaveQcmIsAnswerClinique[
                                                        VisibiliteCasCliniqueIndex
                                                      ][QcmIndex] ===
                                                        QcmIndex && (
                                                        <div
                                                          className={`${classes.percentage_phone} `}
                                                        >
                                                          {(
                                                            (propo.countSelect *
                                                              100) /
                                                            SavePercentageCliniqueAmount[
                                                              VisibiliteCasCliniqueIndex
                                                            ][QcmIndex]
                                                          ).toFixed(0)}
                                                          %
                                                        </div>
                                                      )}
                                                    </li>
                                                    //end retunr proposition
                                                  );
                                                }
                                              )}
                                            </ul>
                                          </div>
                                        );
                                      }
                                    }
                                  )}

                                  <div className={classes.btnfooter_phone}>
                                    {SaveQcmIsAnswerClinique[
                                      VisibiliteCasCliniqueIndex
                                    ][QcmIndex] === "" && (
                                      <FaRegCheckCircle
                                        className={`${classes.BntVerifierrpnse_phone} `}
                                        onClick={(e) => {
                                          handleClickiVerifieReponse(
                                            VisibiliteCasCliniqueIndex,
                                            QcmIndex
                                          );

                                          //*******descreption**************************** */
                                          saveQcmIndex.value[QcmIndex] =
                                            QcmIndex;
                                          saveCaseCliniqueIndex.value[
                                            VisibiliteCasCliniqueIndex
                                          ] = saveQcmIndex.value;
                                          console.log(saveQcmIndex.value);
                                          console.log(
                                            saveCaseCliniqueIndex.value
                                          );
                                        }}
                                      />
                                    )}
                                    {(SaveVerfieReponsesClinique[
                                      VisibiliteCasCliniqueIndex
                                    ][QcmIndex] === QcmIndex ||
                                      SaveQcmIsAnswerClinique[
                                        VisibiliteCasCliniqueIndex
                                      ][QcmIndex] === QcmIndex) && (
                                      <button
                                        type="button"
                                        className={`${classes.button_10} `}
                                        onClick={(e) => {
                                          handeldescription(
                                            currentQcmIdOfPropo.value
                                          );
                                        }}
                                      >
                                        Explication
                                      </button>
                                    )}

                                    {qcmType === "Cas Clinique" &&
                                      VisibiliteCasCliniqueIndex + 1 ===
                                        ShowQcm.length && (
                                        <IoCheckmarkDoneSharp
                                          className={classes.btnsuivant_phone}
                                          onClick={(e) => {
                                            handleClickiVerifieReponseAll();
                                          }}
                                        />
                                      )}
                                    {qcmType === "Tous (Qcm,Cas Clinique)" &&
                                      VisibiliteCasCliniqueIndex + 1 ===
                                        ShowQcm.length && (
                                        <IoCheckmarkDoneSharp
                                          className={classes.btnsuivant_phone}
                                          onClick={(e) => {
                                            handleClickiVerifieReponseAll();
                                          }}
                                        />
                                      )}

                                    {VisibleNextBtn.value && (
                                      <div>
                                        <GrNext
                                          className={classes.btnsuivant_phone}
                                          type="button"
                                          onClick={handleNextClick}
                                        />
                                      </div>
                                    )}
                                    {VisiblePrevBtn.value && (
                                      <GrPrevious
                                        className={classes.btnPrecdent_phone}
                                        onClick={handlePrevClick}
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  {ShowDescQcm && (
                    <DescriptionClinique
                      qcmIdPropsQcmDesc={qcmIdPropsQcmDesc.value}
                    />
                  )}
                </div>
                <div
                  className={`${classes.full_listeqcm_phone}`}
                  data-theme={isDark ? "dark" : "light"}
                  style={{ width: ShowListQcms ? 180 : 10 }}
                >
                  {ShowListQcms && (
                    <div className={`${classes.qcmsliste_phone}`}>
                      <div className={`${classes.qcmsliste_header_phone}`}>
                        <h6>Liste CasClinique</h6>
                      </div>
                      <ul>
                        {ShowCasClinique.map(
                          (casClinique, casCliniqueIndex) => (
                            <>
                              <div key={casCliniqueIndex}>
                                <li
                                  key={casCliniqueIndex}
                                  value={casClinique.id}
                                  className={
                                    SelectcasCliniqueIndex === casCliniqueIndex
                                      ? "list-group-item active  "
                                      : "list-group-item"
                                  }
                                >
                                  <ul
                                    className={`${classes.ul_clinique_clinique_phone} list-group`}
                                  >
                                    <div
                                      onClick={(e) => {
                                        handleItemClick(
                                          casClinique.id,
                                          casCliniqueIndex
                                        );
                                      }}
                                    >
                                      <a
                                        className={`${classes.title_casclinique_phone}`}
                                      >
                                        Cas Clinique {casCliniqueIndex + 1}
                                      </a>
                                      <a>
                                        <IoMdArrowDropdown />
                                      </a>
                                    </div>
                                    {CasCliniqueClicked ===
                                      casCliniqueIndex && (
                                      <>
                                        {ShowQcm.map((qcm, index) => {
                                          if (index === casCliniqueIndex) {
                                            return (
                                              <ul
                                                className={`${classes.ul_qcms_clinique_phone}`}
                                              >
                                                {qcm.map(
                                                  (qcmCln, indexqcmClnq) => (
                                                    <div
                                                      key={indexqcmClnq}
                                                      className={`${classes.div_qcm_phone}`}
                                                    >
                                                      <a
                                                        onClick={(e) =>
                                                          handlQcmClickNav(
                                                            indexqcmClnq
                                                          )
                                                        }
                                                      >
                                                        Question{" "}
                                                        {indexqcmClnq + 1}
                                                      </a>
                                                      {SaveClickSelectVerfieAllClinique[
                                                        casCliniqueIndex
                                                      ][indexqcmClnq] ===
                                                        indexqcmClnq && (
                                                        <div
                                                          className={
                                                            classes.vl_select_phone
                                                          }
                                                        ></div>
                                                      )}
                                                      {SaveQcmIsAnswerClinique[
                                                        casCliniqueIndex
                                                      ][indexqcmClnq] ===
                                                        indexqcmClnq && (
                                                        <div
                                                          className={
                                                            classes.vl_answer_phone
                                                          }
                                                        ></div>
                                                      )}
                                                    </div>
                                                  )
                                                )}
                                              </ul>
                                            );
                                          }
                                        })}
                                      </>
                                    )}
                                  </ul>
                                </li>
                              </div>
                            </>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  <div className={`${classes.iconlistqcm_phone}`}>
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
              </div>
            )}
            {modalDeleteCourIsOpen && (
              <ModalDeleteFullDescClinique
                onCancel={closeDeleteModalHandler}
                onConfirm={closeDeleteModalHandler}
                qcmId_delete={qcmIddelete.value}
              />
            )}
            {modalDeleteCourIsOpen && (
              <BackdropDeleteCour onCancel={closeDeleteModalHandler} />
            )}

            {ModalDeleteCliniqueIsOpen && (
              <ModalDeleteCasClinique
                onCancel={closeDeleteModalHandler}
                onConfirm={closeDeleteModalHandler}
                casCliniqueId={currentCasCliniqueId.value}
              />
            )}
            {ModalDeleteCliniqueIsOpen && (
              <Backdrop onCancel={closeDeleteModalHandler} />
            )}
            {ModalDeleteQcmCliniqueIsOpen && (
              <ModalDeleteQcmCasClinique
                onCancel={closeDeleteqcmCliniqueModalHandler}
                onConfirm={closeDeleteqcmCliniqueModalHandler}
                qcmCasCliniqueId={currentQcmCasCliniqueId.value}
              />
            )}
            {ModalDeleteQcmCliniqueIsOpen && (
              <Backdrop onCancel={closeDeleteqcmCliniqueModalHandler} />
            )}
          </div>
          {isDesktopOrLaptop && ModalDoneQuizIsOpen && (
            <>
              <div className={classes.card_done_quiz}>
                <div className={classes.card_done_quiz_btns}>
                  <h6> {ShowNoSelectPropoMessage}</h6>
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
                    onChange={(e) => setCasCliniqueQuizzName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleSaveCasCliniqueQuizzBtn}
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
                    onChange={(e) => setCasCliniqueQuizzName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleSaveCasCliniqueQuizz}
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
      {OpenBoardQcm && (
        <QuizBoard
          moduleName={props.moduleName}
          minYearQcm={props.minYearQcm}
          maxYearQcm={props.maxYearQcm}
          ExisteCasClinique={props.ExisteCasClinique}
          selectMultipleCours={props.selectMultipleCours}
          courId={courId}
          qcmType={qcmType}
          TrueFullInsertClr={
            JSON.parse(
              localStorage.getItem("IsCkickShowAllReponsesClinique")
            ) === true
          }
          QcmSujetTypeSelected={props.QcmSujetTypeSelected}
          getYear={props.getYear}
          getGroupePerm={props.getGroupePerm}
          QuizQcmQclinique={QuizQcmQclinique}
          moduleId={props.moduleId}
          SelectedSourceExmn={props.SelectedSourceExmn}
          backFromCliniqueAllQcmCliniqueprSujet={
            backFromCliniqueAllQcmCliniqueprSujet.value
          }
          minMaxYearParSujetsFinal={props.minMaxYearParSujetsFinal}
          checkParSjtBiologieClinique={props.checkParSjtBiologieClinique}
          savePropositions={props.savePropositions}
          SaveVerfieReponses={props.SaveVerfieReponses}
          SaveQcmIsAnswer={props.SaveQcmIsAnswer}
          SaveClickSelectVerfieAll={props.SaveClickSelectVerfieAll}
          SavePercentageAmount={props.SavePercentageAmount}
          doneGetAllClinique={doneGetAllClinique.value}
          savePropositionsClinique={savePropositionsClinique}
          SaveVerfieReponsesClinique={SaveVerfieReponsesClinique}
          SaveQcmIsAnswerClinique={SaveQcmIsAnswerClinique}
          TrueFullInsertClrClinique={TrueFullInsertClrClinique}
          SaveClickSelectVerfieAllClinique={SaveClickSelectVerfieAllClinique}
          SavePercentageCliniqueAmount={SavePercentageCliniqueAmount}
          qcmAndCliniqueTimer={true}
          isPassQcmClinique={isPassQcmClinique.value}
          watchValues={[
            { hours: props.watchValues[0].hours },
            { minutes: props.watchValues[1].minutes },
            { seconds: props.watchValues[2].seconds },
          ]}
        />
      )}
      <Toaster />
    </>
  );
}

export default QuizBoardClinique;
