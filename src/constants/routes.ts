import Lesson from '@/components/client/student/Lesson/Lesson'
import { router } from '@/configs/routes'
import Catalog_Form_Submit from '@/pages/admin/Catalogues/Form_Submit/Catalog_Form_Submit'
import List_Catalogues from '@/pages/admin/Catalogues/List_Catalogues/List_Catalogues'
import Commission_Rate from '@/pages/admin/Commission_Rate/Commission_Rate'
// import Course_Detail from '@/pages/admin/Course/Course_Detail/Course_Detail'
import List_Courses from '@/pages/admin/Course/List_Courses/List_Courses'
import Form_Payment_Method from '@/pages/admin/Payment_Method/Form_Payment_Method/Form_Payment_Method'
import List_Payment_Method from '@/pages/admin/Payment_Method/List_Payment_Method/List_Payment_Method'
import List_Refund from '@/pages/admin/Refund/List_Refund/List_Refund'
import Form_Role from '@/pages/admin/Role/Form_Role/Form_Role'
import Form_Role_Permission from '@/pages/admin/Role/Form_Role_Permission/Form_Role_Permission'
import List_Role from '@/pages/admin/Role/List_Role/List_Role'
import List_Transactions from '@/pages/admin/Transactions/List_Transactions/List_Transactions'
import List_Withdrawal_Requests from '@/pages/admin/Transactions/List_Transactions/List_Withdrawal_Requests'
import Details_Teacher from '@/pages/admin/User/Details_Teacher/Details_Teacher'
import Details_User from '@/pages/admin/User/Details_User/Details_User'
import List_Teachers from '@/pages/admin/User/List_Teachers/List_Teachers'
import List_Users from '@/pages/admin/User/List_Users/List_Users'
import ForgotPassword from '@/pages/auth/ForgotPassword/ForgotPassword'
import Login from '@/pages/auth/Login/Login'
import Register from '@/pages/auth/Register/Register'
import Course_Payment_Method from '@/pages/client/Student/Course_payment_method/Course_Payment_Method'
import CourseDetails from '@/pages/client/Student/Courses/CourseDetails/CourseDetails'
import Profile from '@/pages/client/Student/Profile/Profile'
import Purchased_Courses from '@/pages/client/Student/Purchased_courses/Purchased_Courses'
import Search from '@/pages/client/Student/Search/Search'
import Transaction_History from '@/pages/client/Student/Transaction_history/Transaction_History'
import Wallet_History from '@/pages/client/Student/Wallet_history/Wallet_History'
import Course_Management from '@/pages/client/Teacher/Course_Management/Course_Management'
import Form_Course from '@/pages/client/Teacher/Form_Course/Form_Course'
import My_Courses from '@/pages/client/Teacher/My_Courses/My_Courses'
import New_Instructor from '@/pages/client/Teacher/New_Instructor/New_Instructor'
import Profile_Teacher from '@/pages/client/Teacher/Profile_Teacher/Profile_Teacher'
import Revenue from '@/pages/client/Teacher/Revenue/Revenue'
import List_Students from '@/pages/client/Teacher/Students/List_Students'
import Withdraw_Money from '@/pages/client/Teacher/Withdraw_Money/Withdraw_Money'
import Payment_Methods from '@/pages/client/Teacher/Withdrawal_Methods/Withdrawal_Methods'
import Forbidden from '@/pages/Forbidden/Forbidden'
import Veryfi_Email from './../pages/auth/Veryfi_Email/Veryfi_Email'
import Home_Page from './../pages/client/Student/Home_page/Home_Page'
import Not_Found from './../pages/Not_found/Not_Found'
import ResetPassword from '@/pages/auth/ForgotPassword/ResetPassword'
import System_Users from '@/pages/admin/System_User/List/System_Users'
import Create_User_System from '@/pages/admin/System_User/Form/Create_User_System'
import List_Voucher from '@/pages/admin/voucher/List_Voucher/List_Voucher'
import Form_Voucher from '@/pages/admin/voucher/Form_Voucher/Form_Voucher'

// Routes cho student
export const studentRoutes = [
  { path: router.home, element: Home_Page },
  { path: router.transactionHistory, element: Transaction_History },
  { path: router.walletHistory, element: Wallet_History },
  { path: router.purchasedCourses, element: Purchased_Courses },
  { path: router.coursePaymentMethod, element: Course_Payment_Method },
  { path: router.courseDetail, element: CourseDetails },
  { path: router.lesson, element: Lesson },
  { path: router.search, element: Search },
  { path: router.profileStudent, element: Profile },
  { path: router.newInstructor, element: New_Instructor }
]

export const protectedStudentRoutes = [
  { path: router.transactionHistory, element: Transaction_History },
  { path: router.walletHistory, element: Wallet_History },
  { path: router.purchasedCourses, element: Purchased_Courses },
  { path: router.coursePaymentMethod, element: Course_Payment_Method },
  { path: router.lesson, element: Lesson },
  { path: router.profileStudent, element: Profile },
  { path: router.newInstructor, element: New_Instructor }
]

// Routes cho teacher
export const teacherRoutes = [
  { path: router.revenue, element: Revenue },
  { path: router.listStudents, element: List_Students },
  { path: router.myCourses, element: My_Courses },
  { path: router.withdrawalMethods, element: Payment_Methods },
  { path: router.withdrawMoney, element: Withdraw_Money },
  { path: router.formCourse, element: Form_Course },
  { path: router.courseManagement, element: Course_Management },
  { path: router.profileTeacher, element: Profile_Teacher }
]

// Routes cho auth
export const authRoutes = [
  { path: router.login, element: Login },
  { path: router.register, element: Register },
  { path: router.forgot_password, element: ForgotPassword },
  { path: router.verify_email, element: Veryfi_Email },
  { path: router.reset_password, element: ResetPassword }
  // { path: router.Email_Verification_Reminder, element: Home_Page}
]

// Routes cho admin
export const adminRoutes = [
  { path: router.dashBoard, element: '<h1>Dashboard</h1>' },
  { path: router.usersSystem, element: System_Users },
  { path: router.userSystemCreate, element: Create_User_System },
  { path: router.users, element: List_Users },
  { path: router.teachers, element: List_Teachers },
  { path: router.teacherDetail, element: Details_Teacher },
  { path: router.userDetail, element: Details_User },
  { path: router.coursesList, element: List_Courses },
  //cho detail khóa học admin để tạm
  { path: router.checkCourse, element: Course_Management },
  { path: router.listTransactions, element: List_Transactions },
  { path: router.listOfWithdrawalRequests, element: List_Withdrawal_Requests },
  { path: router.listRole, element: List_Role },
  { path: router.rolesCreate, element: Form_Role },
  { path: router.rolesUpdate, element: Form_Role },
  { path: router.rolePermission, element: Form_Role_Permission },
  { path: router.listCatalogues, element: List_Catalogues },
  { path: router.cataloguesCreate, element: Catalog_Form_Submit },
  { path: router.cataloguesUpdate, element: Catalog_Form_Submit },
  { path: router.commissionRateUpdate, element: Commission_Rate },
  { path: router.listPaymentMethod, element: List_Payment_Method },
  { path: router.paymentMethodCreate, element: Form_Payment_Method },
  { path: router.paymentMethodUpdate, element: Form_Payment_Method },
  { path: router.listRefundCourses, element: List_Refund },
  { path: router.listVouchers, element: List_Voucher },
  { path: router.VouchersCreate, element: Form_Voucher },
  { path: router.VouchersUpdate, element: Form_Voucher }
]

export const notFoundRoutes = {
  path: router.notFound,
  element: Not_Found
}

export const forbiddenRoutes = {
  path: router.forbidden,
  element: Forbidden
}
