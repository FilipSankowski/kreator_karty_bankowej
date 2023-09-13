import Input from "@/components/Input";

export default function Home() {
  return (
    <>
    <div className={'col-span-1 bg-gray-300 py-5 px-10'}>
      <Input
        id={'one'}
        type={'text'}
        className={'my-3'}
      >
        <span className={'font-bold'}>1</span>
      </Input>

      <Input
        id={'two'}
        type={'text'}
        className={'my-3'}
      >
        <span className={'font-bold'}>2</span>
      </Input>

      <Input
        id={'three'}
        type={'text'}
        className={'my-3'}
      >
        <span className={'font-bold'}>3</span>
      </Input>
    </div>

    <div className={'col-span-2 bg-gray-200'}>
      Preview
    </div>
    </>
  )
}