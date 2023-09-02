/*
 * @Author: SixGod_K
 * @Date: 2023-08-30 16:47:14
 * @LastEditors: kun
 * @LastEditTime: 2023-09-02 12:56:53
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

            genaTxtbtn: getEle('#txt2img_generate_box'),
            genaImgbtn: getEle('#img2img_generate_box'),
            txt2imgTools: getEle('#txt2img_tools'),
            img2imgTools:getEle('#img2img_tools'),
            txtPreview: getEle('#image_buttons_txt2img'),
            imgPreview: getEle('#image_buttons_img2img'),
            clone1:null,
            clone2:null,
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
    
    onScrollevent(top=220) {
        this.Doms.clone1=this.Doms.genaTxtbtn.cloneNode(true)  
        this.Doms.clone2=this.Doms.genaImgbtn.cloneNode(true)
        this.Doms.clone1.children[2].classList.add('secondary')
        this.Doms.clone2.children[2].classList.add('secondary')
        this.Doms.txtPreview.after(this.Doms.clone1)
        this.Doms.imgPreview.after(this.Doms.clone2)
 
        window.addEventListener('scroll', ()=> {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollTop);
      
        if (scrollTop > top) { 
            this.Doms.clone1.classList.add('sixgod-hide')
            this.Doms.clone1.classList.add('sixgod-hide')
            this.Doms.txtPreview.after(this.Doms.genaTxtbtn)
            this.Doms.imgPreview.after(this.Doms.genaImgbtn)
            
        }
        else if(scrollTop<top){
            this.Doms.clone1.classList.remove('sixgod-hide')
            this.Doms.clone1.classList.remove('sixgod-hide')
            this.Doms.txt2imgTools.before(this.Doms.genaTxtbtn)
            this.Doms.img2imgTools.before(this.Doms.genaImgbtn)
        }
      });
    }
      

    init() {
        this.loadNode(()=>{
            this.moveData();      
            this.addSaveSlideEve();
            this.onScrollevent();
            
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

    let layout = new LayoutSplit();
    layout.init()
 
    
    
   

})