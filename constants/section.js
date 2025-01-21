 export const sections = [
    {
      heading: "Admin",
      key: "Admin",
      options: [
        {
          name: "AdminRegistration",
          label: "Admin Registration",
          icon: "person-add",
        },
        { name: "Home", label: "AdminDashboard", icon: "albums" },
        { name: "Settings", label: "Settings", icon: "settings" },
        { name: "AdminProfile", label: "Admin Profile", icon: "person" },
      ],
      color: "#ce93d8", // Pinkish color for admin section
    },
    {
      heading: "Employee",
      key: "Employee",
      options: [
        { name: "Profile", label: "Profile", icon: "person-circle" },
        { name: "EmpDashboard", label: "Employee Dashboard", icon: "grid" },
        {
          name: "My Document",
          label: "My Documents",
          icon: "clipboard-outline",
        },
      ],
      color: "#ce93d8",
    },
    {
      heading: "Attendance",
      key: "Attendance",
      options: [
        { name: "MarkAttendance", label: "MarkAttendance", icon: "grid" },
        {
          name: "ViewAttendance",
          label: "Emp View Attendance",
          icon: "calendar-outline",
        },
        { name: "AttendanceFilter", label: "AttendanceFilter", icon: "grid" },
        {
          name: "AttendanceRegularization",
          label: "AttendanceRegularization",
          icon: "grid",
        },
      ],
      color: "#ce93d8", // Pink'ish color for admin section
    },
    {
      heading: "Leave and Holiday",
      key: "Leave and Holiday",
      options: [
        { name: "LeaveList", label: "LeaveList", icon: "grid" },
        {
          name: "EmpHolidayList",
          label: "Holiday List",
          icon: "today-outline",
        },
        {
          name: "RequestLeave",
          label: "Request Leave",
          icon: "log-out-outline",
        },
        {
          name: "List Reimbursement",
          label: "List Reimbursements",
          icon: "grid",
        },
      ],
      color: "#ce93d8", // Pink'ish color for admin section
    },
    {
      heading: "Salary",
      key: "Salary",
      options: [
        { name: "GeneratePayslip", label: "GeneratePayslip", icon: "grid" },
        { name: "CalculateSalary", label: "Calculate Salary", icon: "cash" },
      ],
      color: "#ce93d8", // Pink'ish color for admin section
    },
    {
      heading: "Payment",
      key: "Payment",
      options: [
        { name: "AddPayment", label: "Add Payment", icon: "cash-outline" },
        { name: "PayEmployees", label: "Pay Employees", icon: "cash-sharp" },
      ],
      color: "#ce93d8", // Pink'ish color for admin section
    },
    {
      heading: "Report",
      key: "Report",
      options: [
        { name: "DailyReport", label: "DailyReport", icon: "grid" },
        { name: "Report", label: "Report", icon: "grid" },
        { name: "ReportFilter", label: "ReportFilter", icon: "grid" },
      ],
      color: "#ce93d8", // Pink'ish color for admin section
    },

    {
      heading: "Verification",
      key: "Verification",
      options: [
        {
          name: "kycVerification",
          label: "KYC Verification",
          icon: "checkmark-circle",
        },
        { name: "Document", label: "Document", icon: "document-outline" },
      ],
      color: "#ce93d8", // Pink'ish color for admin section
    },
    {
      heading: "Logout",
      key: "Logout",
      options: [{ name: "LogoutButton", label: "LogoutButton", icon: "grid" }],
      color: "#ce93d8", // Pink'ish color for admin section
    },

    {
      heading: "Admin Rest",
      key: "AdminRest",
      options: [
        { name: "Support", label: "Support", icon: "chatbubbles-outline" },
        { name: "Dashboard", label: "Dashboard", icon: "grid" },
        { name: "Profile", label: "Profile", icon: "person-circle" },
        { name: "Attendance", label: "Attendance", icon: "accessibility" },
        { name: "Notification", label: "Notification", icon: "notifications" },
        { name: "CalculateSalary", label: "Calculate Salary", icon: "cash" },
        { name: "AddPayment", label: "Add Payment", icon: "cash-outline" },
        { name: "PayEmployees", label: "Pay Employees", icon: "cash-sharp" },
        {
          name: "kycVerification",
          label: "KYC Verification",
          icon: "checkmark-circle",
        },

        { name: "Category", label: "Category", icon: "cash-sharp" },
        { name: "AddCategory", label: "AddCategory", icon: "cash-sharp" },
      ],
      color: "#B5FFFC", // Light blue for admin rest section
    },
    {
      heading: "All Task",
      key: "AllTask",
      options: [
        { name: "EmpDashboard", label: "Employee Dashboard", icon: "grid" },
        { name: "Employee", label: "Employees", icon: "grid" },
        { name: "EmployeeMenu", label: "EmployeeMenu", icon: "grid" },
        { name: "AddEmployee", label: "AddEmployee", icon: "grid" },
        { name: "DailyReport", label: "DailyReport", icon: "grid" },
        { name: "Report", label: "Report", icon: "grid" },
        { name: "ReportFilter", label: "ReportFilter", icon: "grid" },
        { name: "GeneratePayslip", label: "GeneratePayslip", icon: "grid" },
        { name: "LogoutButton", label: "LogoutButton", icon: "grid" },
        { name: "CurrentEmployee", label: "CurrentEmployees", icon: "grid" },
        { name: "LeaveList", label: "LeaveList", icon: "grid" },

        {
          name: "List Reimbursement",
          label: "List Reimbursements",
          icon: "grid",
        },
        { name: "AttendanceFilter", label: "AttendanceFilter", icon: "grid" },
        {
          name: "AttendanceRegularization",
          label: "AttendanceRegularization",
          icon: "grid",
        },
        { name: "OdList", label: "OdList", icon: "grid" },
        { name: "TaskList", label: "TaskList", icon: "grid" },
        { name: "TaskListFilter", label: "TaskListFilter", icon: "grid" },
        { name: "MarkAttendance", label: "MarkAttendance", icon: "grid" },
        {
          name: "RequestLeave",
          label: "Request Leave",
          icon: "log-out-outline",
        },
        {
          name: "ViewAttendance",
          label: "Emp View Attendance",
          icon: "calendar-outline",
        },
        { name: "Document", label: "Document", icon: "document-outline" },
        {
          name: "EmpHolidayList",
          label: "Holiday List",
          icon: "today-outline",
        },
        {
          name: "My Document",
          label: "My Documents",
          icon: "clipboard-outline",
        },
        { name: "Task", label: "Task", icon: "clipboard-outline" },
        { name: "AddTask", label: "Add Task", icon: "add-outline" },
      ],
      color: "#FFD700", // Golden color for all tasks section
    },
  ];
