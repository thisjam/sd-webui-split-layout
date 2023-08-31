'''
Author: SixGod_K
Date: 2023-08-30 23:05:20
LastEditors: kun
LastEditTime: 2023-08-31 16:07:26
FilePath: \stable-diffusion-webui\extensions-builtin\sd-webui-split-layout\scripts\split-layout.py
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
defaultVal=None
 
def get_val():         
      try:     
          with open(file_path, 'r') as f:
               fisrtval=f.readline().strip()
               return  fisrtval
      except:
          return '51'
     
def set_val(val):  
     with open(file_path, 'w') as f:
          f.write(val)
          f.close()
 
defaultVal=get_val()
def on_ui_tabs():
     
    with gr.Blocks(analytics_enabled=False) as layout:   
          with gr.Row():
                with gr.Column(scale=4,min_width=100):
                  
                     inputSlider=gr.Slider(elem_id="sixgod-layout-slider",minimum=0, maximum=60, step=1, label="Layout_Width", value=float(defaultVal))
                     btnSave=gr.Button(value="save",elem_id='sixgod-layout-save',variant="primary")
                     btnSave.click(save,inputSlider,inputSlider)                   
                with gr.Column(scale=4,min_width=100,visible=False,variant=False): 
                     gr.Button(value=defaultVal,elem_id='sixgod-layout-default',visible=False)     
                                                    
    return [(layout, "split-layout", "split-layout")]


def save(text):
     set_val(str(text))
     return text
script_callbacks.on_ui_tabs(on_ui_tabs)