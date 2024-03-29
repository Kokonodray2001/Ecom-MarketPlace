import React, { useEffect, useRef } from 'react'
import Dropzone from '../../components/SellerComponents/Dropzone'
import Dropzonesecond from '../../components/SellerComponents/Maindropzone';
import { useState } from 'react';
import axios from 'axios';
import { useSellerContext } from '../../components/Sellercontext';
import Successmessage from '../../components/Successmessage';
import { createPortal } from 'react-dom';
import Maindropzone from '../../components/SellerComponents/Maindropzone';
import VariantDropzone from '../../components/SellerComponents/VariantDropzone';

const ProductForm = ({formData,setFormData,mainImage,setMainImage,productImages,setProductImages,clearImages,setClearImages}) => {
    const {savedProduct,setSavedProduct} = useSellerContext();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const id = userInfo.id;
    const token = window.localStorage.getItem("token")
    const handleChange = (e) =>{
        const{name,value} = e.target;
        setFormData((prev)=>{
          return {
            ...prev,
            [name] : value
          }
        })
        console.log(formData);
      }
      const handleDimensionChange = (e)=>{
        const{name,value} = e.target;
        setFormData({
          ...formData,
          dimension:{
            ...formData.dimension,
            [name] : value
          }
        })
      }
      const handleAmountChange = (e)=>{
        const{name,value} = e.target;
        setFormData({
          ...formData,
          productAmount:{
            ...formData.productAmount,
            [name] : value
          }
        })
      }
      // const handleClick = async(e) =>{
      //   e.preventDefault();
      //   setIsLoading(true);
      //   const form = new FormData();
      //   Object.entries(formData).forEach(([key, value]) => {
      //       form.append(key, value);
            
      //   });
      //   form.append('mainImage',mainImage);
      //   productImages.forEach((image) =>{
      //     form.append('productImages',image)
      //   })
      //   try{
      //     const headers = {
      //       Authorization : `Bearer ${token}`
      //     }
      //     const res = await axios.post('http://localhost:3002/onboard/storeProduct',form,{headers})
      //     setTimeout(()=>{
      //       setIsLoading(false)
      //       setIsAdded(true)
      //       setFormData(SellerInfo);
      //       setProductImages([]);
      //       setClearImages(true);
      //       localStorage.removeItem('SellerInfo')
      //       setTimeout(()=>{
      //         setIsAdded(false)
      //       },1500)
      //     },2000)
          
      //     console.log(res);
      //   }
      //   catch(err){
      //     setIsLoading(false);
      //     console.log(err);
      //   }
      // }
  return (
    <>
      <div className='flex gap-10 w-full h-full '>
        
        <div className='pt-8 pb-12 flex flex-col gap-6 w-6/12'>
                <div className='flex flex-col gap-3 w-full'>
                    <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Product name</div>
                    <input type='text'
                    name='productName'
                    placeholder=''
                    value={formData.productName}
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
            <div>
                <div className='flex gap-6 w-full'>
                    <div className='flex flex-col gap-3 w-6/12'>
                        <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Product price</div>
                        <input type='number'
                        name='productPrice'
                        value={formData.productPrice}
                        onChange={handleChange}
                        placeholder=''
                        className='border-[1.5px] border-zinc-300 h-10  rounded-md px-3'
                        ></input>
                    </div>
                    <div className='flex flex-col gap-3 w-6/12'>
                        <div className='font-medium text-base'>Color</div>
                        <input type='text'
                        name='color'
                        value={formData.color}
                        onChange={handleChange}
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                        ></input>
                    </div>
                </div>
            </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Brand</div>
                    <input type='text'
                    name='brand'
                    value={formData.brand}
                    placeholder=''
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
                <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Discount<span className='text-xs text-slate-400 pl-1'>(if applicable)</span></div>
                    <input type='mumber'
                    name='discount'
                    value={formData.discount}
                    placeholder=''
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
                </div>
                
                <div className='flex flex-col gap-3 w-full'>
                    <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Delivery duration</div>
                    <input type='text'
                    name='expectedDelivery'
                    value={formData.expectedDelivery}
                    placeholder='e.g., 1 hour, 2 days'
                    pattern='^\d+\s(hour|hours|day|days)$'
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
                {/* <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Expected delivery</div>
                    <input type='text'
                    readOnly
                    value={calculateExpectedDelivery()}
                    placeholder='Expected Delivery Date'
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div> */}
                
            <div className='flex flex-col gap-3 w-full'>
                <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Description</div>
                    <textarea type='text'
                    name='productDescription'
                    value={formData.productDescription}
                    onChange={handleChange}
                    placeholder='' 
                    className='border-[1.5px] border-zinc-300 h-32 rounded-md p-3'
                    ></textarea>
            </div>
                <div className='flex flex-col gap-3 w-full'>
                    <div className='font-medium text-base'>Dimension</div>
                    <div className='flex justify-between w-full gap-3'>
                        <input type='number'
                        name='length'
                        value={formData.dimension.length}
                        onChange={handleDimensionChange}
                        placeholder='Length'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-4/12'
                        ></input>
                      <input type='number'
                      name='width'
                        value={formData.dimension.width}
                        onChange={handleDimensionChange}
                        placeholder='Width'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-4/12'
                        ></input>
                      <input type='number'
                      name='height'
                        value={formData.dimension.height}
                        onChange={handleDimensionChange}
                        placeholder='Height'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-4/12'
                        ></input>
                    </div>
                </div>
                
            </div>
                
        <div className='w-6/12 pt-8 pb-12 px-4 flex flex-col justify-between '>
          <div className='flex flex-col gap-3'> 
            <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Upload product images</div>
            <div className='flex justify-between w-full p-1 rounded-md h-[182px] border-[1.5px] border-zinc-300'>
              <Maindropzone mainImage={mainImage} setMainImage={setMainImage} clearImages={clearImages} setClearImages={setClearImages}/>
              <Dropzone productImages={productImages} setProductImages={setProductImages} clearImages={clearImages} setClearImages={setClearImages}/>
              <Dropzone productImages={productImages} setProductImages={setProductImages} clearImages={clearImages} setClearImages={setClearImages}/>
              
            </div>
            <div className='text-xs text-slate-400'>You need to add at least 3 images.Pay attention to the quality of the 
              pictures you add,comply with the background color standards.pictures must be in certain
              dimensions.
            </div>
          </div>
          <div className='w-full flex gap-4'>
            <div className='flex flex-col gap-3 w-6/12'>
                      <div className='font-medium text-base'>Size<span className='text-xs text-slate-400 pl-1'>(If applicable)</span></div>
                      <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                      ></input>
            </div>
            <div className='flex flex-col gap-3 w-6/12'>
                      <div className='font-medium text-base'>Gender<span className='text-xs text-slate-400 pl-1'>(If applicable)</span></div>
                      <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                      ></input>
            </div>
          </div>
          <div className='w-full flex gap-4'>
          <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Manufacture date</div>
                    <input
                    type="date"
                    name="manufactureDate"
                    value={formData.manufactureDate}
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
            </div>
            <div className='flex flex-col gap-3 w-6/12'>
                    <div className="font-medium text-base">Expiry date</div>
                    <input 
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
            </div>
          </div>
          <div className='flex flex-col gap-3 w-full'>
                    <div className='font-medium text-base'>Product Amount<span className='text-xs text-slate-400 pl-1'>(Fill which unit applicable)</span></div>
                    <div className='flex justify-between w-full gap-3'>
                        <input type='text'
                        name='weight'
                        value={formData.productAmount.weight}
                        onChange={handleAmountChange}
                        placeholder='e.g. 1kg 200gm'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-6/12'
                        ></input>
                      <input type='number'
                      name='amount'
                        value={formData.productAmount.amount}
                        onChange={handleAmountChange}
                        placeholder='Quantity'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-6/12'
                        ></input>
                    </div>
                  </div>
        </div>
        </div>
        {/* <div className='w-full h-[0.5px] bg-slate-300'></div>
        <div className='pt-4 flex flex-col gap-6'>
          <div className='text-xl font-semibold text-zinc-800'>Add product variants</div>
          <div className='flex justify-between gap-3'>
                  <div className='flex justify-between gap-3 w-[74%]'>
                  <input type='text'
                        name='type'
                        value={variant.type}
                        onChange={handleVariantChange}
                        placeholder='Variant type'
                        className='border-[1.5px] text-sm border-zinc-300 h-10 rounded-md px-3 w-[20%]'
                        ></input>
                  <input type='text'
                        name='name'
                        value={variantValue.name}
                        onChange={handleVariantValue}
                        placeholder='Variant name'
                        className='border-[1.5px] text-sm border-zinc-300 h-10 rounded-md px-3 w-[30%]'
                        ></input>

                        <input type='text'
                        name='amount'
                        value={variantValue.amount}
                        onChange={handleVariantValue}
                        placeholder='Amount you want to add'
                        className='border-[1.5px] text-sm border-zinc-300 h-10 rounded-md px-3 w-[25%]'
                        ></input>
                        
                        <div 
                        className='border-[1.5px] text-sm border-zinc-300 h-10 rounded-md w-[25%]'>
                        <VariantDropzone uploaded={uploaded} setUploaded={setUploaded} variantValue={variantValue} setVariantValue={setVariantValue}/>
                        </div>
                        </div>
                        
                  <div 
                  onClick={addVariantValue}
                  className='h-10 px-5 flex items-center bg-slate-800 rounded-lg text-white font-medium space-x-2 text-sm'><span className='text-2xl font-normal pr-1 pb-[5px]'>+</span>Add same type</div>
                  <div 
                  onClick={addVariant}
                  className='h-10 px-5 flex items-center bg-slate-800 rounded-lg text-white font-medium space-x-2 text-sm'><span className='text-2xl font-normal pr-1 pb-[5px]'>+</span>Add new</div>
                </div>
                <div className='flex flex-col border-t border-l border-r border-slate-300 rounded-sm bg-white'>
                {
                  (formData.variants.length > 0)?
                  formData.variants.map((variant) =>{
                    return (
                      variant.values.map((item)=>{
                        return <div className='border-b border-gray-300 h-10 capitalize flex justify-between items-center font-medium text-sm text-slate-600 px-3 '> 
                          <div className='w-4/12 flex justify-start h-full px-3 items-center'>{variant.type}</div>
                          <div className='w-4/12 flex justify-start h-full px-3 items-center'>{item.name}</div>
                          <div className='w-4/12 flex justify-start h-full px-3 items-center'>{item.amount}</div>
                        </div>
                      })
                    )
                    })
                  :''
                  }
                  </div>
                  <div className='flex justify-between'>
          {(isLoading)?
            <div className='w-[30%] h-12 font-semibold text-base rounded-lg border-white bg-buttonColor border text-white flex justify-center items-center'>
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>Adding...</div>
            : (isAdded)?
            
            <div className='w-[30%] h-12 font-semibold text-base rounded-lg border-white bg-buttonColor border text-white flex justify-center items-center'>
            <span className='mr-2'>✔</span>Added</div>:
             <div onClick={handleClick} className='w-[30%] h-12 font-semibold text-base rounded-lg border-white bg-buttonColor border text-white flex justify-center items-center'>
             Add product</div>
}
            <div onClick={handleSave} className='w-[30%] h-12 font-semibold text-base rounded-lg border-buttonColor bg-white border text-buttonColor flex justify-center items-center'>Save product</div>
            <div className='w-[30%] h-12 font-semibold text-base rounded-lg border-slate-300 bg-slate-50 border text-slate-600 flex justify-center items-center'>Schedule</div>
          </div>

        </div> */}
    </>
  )
}

export default ProductForm
