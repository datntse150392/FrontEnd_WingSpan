export interface Course {
  _id: string;
  title: string;
  titleDescription: string;
  subTitle: string;
  subTitleDescription: string[];
  mainCourse: [];
  enrollmentCount: number;
  status: string;
  type: string;
  amount: number;
  image: string;
}
