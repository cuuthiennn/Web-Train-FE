import { options } from "less";
import { JetView } from "webix-jet";
import services from "./services";

export default class UserForm extends JetView {
    config() {
        return {
            view: "form",
            id: "userform",
            cols: [
                {
                    view: "dataview",
                    id: "datatableUser",
                    editable: true,
                    scrollX: true,
                    select: true,
                    height: 656,
                    width: 650,
                    type: {
                        template: "<div id='template'><img class='image' src='../../../img/#image#'/><div id='tenKh' value='#tenKh#'>#tenKh#<div id='maKh' value='#maKh#''>Mã khách hàng: #maKh#</div><div id='isUse' value='#isUse#'>IsActive: #isUse#</div></div><div id='diaChi' value='#diaChi#'></div><div id='mail' value='#mail#'></div><div id='phone' value='#phone#'></div><div id='image' value='#image#'></div><div id='birthday' value='#birthday#'></div><div id='roleId' value='#roleId#'></div><div id='roleName' value='#roleName#'></div></div>",
                        width: 150,
                        height: 220,
                    },
                    on: {
                        onItemDblClick: function (id) {
                            services.setValueIntoForm(this.getItem(id))
                        }
                    },
                },
                {
                    cols: [
                        {
                            view: "form",
                            id: "formUser",
                            scroll: false,
                            //width: 500,
                            borderless: true,
                            elements: [
                                { view: "text", id: "userName", name: "tenKh", label: "Fist name", required: true, inputWidth: 399, labelWidth: 100 },
                                { view: "text", id: "userId", name: "maKh", value: "Read Only!", hidden: true },
                                { view: "text", id: "userImage", name: "image", hidden: true },
                                { view: "text", id: "userMail", name: "mail", label: "Mail", required: true, inputWidth: 399, labelWidth: 100 },
                                { view: "text", id: "userAddress", name: "diaChi", label: "Address", required: true, inputWidth: 399, labelWidth: 100 },
                                { view: "text", id: "userPhone", name: "phone", label: "Phone", required: true, inputWidth: 399, labelWidth: 100 },
                                {
                                    view: "text", label: "Birthday", id: "userBirthday", required: true, inputWidth: 399, labelWidth: 100, name: "userBirthday"
                                },
                                {
                                    view: "fieldset", id: "userRole", label: "Role", required: true, body: {
                                        cols: [
                                            {
                                                view: "richselect", id: "roleId", name: "roleId", options: "http://localhost:8888/api/role/richSelectData",
                                                on: {
                                                    onChange: function () {
                                                        services.slc_roleName($$("roleId").getValue());
                                                    }
                                                }
                                            },
                                            { view: "text", id: "roleName", name: "roleName", readonly: true },
                                        ]
                                    },
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
                        },
                        {
                            view: "form",
                            borderless: true,
                            width: 200,
                            rows: [
                                {
                                    view: "dataview",
                                    id: "imageForm",
                                    template: `<img src='../../../img/#image#'>`,
                                    height: 140,
                                    width: 200,
                                    borderless: true,
                                    align: "center,middle",
                                    scroll: false,
                                    type: {  // dimensions of each dataview item
                                        height: 300,
                                        width: 250
                                    },
                                },
                                {
                                    view: "uploader",
                                    value: "Upload file",
                                    id: "uploader",
                                    name: "files",
                                    link: "list1",
                                    upload: "https://docs.webix.com/samples/server/upload",
                                    on: {
                                        onFileUpload: function () {
                                            $$('imageForm').clearAll()
                                            var file_id = $$("uploader").files.getFirstId(); // getting the ID
                                            var avatar = $$("uploader").files.getItem(file_id).name; // getting properties
                                            var k = {
                                                image: avatar
                                            }
                                            $$("userImage").setValue(avatar);
                                            avatar = JSON.stringify(k);
                                            $$("imageForm").parse(avatar);
                                        }
                                    }
                                },
                                {
                                    view: "list",
                                    id: "list1",
                                    type: "uploader",
                                    autoheight: true,
                                    borderless: true
                                },
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