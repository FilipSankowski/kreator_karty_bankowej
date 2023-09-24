'use client'

import Button from "@/components/Button";
import { useState } from "react";

export default function CardPreview({fullName, cardNumber, expirationDate, backgroundImg}) {
  const [isReversed, setIsReversed] = useState(false);

  /* Format card number to show as: xxxx xxxx xxxx xxxx; Replace every group of 4 characters with itself + space */
  cardNumber = cardNumber.replace(/(.{4})/g, (p1) => p1 + ' ');

  /* Format exp. date to show as: mm/yy; Since date input result is always yyyy-mm-dd I can take 3rd and 4th digits as one group (year) 
  and then two digits after the following '-' symbol (month) as another group. The whole expression saves itself as p1, so I just don't use it when replacing */
  expirationDate = expirationDate.replace(/.{2}(.{2})-(.{2}).*/g, (p1, p2, p3) => p3 + '/' + p2);

  return (
    <div className={'flex gap-2'}>
      {isReversed
      ? /* === Rewers karty === */
      <div className={'bg-white w-96 h-64 rounded-3xl py-5'}>
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
      </div>
      : /* === Front Karty === */
      <div className={`bg-cover bg-center w-96 h-64 rounded-3xl p-4`} style={{'backgroundImage': `url('${backgroundImg}')`}}>
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
      </div>
      }
      <Button
        className={'h-fit'}
        onClick={() => setIsReversed(!isReversed)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
        </svg>
      </Button>
    </div>
  )
}