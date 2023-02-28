import axios from "axios";
import swal from 'sweetalert';


class services {
    onload = async () => {
        $$("datatableRole").clearAll();
        $$("chart_bar").clearAll();
        $$("chart_pie3D").clearAll();
        let { data: result } = await axios.get("http://localhost:8888/api/role/getAllRole");
        $$("datatableRole").parse(result);
        $$("chart_bar").load("http://localhost:8888/api/role/getCountRole");
        $$("chart_pie3D").load("http://localhost:8888/api/role/countRoleIsUse");
    }

    save = async () => {
        let data = {
            roleId: $$('id').getValue() === '' ? 0 : $$('id').getValue(),
            roleName: $$('roleName1').getValue(),
            isuse: $$('isActive').getValue() === 1 ? "Y" : "N",
            image: '',
            description: $$('description_text').getValue()

        }
        if (data.roleName != '') {
            let { data: response } = await axios.post("http://localhost:8888/api/role/saveOrUpdateRole", data);
            if (response.success) {
                swal({
                    icon: 'success',
                    title: 'Save is successfully'
                })
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
    };

    btnClear_click = () => {
        $$('id').setValue('');
        $$('roleName1').setValue('');
        $$('isActive').setValue(1);
        $$('description_text').setValue('');
    };

    setValueToFormDetail = async (object) => {
        $$('id').setValue(object.roleId);
        $$('roleName1').setValue(object.roleName);
        $$('description_text').setValue(object.description);
        $$('isActive').setValue(object.isuse === "Y" ? 1 : 0);
        let { data: result } = await axios.get(`http://localhost:8888/api/user/getUserisUseByRoleName?roleName=${object.roleName}`);
        console.log(result.length);
        if (result.length == 0) {
            $$("btn_delete").enable();
            
        } else {
            $$("btn_delete").disable();
        }
    };

    btnDelete_click = async () => {
        let roleId = $$('id').getValue();
        if (roleId != '') {
            swal({
                title: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        let { data: response } = await axios.delete(`http://localhost:8888/api/role/deleteRole?roleId=${roleId}`);
                        if (response.success) {
                            swal({
                                icon: 'success',
                                title: 'Delete is successfully'
                            })
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

    chartBarChangeView = async (item) => {
        window.location.assign("http://localhost:8081/#!/top/user_list");
        let { data: result } = await axios.get(`http://localhost:8888/api/user/getUserisUseByRoleName?roleName=${item.roleName}`);
        console.log(result);
        $$("datatableUser").clearAll();
        $$("datatableUser").parse(result);
    }

}
export default new services();