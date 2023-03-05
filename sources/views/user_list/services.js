import axios from "axios";

class services {
    onload = async () => {
        $$("datatableUser").clearAll();
        let { data: result } = await axios.get(`http://localhost:8888/api/user/getUserByIsUse?isUse=Y`);
        $$("datatableUser").parse(result);
        this.popup_data();
    }

    btnExport_click = async () => {
        swal("Nhập Tên File:", {
            content: "input",
        })
            .then((result) => {
                if (result) {
                    // const workbook = new ExcelJS.Workbook();
                    // workbook.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
                    // workbook.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });
                    alert(result + ".xlsz");
                }
            });

    };

    btnClear_click = () => {
        $$('src_roleId').setValue('');
        $$('src_tenKhachHang').setValue('');
        $$('src_roleName').setValue('')
    };

    btnSearch_click = async () => {
        let nameUser = $$('src_tenKhachHang').getValue().toUpperCase();
        let array_id = $$("src_roleId").getValue();
        if (nameUser == '' && array_id == '') {
            this.onload();
        } else {
            $$("datatableUser").clearAll();
            let { data: result } = await axios.get(`http://localhost:8888/api/user/searchUser?tenKh=${nameUser}&arrayId=${array_id}`);
            $$("datatableUser").parse(result);
            this.btnClear_click();  
        }
    }

    checkBox_setValue = (obj) => {
        if (obj.checkBox == 'on') {
            if ($$("src_roleId").getValue() == '' && $$("src_roleName").getValue() == '') {
                $$("src_roleId").setValue(obj.roleId);
                $$("src_roleName").setValue(obj.roleName);
            }
            else {
                $$("src_roleId").setValue($$("src_roleId").getValue() + "," + obj.roleId);
                $$("src_roleName").setValue($$("src_roleName").getValue() + "," + obj.roleName);
            }
        } else if (obj.checkBox == 'off') {
            let array_id = $$("src_roleId").getValue();
            let array_name = $$("src_roleName").getValue();
            //convert String to array
            array_id = array_id.split(",");
            array_name = array_name.split(",");
            // remove column 'off'
            array_id = array_id.filter(item => item != obj.roleId);
            array_name = array_name.filter(item => item != obj.roleName);
            // set new value
            $$('src_roleId').setValue('');
            $$('src_roleName').setValue('')
            $$("src_roleId").setValue(array_id.toString());
            $$("src_roleName").setValue(array_name.toString());
        }
    }

    popup_data = async () => {
        let { data: result } = await axios.get("http://localhost:8888/api/role/getRoleIdIsUse");
        return result;
    }
}
export default new services();