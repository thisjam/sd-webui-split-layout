/*
 * @Author: SixGod_K
 * @Date: 2023-08-30 16:47:14
 * @LastEditors: Six_God_K
 * @LastEditTime: 2024-05-03 14:53:10
 * @FilePath: \sd-webui-split-layout\javascript\split-layout.js
 * @Description: 
 * 
 */

class LayoutSplit {
    constructor() {
        this.Doms = null

    };
    loadNode(callBack) {
        let doms = {
            tab: getEle('#tab_split-layout'),
            txtleft: getEle('#txt2img_settings'),
            imgleft: getEle('#img2img_settings'),
            btnSave: getEle('#sixgod-layout-save'),
            sliderInput: getEle("#sixgod-layout-slider input"),
            sliderInput2: getEle("#sixgod-layout-slider2 input"),
            txt2imgarea: getEle('#txt2img_gallery'),
            img2imgarea: getEle('#img2img_gallery'),

            genaTxtbtn: getEle('#txt2img_generate_box'),
            genaImgbtn: getEle('#img2img_generate_box'),
            txt2imgTools: getEle('#txt2img_tools'),
            img2imgTools: getEle('#img2img_tools'),
            txtPreview: getEle('#image_buttons_txt2img'),
            imgPreview: getEle('#image_buttons_img2img'),

            txt2img_extra_tabs: getEle('#txt2img_extra_tabs'),
            img2img_extra_tabs: getEle('#img2img_extra_tabs'),
            clone1: null,
            clone2: null,
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
        // let widthval = getEle('#sixgod-layout-width').innerHTML;
        // let heightval = getEle('#sixgod-layout-height').innerHTML;
        // console.log(widthval, heightval);
        // this.setWidthValue(widthval, heightval);
        // this.Doms.btnSave.onclick = () => {
        //     this.setWidthValue(this.Doms.sliderInput.value, this.Doms.sliderInput2.value)
        // };

        let div = document.createElement('div')  
        div.classList.add("sixgod-slider-layout-container")
        let inputWitdh=this.createInputRange(true,div)
        let inputHeight=this.createInputRange(false,div)

        let p = document.createElement('p')  
        let btn = document.createElement('button') 
        btn.innerHTML='保存' 
         
        btn.addEventListener('click', () => {
            localStorage.setItem('sixgod-slider-layout',JSON.stringify([inputWitdh.value,inputHeight.value]))
            this.setWidthValue(inputWitdh.value, inputHeight.value)
        })
        this.setWidthValue(inputWitdh.value, inputHeight.value)
 
        div.appendChild(p)
        p.appendChild(btn)
        this.Doms.tab.appendChild(div)
       
      
    };

    createInputRange(iswidth,parentDom){      
        let p = document.createElement('p')
        let labelTitle = document.createElement('label')
        labelTitle.innerHTML=iswidth?'宽度：':'高度：';
        let input = document.createElement('input')
        input.type = 'range'
        input.min = 100
        input.max = iswidth?1600:800;
        let cache=localStorage.getItem('sixgod-slider-layout')
        if(cache){
            input.value=JSON.parse(cache)[iswidth?0:1]
        }
        else{
           input.value=input.max
           localStorage.setItem('sixgod-slider-layout',JSON.stringify([1600,800]))
        }    
        let labelNum = document.createElement('label')
        labelNum.innerHTML=input.value  
        p.appendChild(labelTitle)
        p.appendChild(input)
        p.appendChild(labelNum)
        parentDom.appendChild(p)
        input.addEventListener('input', function() {
            labelNum.innerHTML= input.value  ;
        });
        return input
    }



    setWidthValue(widthval, heightval) {
        this.Doms.txtleft.parentNode.style.gridTemplateColumns = `${widthval}px 16px 1fr`;
        this.Doms.imgleft.parentNode.style.gridTemplateColumns = `${widthval}px 16px 1fr`;
        this.Doms.txt2imgarea.style.height = `${heightval}px`;
        this.Doms.img2imgarea.style.height = `${heightval}px`;

    };

    moveRightMenu(eve) {

        setTimeout(() => {
            getEle('#context-menu').style.top = eve.pageY + 'px'
            getEle('#context-menu').style.left = eve.pageX + 'px'
        }, 50);


    }

    onScrollevent(top = 220) {
        this.Doms.clone1 = this.Doms.genaTxtbtn.cloneNode(true)//div
        this.Doms.clone2 = this.Doms.genaImgbtn.cloneNode(true)//div
   
        let btn_txt2img_generate=this.Doms.clone1.querySelector('#txt2img_generate')
        let btn_img2img_generate=this.Doms.clone2.querySelector('#img2img_generate')
    
        btn_txt2img_generate.classList.add('secondary')
        btn_img2img_generate.classList.add('secondary')
        btn_txt2img_generate.disabled = true;
        btn_img2img_generate.disabled = true;
       
    
        this.Doms.txtPreview.after(this.Doms.clone1)
        this.Doms.imgPreview.after(this.Doms.clone2)

        this.Doms.genaTxtbtn.addEventListener('contextmenu', (event) => {

            this.moveRightMenu(event)
        })
        this.Doms.genaImgbtn.addEventListener('contextmenu', (event) => {

            this.moveRightMenu(event)
        })
        let btnRect= this.Doms.genaTxtbtn.getBoundingClientRect();
  
        top=btnRect.top+btnRect.height
  
        window.addEventListener('scroll', () => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;    
    
            if (scrollTop > top) {
                //超过
                this.Doms.clone1.classList.add('sixgod-hide')
                this.Doms.clone2.classList.add('sixgod-hide')
                this.Doms.txtPreview.after(this.Doms.genaTxtbtn)
                this.Doms.imgPreview.after(this.Doms.genaImgbtn)

            }
            else if (scrollTop < top) {
                this.Doms.clone1.classList.remove('sixgod-hide')
                this.Doms.clone2.classList.remove('sixgod-hide')
                this.Doms.txt2imgTools.before(this.Doms.genaTxtbtn)
                this.Doms.img2imgTools.before(this.Doms.genaImgbtn)
            }
        });
    }





    processTabsBtn(domstabs, parentId) {
        let tabs = domstabs.children[0];//第一个div tabs    
        let generantion = getEle(parentId).querySelector('.sixgod-rightslid-generantion')
        let buttons = tabs.querySelectorAll(':scope>button');    
        StyleObserver(generantion, 'none', 'block')    
        this.btnsEvent(domstabs)
        buttons[3].click()
    }

    btnsEvent(domstabs) {
        let tabs = domstabs.children[0];//第一个div tabs    
        let textinput = tabs.querySelector('input');//第一个div tabs    
        let buttons = tabs.querySelectorAll(':scope>button');  
        buttons.forEach(btn => {
            btn.onclick = (eve) => {
                this.btnsEvent(domstabs)
                // textinput.value = ''
                // textinput&&updateInput(textinput)
                buttons[0].classList.add("sixgod-hide")
            
            }    
        }) 
        for (let index = 0; index < 100; index++) {
          setTimeout(() => {
            tabs.children[0].classList.add("sixgod-hide")       
          }, 10);
            
        }
         
    }


    processSildeLayout(domstabs, parentId) {

        //domstabs=txt2img_extra_tabs||img2img_extra_tabs
        let silder = document.createElement('div')
        silder.classList.add("sixgod-silder")

        //创建右侧悬浮窗
        let rightslid = document.createElement('div')
        rightslid.classList.add("sixgod-rightslid")
        silder.appendChild(rightslid)
        rightslid.appendChild(domstabs)

        //参数面板
        let generantion = domstabs.children[1];

        generantion.className = "sixgod-rightslid-generantion"
        getEle(parentId).appendChild(silder)
        getEle(parentId).appendChild(generantion)

        this.processTabsBtn(domstabs, parentId)




    }

    //处理别的插件做兼容 loartool
    processLoraTool() {
        // 监视元素
        const loraTool = document.getElementById('lora-context-menu');
        if (!loraTool) return
        const targetElement = document.getElementById('tab_txt2img');

        this.Doms.txt2img_extra_tabs.after(loraTool)

        const observer = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    if (targetElement.style.display === 'none') {
                        this.Doms.img2img_extra_tabs.after(loraTool)
                    }
                    else {
                        this.Doms.txt2img_extra_tabs.after(loraTool)
                    }

                }
            }
        });

        // 以上面的配置初始化观察者
        observer.observe(targetElement, { attributes: true, attributeFilter: ['style'] });

    }



    init() {
        this.loadNode(() => {
            this.moveData();
            this.addSaveSlideEve();
            this.onScrollevent();
            this.processSildeLayout(this.Doms.txt2img_extra_tabs, '#tab_txt2img')
            this.processSildeLayout(this.Doms.img2img_extra_tabs, '#tab_img2img')
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


function StyleObserver(element, statu1, statu2) {
    var observer = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(function (mutation) {
            if (mutation.attributeName === 'style') {

                var display = window.getComputedStyle(element).display;
                if (display === statu1|| display == '') {
                    element.style.display = statu2;
                }
            }
        });
    });

    // 配置要监听的 mutation
    var config = { attributes: true, attributeOldValue: true, attributeFilter: ['style'] };

    // 开始监听
    observer.observe(element, config);

}






onUiLoaded(async () => {

    let layout = new LayoutSplit();
    layout.init()


})