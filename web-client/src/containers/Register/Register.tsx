import Card from '../../components/Card/Card'
import image from '../../../public/images/exios-logo.png';
import { Link } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/ai';

type Props = {}

const Register = (props: Props) => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-200">
      <Card>
        <div className="max-w-md w-full space-y-8 lg:w-[100rem] p-5">
          <div>
            <img
              className="mx-auto h-24 w-auto"
              src={image}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">انشاء حساب</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link
                to={'/login'}
                className="font-medium text-green-600 hover:text-green-500"
              >
                سجل دخولك من هنا
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <h5 className='mb-2 text-right'>معلومات الشخصية</h5>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mb-3"
                  placeholder="البريد الاكتروني"
                />
                <input
                  name="firstName"
                  type="text"
                  required
                  className="mb-3"
                  placeholder="الاسم الاول"
                />
                <input
                  name="lastName"
                  type="text"
                  required
                  className="mb-3"
                  placeholder="اسم العائلة"
                />
                <input
                  name="phone"
                  type="number"
                  required
                  className="mb-3"
                  placeholder="رقم الهاتف"
                />
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

              <div>
                <h5 className='mb-2 text-right'>معلومات الدخول</h5>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mb-3"
                  placeholder="الرمز السري"
                />
                <input
                  id="repeatedPassword"
                  name="repeatedPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mb-3"
                  placeholder="اعادة الرمز السري"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="flex items-center">
                <label className="mr-2 block text-sm text-gray-900">
                  انا اوافق على <span className='text-green-600 cursor-pointer'>شروط</span> التسجيل
                </label>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <AiOutlineUserAdd className="h-5 w-5 text-green-500 group-hover:text-green-400" aria-hidden="true" />
                </span>
                انشاء حساب
              </button>
            </div>
          </form>
        </div>
      </Card>
      </div>
  )
}

export default Register;
