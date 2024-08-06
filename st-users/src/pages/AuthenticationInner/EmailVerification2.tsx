import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//import images
import logolight from "../../assets/images/logo-light.png";

const EmailVerification2 = () => {
    document.title = "Email Verification 2 | Dashonic - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="authentication-bg min-vh-100">
                <div className="bg-overlay bg-white"></div>
                <Container>
                    <div className="d-flex flex-column min-vh-100 px-3 pt-4">
                        <Row className="justify-content-center my-auto">
                            <Col lg={10}>
                                <div className="py-5">
                                    <div className="card auth-cover-card overflow-hidden">
                                        <Row className="g-0">
                                            <Col lg={6}>
                                                <div className="auth-img">
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="p-4 p-lg-5 bg-primary h-100 d-flex align-items-center justify-content-center">
                                                    <div className="w-100 text-center">
                                                        <div className="mb-4 mb-md-5">
                                                            <Link to="/sales" className="d-block auth-logo">
                                                                <img src={logolight} alt="" />
                                                            </Link>
                                                        </div>
                                                        <div className="mb-4 mb-md-5">
                                                            <div className="avatar-lg mx-auto">
                                                                <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                                                                    <i className="uil uil-envelope-alt"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-white-50">
                                                            <h4 className="text-white">Verify Your Email</h4>
                                                            <p>We have sent you verification email <span className="fw-semibold">example@abc.com</span>, Please check it</p>
                                                            <div className="mt-4">
                                                                <Link to="#" className="btn btn-info w-100">Verify email</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-5 text-center text-muted">
                                        <p>Didn&apos;t receive an email ? <Link to="#" className="fw-medium text-decoration-underline">Resend</Link></p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
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

export default EmailVerification2;