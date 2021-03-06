export const MA_tables = [
  { id: 191, table_name: "User" },
  { id: 191, table_name: "Course Details" },
  { id: 192, table_name: "Assignment Info" },
  { id: 193, table_name: "Assessment Info" },
  { id: 194, table_name: "Video Tracking" },
  { id: 195, table_name: "Readings Data" },
  { id: 196, table_name: "Discusssion Board" },
  { id: 197, table_name: "SCORM Course Info" },
  { id: 198, table_name: "Course Progress Details" },
  { id: 199, table_name: "User Tracking Details" },
];

export const PREP_tables = [
  { id: 191, table_name: "User" },
  { id: 191, table_name: "Upload Details" },
  { id: 192, table_name: "Previous Request Info" },
  { id: 193, table_name: "Tracking Info" }
];

export const MA1_table_info = {
  column_list: [
    { label: "ID", has_order: false, has_filter: false, col_name: 'id', col_type: "text" },
    { label: "FirstName", has_order: true, has_filter: true, col_name: 'first_name', col_type: "text" },
    { label: "LastName", has_order: true, has_filter: true, col_name: 'last_name', col_type: "image" },
    { label: "CourseId", has_order: true, has_filter: true, col_name: 'course_id', col_type: "file" },
  ],
  data: [
    {
      id: 1,
      first_name: "sdssd",
      last_name: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
      course_id: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 2,
      first_name: "sdssd",
      last_name: "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png",
      course_id: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 3,
      first_name: "sdssd",
      last_name: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
      course_id: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 4,
      first_name: "sdssd",
      last_name: "https://homepages.cae.wisc.edu/~ece533/images/boat.png",
      course_id: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 5,
      first_name: "sdssd",
      last_name: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
      course_id: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ],
};

export const MA2_table_info = [
  {
    id: 1,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: "23",
  },
  {
    id: 2,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: "23",
  },
  {
    id: 3,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: "23",
  },
  {
    id: 4,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: "23",
  },
  {
    id: 5,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: "23",
  },
];

export const MA3_table_info = [
  {
    id: 1,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: 23,
    assignment_id: 34,
    assessment_id: 57,
    status: "In-Progress",
  },
  {
    id: 2,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: 23,
    assignment_id: 34,
    assessment_id: 57,
    status: "In-Progress",
  },
  {
    id: 3,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: 23,
    assignment_id: 34,
    assessment_id: 57,
    status: "In-Progress",
  },
  {
    id: 4,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: 23,
    assignment_id: 34,
    assessment_id: 57,
    status: "In-Progress",
  },
  {
    id: 5,
    first_name: "sdssd",
    last_name: "dfsdsds",
    course_id: 23,
    assignment_id: 34,
    assessment_id: 57,
    status: "In-Progress",
  },
];
