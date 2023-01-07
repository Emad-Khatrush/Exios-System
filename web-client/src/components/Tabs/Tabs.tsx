
type ActiveTabs = 'myOrders' | 'arrived' | 'readyForPickup' | 'finished';

type Props = {
  data: [
    {
      label: string
      value: string
      disable?: boolean
    }
  ],
  activeTab: ActiveTabs
  tabOnChange: (tab: ActiveTabs) => void
}

const activeTabClass = "text-blue-600 border-blue-600 dark:text-blue-500 active dark:border-blue-500 inline-block p-4  rounded-t-lg border-b-2"
const notActiveTabClass = "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
const disableTabClass = "inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500";

const Tabs = (props: Props) => {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {props.data.map((tab, i) => (
          <li key={tab.value} className="mr-2 transition-all" onClick={() => props.tabOnChange(tab.value as ActiveTabs)}>
            <a href="#" className={(tab.disable ? disableTabClass : props.activeTab === tab.value ? activeTabClass : notActiveTabClass) + ' transition-all ease-out delay-100'}>{tab.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tabs;