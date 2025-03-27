import elementLogin from "./login/login.js";
import elementRegister from "./register/register.js";
import elementHome from "./home/home.js";

const app = document.getElementById("app");
const pathname = window.location.pathname;

if (pathname == "/login" || pathname == "/login/") {
  const styleLogin = document.createElement("style");
  styleLogin.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Secular+One&display=swap');

body{
    margin: 0px;
}

.inputLoginContainer{
    display: flex;
    width: 90%;
    min-width: 240px;
    margin: 5px;
    background-color: #ffff;
    filter: drop-shadow(0 0 0.3rem rgb(0, 0, 0, 0.3));
    gap:5px;
    align-items: center;
    padding: 5px;
}

.inputLogin{
    width: 100%;
    font-size: 1rem;
    border: none;
    padding: 5px;
    background-color: #ffff;
}

#loginHeader {
    background-color: #0B2072;
}

#logo {
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
}

#logoText {
    font-family: 'Secular One';
    color: #fff;
    font-size: 1.8rem;
}

#mainLogin {
    display: flex;
    flex-grow: 2;
    align-items: center;
    justify-content: space-around;
}

#loginH1{
    text-align: center;
}

#formLogin {
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#footerLogin {
    background-color: #3D52A0;
    font-size: 1.2rem;
    display: flex;
    color: #A6B1D0;
    justify-content: center;
    align-items: center;
    padding: 10px;
    position: relative;
}

#githubImage {
    height: 29px;
    position: absolute;
    right: 15px;
}

#loginButtons{
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 90%;
}

#buttonLogin{
    font-size: 1.2rem;
    color: #ffff;
    background-color: #3D52A0;
    padding: 8px 30px;
    border-radius: 40px;
    border: none;
    transition: background-color 0.5s;
}

#spanRegistero{
    transition: color 0.5s;
    color: #3D52A0;
}

#buttonLogin:hover{
    cursor: pointer;
    background-color: #132d81;
}

#spanRegistero:hover{
    cursor: pointer;
    color: #1b1a1a;
}

#errorMessage {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}

  `;
  document.head.appendChild(styleLogin);
  app.appendChild(elementLogin);
} else if (pathname == "/registro" || pathname == "/registro/") {
  const styleRegister = document.createElement("style");
  styleRegister.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Secular+One&display=swap');

  body{
      margin: 0px;
  }

  .inputRegisterContainer{
      display: flex;
      width: 90%;
      min-width: 240px;
      margin: 5px;
      background-color: #ffff;
      filter: drop-shadow(0 0 0.3rem rgb(0, 0, 0, 0.3));
      gap:5px;
      align-items: center;
      padding: 5px;
  }

  .inputRegister{
      width: 100%;
      font-size: 1rem;
      border: none;
      padding: 5px;
      background-color: #ffff;
  }

  #registerHeader {
      background-color: #0B2072;
  }

  #logo {
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
  }

  #logoText {
      font-family: 'Secular One';
      color: #fff;
      font-size: 1.8rem;
  }

  #mainRegister {
      display: flex;
      flex-grow: 2;
      align-items: center;
      justify-content: space-around;
  }

  #registerH1{
      text-align: center;
  }

  #formRegister {
      width: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  #footerRegister {
      background-color: #3D52A0;
      font-size: 1.2rem;
      display: flex;
      color: #A6B1D0;
      justify-content: center;
      align-items: center;
      padding: 10px;
      position: relative;
  }

  #githubImage {
      height: 29px;
      position: absolute;
      right: 15px;
  }

  #registerButtons{
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 90%;
  }

  #buttonRegister{
      font-size: 1.2rem;
      color: #ffff;
      background-color: #3D52A0;
      padding: 8px 30px;
      border-radius: 40px;
      border: none;
      transition: background-color 0.5s;
  }

  #spanLogin{
      transition: color 0.5s;
      color: #3D52A0;
  }

  #buttonRegister:hover{
      cursor: pointer;
      background-color: #132d81;
  }

  #spanLogin:hover{
      cursor: pointer;
      color: #1b1a1a;
  }
  `;
  document.head.appendChild(styleRegister);
  app.appendChild(elementRegister);
} else if (pathname == "/" || pathname == "") {
  const styleHome = document.createElement("style");
  styleHome.innerHTML = `
  body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.header {
    background-color: #0B2072;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
}

.nav-links, .auth-links {
    display: flex;
    align-items: center;
    gap: 20px;
}

.nav-links a, .auth-links a {
    text-decoration: none;
    color: white;
    font-size: 16px
}

.register {
    padding: 5px 15px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 70px;
    background-color: #0032A1;
    color: white;
    position: relative;
}

.banner-content {
    max-width: 60%;
    margin-right: 50px;
}

.banner-text {
    font-size: 20px;
    text-align: left;
    margin-top: 20px;
}

.btn-register {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #FE6900;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
}

.banner-images {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 65%;
    max-width: 100%;
}

.image-runner, .image-student {
    width: 45%;
    height: auto;
    display: block;
    object-fit: contain;
}

.why-use {
    background-color: white;
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;
}

.section-title {
    font-size: 32px;
    color: black;
    margin-bottom: 60px;
}

.cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.card {
    background-color: #133549;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    width: 300px;
    box-sizing: border-box;
}

.card-title {
    font-size: 18px;
    margin-bottom: 10px;
}

.card-text {
    font-size: 14px;
    line-height: 1.4;
}

@media (max-width: 768px) {
    .cards-container {
        grid-template-columns: repeat(2, 1fr); 
    }
}

@media (max-width: 480px) {
    .cards-container {
        grid-template-columns: 1fr;
    }
}

.testimonials {
    background-color: #FE6900;
    padding: 30px 0;
    text-align: center;
}

.testimonials .section-title {
    font-size: 32px;
    color: white;
    margin-bottom: 60px;
}

.cards-container {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.testimonial-card {
    background-color: white;
    width: 45%;
    height: 300px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
}

.testimonial-image {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    padding-left: 10px;
}

.testimonial-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.testimonial-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding-right: 10px;
}

.testimonial-name {
    font-size: 20px;
    font-weight: bold;
    color:#133549;
    margin-bottom: 10px;
}

.testimonial-text {
    font-size: 16px;
    color: #333;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .cards-container {
        flex-direction: column;
        align-items: center;
    }
    .testimonial-card {
        width: 80%;
        margin-bottom: 20px;
    }
}

.plans {
    background-color: white;
    padding: 60px 0;
    text-align: center;
}

.plans .section-title {
    font-size: 32px;
    color: black;
    margin-bottom: 40px;
}

.plans-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.plan-card {
    background-color: white;
    width: 30%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100%;
    box-sizing: border-box;
}

.plan-title {
    font-size: 24px;
    font-weight: bold;
    color: #133549;
    margin-bottom: 10px;
}

.plan-price {
    font-size: 20px;
    color: #FE6900;
    margin-bottom: 20px;
}

.btn-register {
    background-color: #FE6900;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    margin-bottom: 20px;
}

.divider {
    width: 100%;
    height: 1px;
    background-color: #ddd;
    margin: 20px 0;
}

.plan-features {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.plan-features li {
    font-size: 16px;
    color: #333;
    margin: 5px 0;
    display: flex;
    align-items: center;
}

.check-icon {
    margin-right: 10px;
    color: black;
}

@media (max-width: 768px) {
    .plans-container {
        flex-direction: column;
        align-items: center;
    }
    .plan-card {
        width: 80%;
        margin-bottom: 20px;
    }
}

@media (max-width: 480px) {
    .plan-card {
        width: 100%;
    }
}

.faq {
    background-color: #F1F1F1;
    padding: 40px 20px;
    text-align: center;
}

.faq .section-title {
    font-size: 32px;
    color: black;
    margin-bottom: 90px;
}

.faq-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
}

.faq-item {
    margin-bottom: 20px;
}

.faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: #133549;
}

.faq-text {
    margin: 0;
}

.arrow {
    font-size: 20px;
    color: #133549;
    cursor: pointer;
}

.divider {
    width: 100%;
    height: 1px;
    background-color: #ddd;
    margin-top: 10px;
}

.footer {
    background-color: #0B2072;
    color: white;
    padding: 10px 0;
    text-align: center;
}

.footer-nav {
    display: flex;
    justify-content: center;
    gap: 40px;
    align-items: center;
}

.footer-nav a {
    text-decoration: none;
    color: white;
    font-size: 16px;
}

.footer-nav a.contact {
    display: flex;
    align-items: center;
    gap: 5px;
}

.footer-signature {
    margin-top: 10px;
    font-size: 14px;
    color: #ddd;
}
  `;
  document.head.appendChild(styleHome);
  app.appendChild(elementHome);
}
