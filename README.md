# myFitRoom: Clothes generation and Virtual try-on
![myFitRoom-removebg-preview](https://github.com/user-attachments/assets/c5642245-fb49-49a2-8921-4e656af2a469)

## Purpose of This Repository
This is the COSC 6480 Experiment AI final project for group: Avery Bai, Jiayi You, Xinyi Huang. This repository is created and maintained solely for learning purposes. It is intended to demonstrate the use of various tools, frameworks, and models for educational exploration and non-commercial activities.

## Run the application
Git clone this repository and open it to your IDE
Run
```bash
cd interface/react-app
```
Run the following command to install all required packages for this program
```bash
npm install 
```
Check if you install vite
```bash
vite --version
```
if it is installed, then run this to see the web app
```bash
npm run dev
```

## Model Usage Disclaimer
1. OOTDiffusion
We incorporate and use the OOTDiffusion model, available at OOTDiffusion on Hugging Face. This model is not owned by us and remains the property of its respective creator. All rights, credits, and ownership belong to the original author.

2. LoRA Text2Image Fine-Tuning - sd-fashion-products
We utilize the sd-fashion-products model for learning purposes, which can be found at sd-fashion-products on Hugging Face. This model is also not owned by us and remains under the ownership of its original author. All rights and credits are retained by the model's creator.

Non-Commercial Use

We explicitly state that:
All models, tools, and frameworks used in this repository are for educational purposes only.
We do not use these models for any commercial activities.
We fully acknowledge the ownership and intellectual property rights of the respective model authors.
For further information on these models, please refer to their respective links:

[link] https://huggingface.co/levihsu/OOTDiffusiongi
[link] https://huggingface.co/NouRed/sd-fashion-products
If there are any concerns or queries, feel free to contact us.

## Citations

If you find this project useful for your research, please use the following BibTeX entries:
```bibtex
@software{NouredFashionProducts2023,
    author = {NouRed},
    title = {sd-fashion-products: LoRA weights for Stable Diffusion 2 fine-tuned on fashion product images},
    year = {2023},
    publisher = {Hugging Face},
    journal = {Hugging Face Model Hub},
    url = {https://huggingface.co/NouRed/sd-fashion-products}
}
```
```bibtex
@InProceedings{hsu2023ootdiffusion,
    title = {OOTDiffusion: Outfitting Fusion based Virtual Try-on using Diffusion Model},
    author = {Hsu, Wei-Lin and Huang, Hsin-Ying and Tsai, Yi-Syuan and Tseng, Wei-Chen},
    booktitle = {ICCV 2023 Workshop},
    year = {2023},
    url = {https://huggingface.co/levihsu/OOTDiffusion}
}
```
