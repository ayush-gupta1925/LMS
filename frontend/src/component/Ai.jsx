import React, { useState } from "react";
import ai from "../assets/aiC.png";
import { useNavigate } from "react-router-dom";
import open from "../assets/start.mp3";
import { useSelector } from "react-redux";
function Ai() {
  const navigate = useNavigate();
  let openingSound = new Audio(open);
  const { userData } = useSelector((state) => state.user);
  let [activeAi, setActiveAi] = useState(false);

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  const speechRecongnition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecongnition();
  if (!recognition) {
    console.log("Not Supported");
  }
  // recognition.onresult = (e) => {
  //   const transcript = e.results[0][0].transcript.trim();
  //   if (
  //     transcript.toLowerCase().includes("home") ||
  //     transcript.toLowerCase().includes("home page") ||
  //     transcript.toLowerCase().includes("open home page")
  //   ) {
  //     speak("opening home page");

  //     navigate("/");
  //   } else if (
  //     transcript.toLowerCase().includes("network") ||
  //     transcript.toLowerCase().includes("open network page") ||
  //     transcript.toLowerCase().includes("network page")
  //   ) {
  //     speak("open network page");
  //     navigate("/network");
  //   } else if (
  //     transcript.toLowerCase().includes("conversation") ||
  //     transcript.toLowerCase().includes("open conversation page") ||
  //     transcript.toLowerCase().includes("conversation page")
  //   ) {
  //     speak("opening conversations page");

  //     navigate("/conversations");
  //   } else if (
  //     transcript.toLowerCase().includes("profile") ||
  //     transcript.toLowerCase().includes("open profile page") ||
  //     transcript.toLowerCase().includes("profile page")
  //   ) {
  //     speak("opening profile page");

  //     navigate("/profile");
  //   } else if (
  //     transcript.toLowerCase().includes("notification") ||
  //     transcript.toLowerCase().includes("notification page") ||
  //     transcript.toLowerCase().includes("open notification page")
  //   ) {
  //     speak("opening notificationpage ");

  //     navigate("/notification");
  //   } else {
  //     console.log("try again");
  //   }
  // };


// recognition.onresult = (e) => {
//   const transcript = e.results[0][0].transcript.trim().toLowerCase();

//   if (transcript.includes("home") || transcript.includes("open home page")) {
//     speak("Opening Home page");
//     navigate("/");
//   } 
//   else if (transcript.includes("signup") || transcript.includes("sign up page")) {
//     speak("Opening Signup page");
//     navigate("/signup");
//   } 
//   else if (transcript.includes("login") || transcript.includes("log in page")) {
//     speak("Opening Login page");
//     navigate("/login");
//   } 
//   else if (transcript.includes("profile") || transcript.includes("open profile page")) {
//     speak("Opening Profile page");
//     navigate("/profile");
//   } 
//   else if (transcript.includes("edit profile") || transcript.includes("update profile")) {
//     speak("Opening Edit Profile page");
//     navigate("/editprofile");
//   } 
//   else if (transcript.includes("dashboard") || transcript.includes("educator dashboard")) {
//     speak("Opening Educator Dashboard");
//     navigate("/dashboard");
//   } 
//   else if (transcript.includes("enrolled courses") || transcript.includes("my enrolled courses")) {
//     speak("Opening My Enrolled Courses");
//     navigate("/mycourses");
//   }
//   else if (transcript.includes("create course") || transcript.includes("new course")) {
//     speak("Opening Create Course page");
//     navigate("/createcourses");
//   } 
//   else if (transcript.includes("all courses") || transcript.includes("open all courses")) {
//     speak("Opening All Courses page");
//     navigate("/allcourses");
//   }
//   else if (transcript.includes("courses") || transcript.includes("my courses")) {
//     speak("Opening Courses page");
//     navigate("/courses");
//   } 
//   else if (transcript.includes("search") || transcript.includes("search with ai")) {
//     speak("Opening Search with AI");
//     navigate("/search");
//   } 
//   else if (transcript.includes("forgot password") || transcript.includes("reset password")) {
//     speak("Opening Forgot Password page");
//     navigate("/forgotpassword");
//   } 
//   else {
//     speak("Sorry, I didn't understand. Please try again.");
//     console.log("No match found for:", transcript);
//   }
// };



// recognition.onresult = (e) => {
//   const transcript = e.results[0][0].transcript.trim().toLowerCase();

//   const role = userData?.role; // "educator" or "student" or undefined

//   if (transcript.includes("home") || transcript.includes("open home page")) {
//     speak("Opening Home page");
//     navigate("/");
//   } 
//   else if (transcript.includes("signup") || transcript.includes("sign up page")) {
//     speak("Opening Signup page");
//     navigate("/signup");
//   } 
//   else if (transcript.includes("login") || transcript.includes("log in page")) {
//     speak("Opening Login page");
//     navigate("/login");
//   } 
//    else if (transcript.includes("edit profile") || transcript.includes("update profile")) {
//     if(userData){
//       speak("Opening Edit Profile page");
//       navigate("/editprofile");
//     } else {
//       speak("You need to login first");
//     }
//   } 
//   else if (transcript.includes("profile") || transcript.includes("open profile page")) {
//     if(userData){
//       speak("Opening Profile page");
//       navigate("/profile");
//     } else {
//       speak("You need to login first");
//     }
//   } 
 
//   // Educator-only pages
//   else if (role === "educator" && (transcript.includes("dashboard") || transcript.includes("educator dashboard"))) {
//     speak("Opening Educator Dashboard");
//     navigate("/dashboard");
//   } 

//   else if (role === "educator" && (transcript.includes("create course") || transcript.includes("new course"))) {
//     speak("Opening Create Course page");
//     navigate("/createcourses");
//   } 
//   // General pages accessible to all logged-in users
//   else if (transcript.includes("all courses") || transcript.includes("open all courses")) {
//     if(userData){
//       speak("Opening All Courses page");
//       navigate("/allcourses");
//     } else {
//       speak("You need to login first");
//     }
//   } 
//   else if (transcript.includes("enrolled courses") || transcript.includes("my enrolled courses")) {
//     if(userData){
//       speak("Opening My Enrolled Courses");
//       navigate("/mycourses");
//     } else {
//       speak("You need to login first");
//     }
//   } 


//   else if (role === "educator" && (transcript.includes("courses") || transcript.includes("my courses"))) {
//     speak("Opening Courses page");
//     navigate("/courses");
//   } 




//   else if (transcript.includes("search") || transcript.includes("search with ai")) {
//     if(userData){
//       speak("Opening Search with AI");
//       navigate("/search");
//     } else {
//       speak("You need to login first");
//     }
//   } 
//   else if (transcript.includes("forgot password") || transcript.includes("reset password")) {
//     speak("Opening Forgot Password page");
//     navigate("/forgotpassword");
//   } 
//   else {
//     speak("Sorry, I didn't understand. Please try again.");
//     console.log("No match found for:", transcript);
//   }
// };


recognition.onresult = (e) => {
  const transcript = e.results[0][0].transcript.trim().toLowerCase();
  const role = userData?.role; // "educator" or "student" or undefined

  // Public pages
  if (transcript.includes("home") || transcript.includes("open home page")) {
    speak("Opening Home page");
    navigate("/");
  } 
  else if (transcript.includes("signup") || transcript.includes("sign up page")) {
    speak("Opening Signup page");
    navigate("/signup");
  } 
  else if (transcript.includes("login") || transcript.includes("log in page")) {
    speak("Opening Login page");
    navigate("/login");
  } 
  else if (transcript.includes("forgot password") || transcript.includes("reset password")) {
    speak("Opening Forgot Password page");
    navigate("/forgotpassword");
  } 

  // Logged-in user pages

  else if (transcript.includes("edit profile") || transcript.includes("update profile")) {
    if(userData){
      speak("Opening Edit Profile page");
      navigate("/editprofile");
    } else {
      speak("You need to login first");
    }
  } 

    else if (transcript.includes("profile") || transcript.includes("open profile page")) {
    if(userData){
      speak("Opening Profile page");
      navigate("/profile");
    } else {
      speak("You need to login first");
    }
  } 
  // Educator-only pages
  else if (transcript.includes("dashboard") || transcript.includes("educator dashboard")) {
    if(role === "educator"){
      speak("Opening Educator Dashboard");
      navigate("/dashboard");
    } else {
      speak("You are not an educator. This page is for educators");
    }
  } 

  else if (transcript.includes("create course") || transcript.includes("new course")) {
    if(role === "educator"){
      speak("Opening Create Course page");
      navigate("/createcourses");
    } else {
      speak("You are not an educator. This page is for educators");
    }
  } 


  // Pages accessible to all logged-in users
  else if (transcript.includes("all courses") || transcript.includes("open all courses")) {
    if(userData){
      speak("Opening All Courses page");
      navigate("/allcourses");
    } else {
      speak("You need to login first");
    }
  } 

  else if (transcript.includes("enrolled courses") || transcript.includes("my enrolled courses")) {
    if(userData){
      speak("Opening My Enrolled Courses");
      navigate("/mycourses");
    } else {
      speak("You need to login first");
    }
  } 


  else if (transcript.includes("courses") || transcript.includes("my courses")) {
    if(role === "educator"){
      speak("Opening Courses page");
      navigate("/courses");
    } else {
      speak("You are not an educator. This page is for educators");
    }
  } 

  else if (transcript.includes("search") || transcript.includes("search with ai")) {
    if(userData){
      speak("Opening Search with AI");
      navigate("/search");
    } else {
      speak("You need to login first");
    }
  } 

  else {
    speak("Sorry, I didn't understand. Please try again.");
    console.log("No match found for:", transcript);
  }
};


  recognition.onend = () => {
    setActiveAi(false);
  };

  return (
   <div
  className="fixed z-50 left-[2%] bottom-[20px] sm:bottom-[25px] md:bottom-[30px] lg:bottom-[20px]"
  onClick={() => {
    recognition.start();
    openingSound.play();
    setActiveAi(true);
  }}
>
  <img
    src={ai}
    className={`cursor-pointer rounded-full transform transition-all duration-300
      w-[70px] sm:w-[80px] md:w-[85px] lg:w-[90px]
      ${activeAi 
        ? "translate-x-[5%] translate-y-[-5%] sm:translate-x-[7%] sm:translate-y-[-7%] md:translate-x-[8%] md:translate-y-[-8%] lg:translate-x-[8%] lg:translate-y-[-8%] scale-110 sm:scale-110 md:scale-120 lg:scale-110 shadow-[0_0_20px_#00d2fc]" 
        : "translate-x-0 translate-y-0 scale-100 shadow-[0_0_10px_rgba(0,0,0,0.4)]"
      }`}
    style={{
      filter: activeAi
        ? "grayscale(0%) drop-shadow(0 0 20px #00d2fc)"
        : "grayscale(50%) drop-shadow(0 0 10px rgba(0,0,0,0.4))"
    }}
  />
</div>

  );
}

export default Ai;
