import axios from "axios";
class services {
    onload = async () => {
        let { data: result } = await axios.get("http://localhost:8888/api/user/getAllUser");
        $$('datatableUser').parse(result);
    }
    setValueIntoForm = async (obj) => {
        $$("userName").setValue(obj.tenKh);
        $$("userId").setValue(obj.maKh);
        $$("userMail").setValue(obj.mail);
        $$("userAddress").setValue(obj.diaChi);
        $$("userPhone").setValue(obj.phone);
        $$("userBirthday").setValue(obj.birthday);
        $$("roleId").setValue(obj.roleId);
        $$("roleName").setValue(obj.roleName);
        $$("isActive").setValue(obj.isUse === "Y" ? 1 : 0);
        $$("userImage").setValue(obj.image);
        let avatar = {
            image: $$("userImage").getValue()
        }
        $$("imageForm").clearAll();
        $$("imageForm").parse(avatar);

    }
    btnSave_click = async () => {
        let data = {
            maKh: $$("userId").getValue() === "Read Only!" ? 0 : $$("userId").getValue(),
            tenKh: $$("userName").getValue(),
            diaChi: $$("userAddress").getValue(),
            mail: $$("userMail").getValue(),
            phone: $$("userPhone").getValue(),
            birthday: $$("userBirthday").getValue(),
            isUse: $$("isActive").getValue() === 1 ? "Y" : "N",
            roleId: $$("roleId").getValue(),
            roleName: $$("roleName").getValue(),
            image: $$("userImage").getValue(),
        }

        console.log(data);
        if (data.tenKh != '') {
            let { data: response } = await axios.post("http://localhost:8888/api/user/saveOrUpdateUser", data);
            if (response.success) {
                swal({
                    icon: 'success',
                    title: 'Save is successfully'
                })
                $$("datatableUser").clearAll();
                this.onload();
                this.btnClear_click();
            } else {
                swal(
                    {
                        icon: 'error',
                        title: 'Save isn`t successfully'
                    }
                )
                this.btnClear_click();
            }
        }

    }
    btnClear_click = () => {
        $$("userName").setValue('');
        $$("userId").setValue("Read Only!");
        $$("userMail").setValue('');
        $$("userAddress").setValue('');
        $$("userPhone").setValue('');
        $$("userBirthday").setValue('');
        $$("roleId").setValue('');
        $$("roleName").setValue('');
        $$("isActive").setValue(1);
        $$("imageForm").clearAll();
    }
    btnDelete_click = () => {
        let maKh = $$("userId").getValue();
        if (maKh != "Read Only!") {
            swal({
                title: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        let { data: response } = await axios.delete(`http://localhost:8888/api/user/deleteUser?maKh=${maKh}`);
                        if (response.success) {
                            swal({
                                icon: 'success',
                                title: 'Delete is successfully'
                            })
                            $$("datatableUser").clearAll();
                            this.onload();
                            this.btnClear_click();
                        } else {
                            swal(
                                {
                                    icon: 'error',
                                    title: 'Delete isn`t successfully'
                                }
                            )
                            this.btnClear_click();
                        }
                    }
                });
        }
    }

    slc_roleName = async (value) => {
        let { data: result } = await axios.get("http://localhost:8888/api/role/getAllRole");
        for (let i = 0; i < result.length; i++) {
            if (result[i].roleId == value) {
                $$("roleName").setValue(result[i].roleName);
                break;
            } else {
                $$("roleName").setValue('');
            }
        }
    }
}
export default new services();