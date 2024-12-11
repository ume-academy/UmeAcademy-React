export const prefixAdmin = '/admin'
export const prefixTeacher = '/teacher'

export const router = {
  home: '/',

  // < ===== AUTH ===== >
  login: '/login',
  register: '/register',
  forgot_password: '/forgot_password',
  verify_email: '/verify_email',
  reset_password: '/reset-password',
  // verify_email: `/api/v1/auth/email/verify/:userId/:token`,

  // < ===== STUDENT ===== >
  profileStudent: '/profile',
  search: '/courses/search',
  courseDetail: '/course/:id',
  lesson: '/course/:id/lesson',
  walletHistory: '/wallet-history',
  purchasedCourses: '/purchased-courses',
  transactionHistory: '/transaction-history',
  coursePaymentMethod: '/course-payment-method/:id',
  favoriteCourses: '/favorite-courses',
  teacherInfoCourse: '/course/:id/teacher-information',

  // < ===== TEACHER ===== >
  // Route index
  revenue: `${prefixTeacher}/revenue`,

  // Route lần đầu trở thành teacher
  newInstructor: `/new-instructor`,

  // Route thông tin cá nhân phía teacher
  profileTeacher: `${prefixTeacher}/profile`,

  // Route danh sách học viên
  listStudents: `${prefixTeacher}/my-students`,

  // Route danh sách khóa học giảng viên tạo
  myCourses: `${prefixTeacher}/my-courses`,

  // Route thêm phương thức thanh toán
  withdrawalMethods: `${prefixTeacher}/withdrawal-methods`,

  // Route ví và rút tiền
  walletMoney: `${prefixTeacher}/wallet-money`,

  // Route lịch sử rút tiền
  withdrawHistories: `${prefixTeacher}/withdraw-histories`,

  // Route Tạo mới khóa học
  formCourse: `${prefixTeacher}/form-course`,

  // Route quản lý khóa học
  courseManagement: `${prefixTeacher}/course-management/:id`,

  // < ===== ADMIN ===== >
  // Route index
  dashBoard: `${prefixAdmin}`,

  // Route tài khoản
  users: `${prefixAdmin}/users`,
  teachers: `${prefixAdmin}/teachers`,
  userDetail: `${prefixAdmin}/user/:id`,
  teacherDetail: `${prefixAdmin}/teacher/:id`,
  usersSystem: `${prefixAdmin}/users-system`,
  userSystemCreate: `${prefixAdmin}/user-system-create`,

  // Route khóa học
  coursesList: `${prefixAdmin}/courses`,
  checkCourse: `${prefixAdmin}/check-course/:id`,

  // Route giao dịch
  listTransactions: `${prefixAdmin}/transactions`,
  listOfWithdrawalRequests: `${prefixAdmin}/withdrawal-requests`,

  // Route phân quyền
  listRole: `${prefixAdmin}/roles`,
  rolesCreate: `${prefixAdmin}/roles/create`,
  rolesUpdate: `${prefixAdmin}/roles/update/:id`,
  rolePermission: `${prefixAdmin}/roles/:id/permissions`,

  // Route danh mục
  listCatalogues: `${prefixAdmin}/catalogues`,
  cataloguesCreate: `${prefixAdmin}/catalogues/create`,
  cataloguesUpdate: `${prefixAdmin}/catalogues/update/:id`,

  // Route % hoa hồng
  commissionRateUpdate: `${prefixAdmin}/commission-rate/update`,

  // Route phương thức thanh toán
  listPaymentMethod: `${prefixAdmin}/list-payment-method`,
  paymentMethodCreate: `${prefixAdmin}/form-payment-method`,
  paymentMethodUpdate: `${prefixAdmin}/form-payment-method/:id`,

  // Route danh sách sản phẩm hoàn tiền
  listRefundCourses: `${prefixAdmin}/refund-courses`,

  // Route voucher
  listVouchers: `${prefixAdmin}/vouchers`,
  VouchersCreate: `${prefixAdmin}/vouchers/create`,
  VouchersUpdate: `${prefixAdmin}/vouchers/update/:id`,

  // < ===== Not_Found ===== >
  notFound: '*',

  // < ===== 403 - Forbidden ===== >
  forbidden: '/forbidden'
}
