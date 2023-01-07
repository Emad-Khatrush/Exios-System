import Card from '../../components/Card/Card';

type Props = {}

const SettingsPage = (props: Props) => {
  return (
    <div className="container mx-auto py-10 h-64 w-11/12 px-6">
      <Card>
        <div className="mt-10 sm:mt-0 text-start" style={{ direction: 'rtl' }}>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">معلومات الشخصية</h3>
                <p className="mt-1 text-sm text-gray-600">هذه المعلومات التي سيتم التواصل معه لاجراءات الاستلام</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">اسم الاول</label>
                        <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">اسم الثاني</label>
                        <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">البريد الاكتروني</label>
                        <input type="email" name="email-address" id="email-address" autoComplete="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">مدينة</label>
                        <select 
                          name="city" 
                          id="city"
                          className="mb-3"
                        >
                          <option value="tripoli" className='mr-96'>طرابلس</option>
                          <option value="benghazi">بنغازي</option>
                          <option value="misurata">مصراته</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                        <input type="number" name="phone" id="phone" autoComplete="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                      </div>

                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700 mr-1 mb-3">صورة شخصية</label>
                        <div className="mt-1 flex">
                          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <button className="mr-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">تغيير</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">حفظ</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPage;
