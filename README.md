# <a href="https://wingspan-dev-course.vercel.app/">WingSpan | Web Learning Course</a>

---

# Yêu Cầu Môi Trường để Chạy Dự Án | Setup Instructions

1. **Node.js and npm:**

   - Cài đặt Node.js phiên bản 18 trở lên. npm sẽ được cài đặt kèm theo. | Install Node.js version 18 or above. npm will be installed along with it.

2. **Angular CLI:**

   - Cài đặt Angular CLI bằng lệnh sau: | Install Angular CLI using the following command:
     ```bash
     npm install -g @angular/cli@latest
     ```

3. **Cài Đặt Dependencies Dự Án: | Install Project Dependencies:**

   - Trong thư mục gốc của dự án, chạy lệnh sau để cài đặt các dependencies | In the root directory of the project, run the following command to install project dependencies:
     ```bash
     npm install
     ```

4. **Chạy Dự Án | Run the Project:**
   - Chạy lệnh sau để khởi động dự án: | Execute the following command to start the project:
     ```bash
     ng serve
     ```
   - Access the application at `http://localhost:4200/` in your web browser.

---

## 1. Giới Thiệu | Introduction

<p>Dự án này là sự kết hợp của đam mê và kỹ thuật, hướng đến việc tạo ra một nền tảng giáo dục trực tuyến cho sinh viên trường FPT. Sử dụng công nghệ tiên tiến như Angular, NodeJS, và MongoDB, dự án này cung cấp một trải nghiệm học tập linh hoạt và tương tác cho người dùng.</p>
<p>This project is a fusion of passion and technical expertise, aiming to create an online education platform for FPT University students. Leveraging advanced technologies such as Angular, NodeJS, and MongoDB, this project provides a flexible and interactive learning experience for users.</p>

## 2. Hình Ảnh | Introduction Screenshots

### Màn Hình Landing | Landing Page

<div class="screenshot-container">
  <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/ScreenIntroduce%2Floadingpage.png?alt=media&token=15a87ef3-244e-48cf-a84e-026e084e2dfb" alt="Landing Page">
</div>
Mô tả chi tiết về Màn Hình Landing.

---

### Màn Hình Đăng Nhập | Login Page

<div class="screenshot-container">
  <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/ScreenIntroduce%2Flogin.png?alt=media&token=19452912-e4f3-4ede-9927-ef34b347661d" alt="Login Page">
</div>

Mô tả chi tiết về Màn Hình Đăng Nhập.

---

### Màn Hình Chi Tiết Khóa Học Page | Detail Course Page

<div class="screenshot-container">
  <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/ScreenIntroduce%2Fcourse_detail.png?alt=media&token=d8fbf8c2-9d17-4445-8703-40d3b3104c81" alt="Detail Course Page">
</div>

Mô tả chi tiết về Màn Hình Chi tiết khóa học.

---

### Màn Hình Video Bài Học | Lesson Video Page

<div class="screenshot-container">
  <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/ScreenIntroduce%2Flesson_video.png?alt=media&token=e89af1b3-43dd-44f6-b9a5-afdf6397d543" alt="Lesson Video Page">
</div>

Mô tả chi tiết về Màn Hình Video Bài Học.

---

### Màn Hình Giỏ hàng | Cart Page

<div class="screenshot-container">
  <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/ScreenIntroduce%2Fcart.png?alt=media&token=bb6d7fd0-7236-4b86-9e3e-f870d8f9ecf0" alt="Cart Page">
</div>

Mô tả chi tiết về Màn Hình Cart Page.

---

## 3. Cấu trúc của dự án | Project Structure

├── src \
│&nbsp;&nbsp;├── app \
│&nbsp;&nbsp;│&nbsp;&nbsp;├── client \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── pages \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── cart \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── cart.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course-detail \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course-leanring \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course-leanring-content \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course-leanring-content.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course-leanring-lessons \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course-leanring-lessons.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course-leanring-sidebar \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course-leanring-sidebar.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── landing \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── landing.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── profile \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── profile.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── sign-in \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── sign-in.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── index.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── index.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── client-routing.module.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── client.module.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;├── shared \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── layout \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── footer \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── footer.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── footer.component.html \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── header \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── header.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── header.component.html \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── sidebar \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── sidebar.component.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── sidebar.component.html \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── index.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── shared.module.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;├── core \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── models \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── billboard.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── cart.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── index.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── shared.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── localState.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── transaction.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── user.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── services \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── auth.service.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── cart.service.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── course.service.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── index.service.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── share.service.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── temp.service.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── toast.service.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── transaction.service.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── user.service.ts \
│&nbsp;&nbsp;│&nbsp;&nbsp;├── page-not-found \
│&nbsp;&nbsp;│&nbsp;&nbsp;│&nbsp;&nbsp;├── page-not-found.component.ts \
│&nbsp;&nbsp;├── app-routing.module.ts \
│&nbsp;&nbsp;├── app.component.css \
│&nbsp;&nbsp;├── app.component.html \
│&nbsp;&nbsp;├── app.component.spec.ts \
│&nbsp;&nbsp;├── app.component.ts \
│&nbsp;&nbsp;├── app.module.ts

---

## 4. Tính Năng Chính | Key Features

<p>Khóa Học Đa Dạng | Diverse Courses</p>

- Cung cấp nhiều khóa học lập trình web app, từ cơ bản đến nâng cao
- Offers a variety of web app programming courses, ranging from basic to advanced levels.

<p>Học Tương Tác | Interactive Learning</p>

- Tích hợp Pusher và Firebase để tạo môi trường học tập tương tác.
- Integrates Pusher and Firebase to create an interactive learning environment.
<p>Triển Khai Linh Hoạt | Flexible Deployment</p>

- Sử dụng Docker để đảm bảo quá trình triển khai dễ dàng và nhất quán.
- Flexible Deployment: Utilizes Docker to ensure an easy and consistent deployment process.

<p>Giao Diện Người Dùng Thân Thiện | User-Friendly Interface</p>

- Giao diện được thiết kế với Angular, tạo trải nghiệm người dùng mượt mà và trực quan.
- The interface is designed with Angular, providing a smooth and intuitive user experience.

---

## 5. Công Nghệ Sử Dụng | Technologies Used

- Frontend: Angular
- Backend: NodeJS, express
- Database: MongoDB
- Real-Time Interactions: Pusher, Firebase
- Containerization: Docker
- Send mail with Nodemailer
- Payment: Paypal, momo, zalopay
- GG Cloud: Login, Gmail API
  <table align="center">
    
    <tr>
      <td align="center" width="96">
          <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/README%2Ficons8-angular-48.png?alt=media&token=0ab65086-a322-4850-ba81-963acffda8d0" width="48" height="48" alt="C" />
        <br />Angular
      </td>
      <td align="center" width="96">
          <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/README%2Ficons8-typescript-48.png?alt=media&token=a397a416-b821-406b-aa67-7cc2816decd2" width="48" height="48" alt="C#" />
        <br />TS
      </td>
      <td align="center" width="96">
          <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/README%2Ficons8-nodejs-48.png?alt=media&token=db4a7793-ce8b-4f6d-9086-4ec51f5387dc" width="48" height="48" alt="Java" />
        <br />Nodejs
      </td>
      <td align="center" width="96">
          <img src="https://img.icons8.com/color/48/express-js.png" width="48" height="48" alt="Java" />
        <br />express
      </td>
    </tr>
    
    <tr>
      <td align="center" width="96">
          <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/README%2Ficons8-google-firebase-console-48.png?alt=media&token=af552a40-5db6-45c1-8564-d4cddc9a5b44" width="48" height="48" alt="TypeScript" />
        <br />Firebase
      </td>
      <td align="center" width="96">
          <img src="https://www.gstatic.com/pantheon/images/welcome/supercloud.svg" width="48" height="48" alt="TypeScript" />
        <br />Google Cloud
      </td>
      <td align="center" width="96">
          <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/README%2Ficons8-docker-48.png?alt=media&token=499cdb70-387a-4a4b-a8d0-3ff95a837fdc" width="48" height="48" alt="TypeScript" />
        <br />Docker
      </td>
     <td align="center" width="96">
          <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/README%2Ficons8-mongodb-a-cross-platform-document-oriented-database-program-48.png?alt=media&token=d0ec414b-79ad-437b-8835-8d567f9e80e3" width="48" height="48" alt="JavaScript" />
        <br />MongoDB
      </td>
       
    </tr>

    <tr>
       <td align="center" width="96">
          <img src="https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/README%2Ficons8-sass-48.png?alt=media&token=bb7a0178-6df6-4ad7-91e3-9d436e1d6282" width="48" height="48" alt="TypeScript" />
        <br />Sass
      </td>
      <td align="center" width="96">
          <img src="https://nodemailer.com/nm_logo_200x136.png" width="48" height="48" alt="TypeScript" />
        <br />Nodemailer
      </td>
       <td align="center" width="96">
          <img src="https://img.icons8.com/color/48/paypal.png" width="48" height="48" alt="TypeScript" />
        <br />Paypal
      </td>
       <td align="center" width="96">
          <img src="https://homepage.momocdn.net/jk/momo2020/img/sud/mascot-shadow.png" width="48" height="48" alt="TypeScript" />
        <br />Momo
      </td>
    </tr>

    <tr>
       <td align="center" width="96">
          <img src="data:image/jpeg;base64,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" width="48" height="48" alt="TypeScript" />
        <br />RxJS
      </td>
    </tr>

</table>

---

## Mục Tiêu Dự Án | Project Goals

- Mục tiêu của dự án này là tạo ra một nền tảng giáo dục trực tuyến chất lượng cao, dễ tiếp cận và hữu ích cho sinh viên FPT, đặc biệt là những người có niềm đam mê với lập trình web app.
- The goal of this project is to establish a high-quality online education platform that is easily accessible and beneficial for FPT University students, especially those passionate about web app development.
