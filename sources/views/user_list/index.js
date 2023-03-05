import axios from "axios";
import { options } from "less";
import { JetView } from "webix-jet";
import "../../styles/login_form.css";
import services from "./services";

let popup = webix.ui({
  view: "window",
  id: "popup_userList",
  position: "top",
  autowidth: true,
  autoheight: true,
  move: true,
  head: {
    view: "toolbar",
    cols: [
      { view: 'label', label: "Select Role" },
      {
        view: "button",
        type: "icon",
        icon: "wxi-close",
        width: 30,
        align: "right",
        click: function () {
          $$('popup_userList').hide();
        }
      }
    ],
  },
  body: {
    view: "datatable",
    id: "formSearchRole",
    scrollX: false,
    columns: [
      { id: "checkBox", header: '', checkValue: 'on', uncheckValue: 'off', template: "{common.checkbox()}", width: 40, },
      { id: "roleId", name: "roleId", sort: "string", header: "Film title", fillspace: 1 },
      { id: "roleName", name: "roleName", editor: "text", header: "Released", fillspace: 1 },
    ],
    data: services.popup_data(),
    on: {
      onDataUpdate: function (id) {
        services.checkBox_setValue(this.getItem(id));
      }
    }
  },
  select: true,
})

export default class UserForm extends JetView {
  config() {
    return {
      view: 'form',
      id: 'userSearchForm',
      name: 'userListForm',
      rows: [
        {
          height: 200,
          cols: [
            {
              view: "form",
              id: "searchform",
              scroll: false,
              elements: [
                {
                  rows: [
                    {
                      view: "text",
                      label: "Tên Khách Hàng",
                      id: "src_tenKhachHang",
                      labelPosition: "top"
                    },
                    {
                      cols: [
                        { view: "text", label: 'Role', name: "roleId", id: 'src_roleId', labelPosition: "top", readonly: true },
                        { view: "text", label: 'Role Name', name: "roleName", id: 'src_roleName', labelPosition: "top", readonly: true },
                        {
                          view: "button", type: "icon", icon: "wxi-search", width: 30, click: function () {
                            popup.show();
                          }
                        }
                      ]
                    },
                    {
                      cols: [
                        { view: "button", label: 'Export', click: function () { services.btnExport_click() } },
                        { view: "button", label: 'Search', click: function () { services.btnSearch_click() } },
                        { view: "button", label: 'Clear', click: function () { services.btnClear_click() } }
                      ]
                    }
                  ]
                }
              ],
            },
            {},
            {},
            {}
          ]
        },
        {
          cols: [
            {
              view: "datatable",
              id: "datatableUser",
              editable: true,
              scrollX: false,
              autoheight: true,
              select: true,
              columns: [
                { id: "maKh", header: "ID", sort: "text", fillspace: 0.2 },
                { id: "tenKh", header: ["Tên Khách Hàng", { content: "textFilter" }], fillspace: 1 },
                { id: "roleName", header: ["Tên Vai trò", { content: "textFilter" }], fillspace: 1 },
                { id: "mail", header: "Email", fillspace: 1 },
                { id: "phone", header: "Phone", fillspace: 1 },
                { id: "birthday", header: "Birthday", fillspace: 1 },
                { id: "diaChi", header: "Địa Chỉ", fillspace: 1 },
              ],
            },
          ]
        },

      ]

    }
  };
  init() {
    services.onload();
  }
}