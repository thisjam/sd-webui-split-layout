/*
 * @Author: SixGod_K
 * @Date: 2023-08-30 16:47:14
 * @LastEditors: kun
 * @LastEditTime: 2023-08-31 16:19:08
 * @FilePath: \stable-diffusion-webui\extensions-builtin\sd-webui-split-layout\javascript\split-layout.js
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


    initCss() {
         
        this.setCss(this.Doms.txtleft)
        this.setCss(this.Doms.imgleft)
    };

    addSaveSlideEve() {
        let delfaultval = getEle('#sixgod-layout-default').innerHTML;
        this.setWidthValue(delfaultval);
        this.Doms.btnSave.onclick = ()=> {
            this.setWidthValue(this.Doms.sliderInput.value) 
             
            console.log(this.Doms.sliderInput.value);
        };
    };

    setCss(ele) {
      
        ele.classList.add('sixgod-left-layout')
        ele.parentNode.classList.add("nowarp")
        ele.parentNode.children[1].classList.add('sixgod-right-layout')
    };

    setWidthValue(val) {
        this.Doms.txtleft.style.width = val + '%';
        this.Doms.imgleft.style.width = val + '%';
        
    };

    init() {
        this.loadNode(()=>{
            this.moveData();
            this.initCss();
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