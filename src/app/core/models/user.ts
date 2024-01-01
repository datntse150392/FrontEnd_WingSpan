export interface User {
  _id?: string;
  username?: string;
  fullName?: string;
  email?: string;
  profileImage?: string;
  dateOfBirth?: string;
  enrolledCourses?: [];
  createAt?: Date;
  is_admin?: Boolean;
  is_teacher?: Boolean;
  is_comment_blocked?: Boolean;
  is_blocked?: Boolean;
  room?: [];
}
