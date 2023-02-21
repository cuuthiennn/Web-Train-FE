import { JetView } from "webix-jet";
import "../../styles/login_form.css";
import services from "./services";
const formHeader = () => ({
	view: "form",
	id: "formHeader",
	name: "formHeader",
	css: "formLogin",
	cols: [
		{
			rows: [
				{},
				{
					view: "label",
					label: "Login",
					css: "titleFormLogin"
				},
				{
					id: "avata",
					template: function (obj) {
						if (!obj.src)
							return `
                       <div class='box-upload-image'>
                         <img class="img-backgroundLogin" alt="" src='/img/logoAnhDev.jpg'>
                       </div>`;
					}
				},
				{
					view: "text",
					name: "UserName",
					width: 400,
					id: "UserName",
					label: "User Name", labelPosition: "top",
					placeholder: "User Name",
					invalidMessage: "A name is required",
					tooltip: "Client's name is " + "#value#"
				},
				{
					view: "text",
					type: "password",
					name: "Password",
					width: 400,
					id: "Password",
					label: "Pass Word", labelPosition: "top",
					placeholder: "Password",
					invalidMessage: "A name is required",
					tooltip: "Client's PassWord "
				},
				{
					cols: [
						{},
						{
							view: "button",
							value: "Login",
							name: "btnLogin",
							id: "btnLogin",
							width: 100,
							click: services.btnLogin_click
						},
						{
							view: "button",
							value: "Register",
							name: "btnRegister",
							id: "btnRegister",
							width: 100,
							click: () => {

							}
						},
						{}
					]
				},
				{}
			]
		},
	]
});

export default class loginFormView extends JetView {
	config() {
		return {
			view: "form",
			id: "formPage",
			name: "formPage",
			css: "loginBody invalid_login",
			cols: [
				{},
				formHeader(),
				{}
			]
		};
	}
	init() {
	}
}