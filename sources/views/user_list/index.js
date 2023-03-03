import { options } from "less";
import { JetView } from "webix-jet";
import "../../styles/login_form.css";
import services from "./services";

let popup = webix.ui({
  view: "window",
  id: "popup_userList",
  position: "top",
  // maxWidth: 800,
  // maxHeight: 450,
  width:500,
  height:350,
  // move: true,
  // resize: true,
  head: {
    view: "toolbar",
    cols: [
      {},
      { view: 'label', label: "ROLE" },
      {
        view: "button",
        type: "icon",
        icon: "wxi-close",
        width: 20,
        align: "right",
        click: function () {
          $$('popup_userList').hide();
        }
      }
    ],
  },
  body: {
    
  },
  select: true
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
                        {
                          view: "richselect", label: 'Role', name: "roleId", id: 'src_roleId', labelPosition: "top",
                          options: "http://localhost:8888/api/role/getRoleIdIsUse",
                          on: {
                            onChange: function () {
                              services.slc_roleName($$("src_roleId").getValue());
                            }
                          }
                        },
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