import axios from "axios";

class services {
    onload = async () => {
        $$("datatableUser").clearAll();
        let { data: result } = await axios.get(`http://localhost:8888/api/user/getUserByIsUse?isUse=${'Y'}`);
        $$("datatableUser").parse(result);
    }

    btnExport_click = async () => {
        swal("Nhập Tên File:", {
            content: "input",
        })
            .then((result) => {
                if (result) {
                    const workbook = new ExcelJS.Workbook();
                    workbook.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
                    workbook.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });
                }
            });

    };

    btnClear_click = () => {
        $$('src_roleId').setValue('');
        $$('src_tenKhachHang').setValue('');
        $$('src_roleName').setValue('')
    };

    btnSearch_click = async () => {
        let userName = $$('src_tenKhachHang').getValue();
        let roleName = $$('src_roleName').getValue();
        if (userName == '' && roleName == '') {
            $$("datatableUser").clearAll();
            this.btnClear_click();
        } else if (userName == '') {
            let { data: result } = await axios.get(`http://localhost:8888/api/user/getUserisUseByRoleName?roleName=${roleName}`);
            $$("datatableUser").clearAll();
            this.btnClear_click();
            $$("datatableUser").parse(result);
        } else if (userName != '') {
            let { data: result } = await axios.get(`http://localhost:8888/api/user/getUserByName?tenKh=${userName}`);
            $$("datatableUser").clearAll();
            this.btnClear_click();
            $$("datatableUser").parse(result);
        }
    }

    getRoleId = async () => {
        let { data: result } = await axios.get("http://localhost:8888/api/role/getRoleIdIsUse");
        return result;

    }

    slc_roleName = async (value) => {
        let { data: result } = await axios.get("http://localhost:8888/api/role/getAllRole");
        for (let i = 0; i < result.length; i++) {
            if (result[i].roleId == value) {
                $$("src_roleName").setValue(result[i].roleName);
                break;
            } else {
                $$("src_roleName").setValue('');
            }
        }
    }
}
export default new services();