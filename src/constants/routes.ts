import { router } from "@/configs/routes";
import Home_Page from './../pages/client/Student/Home_page/Home_Page';
import Transaction_History from "@/pages/client/Student/Transaction_history/Transaction_History";
import Wallet_History from "@/pages/client/Student/Wallet_history/Wallet_History";
import Purchased_Courses from "@/pages/client/Student/Purchased_courses/Purchased_Courses";
import Course_Payment_Method from "@/pages/client/Student/Course_payment_method/Course_Payment_Method";
import CourseDetails from "@/pages/client/Student/Courses/CourseDetails/CourseDetails";
import Lesson from "@/components/client/student/Lesson/Lesson";
import Search from "@/pages/client/Student/Search/Search";
import Revenue from "@/pages/client/Teacher/Revenue/Revenue";
import New_Instructor from "@/pages/client/Teacher/New_Instructor/New_Instructor";
import List_Students from "@/pages/client/Teacher/Students/List_Students";
import My_Courses from "@/pages/client/Teacher/My_Courses/My_Courses";
import Payment_Methods from "@/pages/client/Teacher/Payment_Methods/Payment_Methods";
import Withdraw_Money from "@/pages/client/Teacher/Withdraw_Money/Withdraw_Money";
import Form_Course from "@/pages/client/Teacher/Form_Course/Form_Course";
import Course_Management from "@/pages/client/Teacher/Course_Management/Course_Management";
import List_Users from "@/pages/admin/User/List_Users/List_Users";
import Details_User from "@/pages/admin/User/Details_User/Details_User";
import List_Courses from "@/pages/admin/Course/List_Courses/List_Courses";
import List_Transactions_Instructor from "@/pages/admin/Transactions/List_Transactions/List_Transactions_Instructor";
import List_Transactions_Student from "@/pages/admin/Transactions/List_Transactions/List_Transactions_Student";
import List_Role from "@/pages/admin/Role/List_Role/List_Role";
import Form_Role from "@/pages/admin/Role/Form_Role/Form_Role";
import List_Catalogues from "@/pages/admin/Catalogues/List_Catalogues/List_Catalogues";
import Catalog_Form_Submit from "@/pages/admin/Catalogues/Form_Submit/Catalog_Form_Submit";
import Commission_Rate from "@/pages/admin/Commission_Rate/Commission_Rate";
import List_Payment_Method from "@/pages/admin/Payment_Method/List_Payment_Method/List_Payment_Method";
import Form_Payment_Method from "@/pages/admin/Payment_Method/Form_Payment_Method/Form_Payment_Method";
import List_Refund from "@/pages/admin/Refund/List_Refund/List_Refund";
import Login from "@/pages/auth/Login/Login";
import Register from "@/pages/auth/Register/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword/ForgotPassword";
import Not_Found from './../pages/Not_found/Not_Found';
import Profile_Teacher from "@/pages/client/Teacher/Profile_Teacher/Profile_Teacher";
import Profile from "@/pages/client/Student/Profile/Profile";
import Veryfi_Email from './../pages/auth/Veryfi_Email/Veryfi_Email';
import { Link } from "react-router-dom";


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
]

export const protectedStudentRoutes  = [
  { path: router.transactionHistory, element: Transaction_History },
  { path: router.walletHistory, element: Wallet_History },
  { path: router.purchasedCourses, element: Purchased_Courses },
  { path: router.coursePaymentMethod, element: Course_Payment_Method },
  { path: router.lesson, element: Lesson },
  { path: router.profileStudent, element: Profile },
]

// Routes cho teacher
export const teacherRoutes = [
  { path: router.revenue, element: Revenue },
  { path: router.newInstructor, element: New_Instructor },
  { path: router.listStudents, element: List_Students },
  { path: router.myCourses, element: My_Courses },
  { path: router.paymentMethods, element: Payment_Methods },
  { path: router.withdrawMoney, element: Withdraw_Money },
  { path: router.formCourse, element: Form_Course },
  { path: router.courseManagement, element: Course_Management },
  { path: router.profileTeacher, element: Profile_Teacher },
]


// Routes cho auth
export const authRoutes = [
  { path: router.login, element: Login }, 
  { path: router.register, element: Register },
  { path: router.forgot_password, element: ForgotPassword },
  { path: router.verify_email, element: Veryfi_Email}
  // { path: router.Email_Verification_Reminder, element: Home_Page}
]

// Routes cho admin
export const adminRoutes = [
  { path: router.dashBoard, element: '<h1>Dashboard</h1>' },
  { path: router.users, element: List_Users },
  { path: router.userDetail, element: Details_User },
  { path: router.coursesList, element: List_Courses },
  { path: router.checkCourse, element: Course_Management },
  { path: router.listTransactionsInstructor, element: List_Transactions_Instructor },
  { path: router.listTransactionsStudent, element: List_Transactions_Student },
  { path: router.listRole, element: List_Role },
  { path: router.rolesCreate, element: Form_Role },
  { path: router.rolesUpdate, element: Form_Role },
  { path: router.listCatalogues, element: List_Catalogues },
  { path: router.cataloguesCreate, element: Catalog_Form_Submit },
  { path: router.cataloguesUpdate, element: Catalog_Form_Submit },
  { path: router.commissionRateUpdate, element: Commission_Rate },
  { path: router.listPaymentMethod, element: List_Payment_Method },
  { path: router.paymentMethodCreate, element: Form_Payment_Method },
  { path: router.paymentMethodUpdate, element: Form_Payment_Method },
  { path: router.listRefundCourses, element: List_Refund },
]



export const notFoundRoutes = {
  path: router.notFound, element: Not_Found
}
