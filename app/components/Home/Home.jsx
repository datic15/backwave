import React from 'react';
import ReactFire from "reactfire";
import ReactMixin from "react-mixin";

// Components
import Canvas from "../Canvas/Canvas.jsx";
import CustomDialog from "../CustomDialog/CustomDialog.jsx";
import LeftDrawer from "../LeftDrawer/LeftDrawer.jsx";
import Header from "../Header/Header.jsx";

// Services
import FirebaseService from "../../services/FirebaseService";
import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";

// Styles
import "./assets/_styles.scss";
import "../Shared/assets/_reset-default.scss";


export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {
    return (
      <div>
        <Canvas />
      </div>
    );
  }
}
