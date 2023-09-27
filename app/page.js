'use client'

import Condition from "@/components/Condition";
import Input from "@/components/Input";
import RadioInput from "@/components/RadioInput";
import { useState, useRef } from "react";
import CardPreview from "./CardPreview";
import { useSpring, a, to } from "react-spring";

const calc = (x, y, rect) => {
  return [
  -(y - rect.top - rect.height / 2) / 5,
  (x - rect.left - rect.width / 2) / 5,
  1.4,
  ]
}
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default function Home() {
  const backgroundOptions = [
    {label: 'Góry', value: './img/mountains.jpg' },
    {label: 'Las', value: './img/forest.jpg'},
    {label: 'Rafa koralowa', value: './img/reef.jpg'},
  ];

  /* Data for 3d hover effect */
  const cardRef = useRef(null);
  const config = { 
    xys: [0, 0, 1], 
    mass: 1,
    tension: 170,
    friction: 26,
    clamp: false,
    precision: 0.01,
    velocity: 0, 
  };
  const [{ xys }, api] = useSpring(() => ({ xys: [0, 0, 1], config }), [config]);

  /* Functions for 3d hover effect */
  const handleMouseLeave = () =>
    api.start({
      xys: [0, 0, 1],
    })
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    api.start({
      xys: calc(e.clientX, e.clientY, rect),
    })
  }

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
        <div className={'w-full h-full flex items-center justify-center'} ref={cardRef}>
          <a.div
            className={'absolute w-96 h-64'}
            style={{ transform: xys.to(trans) }}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <CardPreview 
              fullName={fullName}
              cardNumber={cardNumber}
              expirationDate={expirationDate}
              backgroundImg={backgroundImg}
            />
          </a.div>
        </div>
        : 
        <div className={'w-full h-full flex items-center justify-center'}>
          <div>
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