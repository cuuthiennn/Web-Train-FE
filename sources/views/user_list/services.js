import axios from "axios";

class services {
    onload = async () => {
        $$("datatableUser").clearAll();
        let { data: result } = await axios.get(`http://localhost:8888/api/user/getUserByIsUse?isUse=Y`);
        $$("datatableUser").parse(result);
        let { data: result1 } = await axios.get("http://localhost:8888/api/role/getRoleIdIsUse");

    }

    btnExport_click = async () => {
        let nameUser = $$('src_tenKhachHang').getValue().toUpperCase();
        let array_id = $$("src_roleId").getValue();
        axios({
            url: `http://localhost:8888/api/user/exportExcelUserList?tenKh=${nameUser}&arrayId=${array_id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'filename=User.xlsx'
            },
            responseType: 'blob',
        }).then((response) => {
            //tạo url cho data
            const url = window.URL.createObjectURL(new Blob([response.data]));
            //tạo thẻ <a> để truyền url
            const link = document.createElement('a');
            link.href = url;
            // tạo thuộc tính cho link khi click và chỉ định file sẽ được tải
            link.setAttribute('download', 'User.xlsx');
            document.body.appendChild(link);
            link.click();
        })
            .catch((error) => console.log(error));
    };

    btnClear_click = () => {
        $$('src_roleId').setValue('');
        $$('src_tenKhachHang').setValue('');
        $$('src_roleName').setValue('')
    };

    btnSearch_click = async () => {
        let nameUser = $$('src_tenKhachHang').getValue().toUpperCase();
        let array_id = $$("src_roleId").getValue();
        $$("datatableUser").clearAll();
        let { data: result } = await axios.get(`http://localhost:8888/api/user/searchUser?tenKh=${nameUser}&arrayId=${array_id}`);
        $$("datatableUser").parse(result);
        this.btnClear_click();
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
        $$("formSearchRole").clearAll();
        let { data: result } = await axios.get("http://localhost:8888/api/role/getRoleIdIsUse");
        $$("formSearchRole").parse(result);
    }
}
export default new services();