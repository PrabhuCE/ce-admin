export default dashboardResults = {
  results: [
    {
      numberBoxes: [
        { label: "Team Members", value: 30 },
        { label: "Courses Viewed", value: 47 },
        { label: "Courses Requested", value: 8 },
        { label: "Courses Approved", value: 5 },
        { label: "Courses Approval Pending", value: 2 },
        { label: "Courses Completed", value: 0 },
      ],
      courses: {
        courseData: [
          { label: "In Progress", value: 5 },
          { label: "Completed", value: 0 },
        ],
        tableData: [
          { course: "Professional DevOps", numOfTimesBought: 1 },
          {
            course:
              "Docker Mastery: with Kubernetes +Swarm from a Docker Captain",
            numOfTimesBought: 1,
          },
          { course: "Design Patterns in Python", numOfTimesBought: 1 },
          {
            course: "Hands on Computer Vision with OpenCV & Python",
            numOfTimesBought: 1,
          },
          { course: "IELTS Band 7+ Complete Prep Course", numOfTimesBought: 1 },
        ],
      },
      rewards: {
        title: "Rewards",
        data: [
          { label: "January", value: 0 },
          { label: "February", value: 0 },
          { label: "March", value: 0 },
          { label: "April", value: 0 },
        ],
      },
      uniqueSearchTerms: {
        count: 30,
        list: [
          { searchTerm: "python", count: 10 },
          { searchTerm: "system design", count: 10 },
          { searchTerm: "accessibility", count: 9 },
          { searchTerm: "design pattern", count: 8 },
          { searchTerm: "drawing", count: 8 },
        ],
      },
      courseCountsOfTeam: [
        { label: "Backend Development", count: 3 },
        { label: "Machine Learning Development", count: 2 },
      ],
      pendingApprovals: {
        totalCount: 2,
        data: [
          {
            id: 58,
            name: "Ranjeet Kumar",
            status: "pending-approval",
            course: "Learn RabbitMQ: In-Depth Concepts from Scratch with Demos",
            url:
              "https://www.udemy.com/course/rabbitmq-message-broker-learn-in-depth-concepts-in-rabbitmq/",
            reporting_to: "",
            requestDate: "2020-06-16",
          },
          {
            id: 59,
            name: "Ranjeet Kumar",
            status: "pending-approval",
            course:
              "Docker Mastery: with Kubernetes +Swarm from a Docker Captain",
            url: "https://www.udemy.com/course/docker-mastery/",
            reporting_to: "",
            requestDate: "2020-06-16",
          },
        ],
      },
    },
  ],
};
