import { useEffect, useState } from "react";
import NavigationBar from "../compenent/layout/NavigationBar";
import classes from "./SaveQuizz.module.css";
import Sidebar from "./Sidebar";
import { useSignal } from "@preact/signals-react/runtime";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import backsave from "../compenent/layout/img/backsave.png";
import { IoChevronDownOutline } from "react-icons/io5";

function SaveQuizz() {
  const token = localStorage.getItem("tokengoat");
  const userIdToken = localStorage.getItem("userId");
  //******SideBare Change************************************* */
  function etatsidebare(etat) {
    setShowSideBare(etat);
  }
  const [ShowSideBare, setShowSideBare] = useState(false);
  let navigateBoardQuiz = useNavigate();
  //************************************************************************* */
  const [qcmsQuizz, setQcmsQuizz] = useState([]);
  const [casCliniqueQuizz, setCasCliniqueQuizz] = useState([]);
  const [QcmCasCliniqueQuizz, setQcmCasCliniqueQuizz] = useState([]);

  useEffect(() => {
    console.log(userIdToken);
    getAllQcmsSaves();
    getAllCasCliniqueSaves();
    getAllQcmCasCliniqueSaves();
  }, []);
  //******************************************************************* */
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //************************************************************************ */
  //****show quizz div********************************************************** */
  const [showQcmQuizDiv, setShowQcmQuizDiv] = useState(false);
  const [showCasCliniqueQuizDiv, setShowCasCliniqueQuizDiv] = useState(false);
  const [showQcmCasCliniqueQuizDiv, setShowQcmCasCliniqueQuizDiv] =
    useState(false);

  //******************************************************************************* */

  //****get qcms saves******************************************************** */
  const getAllQcmsSaves = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/qcmquizz/${userIdToken}/userqcmsquizz`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setQcmsQuizz(result.data);
  };
  ///**************************************************************************** */
  //****get qcms saves******************************************************** */
  const getAllCasCliniqueSaves = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/cliniquequizz/${userIdToken}/usercliniquesquizz`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setCasCliniqueQuizz(result.data);
  };
  ///**************************************************************************** */
  //****get qcms saves******************************************************** */
  const getAllQcmCasCliniqueSaves = async () => {
    const result = await axios.get(
      `https://goatqcm-instance.com/qcmcliniquequizz/${userIdToken}/userqcmcliniquesquizz`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setQcmCasCliniqueQuizz(result.data);
  };
  ///**************************************************************************** */
  //******handle quiz div click************************************************* */
  function handleQuizQcm(qcmQuizzId, index) {
    localStorage.setItem("qcmquizzid", qcmQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected: qcmsQuizz[index].qcmSujetTypeSelected,
        SelectedSourceExmn: qcmsQuizz[index].selectedSourceExmn,
        moduleId: qcmsQuizz[index].moduleId,
        selectMultipleCours: JSON.parse(qcmsQuizz[index].selectMultipleCours),
        qcmType: qcmsQuizz[index].qcmType,
        minYearQcm: JSON.parse(qcmsQuizz[index].minYearQcm),
        maxYearQcm: JSON.parse(qcmsQuizz[index].maxYearQcm),
        moduleName: qcmsQuizz[index].moduleName,
        //*****qcms *************************************************** */
        savePropositions: JSON.parse(qcmsQuizz[index].savePropositions),
        SaveClickSelectVerfieAll: JSON.parse(
          qcmsQuizz[index].saveClickSelectVerfieAll
        ),
        SaveVerfieReponses: JSON.parse(qcmsQuizz[index].saveVerfieReponses),
        SaveQcmIsAnswer: JSON.parse(qcmsQuizz[index].saveQcmIsAnswer),
        SavePercentageAmount: JSON.parse(qcmsQuizz[index].savePercentageAmount),
        commingFrom: "savequizz",
        ExisteCasClinique: false,
        //***end qcm***************************************************** */
        /* checkParSjtBiologieClinique: CheckBiologieOrCliniqueParSjt,
        minMaxYearParSujetsFinal: minMaxYearParSujetsFinal.value,
        QuizQcmQclinique: QuizQcmQclinique,    
        ExisteCasClinique: ExisteCasClinique,
        goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt:
          goFromQuizQuizToCLiniqueAllQcmCliniqueParSjt.value,
        backFromCliniqueAllQcmCliniqueprSujet:
          backFromCliniqueAllQcmCliniqueprSujet.value,
        courId: SelectedCours[0],*/
      },
    });
  }
  //******************************************************************************* */
  //******handle quiz cas clinique div click****************************************** */
  function handleQuizCasClinique(casCliniqueQuizzId, index) {
    localStorage.setItem("qcmquizzid", casCliniqueQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected: casCliniqueQuizz[index].qcmSujetTypeSelected,
        SelectedSourceExmn: casCliniqueQuizz[index].selectedSourceExmn,
        moduleId: casCliniqueQuizz[index].moduleId,
        selectMultipleCours: JSON.parse(
          casCliniqueQuizz[index].selectMultipleCours
        ),
        qcmType: casCliniqueQuizz[index].qcmType,
        minYearQcm: JSON.parse(casCliniqueQuizz[index].minYearQcm),
        maxYearQcm: JSON.parse(casCliniqueQuizz[index].maxYearQcm),
        moduleName: casCliniqueQuizz[index].moduleName,
        //*****cas clinique *************************************************** */
        savePropositionsClinique: JSON.parse(
          casCliniqueQuizz[index].savePropositionsClinique
        ),
        saveClickSelectVerfieAllClinique: JSON.parse(
          casCliniqueQuizz[index].saveClickSelectVerfieAllClinique
        ),
        saveVerfieReponsesClinique: JSON.parse(
          casCliniqueQuizz[index].saveVerfieReponsesClinique
        ),
        saveQcmIsAnswerClinique: JSON.parse(
          casCliniqueQuizz[index].saveQcmIsAnswerClinique
        ),
        savePercentageCliniqueAmount: JSON.parse(
          casCliniqueQuizz[index].savePercentageCliniqueAmount
        ),
        commingFrom: "savequizz",
      },
    });
  }
  //******************************************************************************* */
  //******handle quiz cas clinique div click****************************************** */
  function handleQuizQcmCasClinique(QcmCasCliniqueQuizzId, index) {
    localStorage.setItem("qcmquizzid", QcmCasCliniqueQuizzId);
    navigateBoardQuiz(`/quiz/quizdashboard`, {
      state: {
        QcmSujetTypeSelected: QcmCasCliniqueQuizz[index].qcmSujetTypeSelected,
        SelectedSourceExmn: QcmCasCliniqueQuizz[index].selectedSourceExmn,
        moduleId: QcmCasCliniqueQuizz[index].moduleId,
        selectMultipleCours: JSON.parse(
          QcmCasCliniqueQuizz[index].selectMultipleCours
        ),
        qcmType: QcmCasCliniqueQuizz[index].qcmType,
        minYearQcm: JSON.parse(QcmCasCliniqueQuizz[index].minYearQcm),
        maxYearQcm: JSON.parse(QcmCasCliniqueQuizz[index].maxYearQcm),
        moduleName: QcmCasCliniqueQuizz[index].moduleName,
        //*****qcms *************************************************** */
        savePropositions: JSON.parse(
          QcmCasCliniqueQuizz[index].savePropositions
        ),
        SaveClickSelectVerfieAll: JSON.parse(
          QcmCasCliniqueQuizz[index].saveClickSelectVerfieAll
        ),
        SaveVerfieReponses: JSON.parse(
          QcmCasCliniqueQuizz[index].saveVerfieReponses
        ),
        SaveQcmIsAnswer: JSON.parse(QcmCasCliniqueQuizz[index].saveQcmIsAnswer),
        SavePercentageAmount: JSON.parse(
          QcmCasCliniqueQuizz[index].savePercentageAmount
        ),
        //***end qcm***************************************************** */
        //*****cas clinique *************************************************** */
        savePropositionsClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].savePropositionsClinique
        ),
        saveClickSelectVerfieAllClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveClickSelectVerfieAllClinique
        ),
        saveVerfieReponsesClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveVerfieReponsesClinique
        ),
        saveQcmIsAnswerClinique: JSON.parse(
          QcmCasCliniqueQuizz[index].saveQcmIsAnswerClinique
        ),
        savePercentageCliniqueAmount: JSON.parse(
          QcmCasCliniqueQuizz[index].savePercentageCliniqueAmount
        ),
        //**end cas clinique********************************************************** */
        commingFrom: "savequizz",
        ExisteCasClinique: QcmCasCliniqueQuizz[index].existeCasClinique,
        DoneGetAllClinique: QcmCasCliniqueQuizz[index].doneGetAllClinique,
      },
    });
  }
  //******************************************************************************* */
  //*****phone methode ************************************************************ */
  const handleShowQcmQuizzDivBtn = () => {
    setShowQcmQuizDiv(!showQcmQuizDiv);
    setShowCasCliniqueQuizDiv(false);
    setShowQcmCasCliniqueQuizDiv(false);
  };
  const handleShowCasCliniqueQuizzDivBtn = () => {
    setShowQcmQuizDiv(false);
    setShowCasCliniqueQuizDiv(!showCasCliniqueQuizDiv);
    setShowQcmCasCliniqueQuizDiv(false);
  };
  const handleShowQcmCasCliniqueQuizzDivBtn = () => {
    setShowQcmQuizDiv(false);
    setShowCasCliniqueQuizDiv(false);
    setShowQcmCasCliniqueQuizDiv(!showQcmCasCliniqueQuizDiv);
  };
  //******************************************************************************** */
  return (
    <>
      <NavigationBar changeetatsidebar={etatsidebare} />
      <div className={classes.addingdiv}>
        <div className={classes.sidebare}>{ShowSideBare && <Sidebar />}</div>
        {isDesktopOrLaptop && (
          <div
            className={classes.contanerspace}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.quizzContainer}>
              <div className={classes.fullquizzdiv}>
                <div className={classes.fullquizzdiv_header}>QCM</div>
                <div className={classes.fullquizzdiv_content}>
                  {qcmsQuizz.map((qcmQuizz, index) => (
                    <div
                      className={classes.quizzdiv}
                      onClick={() => {
                        handleQuizQcm(qcmQuizz.id, index);
                      }}
                    >
                      <div className={classes.quizzdivheader}>
                        {qcmQuizz.nameQcmQuizz}
                      </div>
                      <div className={classes.quizzcontent}>
                        <img src={backsave} />
                      </div>
                      <div className={classes.quizzdivfooter}></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={classes.fullquizzdiv}>
                <div className={classes.fullquizzdiv_header}>Cas Clinique</div>
                <div className={classes.fullquizzdiv_content}>
                  {casCliniqueQuizz.map((casClinique, index) => (
                    <div
                      className={classes.quizzdiv}
                      onClick={() => {
                        handleQuizCasClinique(casClinique.id, index);
                      }}
                    >
                      <div className={classes.quizzdivheader}>
                        {casClinique.nameCasCliniqueQuizz}
                      </div>
                      <div className={classes.quizzcontent}>
                        <img src={backsave} />
                      </div>
                      <div className={classes.quizzdivfooter}></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={classes.fullquizzdiv}>
                <div className={classes.fullquizzdiv_header}>
                  Tous (Qcm et Cas Clinique)
                </div>
                <div className={classes.fullquizzdiv_content}>
                  {QcmCasCliniqueQuizz.map((QcmCasClinique, index) => (
                    <div
                      className={classes.quizzdiv}
                      onClick={() => {
                        handleQuizQcmCasClinique(QcmCasClinique.id, index);
                      }}
                    >
                      <div className={classes.quizzdivheader}>
                        {QcmCasClinique.nameQcmCasCliniqueQuizz}
                      </div>
                      <div className={classes.quizzcontent}>
                        <img src={backsave} />
                      </div>
                      <div className={classes.quizzdivfooter}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {isTabletOrMobile && (
          <div
            className={classes.contanerspace_phone}
            data-theme={isDark ? "dark" : "light"}
          >
            <div className={classes.quizzContainer_phone}>
              <div
                className={classes.fullquizzdiv_phone}
                style={{ height: showQcmQuizDiv ? 200 : 0 }}
              >
                <div
                  className={classes.fullquizzdiv_header_phone}
                  onClick={handleShowQcmQuizzDivBtn}
                >
                  <div className={classes.title_type_quizz}>Qcm</div>
                  <div className={classes.drowdown_btn}>
                    <IoChevronDownOutline />
                  </div>
                </div>
                {showQcmQuizDiv && (
                  <div className={classes.fullquizzdiv_content_phone}>
                    {qcmsQuizz.map((qcmQuizz, index) => (
                      <div
                        className={classes.quizzdiv_phone}
                        onClick={() => {
                          handleQuizQcm(qcmQuizz.id, index);
                        }}
                      >
                        <div className={classes.quizzdivheader_phone}>
                          {qcmQuizz.nameQcmQuizz}
                        </div>
                        <div className={classes.quizzcontent_phone}>
                          <img src={backsave} />
                        </div>
                        <div className={classes.quizzdivfooter_phone}></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={classes.fullquizzdiv_phone}
                style={{ height: showCasCliniqueQuizDiv ? 200 : 0 }}
              >
                <div
                  className={classes.fullquizzdiv_header_phone}
                  onClick={handleShowCasCliniqueQuizzDivBtn}
                >
                  <div className={classes.title_type_quizz}>Cas Clinique</div>
                  <div className={classes.drowdown_btn}>
                    <IoChevronDownOutline />
                  </div>
                </div>
                {showCasCliniqueQuizDiv && (
                  <div className={classes.fullquizzdiv_content_phone}>
                    {casCliniqueQuizz.map((casclinique, index) => (
                      <div
                        className={classes.quizzdiv_phone}
                        onClick={() => {
                          handleQuizCasClinique(casclinique.id, index);
                        }}
                      >
                        <div className={classes.quizzdivheader_phone}>
                          {casclinique.nameCasCliniqueQuizz}
                        </div>
                        <div className={classes.quizzcontent_phone}>
                          <img src={backsave} />
                        </div>
                        <div className={classes.quizzdivfooter_phone}></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={classes.fullquizzdiv_phone}
                style={{ height: showQcmCasCliniqueQuizDiv ? 200 : 0 }}
              >
                <div
                  className={classes.fullquizzdiv_header_phone}
                  onClick={handleShowQcmCasCliniqueQuizzDivBtn}
                >
                  <div className={classes.title_type_quizz}>
                    Tous (Qcm et Cas Clinique)
                  </div>
                  <div className={classes.drowdown_btn}>
                    <IoChevronDownOutline />
                  </div>
                </div>
                {showQcmCasCliniqueQuizDiv && (
                  <div className={classes.fullquizzdiv_content_phone}>
                    {QcmCasCliniqueQuizz.map((qcmCasCliniqueQuizz, index) => (
                      <div
                        className={classes.quizzdiv_phone}
                        onClick={() => {
                          handleQuizQcmCasClinique(
                            qcmCasCliniqueQuizz.id,
                            index
                          );
                        }}
                      >
                        <div className={classes.quizzdivheader_phone}>
                          {qcmCasCliniqueQuizz.nameQcmCasCliniqueQuizz}
                        </div>
                        <div className={classes.quizzcontent_phone}>
                          <img src={backsave} />
                        </div>
                        <div className={classes.quizzdivfooter_phone}></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SaveQuizz;
