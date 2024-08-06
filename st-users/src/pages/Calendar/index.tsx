import React, { useEffect, useState, useRef } from "react";
import { isEmpty } from "lodash";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

/** Import Full Calendar  */
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import listPlugin from "@fullcalendar/list";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  addNewEvent,
  deleteEvent,
  getCategories,
  getEvents,
  updateEvent,
} from "../../slices/thunks";

import DeleteModal from "./DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";

const Calender = () => {
  document.title = "Calendar | Dashonic - React Admin & Dashboard Template";

  const dispatch = useDispatch();

  const { events, categories } = useSelector((state: any) => ({
    events: state.calendar.events,
    categories: state.calendar.categories,
  }));

  const [modal, setModal] = useState<boolean>(false);
  const [setCalenderView, updatedCalenderView] = useState("dayGridMonth");
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalcategory, setModalcategory] = useState<boolean>(false);
  const [event, setEvent] = useState<any>({});
  const [selectedDay, setSelectedDay] = useState<any>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const calendarRef = useRef<any>();

  useEffect(() => {
    let external: any = document.getElementById("external-events");
    dispatch(getCategories());
    dispatch(getEvents());
    new Draggable(external, {
      itemSelector: ".external-event",
    });
    getInitialView();
    changeView(setCalenderView);
  }, [dispatch]);

  const changeView = (view: any) => {
    const API = getApi();

    API && API.changeView(view);
  };

  // events validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || "",
      category: (event && event.category) || "bg-danger",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      category: Yup.string().required("Please Select Your Category"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateEvent1 = {
          id: event.id,
          title: values.title,
          classNames: values.category + " text-white",
          start: event.start,
        };
        // update event
        dispatch(updateEvent(updateEvent1));
        validation.resetForm();
        togglecategory();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          title: values["title"],
          start: selectedDay ? selectedDay.date : new Date(),
          className: values.category + " text-white",
        };
        // save new event
        dispatch(addNewEvent(newEvent));
        validation.resetForm();
      }
      setSelectedDay(null);
      toggle();
    },
  });

  const togglecategory = () => {
    setModalcategory(!!modalcategory);
  };

  //category validation
  const categoryValidation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) ?? "",
      category: (event && event.category) ?? "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please provide a valid event name"),
      category: Yup.string().required("Please provide a Category"),
    }),
    onSubmit: values => {
      const newEvent = {
        id: Math.floor(Math.random() * 100),
        title: values["title"],
        start: selectedDay ? selectedDay.date : new Date(),
        className: values.category + " text-white",
      };
      dispatch(addNewEvent(newEvent));
      validation.resetForm();
      togglecategory();
    },
  });

  const getInitialView = () => {
    if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      updatedCalenderView("dayGridWeek");
      changeView("dayGridWeek");
    } else if (window.innerWidth <= 768) {
      updatedCalenderView("listWeek");
      changeView("listWeek");
    } else {
      updatedCalenderView("dayGridMonth");
      changeView("dayGridMonth");
    }
  };

  const getApi = () => {
    const { current: calendarDom } = calendarRef;

    return calendarDom ? calendarDom.getApi() : null;
  };

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setEvent({});
      setIsEdit(false);
    }
  }, [modal, event]);

  /**
   * Handling the modal state
   */
  const toggle = () => {
    if (modal) {
      setModal(false);
      setEvent(null);
      setIsEdit(false);
    } else {
      setModal(true);
    }
  };

  const toggleCategory = () => {
    setModalcategory(!modalcategory);
  };

  /**
   * Handling date click on calendar
   */
  const handleDateClick = (arg: any) => {
    const date = arg["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );
    const modifiedData = { ...arg, date: modifiedDate };

    setSelectedDay(modifiedData);
    toggle();
  };

  /**
   * Handling click on event on calendar
  */
  const handleEventClick = (arg: any) => {
    const event = arg.event;
    setEvent({
      id: event.id,
      title: event.title,
      title_category: event.title_category,
      start: event.start,
      className: event.classNames,
      category: event.classNames[0],
      event_category: event.classNames[0],
    });
    setIsEdit(true);
    toggle();
  };

  /**
   * Handling submit event on event form
  */
  const handleValidEventSubmit = (values: any) => {
    if (isEdit) {
      const updateEvent1 = {
        id: event.id,
        title: values.title,
        className: values.category + " text-white",
        start: event.start,
      };
      // update event
      dispatch(updateEvent(updateEvent1));
    } else {
      const newEvent = {
        id: Math.floor(Math.random() * 100),
        title: values["title"],
        start: selectedDay ? selectedDay.date : new Date(),
        className: values.category + " text-white",
      };
      dispatch(addNewEvent(newEvent));
    }
    setSelectedDay(null);
    toggle();
  };

  const handleValidEventSubmitcategory = (values: any) => {
    const newEvent = {
      id: Math.floor(Math.random() * 100),
      title: values["title_category"],
      start: selectedDay ? selectedDay.date : new Date(),
      className: values.event_category
        ? values.event_category + " text-white"
        : "bg-danger text-white",
    };
    // save new event

    dispatch(addNewEvent(newEvent));
    toggleCategory();
  };

  /**
   * On delete event
  */
  const handleDeleteEvent = () => {
    if (event && event.id) {
      dispatch(deleteEvent(event.id));
    }
    setDeleteModal(false);
    toggle();
  };


  /**
   * On category darg event
   */
  const onDrag = (event: any) => {
    event.preventDefault();
  };

  /**
   * On calendar drop event
   */
  const onDrop = (event: any) => {
    const date = event["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );

    const draggedEl = event.draggedEl;
    const modifiedData = {
      id: Math.floor(Math.random() * 100),
      title: draggedEl.innerText,
      start: modifiedDate,
      className: draggedEl.className,
    };
    dispatch(addNewEvent(modifiedData));
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Apps" breadcrumbItem="Calendar" />
          <Row>
            <Col xs={12}>
              <Row>
                <Col xl={3}>
                  <Card className="card-h-100">
                    <CardBody>
                      <div className="d-grid">
                        <Button
                          color="primary"
                          className="w-100"
                          onClick={toggleCategory}
                        >
                          <i className="mdi mdi-plus" />
                          Create New Event
                        </Button>
                      </div>

                      <div id="external-events">
                        <br/>
                        <p className="text-muted">
                          Drag and drop your event or click in the calendar
                        </p>
                        {categories &&
                          categories.map((category: any, i: any) => (
                            <div
                              className={`${category.type} external-event fc-event text-white`}
                              key={"cat-" + category.id}
                              draggable
                              onDrag={event => onDrag(event)}
                            >
                              <i className="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
                              {category.title}
                            </div>
                          ))}
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col xl={9}>
                  <Card className="card-h-100">
                    <CardBody>
                      {/* fullcalendar control */}
                      <FullCalendar
                        plugins={[
                          BootstrapTheme,
                          dayGridPlugin,
                          interactionPlugin,
                          listPlugin,
                        ]}
                        slotDuration={"00:15:00"}
                        handleWindowResize={true}
                        themeSystem="bootstrap"
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                        }}
                        events={events}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        drop={onDrop}
                        ref={calendarRef}
                        initialView={setCalenderView}
                        windowResize={getInitialView}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div style={{ clear: "both" }}></div>
              {/* New/Edit event modal */}
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader
                  toggle={toggle}
                  tag="h5"
                  className="py-3 px-4 border-bottom-0"
                >
                {!!isEdit ? "Edit Event" : "Add Event"}
                </ModalHeader>
                <ModalBody className="p-4">
                  <Form
                    onSubmit={e => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Col className="col-12 mb-3">
                        <Label className="form-label">Event Name</Label>
                        <Input
                          name="title"
                          label="Event Name"
                          type="text"
                          placeholder="Insert Event Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.title || ""}
                          invalid={
                            validation.touched.title && validation.errors.title
                              ? true
                              : false
                          }
                        />
                        {validation.touched.title && validation.errors.title ? (
                          <FormFeedback type="invalid">
                            {validation.errors.title}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col className="col-12 mb-3">
                        <Label className="form-label">Category</Label>
                        <Input
                          type="select"
                          name="category"
                          label="Select Category"
                          validate={{
                            required: { value: true },
                          }}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.category || ""}
                          invalid={
                            validation.touched.category &&
                            validation.errors.category
                              ? true
                              : false
                          }
                        >
                          <option value="bg-danger">Danger</option>
                          <option value="bg-success">Success</option>
                          <option value="bg-primary">Primary</option>
                          <option value="bg-info">Info</option>
                          <option value="bg-dark">Dark</option>
                          <option value="bg-warning">Warning</option>
                        </Input>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col xs={6}>
                        {!!isEdit && (
                          <Button
                            type="button"
                            className="btn btn-danger me-1"
                            onClick={() => setDeleteModal(true)}
                          >
                            Delete
                          </Button>
                        )}
                      </Col>
                      <Col xs={6} className="text-end">
                        <Button
                          type="button"
                          className="btn btn-light me-2"
                          onClick={toggle}
                        >
                          Close
                        </Button>
                        <Button type="submit" className="btn btn-success">
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
              </Modal>

              <Modal isOpen={modalcategory} toggle={toggleCategory}>
                <ModalHeader toggle={toggleCategory} tag="h4">
                  Add a category
                </ModalHeader>
                <ModalBody>
                  <Form
                    onSubmit={e => {
                      e.preventDefault();
                      categoryValidation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Label className="form-label">Event Name</Label>
                      <Col className="col-12 mb-3">
                          <Input
                          name="title"
                          label="Category Name"
                          placeholder="Insert Event Name"
                          onChange={categoryValidation.handleChange}
                          onBlur={categoryValidation.handleBlur}
                          value={categoryValidation.values.title || ""}
                          invalid={
                            categoryValidation.touched.title &&
                            categoryValidation.errors.title
                              ? true
                              : false
                          }
                        />
                        {categoryValidation.touched.title &&
                        categoryValidation.errors.title ? (
                          <FormFeedback type="invalid">
                            {categoryValidation.errors.title}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col className="col-12 mb-3">
                        <Label className="form-label">Categoty</Label>
                        <Input
                          type="select"
                          name="category"
                          onChange={categoryValidation.handleChange}
                          onBlur={categoryValidation.handleBlur}
                          value={categoryValidation.values.category || ""}
                          invalid={
                            categoryValidation.touched.category &&
                            categoryValidation.errors.category
                              ? true
                              : false
                          }
                        >
                          <option value="bg-danger">Danger</option>
                          <option value="bg-success">Success</option>
                          <option value="bg-primary">Primary</option>
                          <option value="bg-info">Info</option>
                          <option value="bg-dark">Dark</option>
                          <option value="bg-warning">Warning</option>
                        </Input>
                        {categoryValidation.touched.category &&
                        categoryValidation.errors.category ? (
                          <FormFeedback type="invalid">
                            {categoryValidation.errors.category}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={toggleCategory}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success save-event"
                          >
                            Save
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Calender;
