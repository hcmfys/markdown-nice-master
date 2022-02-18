import React from "react";
import {Menu, Dropdown} from "antd";
import {observer, inject} from "mobx-react";

import {RIGHT_SYMBOL, TEMPLATE_NUM, MARKDOWN_THEME_ID, THEME_LIST, STYLE, THEME_API, TOKEN} from "../../utils/constant";
import {replaceStyle} from "../../utils/helper";
import TEMPLATE from "../../template/index";
import "./Theme.css";
import axios from "axios";
import aBlue from "../../template/markdown/aBlue";
import blueK from "../../template/markdown/blueK";
import lv from "../../template/markdown/lv";
import mblue from "../../template/markdown/mblue";
import pink from "../../template/markdown/pink";
import qwPink from "../../template/markdown/qwPink";

@inject("content")
@inject("navbar")
@inject("view")
@observer
class Theme extends React.Component {
  changeTemplate = (item) => {
    const index = parseInt(item.key, 10);
    const {themeId, css} = this.props.content.themeList[index];
    this.props.navbar.setTemplateNum(index);

    // 更新style编辑器
    if (themeId === "custom") {
      this.props.content.setCustomStyle();
      // 切换自定义自动打开css编辑
      this.props.view.setStyleEditorOpen(true);
    } else {
      this.props.content.setStyle(css);
    }
  };

  toggleStyleEditor = () => {
    const {isStyleEditorOpen} = this.props.view;
    this.props.view.setStyleEditorOpen(!isStyleEditorOpen);
  };

  subscribeMore = () => {
    const w = window.open("about:blank");
    w.location.href = "https://preview.mdnice.com/themes";
  };

  componentDidMount = async () => {
    let themeList = null;
    try {

      themeList = [
        {themeId: "normal", name: "默认主题", css: TEMPLATE.normal},
        {themeId: "redTheme", name: "红排", css: TEMPLATE.red},
        {themeId: "Elihu", name: "雁西湖", css: TEMPLATE.xihu},
        {themeId: "yong", name: "嫩清", css: TEMPLATE.yong},
        {themeId: "wechat", name: "wechat", css: TEMPLATE.wechat},
        {themeId: "orangle", name: "橙新", css: TEMPLATE.orangle},
        {themeId: "aBlue", name: "全站蓝", css: TEMPLATE.aBlue},
        {themeId: "blueK", name: "蓝鲸", css: TEMPLATE.blueK},
        {themeId: "lv", name: "绿意", css: TEMPLATE.lv},
        {themeId: "bluePink", name: "绿意紫", css: TEMPLATE.bluePink},
        {themeId: "mblue", name: "科技蓝", css: TEMPLATE.mblue},
        {themeId: "pink", name: "姹紫", css: TEMPLATE.pink},
        {themeId: "qwPink", name: "蔷薇紫", css: TEMPLATE.qwPink},
        {themeId: "simple", name: "便签", css: TEMPLATE.note},

        {themeId: "custom", name: "自定义", css: TEMPLATE.custom},
      ];
      console.log("themeList=",themeList)

      this.props.content.setThemeList(themeList);
    } catch (err) {
      console.error("读取最新主题信息错误",err);
      this.props.content.setThemeList(themeList);
    }

    const templateNum = parseInt(window.localStorage.getItem(TEMPLATE_NUM), 10);

    // 主题样式初始化，属于自定义主题则从localstorage中读数据
    let style = "";
    if (templateNum === themeList.length - 1) {
      style = window.localStorage.getItem(STYLE);
    } else {
      if (templateNum) {
        const {css} = themeList[templateNum];
        style = css;
      } else {
        style = TEMPLATE.normal;
      }
    }
    this.props.content.setStyle(style);
    replaceStyle(MARKDOWN_THEME_ID, style);
  };

  render() {
    const {templateNum} = this.props.navbar;
    const {themeList} = this.props.content;

    const mdMenu = (
      <Menu onClick={this.changeTemplate}>
        {themeList.map((option, index) => (
          <Menu.Item key={index}>
            <div id={`nice-menu-theme-${option.themeId}`} className="nice-themeselect-theme-item">
              <span>
                <span className="nice-themeselect-theme-item-flag">
                  {templateNum === index && <span>{RIGHT_SYMBOL}</span>}
                </span>
                <span className="nice-themeselect-theme-item-name">{option.name}</span>
                {option.isNew && <span className="nice-themeselect-theme-item-new">new</span>}
              </span>
              <span className="nice-themeselect-theme-item-author">{option.authorName}</span>
            </div>
          </Menu.Item>
        ))}
        <Menu.Divider />
        <li className="nice-themeselect-menu-item">
          <div id="nice-menu-subscribe-more" className="nice-themeselect-theme-item" onClick={this.subscribeMore}>
            <span>
              <span className="nice-themeselect-theme-item-flag" />
              <span className="nice-themeselect-theme-item-name nice-menu-subscribe-more">订阅更多主题</span>
            </span>
          </div>
        </li>
        <Menu.Divider />

        <li className="nice-themeselect-menu-item">
          <div id="nice-menu-view-css" className="nice-themeselect-theme-item" onClick={this.toggleStyleEditor}>
            <span>
              <span className="nice-themeselect-theme-item-flag">
                {this.props.view.isStyleEditorOpen && <span>{RIGHT_SYMBOL}</span>}
              </span>
              <span className="nice-themeselect-theme-item-name">查看主题 CSS</span>
            </span>
          </div>
        </li>
      </Menu>
    );
    return (
      <Dropdown overlay={mdMenu} trigger={["click"]} overlayClassName="nice-overlay">
        <a id="nice-menu-theme" className="nice-menu-link" href="#">
          主题
        </a>
      </Dropdown>
    );
  }
}

export default Theme;
