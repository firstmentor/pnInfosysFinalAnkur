-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 07, 2024 at 08:16 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pn_infosys`
--

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `certificate_id` int NOT NULL,
  `studentName` varchar(50) NOT NULL,
  `course` varchar(50) NOT NULL,
  `duration` varchar(25) NOT NULL,
  `studentImagePublicId` varchar(250) NOT NULL,
  `studentImageUrl` varchar(250) NOT NULL,
  `isDeleted` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `certificates`
--

INSERT INTO `certificates` (`certificate_id`, `studentName`, `course`, `duration`, `studentImagePublicId`, `studentImageUrl`, `isDeleted`, `createdAt`) VALUES
(1, 'Ankur Shrivastava', 'MERN Stack Development', '6 Months', 'pnInfosysImages/nbbykgqyk9hzer8xe9hl', 'https://res.cloudinary.com/depjzfj9a/image/upload/v1728025491/pnInfosysImages/nbbykgqyk9hzer8xe9hl.jpg', 0, '2024-10-04 07:04:51'),
(2, 'Ankur Shrivastava Sahab', 'Utah Tech Lab Pvt Ltd', '6 Months', 'pnInfosysImages/vzaqcphhdoi3rbsdtsnl', 'https://res.cloudinary.com/depjzfj9a/image/upload/v1728036981/pnInfosysImages/vzaqcphhdoi3rbsdtsnl.jpg', 0, '2024-10-04 10:16:20'),
(3, 'Ankur Shrivastava Ji', 'Utah Tech Lab Pvt Ltd', '6 Months', 'pnInfosysImages/aeejux30dlnkhvyufiaj', 'https://res.cloudinary.com/depjzfj9a/image/upload/v1728037081/pnInfosysImages/aeejux30dlnkhvyufiaj.jpg', 0, '2024-10-04 10:18:00');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `contact_message_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `number` varchar(15) NOT NULL,
  `message` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isDeleted` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`contact_message_id`, `name`, `email`, `number`, `message`, `isDeleted`, `createdAt`) VALUES
(1, 'Ankur Shrivastava', 'ankur.shrivastava2011@gmail.com', '6985475522', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 0, '2024-10-04 10:57:47');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int NOT NULL,
  `courseName` varchar(100) NOT NULL,
  `fees` varchar(15) NOT NULL,
  `duration` varchar(25) NOT NULL,
  `startingDate` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `courseBannerPublicId` varchar(250) NOT NULL,
  `courseBannerUrl` varchar(250) NOT NULL,
  `isDeleted` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `courseName`, `fees`, `duration`, `startingDate`, `courseBannerPublicId`, `courseBannerUrl`, `isDeleted`, `createdAt`) VALUES
(1, 'Mern Stack Development', '6000', '6 Months', '2024-10-10', 'pnInfosysImages/j07zww6sqbhikwworvjl', 'https://res.cloudinary.com/depjzfj9a/image/upload/v1727962760/pnInfosysImages/j07zww6sqbhikwworvjl.jpg', 0, '2024-10-03 13:39:20'),
(2, 'NextJS 14', '4000', '3 Months', '2024-10-04', 'pnInfosysImages/xxaqs5txbviaglntqg2d', 'https://res.cloudinary.com/depjzfj9a/image/upload/v1727964651/pnInfosysImages/xxaqs5txbviaglntqg2d.jpg', 0, '2024-10-03 13:43:23'),
(3, 'Mean Stack Development', '6000', '6 Months', '2024-10-02', 'pnInfosysImages/immrnn2i7pqx0xue5lzv', 'https://res.cloudinary.com/depjzfj9a/image/upload/v1728020307/pnInfosysImages/immrnn2i7pqx0xue5lzv.jpg', 0, '2024-10-03 13:43:52');

-- --------------------------------------------------------

--
-- Table structure for table `interview_questions`
--

CREATE TABLE `interview_questions` (
  `interview_question_id` int NOT NULL,
  `courseId` bigint NOT NULL,
  `courseName` varchar(100) NOT NULL,
  `question` varchar(250) NOT NULL,
  `answer` varchar(1000) NOT NULL,
  `isDeleted` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `interview_questions`
--

INSERT INTO `interview_questions` (`interview_question_id`, `courseId`, `courseName`, `question`, `answer`, `isDeleted`, `createdAt`) VALUES
(1, 1, 'Laravel 10', 'What is the foreach loop ?', '<p>This is used for <strong>displaying</strong> <strong>list</strong>.</p>', 0, '2024-10-04 13:06:51'),
(2, 1, 'Laravel 10', 'What is map ?', '<p>No</p>', 0, '2024-10-04 13:09:18');

-- --------------------------------------------------------

--
-- Table structure for table `interview_question_courses`
--

CREATE TABLE `interview_question_courses` (
  `interview_question_course_id` int NOT NULL,
  `courseName` varchar(50) NOT NULL,
  `isDeleted` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `interview_question_courses`
--

INSERT INTO `interview_question_courses` (`interview_question_course_id`, `courseName`, `isDeleted`, `createdAt`) VALUES
(1, 'Laravel 10', 0, '2024-10-04 12:08:06'),
(2, 'Mern Stack Development', 0, '2024-10-04 13:17:57');

-- --------------------------------------------------------

--
-- Table structure for table `placements`
--

CREATE TABLE `placements` (
  `placement_id` int NOT NULL,
  `studentName` varchar(50) NOT NULL,
  `company` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `studentImagePublicId` varchar(250) NOT NULL,
  `studentImageUrl` varchar(250) NOT NULL,
  `isDeleted` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `placements`
--

INSERT INTO `placements` (`placement_id`, `studentName`, `company`, `designation`, `studentImagePublicId`, `studentImageUrl`, `isDeleted`, `createdAt`) VALUES
(1, 'Ankur Shrivastava Bhai', 'Utah Tech Lab Pvt Ltd', 'Full Stack Developer', 'pnInfosysImages/xeuyhxstknvswh7ccrvj', 'https://res.cloudinary.com/depjzfj9a/image/upload/v1728037245/pnInfosysImages/xeuyhxstknvswh7ccrvj.jpg', 0, '2024-10-04 10:20:44');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int NOT NULL,
  `courseId` bigint NOT NULL,
  `courseName` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contactNumber` varchar(15) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `address` varchar(500) NOT NULL,
  `college` varchar(100) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `qualification` varchar(100) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `courseId`, `courseName`, `name`, `email`, `contactNumber`, `gender`, `address`, `college`, `branch`, `qualification`, `semester`, `createdAt`) VALUES
(1, 1, 'Mern Stack Development', 'Ankur Shrivastava', 'ankur.shrivastava2011@gmail.com', '8770089556', 'MALE', 'de', 'ITM', 'EC', 'B.TECH', 'SIXTH', '2024-10-03 15:53:11'),
(2, 2, 'NextJS 14', 'John Doe', 'jonhdoe@gmail.com', '8770089556', 'MALE', 'Gwalior', 'MPCT', 'EE', 'BCA', 'FOURTH', '2024-10-04 06:30:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobileNumber` varchar(15) NOT NULL,
  `password` varchar(200) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `mobileNumber`, `password`, `createdAt`) VALUES
(1, 'Vikas Jain', 'jainvikas887@gmail.com', '9753353343', '$2b$10$cdY.WJGe4XBug7L4cmWVle2pMF4ymVirs4LwkId.blhczLIaga2Ey', '2024-09-26 07:11:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`certificate_id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`contact_message_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `interview_questions`
--
ALTER TABLE `interview_questions`
  ADD PRIMARY KEY (`interview_question_id`);

--
-- Indexes for table `interview_question_courses`
--
ALTER TABLE `interview_question_courses`
  ADD PRIMARY KEY (`interview_question_course_id`);

--
-- Indexes for table `placements`
--
ALTER TABLE `placements`
  ADD PRIMARY KEY (`placement_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `certificate_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `contact_message_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `interview_questions`
--
ALTER TABLE `interview_questions`
  MODIFY `interview_question_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `interview_question_courses`
--
ALTER TABLE `interview_question_courses`
  MODIFY `interview_question_course_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `placements`
--
ALTER TABLE `placements`
  MODIFY `placement_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
