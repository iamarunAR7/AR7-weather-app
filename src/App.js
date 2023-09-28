import React, { useEffect } from 'react';
import {useState,useRef} from 'react';
import axios from 'axios';

import {IoMdSunny,IoMdRainy,IoMdCloudy,IoMdSnow,IoMdThunderstorm,
IoMdSearch} from 'react-icons/io';

import {BsCloudHaze2Fill,BsCloudDrizzleFill,BsEye,BsWater,BsThermometer,BsWind} from "react-icons/bs"

import {TbTemperatureCelsius} from 'react-icons/tb'
import {ImSpinner8} from 'react-icons/im';
import { icons } from 'react-icons';


const APIKEY='e57b4f7a507697bac1e97213f99312d3';



const App = () => {

  const [data,setdata]=useState(null);
  const[location,setlocation]=useState('Alaska');
  const[inputValue,setinputvalue]=useState('');


  const handleinput=(e)=>{
    setinputvalue(e.target.value);

  }

  const handlesubmit=(e)=>{
    console.log(inputValue);
    if(inputValue!==''){
      setlocation(inputValue);
    }

    e.preventDefault();
  }



  useEffect(()=>{

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKEY}`

    axios.get(url).then(res=>{
      setdata(res.data);
    });

  },[location]);



  if(!data){

    return( <div>
          <div>
            <ImSpinner8 className='text-5xl animate-spin '/>
          </div>
    </div>)
  
    
  }

  let icon;
    

  switch('Haze'){
    case'Clouds':
    icon=<IoMdCloudy/>;
    break;

    case 'Haze':
      icon =<BsCloudHaze2Fill/>
      break;

    case 'Rain':
      icon=<IoMdRainy/>
      break;
    
    case 'Clear':
      icon=<IoMdSunny/>
      break;

    case ' Drizzle':
      icon=<BsCloudDrizzleFill/>
      break;

    case 'Snow':
      icon =< IoMdSnow/>
      break;

    case 'Thunderstorm':
      icon =< IoMdThunderstorm/>
      break;

  }

    //data

    const date=new Date();




    
  return(

    
    
    <div className='w-full h-full bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center  py-5 lg:px-0' >
      
      <div className='italic font-bold text-xl pb-3  lg:text-2xl'>AR7 Weather Report</div>

      <form action="" className= 'h-16 bg-black/30 w-full max-w-[450px] backdrop-blur-[32px] rounded-full mb-8'>

        <div className='h-full relative flex items-center justify-between p-2'>

          <input  id='wee'   onChange={(e)=>handleinput(e)}  className=' flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full'type="text" placeholder='Search for city..' />

          <button onClick={(e)=>handlesubmit(e)} className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition'><IoMdSearch className='text-2xl text-white '/></button>

        </div>

      </form>
        {/*card  */}
        <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px]  rounded-[32px] py-12 px-6  '>

          <div>
            {/*  c t  */}
            <div className=''>
              {/* icon */}
              <div className='text-[87px]'>{icon} </div>
                <div> 
                {/* country name */}
                <div className='text-2xl font-semibold'>{data.name},{data.sys.country}</div>
                {/* date */}
                </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth()+1}/{date.getUTCFullYear()}
              </div>
            </div>
            {/*  */}
            <div className='my-20'>
                    <div className='flex justify-center  items-center'>
                      {/* temp */}
                          <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                      {/* celuis */}
                    
                            <div className='text-4xl '>
                                <TbTemperatureCelsius/>
                      </div>
                  </div>
            {/* wether description */}
              <div className=' capitalize text-center'>{data.weather[0].description}</div>
            </div>
            {/*  cd */}
            <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>

              <div className='flex justify-between' >

                <div  className=' flex items-center gap-x-2'>
                  {/*  */}
                  <div className='text-[20px]'><BsEye/></div>
                
                <div>VisiBility <span className=' ml-2'>{data.visibility/1000}Km</span></div>
              </div>

              <div  className=' flex items-center gap-x-2'>
                  {/*  */}
                  <div className='text-[20px]'><BsThermometer/></div>
                
                <div className='flex'>Feels like <div className=' flex ml-2'>{parseInt(data.main.feels_like)}<TbTemperatureCelsius/>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-between' >
              
                <div  className=' flex items-center gap-x-2'>
                  {/*  */}
                  <div className='text-[20px]'><BsWater/></div>
                
                <div> Humidity <span className=' ml-2'>{data.main.humidity}%</span></div>
              </div>

              <div  className=' flex items-center gap-x-2'>
                  {/*  */}
                  <div className='text-[20px]'><BsWind/></div>
                
                <div>Wind <span className='ml-2'>{data.wind.speed}m/s</span></div>
              </div>
            </div>

          </div>
        </div>
        </div>
    </div>
  )
};

export default App;
