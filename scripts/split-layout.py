'''
Author: SixGod_K
Date: 2023-08-30 23:05:20
LastEditors: kun
LastEditTime: 2023-09-01 01:14:11
FilePath: \stable-diffusion-webui\extensions\sd-webui-split-layout\scripts\split-layout.py
Description: 

'''
 
import gradio as gr
from pathlib import Path
from modules import script_callbacks, shared
import json
import os

# Webui root path
# ROOT_DIR = Path().absolute()
# 获取当前文件的路径
current_path = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(current_path, 'val.txt')
 
 
def get_val():         
      try:     
          with open(file_path, 'r') as f:
               fisrtval=f.readline().strip().split(',')
               return  fisrtval
      except:
          return [320,240]
     
def set_val(val):  
     with open(file_path, 'w') as f:
          f.write(val)
          f.close()
 

def on_ui_tabs():
    defaultVal=get_val() 
    with gr.Blocks() as layout:   
          with gr.Row():
                with gr.Column(scale=4,min_width=100):
                  
                     inputSlider=gr.Slider(elem_id="sixgod-layout-slider",minimum=320, maximum=1600, step=1, label="leftwidth", value=float(defaultVal[0]))
                     inputSlider2=gr.Slider(elem_id="sixgod-layout-slider2",minimum=240, maximum=800, step=1, label="imgheigh", value=float(defaultVal[1]))
                     btnSave=gr.Button(value="save",elem_id='sixgod-layout-save',variant="primary")
                     btnSave.click(save,[inputSlider,inputSlider2],[inputSlider,inputSlider2])                   
                with gr.Column(scale=4,min_width=100,visible=False,variant=False): 
                     gr.Button(value=defaultVal[0],elem_id='sixgod-layout-width',visible=False)     
                     gr.Button(value=defaultVal[1],elem_id='sixgod-layout-height',visible=False)                                 
    return [(layout, "split-layout", "split-layout")]


def save(width,imgheight):
     set_val(str(width)+','+str(imgheight))
     return [width,imgheight]
script_callbacks.on_ui_tabs(on_ui_tabs)