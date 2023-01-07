import { Link } from "react-router-dom"

type Props = {
  header: string
  imgSrc: string
  title?: string
  description?: string
  infoList?: any[]
  onCardClick?: any
  value?: string
  buttonLabel?: string
  disableHoverEffect?: boolean
  buttonPath?: string
}

const InfoCard = (props: Props) => {
  return (
    <div>
      <div onClick={() => !props.disableHoverEffect && props.onCardClick(props.value)} className={`w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 text-right ${!props.disableHoverEffect ? 'hover:scale-105 transition-all cursor-pointer' : ''}`} style={{ direction: 'rtl' }}>
        <img className="object-cover object-center w-full h-56" src={props.imgSrc} alt="avatar" />

        <div className="flex items-center px-6 py-3 bg-gray-900">
            <h1 className="mx-3 text-lg font-semibold text-white">{props.header}</h1>
        </div>

        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{props.title}</h1>

          <p className="py-2 text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: props.description || '' }} />

          {props?.infoList && props.infoList.map((info: string, i: number) => (
            <div key={i} className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <h1 className="px-2 text-sm">- {info}</h1>
            </div>
          ))}

          {props.buttonLabel &&
            <Link to={props.buttonPath || ''}>
              <button
                type="submit"
                className=" mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {props.buttonLabel}
              </button>
            </Link>
          }
        </div>
      </div>
    </div>
  )
}


export default InfoCard;
