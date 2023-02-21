// views/window2.js
export default class AboutUs {
    isOpened = false;

    constructor({ id }) {
        this._id = id;
    }

    CLOSE_BUTTON = {
        view: 'button',
        width: 30,
        align: 'right',
        hotkey: 'esc',
        type: 'image',
        image: 'img/icon/close.png',
        click: () => {
            $$(this._id).hide();
        }
    };

    layout = () => ({
        view: "window",
        id: this._id,
        maxWidth: 800,
        maxHeight: 450,
        modal: true,
        width: this._popup_width,
        height: this._popup_height,
        position: 'center',
        move: true,
        resize: true,
        head: {
            view: 'toolbar',
            cols: [
                { width: 5 },
                { view: 'label', label: "About Us" },
                this.CLOSE_BUTTON
            ]
        },
        body: {
            cols: [
                {
					id: "logoAboutUs",
					template: function (obj) {
							return `
                       <div class='box-upload-image'>
                         <img class="img-backgroundLogin" alt="" src='/img/iconLogo.jpg'>
                       </div>`;
					}
				},
                {
                    rows:[
                        {
                            id:"facebook",
                            template: function(obj){
                                return `
                                <div>
                                <p>1* Xin chào các bạn học viên của <a href="https://www.facebook.com/AnhDevv/" target="_blank">AnhDev - Bùi Quốc Đạt </a><p>
                                <p>2* Cảm ơn các bạn đã tham gia khoá học của AnhDev<p>
                                <p>3* Đây là tài nguyên chương thiết kế giao diện người dùng<p>
                                <p>4* Tác giả: <a href="https://www.facebook.com/AnhDevv/" target="_blank">AnhDev - Bùi Quốc Đạt </a> <p>
                                <br>
                                <br>
                                contact me to: <br>
                                Facebook: <a href="https://www.facebook.com/AnhDevv/" target="_blank">Bùi Quốc Đạt</a>
                                </div>`; 
                            }
                        }
                    ]
                }
            ]
        }
    });

    drawPopup = () => {
        webix.ui(
            this.layout()
        );
        webix.extend($$(this._id), webix.ProgressBar);
    }

    showWindow() {
        if (!this.isOpened) {
            this.drawPopup();
            this.isOpened = true;
        };
        $$(this._id).show();
    };
    
    closeWindow() {
        $$(this._id).hide();
    }
}