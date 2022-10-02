import Card from "../Card/Card";

type Props = {
  title: string
  description: string
  buttonLabel: string
  imgSrc: string
}

const ShortcutInfoWidget = (props: Props) => {
  const { title, description, buttonLabel, imgSrc } = props;
  
  return (
    <Card
      className="h-auto rounded-lg text-center"
    >
      {/* <object data={OrderSVG} className="inline" width={150} height={150} /> */}
      <img src={imgSrc} alt="" className=" mb-6 w-28 inline" />
      <h2 className="text-2xl font-bold mb-5">{title}</h2>
      <p className="text-md text-gray-500 mb-3">{description}</p>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {buttonLabel}
      </button>
    </Card>
  )
}

export default ShortcutInfoWidget;