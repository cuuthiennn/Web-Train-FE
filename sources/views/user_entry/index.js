import { options } from "less";
import { JetView } from "webix-jet";
import "../../styles/login_form.css";
import services from "./services";

export default class UserForm extends JetView {
    config() {
        return {
            view: "form",
            id: "userform",
            cols: [
                {
                    view: "datatable",
                    id: "datatableUser",
                    editable: true,
                    scrollX: false,
                    autoheight: true,
                    select: true,
                    columns: [
                        { id: "maKh", header: { text: "ID", css: { "text-align": "center" } }, css: { "text-align": "center" }, sort: "text", fillspace: 0.1 },
                        { id: "tenKh", header: { text: "Tên Khách Hàng", css: { "text-align": "center" } }, css: { "text-align": "center" }, fillspace: 1 },
                        { id: "roleName", header: { text: "Tên Vai trò", css: { "text-align": "center" } }, css: { "text-align": "center" }, fillspace: 1 },
                        { id: "isUse", header: { text: "Acctive", css: { "text-align": "center" } }, css: { "text-align": "center" }, fillspace: 0.2 },
                    ],
                    on: {
                        onItemDblClick: function (id) {
                            services.setValueIntoForm(this.getItem(id.row));
                        }
                    }
                },
                {
                    view: "form",
                    id: "formUser",
                    scroll: false,
                    autoheight: true,
                    width: 500,
                    elements: [
                        { view: "text", id: "userName", name: "tenKh", label: "Fist name", required: true, inputWidth: 400, labelWidth: 100 },
                        { view: "text", id: "userId", name: "maKh", label: "ID User", inputWidth: 400, labelWidth: 100, value: "Read Only!", hidden: true },
                        { view: "text", id: "userMail", name: "mail", label: "Mail", required: true, inputWidth: 400, labelWidth: 100 },
                        { view: "text", id: "userAddress", name: "diaChi", label: "Address", required: true, inputWidth: 400, labelWidth: 100 },
                        { view: "text", id: "userPhone", name: "phone", label: "Phone", required: true, inputWidth: 400, labelWidth: 100 },
                        {
                            view: "text", label: "Birthday", id: "userBirthday"
                            /* view: "daterangepicker", id: "userBirthday", label: "Birthday", height: 50, suggest: {
                                view: "daterangesuggest",
                                // daterangesuggest properties
                                body: {
                                    // daterange properties
                                    calendarCount: 1,
                                    icons: false,
                                    timepicker: true
                                }
                            } */, required: true, inputWidth: 400, labelWidth: 100, name: "userBirthday"
                        },
                        {
                            view: "fieldset", id: "userRole", label: "Role", body: {
                                cols: [
                                    {
                                        view: "richselect", id: "roleId", name: "roleId", options: "http://localhost:8888/api/role/getRoleIdIsUse",
                                        on: {
                                            onChange: function () {
                                                services.slc_roleName($$("roleId").getValue());
                                            }
                                        }
                                    },
                                    { view: "text", id: "roleName", name: "roleName", readonly: true }
                                ]
                            }, required: true, width: 300
                        },
                        { view: "switch", label: 'Hoạt Động', name: "isuse", id: "isActive", offLabel: "UnUsed", onLabel: "IsUse", value: 1 },
                        {
                            cols: [
                                { view: "button", label: "Save", type: "icon", icon: "mdi mdi-download", click: () => services.btnSave_click() },
                                { view: "button", label: "Clear", type: "icon", icon: "wxi-close-circle", click: () => services.btnClear_click() },
                                { view: "button", type: "icon", icon: "wxi-trash", label: "Delete", click: (id) => services.btnDelete_click() }
                            ]
                        }
                    ]
                }
            ]


        }
    }
    init() {
        services.onload();
    }
};