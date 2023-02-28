import services from './services.js';
import { JetView } from "webix-jet";

export default class RoleForm extends JetView {
    config() {
        return {
            view: 'form',
            id: 'roleForm',
            name: 'roleForm',
            rows: [
                {
                    cols: [
                        {
                            view: "datatable",
                            id: "datatableRole",
                            editable: true,
                            scrollX: false,
                            height: 400,
                            width: 645,
                            select: true,
                            columns: [
                                { id: "roleId", header: "ID", sort: "text", width: 50 },
                                { id: "roleName", header: ["Tên Vai Trò", { content: "textFilter" }], fillspace: 1, css: { "text-align": "center" } },
                                { id: "isuse", header: { text: "Hoạt Động", css: { "text-align": "center" } }, width: 100, css: { "text-align": "center" } },
                                { id: "description", header: { text: "Mô Tả", css: { "text-align": "center" } }, fillspace: 1 },
                            ],
                            data: [],
                            on: {
                                //onItemDblClick: () => $$('form1').bind('datatableRole')
                                onItemDblClick: function (id) {
                                    services.setValueToFormDetail(this.getItem(id.row));
                                }
                            }
                        },
                        {
                            view: "form",
                            id: "form1",
                            scroll: false,
                            autowidth: true,
                            height: 400,
                            elements: [
                                { view: "text", label: 'Mã', name: "roleId", id: 'id', readonly: true },
                                { view: "text", label: 'Tên Vai Trò', name: "roleName", id: "roleName1" },
                                { view: "textarea", label: 'Description', name: "description", id: "description_text", height: 100 },
                                { view: "switch", label: 'Hoạt Động', name: "isuse", id: "isActive", offLabel: "UnUsed", onLabel: "IsUse", value: 1 },
                                {
                                    cols: [
                                        { view: "button", label: "Save", type: "icon", icon: "mdi mdi-download", click: () => services.save() },
                                        { view: "button", label: "Clear", type: "icon", icon: "wxi-close-circle", click: () => services.btnClear_click() },
                                        { view: "button", id: "btn_delete", type: "icon", icon: "wxi-trash", label: "Delete", click: () => services.btnDelete_click() }
                                    ]
                                }
                            ],
                            rules: {
                                $all: webix.rules.isNotEmpty
                            },
                            elementsConfig: {
                                labelPosition: "top"
                            }
                        },
                    ]
                },
                {
                    cols: [
                        {
                            rows: [
                                {
                                    view: "chart",
                                    id: "chart_bar",
                                    type: "bar",
                                    value: "#soLuong#",
                                    label: "#soLuong#",
                                    barWidth: 30,
                                    radius: 5,
                                    //border: true,
                                    autoheight: true,
                                    //gradient:"falling",
                                    xAxis: {
                                        template: "#roleName#",
                                    },
                                    // yAxis: {
                                    //     start: 0,
                                    //     end: 10,
                                    //     step: 1,
                                    // },
                                    on: {
                                        onItemDblClick: function (item) {
                                            services.chartBarChangeView(this.getItem(item));
                                        }
                                    }
                                },
                                {
                                    template: "<div style='width:100%;text-align:center'>Thống Kê Vai Trò Trong Hệ Thống</div>",
                                    height: 30,
                                    borderless: true
                                }
                            ]
                        },
                        {
                            rows: [
                                {
                                    view: "chart",
                                    id: "chart_pie3D",
                                    type: "pie3D",
                                    value: "#count#",
                                    pieInnerText: "#count#",
                                    label: "#isUse#",
                                    autoheight: true,
                                },
                                {
                                    template: "<div style='width:100%;text-align:center'>Thống Kê Vai Trò</div>",
                                    height: 30,
                                    borderless: true
                                }
                            ]
                        }
                    ]
                }
            ]

        }
    };
    init() {
        services.onload();
    }
}