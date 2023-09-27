'use client'

import { useState } from "react";
import { useSpring, a } from "react-spring";

export default function CardPreview({fullName, cardNumber, expirationDate, backgroundImg, className = ''}) {
  const [isReversed, setIsReversed] = useState(false);

  /* Data for card flip */
  const { transform, opacity } = useSpring({
    opacity: isReversed ? 1 : 0,
    transform: `perspective(600px) rotateY(${isReversed ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  /* Format card number to show as: xxxx xxxx xxxx xxxx; Replace every group of 4 characters with itself + space */
  cardNumber = cardNumber.replace(/(.{4})/g, (p1) => p1 + ' ');

  /* Format exp. date to show as: mm/yy; Since date input result is always yyyy-mm-dd I can take 3rd and 4th digits as one group (year) 
  and then two digits after the following '-' symbol (month) as another group. The whole expression saves itself as p1, so I just don't use it when replacing */
  expirationDate = expirationDate.replace(/.{2}(.{2})-(.{2}).*/g, (p1, p2, p3) => p3 + '/' + p2);

  return (
    <div 
    className={`${className} absolute w-full h-full select-none`} 
    onMouseDown={() => setIsReversed(true)} 
    onMouseUp={() => setIsReversed(false)}
    >
      {/* === Front Karty === */}
      <a.div
      className={`absolute bg-cover bg-center w-full h-full rounded-3xl p-4`}
      style={{ backgroundImage: `url('${backgroundImg}')`, opacity: opacity.to(o => 1 - o), transform }}
      >
        <div className={'grid grid-cols-12 grid-rows-6 h-full'}>
          {/* Bank name */}
          <div className={'flex col-span-6 items-center justify-left text-lg'}>
            &#128077; | Bank Sankowski
          </div>

          {/* Card Number */}
          <div className={'flex items-center justify-center col-span-12 row-start-4 text-3xl text-gray-300'}>{cardNumber}</div>

          {/* Expiration date */}
          <div className={'flex items-center justify-center col-start-5 col-end-8 row-start-5 text-gray-300'}>
            <span className={'leading-3 text-xs mr-1'}>VALID <br/> THRU</span>
            <span className={'text-lg'}>{expirationDate}</span>
          </div>

          {/* Full name */}
          <div className={'flex items-center justify-left col-start-2 col-end-13 row-start-6 text-lg text-gray-300'}>{fullName}</div>
        </div>
      </a.div>
      
      {/* === Tył karty === */}
      <a.div
      className={'absolute bg-white w-full h-full rounded-3xl py-5'} 
      style={{ opacity, transform, rotateY: '180deg' }}
      >
        <div className={'grid grid-cols-12 grid-rows-4 gap-2 h-full'}>
          {/* Pasek */}
          <div className={'col-span-12 bg-black'}></div>

          {/* Podpis */}
          <div className={'flex flex-col col-span-8 px-4'}>
            <span className={'w-full text-xs'}>Podpis posiadacza/użytkownika</span>
            <div className={'w-full h-8 bg-gray-200 text-right text-sm pr-2 italic'}>123</div>
          </div>

          {/* Klauzula */}
          <div className={'flex flex-col col-span-12 row-span-2 px-4 mt-6'}>
            <span className={'w-full text-center text-xs leading-4'}>
              Obsługa Klienta <br/> 
              +48 123 456 789 <br/> 
              www.sankowski.com.pl <br/>
              <br/>
              Karta jest własnością Banku Sankowski S.A.
            </span>
          </div>
        </div>
      </a.div>
    </div>
  )
}