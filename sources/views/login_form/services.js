class services {

    account = {
        userName: "AnhDev",
        passWord: "123"
    };
    checkLogin = () =>{
        let inValUserName = $$("UserName").getValue();
        let inValUserPassWord = $$("Password").getValue();
        if(this.account.userName === inValUserName && this.account.passWord === inValUserPassWord){
            return true;
        }else{
            return false;
        }
    };
    btnLogin_click = () => {
        if(this.checkLogin()){
            window.location.assign("http://localhost:8081/#!/top/start");
        } else {
        }
    }
}
export default new services();