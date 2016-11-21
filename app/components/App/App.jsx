import React from 'react';

import ReactFire from "reactfire";

import ReactMixin from "react-mixin";

import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Canvas from "../Canvas/Canvas.jsx";

import FirebaseService from "../../services/FirebaseService";
import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";

import "./assets/_styles.scss";
import "../Shared/assets/_reset-default.scss";

let styles = {};
const ROOT_URL = "https://diploma-dd819.firebaseio.com/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.firebaseService = new FirebaseService();
    this.settingsService = new SettingsService();
  }

  state = {
    open: false,
    loadPopupOpened: false,
    selectedRadio: null,
    radiosCollection: []
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  handleRequestChange = (open) => {
    this.setState({open});
  }

  handleRefreshClick = (event) => {
    CanvasService.refreshCanvas();
  }

  handleLoadClick = (event) => {
    this.setState({loadPopupOpened: true});

    let canvasList = CanvasService
      .loadCanvasList(this.firebaseRef)
      .then((array) => {
        console.log(array);
        this.setState({radiosCollection: array});
      });

  }

  handleSaveClick = (event) => {
    // console.log(this.firebaseRefs);
    CanvasService.saveCanvas("myBestCollection2", this.firebaseRef);
  }

  componentWillMount() {
    this.firebaseRef = this.props.firebase.database().ref("canvasCollection");
    this.bindAsArray(this.firebaseRef, "canvasCollection");

    // console.log(this.firebaseRef.val());
    //this.firebaseRef.on('value', this.handleDataLoaded.bind(this));
    // this.fb = new Firebase(ROOT_URL + "items/");
    // bindAsObject is a method from ReactFire that sets: this.state.items = {...}
    // this.bindAsObject(this.fb, "items");
    // this.fb.on('value', this.handleDataLoaded.bind(this));
  }

  // handleLoadCollectionPopupOpen = () => {
  //   this.setState({loadPopupOpened: true});
  // };

  handleCheckRadio = (event) => {
    //console.log("val: ", event.target.value);
    this.setState({selectedRadio: event.target.value});
  }

  handleLoadCollectionPopupClose = (event) => {
    this.setState({loadPopupOpened: false});
  }

  handleLoadCollectionPopupSubmit = (event) => {
    console.log("submit");

    //ToDo: uncomment these
    CanvasService.loadCanvas(this.state.selectedRadio, this.firebaseRef);
    this.settingsService.disableConnectionMode();
    this.settingsService.enableMigrationMode();
    this.setState({loadPopupOpened: false});
  }

  renderRadios = () => {
    let { radiosCollection } = this.state;

    if (radiosCollection) {
      return radiosCollection.map((item, index) => {
        return (
          <RadioButton
            key={index}
            value={item.key}
            label={item.name}
            style={styles.radioButton}
            onClick={this.handleCheckRadio}
          />
        );
      });
    }

    return;
  }

  renderLoadCollectionPopup = () => {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleLoadCollectionPopupClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleLoadCollectionPopupSubmit}
      />,
    ];

    return (
      <Dialog
        title="Scrollable Dialog"
        actions={actions}
        modal={false}
        open={this.state.loadPopupOpened}
        onRequestClose={this.handleLoadCollectionPopupClose}
        autoScrollBodyContent={true}
      >
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
          {this.renderRadios()}
        </RadioButtonGroup>
      </Dialog>
    );
  }

  renderHeader = () => {
    return (
      <AppBar
        title="Title"
        iconElementRight={
          <IconMenu

            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <MenuItem primaryText="Refresh" onClick={this.handleRefreshClick} />
          <MenuItem primaryText="Load" onClick={this.handleLoadClick} />
          <MenuItem primaryText="Save" onClick={this.handleSaveClick} />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
        }
        onLeftIconButtonTouchTap={this.handleToggle}/>
    );
  }

  renderLeftMenu = () => {
    return (
      <Drawer
        open={this.state.open}
        docked={false}
        onRequestChange={this.handleRequestChange}
        width={350}>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={this.handleToggle}/>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem
          primaryText="Case Tools"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="UPPERCASE" />,
            <MenuItem primaryText="lowercase" />,
            <MenuItem primaryText="CamelCase" />,
            <MenuItem primaryText="Propercase" />,
          ]}/>
        <Divider />
        <Checkbox
          label="Simple"
          className="checkbox"
          style={styles.checkbox}
          />
        <Checkbox
          checkedIcon={<Visibility />}
          uncheckedIcon={<VisibilityOff />}
          label="Custom icon of different shapes"
          className="checkbox"
          style={styles.checkbox}
          />
        <Checkbox
          label="Label on the left"
          labelPosition="left"
          className="checkbox"
          style={styles.checkbox}
          />
        <Divider />
        <p>Some text</p>
        <p>Some text</p>
        <Divider />
        <Toggle
          label="Simple"
          className="toggle"
          style={styles.toggle}/>
        <Toggle
          label="Toggled by default"
          defaultToggled={true}
          className="toggle"
          style={styles.toggle}/>
      </Drawer>
    );
  }

  render() {
        // console.log(styles);
    return (
      <div>
        {this.renderHeader()}
        <Canvas />
        {this.renderLeftMenu()}
        {this.renderLoadCollectionPopup()}
      </div>
    );
  }
}

ReactMixin(App.prototype, ReactFire);

export default App;

// iconElementLeft={<IconButton><NavigationClose /></IconButton>}
