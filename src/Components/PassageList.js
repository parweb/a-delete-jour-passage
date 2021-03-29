import { Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

export default function PassageList(props) {
  const [passages, setPassages] = useState([]);
  /*const [numberDays, setNumberDays] = useState([
      {
        day:"Lun"
      },
      {
        day:"Mar"
      },
      {
        day:"Mer"
      },
      {
        day:"Jeu"
      },
      {
        day:"Ven"
      },
    ]);*/
  const [passageSingle, setPassageSingle] = useState({});

  useEffect(() => {
    setPassages(props.passageItems);
    setPassageSingle(props.passageItems[0]);
  }, [props]);

  /*const parseCodePostal = (numberObject) => {
        var string;
        var singleDigits;
        if(numberObject.bureau !== undefined || numberObject.departement !== undefined) {
            numberObject.departement < 10 ? singleDigits = "0" : singleDigits ="";
            string =  singleDigits + numberObject.departement.toString() +numberObject.bureau.toString();
            return string;
        }
    }*/

  return (
    <div>
      {passages.length > 0 && (
        <div>
          <Row>
            <table className="table table-hover table-responsive-md passage-expert">
              <thead>
                <tr>
                  <th scope="col" className="">
                    CP
                  </th>
                  <th scope="col" className="">
                    Nom
                  </th>
                  <th scope="col" className="center-col">
                    Lun <div className="availability-head"></div>
                  </th>
                  <th scope="col" className="center-col">
                    Mar <div className="availability-head"></div>
                  </th>
                  <th scope="col" className="center-col">
                    Mer <div className="availability-head"></div>
                  </th>
                  <th scope="col" className="center-col">
                    Jeu <div className="availability-head"></div>
                  </th>
                  <th scope="col" className="center-col">
                    Ven <div className="availability-head"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {passages.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th>{item.codePostal}</th>
                      <td>{item.libelleCommune}</td>
                      <td className="availability-cells">
                        <div className="cont-av-cell">
                          <span
                            className={
                              'class-availability ' +
                              (item.presLundi === 'O'
                                ? 'available'
                                : 'unavailable')
                            }
                          ></span>
                        </div>
                      </td>
                      <td className="availability-cells">
                        <div className="cont-av-cell">
                          <span
                            className={
                              'class-availability ' +
                              (item.presMardi === 'O'
                                ? 'available'
                                : 'unavailable')
                            }
                          ></span>
                        </div>
                      </td>
                      <td className="availability-cells">
                        <div className="cont-av-cell">
                          <span
                            className={
                              'class-availability ' +
                              (item.presMercredi === 'O'
                                ? 'available'
                                : 'unavailable')
                            }
                          ></span>
                        </div>
                      </td>
                      <td className="availability-cells">
                        <div className="cont-av-cell">
                          <span
                            className={
                              'class-availability ' +
                              (item.presJeudi === 'O'
                                ? 'available'
                                : 'unavailable')
                            }
                          ></span>
                        </div>
                      </td>
                      <td className="availability-cells">
                        <div className="cont-av-cell">
                          <span
                            className={
                              'class-availability ' +
                              (item.presVendredi === 'O'
                                ? 'available'
                                : 'unavailable')
                            }
                          ></span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Row>
          {passageSingle && (
            <div>
              <Row
                className="passage-expert-responsive-ui"
                style={{ margin: '10px 0' }}
              >
                <Col className="resp-col labels-left">
                  <span>CP</span>
                  <span>NOM</span>
                </Col>
                <Col className="resp-col information-right">
                  <span>{passageSingle.codePostal}</span>
                  <span>{passageSingle.libelleCommune}</span>
                </Col>
              </Row>
              <div className="divider-resp grey-bg passage-expert-responsive-ui"></div>
              <Row className="passage-expert-responsive-ui">
                <Col>
                  <div className="days-resp">
                    <span>Lun</span>
                  </div>

                  <div className="availability-cells resp">
                    <div className="cont-av-cell">
                      <span
                        className={
                          'class-availability ' +
                          (passageSingle.presLundi === 'O'
                            ? 'available'
                            : 'unavailable')
                        }
                      ></span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="days-resp">
                    <span>Mar</span>
                  </div>

                  <div className="availability-cells resp">
                    <div className="cont-av-cell">
                      <span
                        className={
                          'class-availability ' +
                          (passageSingle.presMardi === 'O'
                            ? 'available'
                            : 'unavailable')
                        }
                      ></span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="days-resp">
                    <span>Mer</span>
                  </div>

                  <div className="availability-cells resp">
                    <div className="cont-av-cell">
                      <span
                        className={
                          'class-availability ' +
                          (passageSingle.presMercredi === 'O'
                            ? 'available'
                            : 'unavailable')
                        }
                      ></span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="days-resp">
                    <span>Jeu</span>
                  </div>

                  <div className="availability-cells resp">
                    <div className="cont-av-cell">
                      <span
                        className={
                          'class-availability ' +
                          (passageSingle.presJeudi === 'O'
                            ? 'available'
                            : 'unavailable')
                        }
                      ></span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="days-resp">
                    <span>Ven</span>
                  </div>

                  <div className="availability-cells resp">
                    <div className="cont-av-cell">
                      <span
                        className={
                          'class-availability ' +
                          (passageSingle.presVendredi === 'O'
                            ? 'available'
                            : 'unavailable')
                        }
                      ></span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
