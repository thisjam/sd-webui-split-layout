'''
Author: SixGod_K
Date: 2023-08-30 23:05:20
LastEditors: Six_God_K
LastEditTime: 2024-05-03 13:32:01
FilePath: \webui\extensions\sd-webui-split-layout\scripts\split-layout.py
Description: 

'''
 
import gradio as gr
from pathlib import Path
from modules import shared, script_callbacks, scripts
import json
import os

 

 
 
 

def on_ui_tabs():
  
    with gr.Blocks() as layout:   
    
              pass                                        
    return  [ 
              (layout, "split-layout", "split-layout"),            
            ]
    # return  [layout] 



   
script_callbacks.on_ui_tabs(on_ui_tabs)