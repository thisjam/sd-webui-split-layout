/*
 * @Author: SixGod_K
 * @Date: 2023-08-30 16:47:14
 * @LastEditors: kun
 * @LastEditTime: 2023-10-09 18:56:00
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

            txt2img_extra_tabs: getEle('#txt2img_extra_tabs'),
            img2img_extra_tabs: getEle('#img2img_extra_tabs'),
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

    moveRightMenu(eve){
       
        setTimeout(() => {    
            getEle('#context-menu').style.top = eve.pageY+'px'
            getEle('#context-menu').style.left =eve.pageX+'px'
        }, 50);
        

    }
    
    onScrollevent(top=220) {
        this.Doms.clone1=this.Doms.genaTxtbtn.cloneNode(true)  
        this.Doms.clone2=this.Doms.genaImgbtn.cloneNode(true)
        this.Doms.clone1.children[2].classList.add('secondary')
        this.Doms.clone2.children[2].classList.add('secondary')
        
        this.Doms.txtPreview.after(this.Doms.clone1)
        this.Doms.imgPreview.after(this.Doms.clone2)

        this.Doms.genaTxtbtn.addEventListener('contextmenu', (event)=> {    
          
           this.moveRightMenu(event)
        })
        this.Doms.genaImgbtn.addEventListener('contextmenu', (event)=> {    
          
            this.moveRightMenu(event)
         })
 
        window.addEventListener('scroll', ()=> {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      
        if (scrollTop > top) { 
            this.Doms.clone1.classList.add('sixgod-hide')
            this.Doms.clone2.classList.add('sixgod-hide')
            this.Doms.txtPreview.after(this.Doms.genaTxtbtn)
            this.Doms.imgPreview.after(this.Doms.genaImgbtn)
            
        }
        else if(scrollTop<top){
            this.Doms.clone1.classList.remove('sixgod-hide')
            this.Doms.clone2.classList.remove('sixgod-hide')
            this.Doms.txt2imgTools.before(this.Doms.genaTxtbtn)
            this.Doms.img2imgTools.before(this.Doms.genaImgbtn)
        }
      });
    }


    


    processTabsBtn(domstabs,parentId){
        let tabs=domstabs.children[0];//第一个div tabs    
        let textinput=tabs.querySelector('textarea');//第一个div tabs    
        let buttons = tabs.querySelectorAll(':scope>button');      
        let generantion=getEle(parentId).querySelector('.sixgod-rightslid-generantion') 
        buttons[0].classList.add('sixgod-hide')
        buttons.forEach(btn => {
            btn.onclick=(eve)=>{
                generantion.style.display='block'
                this.processTabsBtn(domstabs,parentId)         
                textinput.value=''
                updateInput(textinput)
            }            
        });

        if(buttons[0].classList.contains('selected')){
            buttons[0].classList.remove('selected')
            let event = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
            });
                    
            buttons[3].dispatchEvent(event);      
            setTimeout(() => {
                generantion.style.display='block'
                let newbuttons = tabs.querySelectorAll(':scope>button');      
                newbuttons[0].classList.add('sixgod-hide')           
            }, 200);
            
        }
       
    

    }

    
    processSildeLayout(domstabs,parentId) {
        //domstabs=txt2img_extra_tabs||img2img_extra_tabs
        let silder=document.createElement('div')
        silder.classList.add("sixgod-silder")
        
        //创建右侧悬浮窗
        let rightslid=document.createElement('div')
        rightslid.classList.add("sixgod-rightslid")
        silder.appendChild(rightslid)
        rightslid.appendChild(domstabs)

       
        let generantion=domstabs.children[1];
        generantion.className="sixgod-rightslid-generantion"
        getEle(parentId).appendChild(silder)
        getEle(parentId).appendChild(generantion)


        this.processTabsBtn(domstabs,parentId)
     
         

    }

    //处理别的插件做兼容 loartool
    processLoraTool() {
        // 监视元素
        const loraTool = document.getElementById('lora-context-menu');
        if(!loraTool) return
        const targetElement = document.getElementById('tab_txt2img');
       
        this.Doms.txt2img_extra_tabs.after(loraTool)
        
        const observer = new MutationObserver((mutationsList, observer)=> {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    if(targetElement.style.display==='none'){
                        this.Doms.img2img_extra_tabs.after(loraTool)                    
                    }
                    else{
                        this.Doms.txt2img_extra_tabs.after(loraTool)                      
                    }
                   
                }
            }
        });

        // 以上面的配置初始化观察者
        observer.observe(targetElement, { attributes: true, attributeFilter: ['style'] });

    }

   

    init() {
        this.loadNode(()=>{
            this.moveData();      
            this.addSaveSlideEve();
            this.onScrollevent();
            this.processSildeLayout(this.Doms.txt2img_extra_tabs,'#tab_txt2img')
            this.processSildeLayout(this.Doms.img2img_extra_tabs,'#tab_img2img')
            this.processLoraTool()
            
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