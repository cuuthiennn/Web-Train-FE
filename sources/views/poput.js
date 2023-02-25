import { JetView } from "webix-jet";

export default class Poput extends JetView {
    config() {
        return {
            view: 'form',
            id: 'poputForm',
            name: 'poputForm',
            elements: [
                {},
                {
                    view: "button",
                    label: "Click Here!",
                    width: 300,
                    click: function () {
                        webix.ui({
                            view: "popup",
                            height: 100,
                            width: 100,
                            head:"My Window",
                            body: {
                                template: "HOLA!",
                            },
                            select: true,
                            position:"top",
                        }).show()
                    }
                },
                {},
            ]
        }
    }
}