/*
 * @Author: SixGod_K
 * @Date: 2023-08-30 16:47:14
 * @LastEditors: kun
 * @LastEditTime: 2023-09-01 01:07:37
 * @FilePath: \stable-diffusion-webui\extensions\sd-webui-split-layout\javascript\split-layout.js
 * @Description: 
 * 
 */

class LayoutSplit {
    constructor() {
        this.Doms = null
       
    };
    loadNode(callBack) {
        let doms = {
            txtleft: getEle('#txt2img_settings'), 
            imgleft: getEle('#img2img_settings'),   
            btnSave: getEle('#sixgod-layout-save'),
            sliderInput:getEle("#sixgod-layout-slider input"),
            sliderInput2:getEle("#sixgod-layout-slider2 input"),
            txt2imgarea: getEle('#txt2img_gallery'),
            img2imgarea: getEle('#img2img_gallery'),
        }
        this.Doms = doms
        callBack && callBack()

    };

 

    moveData() {
        let prompt1 = getEle('#oldsix-prompt1')
        let prompt2 = getEle('#oldsix-prompt2')
       
        if (!prompt1 || !prompt2) return
        this.Doms.txtleft.insertAdjacentElement('afterbegin', prompt1)
        this.Doms.imgleft.insertAdjacentElement('afterbegin', prompt2)
     
    };


   

    addSaveSlideEve() {
        let widthval = getEle('#sixgod-layout-width').innerHTML;
        let heightval = getEle('#sixgod-layout-height').innerHTML;
        console.log(widthval,heightval);
        this.setWidthValue(widthval,heightval);
        this.Doms.btnSave.onclick = ()=> {
            this.setWidthValue(this.Doms.sliderInput.value,this.Doms.sliderInput2.value) 
        };
    };

   

    setWidthValue(widthval,heightval) {
        this.Doms.txtleft.parentNode.style.gridTemplateColumns  = `${widthval}px 16px 1fr`;
        this.Doms.imgleft.parentNode.style.gridTemplateColumns  = `${widthval}px 16px 1fr`;

        this.Doms.txt2imgarea.style.height  = `${heightval}px`;
        this.Doms.img2imgarea.style.height  = `${heightval}px`; 
        
    };

    init() {
        this.loadNode(()=>{
            this.moveData();
          
            this.addSaveSlideEve();
           
        })
    }

 
}



function getEle(key) {
    return gradioApp().querySelector(key)
}
function getEleAll(key) {
    return gradioApp().querySelectorAll(key)
}

onUiLoaded(async () => {

 
    setTimeout(() => {
        let layout = new LayoutSplit();
        layout.init()
        
    }, 200);

})