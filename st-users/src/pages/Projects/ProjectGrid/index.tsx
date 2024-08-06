import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
} from "reactstrap";

import { Link } from "react-router-dom";

import classnames from 'classnames';

//redux
import { useSelector, useDispatch } from "react-redux";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

//Import Cards
import CardProject from "./card-project";

import { getProjects as onGetProjects } from "../../../slices/thunks";

const Paginations = () => {
 
  return (
    <React.Fragment>
      <Row className="g-0">
        <Col sm={6}>
          <div>
            <p className="mb-sm-0">Showing 1 to 8 of 24 entries</p>
          </div>
        </Col>
        <Col sm={6}>
          <div className="float-sm-end">
            <Pagination className="pagination-rounded mb-sm-0">
              <PaginationItem className="page-item disabled">
                <PaginationLink href="#" className="page-link"><i className="mdi mdi-chevron-left"></i></PaginationLink>
              </PaginationItem>
              <PaginationItem className="page-item">
                <PaginationLink href="#" className="page-link">1</PaginationLink>
              </PaginationItem>
              <PaginationItem className="page-item active">
                <PaginationLink href="#" className="page-link">2</PaginationLink>
              </PaginationItem>
              <PaginationItem className="page-item">
                <PaginationLink href="#" className="page-link">3</PaginationLink>
              </PaginationItem>
              <PaginationItem className="page-item">
                <PaginationLink href="#" className="page-link">4</PaginationLink>
              </PaginationItem>
              <PaginationItem className="page-item">
                <PaginationLink href="#" className="page-link">5</PaginationLink>
              </PaginationItem>
              <PaginationItem className="page-item">
                <PaginationLink href="#" className="page-link"><i className="mdi mdi-chevron-right"></i></PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const ProjectsGrid = () => {
  document.title = "Project Grid | Dashonic - React Admin & Dashboard Template";

  const dispatch = useDispatch();

  const { projects } = useSelector((state: any) => ({
    projects: state.projects.projects,
  }));

  useEffect(() => {
    if (projects && !projects.length) {
      dispatch(onGetProjects());
    }
  }, [dispatch, projects]);

  const [page, setPage] = useState(1);
  const [totalPage] = useState(5);
  const [menu1, setMenu1] = useState<boolean>(false);
  const [activeTab, setactiveTab] = useState<string>("1");
  const [projectstatus, setprojectstatus] = useState<any>("all");

  const toggleTab = (tab: any) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  const handlePageClick = (page: any) => {
    setPage(page);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Projects Grid" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={3}>
                      <div className="mb-3">
                        <Link to="/projects-create" className="btn btn-light">
                          <i className="uil uil-plus me-1"></i> Add New
                        </Link>
                      </div>
                    </Col>
                    <Col md={9}>
                      <div className="d-flex flex-wrap align-items-start justify-content-md-end gap-2 mb-3">
                        <div className="search-box">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control bg-light border-light rounded"
                              placeholder="Search..."
                            />
                            <i className="uil uil-search search-icon"></i>
                          </div>
                        </div>

                        <div>
                          <Nav pills>
                            <NavItem>
                              <Link
                                className="nav-link"
                                to="/projects-list"
                                id="List"
                              >
                                <i className="uil uil-list-ul"></i>
                                <UncontrolledTooltip
                                  placement="top"
                                  target="List"
                                >
                                  List
                                </UncontrolledTooltip>
                              </Link>
                            </NavItem>
                            <NavItem>
                              <Link
                                className="nav-link active"
                                to="/projects-grid"
                                id="Grid"
                              >
                                <i className="uil uil-apps"></i>
                                <UncontrolledTooltip
                                  placement="top"
                                  target="Grid"
                                >
                                  Grid
                                </UncontrolledTooltip>
                              </Link>
                            </NavItem>
                          </Nav>
                        </div>

                        <Dropdown
                          isOpen={menu1}
                          toggle={() => setMenu1(!menu1)}
                        >
                          <DropdownToggle
                            tag="a"
                            className="btn btn-link text-dark dropdown-toggle shadow-none"
                          >
                            <i className="uil uil-ellipsis-h"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem to="#">Action</DropdownItem>
                            <DropdownItem to="#">Another action</DropdownItem>
                            <DropdownItem to="#">
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-2">
                    <Nav tabs className="nav-tabs-custom mb-4">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggleTab("1");
                            setprojectstatus("all");
                          }}
                        >
                          All
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggleTab("2");
                            setprojectstatus("active");
                          }}
                        >
                          Active
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "3",
                          })}
                          onClick={() => {
                            toggleTab("3");
                            setprojectstatus("completed");
                          }}
                        >
                          Completed
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        {/* Import Cards */}
                        <CardProject
                          projects={projects}
                          newstatus={projectstatus}
                        />
                      </Row>
                      <Paginations />
                    </TabPane>
                  </TabContent>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="2">
                      <Row>
                        {/* Import Cards */}
                        <CardProject
                          projects={projects}
                          newstatus={projectstatus}
                        />
                      </Row>
                      <Paginations />
                    </TabPane>
                  </TabContent>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="3">
                      <Row>
                        {/* Import Cards */}
                        <CardProject
                          projects={projects}
                          newstatus={projectstatus}
                        />
                      </Row>
                      <Paginations />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProjectsGrid;