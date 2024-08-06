import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//import images
import logolight from "../../assets/images/logo-light.png";
import logoDark from "../../assets/images/logo-dark.png";

const Thankyou1 = () => {
    document.title = "Thank you | Dashonic - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="authentication-bg min-vh-100">
                <div className="bg-overlay bg-white"></div>
                <Container>
                    <div className="d-flex flex-column min-vh-100 px-3 pt-4">
                        <Row className="justify-content-center my-auto">
                            <Col md={8} lg={6} xl={4}>

                                <div className="text-center py-5">
                                    <div className="mb-4 mb-md-5">
                                        <Link to="/sales" className="d-block auth-logo">
                                            <img src={logoDark} alt="" height="22" className="auth-logo-dark" />
                                            <img src={logolight} alt="" height="22" className="auth-logo-light" />
                                        </Link>
                                    </div>
                                    <div className="mb-4 mb-md-5">
                                        <div className="avatar-lg mx-auto">
                                            <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                                                <i className="uil uil-thumbs-up"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-muted">
                                        <h4 className="">Thank You</h4>
                                        <p>Thank you for using <span className="fw-semibold">Dashonic</span></p>
                                        <div className="mt-4">
                                            <Link to="/sales" className="btn btn-info w-100">Back to Dashboard</Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <div className="text-center text-muted p-4">
                                    <p className="mb-0">&copy; {" "}{new Date().getFullYear()} Dashonic. Crafted with <i className="mdi mdi-heart text-danger"></i> by Pichforest</p>
                                </div>
                            </Col>
                        </Row>

                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Thankyou1;