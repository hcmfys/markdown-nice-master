import React, {Component} from "react";
import {inject, observer} from "mobx-react";

import "../common.css";

@inject("content")
@observer
class NewFile extends Component {
  handleClick = (e) => {
    this.props.content.setContent("");
  };

  render() {
    return (
      <label id="nice-menu-import-file" className="nice-menu-item"  onClick={this.handleClick} >
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">新建</span>
        </span>
      </label>
    );
  }
}

export default NewFile;
