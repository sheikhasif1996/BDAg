# BDAg 🌾

**BDAg** is an open-source collection of geospatial and GeoAI pipelines
for agricultural monitoring in **Bangladesh**.

## Goals
- Field boundary and crop pattern mapping
- Fallow land detection
- Seasonal dynamics using Sentinel-2, HLS
- Foundation models (Prithvi, AlphaEarth)

## Supported Data
- Sentinel-2
- Harmonized Landsat Sentinel (HLS)
- Google Earth Engine exports

## Philosophy
Country-aware, sensor-agnostic, foundation-model ready.

## Status
🚧 Early development

## FTW
Bangladesh (BD), although a highly agricultural country, lacks agricultural data products to aid policy-making in the food-water nexus or researchers in academia. If you search online to get some labelled data to train any foundation model to build a simple crop classification downstream task, you wouldn't get any.
I applied the FTW model to infer in a relatively rural area near Dhaka city in the south of the river Buriganga (South Keraniganj), just to get an overview of the extent of agriculture recently. It shows the agricultural field boundary in that area. I tried to verify that with my own eyes from my experience with farmland back home. It seems the model got closer, or at least gives something to start with. 

<img width="1177" height="1059" alt="image" src="https://github.com/user-attachments/assets/3545c829-fc63-4991-8d45-764bde073f23" />

You can try using you own AOI using the following command line but changing according for your AOI and imagery

ftw inference download \ 
--win_a  S2A_MSIL2A_20251218T043231_R133_T45QZG_20251218T065911 \ 
--win_b S2B_MSIL2A_20260120T043009_R133_T46QBM_20260120T062559 \ 
-f -o dhaka.tif --bbox=90.3596712,23.6809839,90.3864336,23.7030996

then inference can be done using

ftw inference run dhaka.tif -f -o dhaka-inf.tif \
--gpu 0 -m prue_efnetb7_ccby_checkpoint.ckpt

Get the full list of models here:

https://github.com/fieldsoftheworld/ftw-baselines/releases


