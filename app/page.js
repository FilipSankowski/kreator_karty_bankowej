'use client'

import Condition from "@/components/Condition";
import Input from "@/components/Input";
import RadioInput from "@/components/RadioInput";
import { useState } from "react";
import CardPreview from "./CardPreview";

export default function Home() {
  const backgroundOptions = [
    {label: 'Góry', value: './img/mountains.jpg' },
    {label: 'Las', value: './img/forest.jpg'},
    {label: 'Rafa koralowa', value: './img/reef.jpg'},
  ];

  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [backgroundImg, setBackgroundImg] = useState('');

  const fullNameRuleSet = /^.+\s.+$/gm;
  const cardNumberRuleSet = /\d{16}/gm;
  const expirationDateRuleSet = /.+/gm;
  const backgroundImgRuleSet = /.+/gm;

  return (
    <div className={'grid grid-cols-3 grow'}>
      {/* Form */}
      <div className={'col-span-1 bg-gray-300 py-5 px-10'}>
        <Input
          id={'fullName'}
          type={'text'}
          className={'my-3'}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          title={'Pole wymagane'}
          required
        >
          <span className={'font-bold'}>Pełne nazwisko</span>
        </Input>

        <Input
          id={'cardNumber'}
          type={'text'}
          className={'my-3'}
          value={cardNumber}
          // remove all non-digits before changing card number
          onChange={(e) => {setCardNumber(e.target.value.replace(/[^0-9]/g, ''))}}
          title={'Musi składać się z dokładnie 16 cyfr'}
          required
          maxLength={16}
        >
          <span className={'font-bold'}>Numer karty</span>
        </Input>

        <Input
          id={'expirationDate'}
          type={'date'}
          className={'my-3'}
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          title={'Pole wymagane'}
          required
        >
          <span className={'font-bold'}>Data ważności</span>
        </Input>

        <RadioInput
          id={'backgroundImg'}
          options={backgroundOptions}
          className={'my-3'}
          onChange={(e) => setBackgroundImg(e.target.value)}
          title={'Pole wymagane'}
          required
        >
          <span className={'font-bold'}>Tło</span>
        </RadioInput>
      </div>

      {/* Preview */}
      <div className={'col-span-2 bg-gray-200'}>
        
        {fullName.match(fullNameRuleSet) &&
        cardNumber.match(cardNumberRuleSet) &&
        expirationDate.match(expirationDateRuleSet) &&
        backgroundImg.match(backgroundImgRuleSet)
        ?
        <div className={'w-full h-full flex items-center justify-center'}>
          <CardPreview 
            fullName={fullName}
            cardNumber={cardNumber}
            expirationDate={expirationDate}
            backgroundImg={backgroundImg}
          />
        </div>
        : 
        <div className={'w-full h-full flex items-center justify-center'}>
          <div className={''}>
            <Condition value={fullName} match={fullNameRuleSet} className={'my-3'}>
              <span className={'font-bold'}>Pełne nazwisko musi składać się z min. 2 grup znaków oddzielonych spacją</span>
            </Condition>
            <Condition value={cardNumber} match={cardNumberRuleSet} className={'my-3'}>
              <span className={'font-bold'}>Numer karty musi składać się z dokładnie 16 cyfr</span>
            </Condition>
            <Condition value={expirationDate} match={expirationDateRuleSet} className={'my-3'}>
              <span className={'font-bold'}>Data ważności nie może być pusta</span>
            </Condition>
            <Condition value={backgroundImg} match={backgroundImgRuleSet} className={'my-3'}>
              <span className={'font-bold'}>Tło nie może być puste</span>
            </Condition>
          </div>
        </div>
        }
      </div>
    </div>
  )
}