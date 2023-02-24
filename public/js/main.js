// popover
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

// gender select
let maleRadioBtn, femaleRadioBtn, customRadioBtn, genderSelect;

if (document.querySelector("#maleLabel") != null) {
  maleRadioBtn = document.querySelector("#maleLabel");
  maleRadioBtn.addEventListener("change", () => {
    genderSelect.classList.add("d-none");
  });
}

if (document.querySelector("#femaleLabel") != null) {
  femaleRadioBtn = document.querySelector("#femaleLabel");
  femaleRadioBtn.addEventListener("change", () => {
    genderSelect.classList.add("d-none");
  });
}

if (document.querySelector("#customLabel") != null) {
  customRadioBtn = document.querySelector("#customLabel");
  customRadioBtn.addEventListener("change", () => {
    genderSelect.classList.remove("d-none");
  });
}

if (document.querySelector("#genderSelect") != null)
  genderSelect = document.querySelector("#genderSelect");

// carsoul
let myCarouselElement;
if (document.querySelector("#carouselExampleControls") != null) {
  myCarouselElement = document.querySelector("#carouselExampleControls");

  new bootstrap.Carousel(myCarouselElement, {
    interval: 5000,
    touch: false,
  });
}

if (window.location.pathname == "/") {
  // handeling eye button
  let eyeBtnPass = document.querySelector("#eyeBtnPass");
  let eyeBtnPassConf = document.querySelector("#eyeBtnPassConf");

  // password box
  let passBox = document.querySelector("#passBox");
  let passConfBox = document.querySelector("#passConfBox");

  function eyeBtnExchange(eyeBtn, id, box) {
    if (document.querySelector(`#${id}`) != null) {
      eyeBtn = document.querySelector(`#${id}`);
      // console.log(eyeBtn);
      let firstIcon = document.querySelector(`#${id} i:first-child`);
      let secondIcon = document.querySelector(`#${id} i:last-child`);
      eyeBtn.addEventListener("click", () => {
        if (secondIcon.classList.contains("d-none"))
          secondIcon.classList.remove("d-none");
        else secondIcon.classList.add("d-none");

        if (!firstIcon.classList.contains("d-none"))
          firstIcon.classList.add("d-none");
        else firstIcon.classList.remove("d-none");

        if (box.getAttribute("type") == "password")
          box.setAttribute("type", "text");
        else box.setAttribute("type", "password");
      });
    }
  }

  eyeBtnExchange(eyeBtnPass, "eyeBtnPass", passBox);
  eyeBtnExchange(eyeBtnPassConf, "eyeBtnPassConf", passConfBox);

  // handling flash message
  if (document.querySelector(".flash-msg") != null) {
    let msgs = document.querySelectorAll(".flash-msg");
    setTimeout(() => {
      msgs.forEach((msg) => {
        msg.classList.add("d-none");
      });
    }, 15000);
  }
  // declare registration data
  let fname,
    lname,
    emailOrPhone,
    day,
    month,
    year,
    gender,
    pass,
    passConf,
    // declare login data
    userName,
    password;

  // set initial Date
  // date of birth
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date();
  // - day
  document.querySelector("#day").value = date.getDay() - 2;
  console.log(date.getDay());
  // - month
  document.querySelector("#month").value = months[date.getMonth() - 1];
  console.log(document.querySelector("#month").value);
  // - year
  document.querySelector("#year").value = date.getFullYear();

  function getValuesEnteredByUser() {
    // ==> Registered Data
    // fn
    fname = document.querySelector("#fname").value;
    // ln
    lname = document.querySelector("#lname").value;
    // email or phone
    emailOrPhone = document.querySelector("#emailOrPhone").value;
    // date of birth
    // - day
    day = document.querySelector("#day").value;
    // - month
    month = document.querySelector("#month").value;
    // - year
    year = document.querySelector("#year").value;
    // pass
    pass = document.querySelector("#passBox").value;
    // pass Confirm
    passConf = document.querySelector("#passConfBox").value;
    // gender
    gender = document.querySelector('input[name="gender"]:checked').value;
  }
  console.log(`user name : ${userName}`);
  console.log(`password : ${password}`);
  function focuseBtn() {
    this.focus();
  }

  function saveDataInLocalStorege() {
    // registration data
    if (fname !== null) localStorage.setItem("fname", fname);
    if (lname !== null) localStorage.setItem("lname", lname);
    if (emailOrPhone !== null)
      localStorage.setItem("emailOrPhone", emailOrPhone);
    if (day !== null) localStorage.setItem("day", day);
    if (month !== null) localStorage.setItem("month", month);
    if (year !== null) localStorage.setItem("year", year);
    if (pass !== null) localStorage.setItem("pass", pass);
    if (passConf != null) localStorage.setItem("passConf", passConf);
    if (gender !== null) localStorage.setItem("gender", gender);
  }

  // get data when you enter it for the second time
  let signBtn = document.querySelector("#signBtn");
  signBtn.addEventListener("click", () => {
    // set focused default on fname
    document.getElementById("fname").focus();
    // get values from input Boxes
    getValuesEnteredByUser();
    // save all data in local Storege
    saveDataInLocalStorege();
  });

  function setBoxesValueFromLocalStorege() {
    // set all value from the data saved in the localStorege
    // fn
    if (localStorage.getItem("fname") !== null)
      document.querySelector("#fname").value = localStorage.getItem("fname");
    // ln
    if (localStorage.getItem("lname") !== null)
      document.querySelector("#lname").value = localStorage.getItem("lname");
    // email or phone
    if (localStorage.getItem("emailOrPhone") !== null)
      document.querySelector("#emailOrPhone").value =
        localStorage.getItem("emailOrPhone");
    // date of birth
    // - day
    if (localStorage.getItem("day") !== null)
      document.querySelector("#day").value = localStorage.getItem("day");
    // - month
    if (localStorage.getItem("month") !== null)
      document.querySelector("#month").value = localStorage.getItem("month");
    // - year
    if (localStorage.getItem("year") !== null)
      document.querySelector("#year").value = localStorage.getItem("year");
    // pass
    if (localStorage.getItem("pass") !== null)
      document.querySelector("#passBox").value = localStorage.getItem("pass");
    // pass Confirm
    if (localStorage.getItem("passConf") !== null)
      document.querySelector("#passConfBox").value =
        localStorage.getItem("passConf");

    // -- set radio button checked
    if (localStorage.getItem("gender") == "male") {
      maleRadioBtn.checked = true;
    } else if (localStorage.getItem("gender") == "female") {
      femaleRadioBtn.checked = true;
    } else if (localStorage.getItem("gender") == "custom") {
      customRadioBtn.checked = true;
    }
  }

  setBoxesValueFromLocalStorege();

  // check if label empty or not
  let EnteredInputs = document.querySelectorAll(
    'input:not([type="submit"], [type="radio"])'
  );

  // saving local data
  let loginBtn = document.querySelector("#loginBtn");
  loginBtn.addEventListener("click", () => {
    // getting data values from user
    userName = document.querySelector("#userName").value;
    password = document.querySelector("#password").value;
    // saving values in local storege
    if (userName !== null) localStorage.setItem("userName", userName);
    if (password !== null) localStorage.setItem("password", password);
  });

  // set boxes values from the getting values
  if (localStorage.getItem("userName") !== null)
    document.getElementById("userName").value =
      localStorage.getItem("userName");
  if (localStorage.getItem("password") !== null)
    document.getElementById("password").value =
      localStorage.getItem("password");

  // all inputs should be after all inputs you need to apply this rule for them
  EnteredInputs.forEach((eachInput) => {
    console.log(eachInput.value);
    if (eachInput.value !== "") eachInput.classList.add("entered-input");
    else eachInput.classList.add("general-background");
  });
}
// ---------------- profile -------------------------------
if (
  window.location.pathname.includes("/profile") ||
  window.location.pathname == "/upload_back_image" ||
  window.location.pathname == "/upload_person_image"
) {
   // remove css & js files not ready
   console.log(document.querySelectorAll(".temp-remove"));
  // document.querySelectorAll(".temp-remove").forEach((temp)=> temp.remove());

  let img = document.querySelector(".profile-section #back-img");
  let width = img.clientWidth;
  let changeBack = document.querySelector("#changeBack");
  changeBack.style.width = `${width}px`;

  window.onresize = function () {
    width = img.clientWidth;
    console.log(`img width: ${width}`);
    changeBack.style.width = `${width}px`;
  };

  // change background event
  let backImg = document.querySelector("#back-img");
  let personImg = document.querySelector("#personal-img");
  let backImgInput = document.querySelector("#back-img-input");
  let personImgInput = document.querySelector("#personal-img-input");
  let backImgSubmit = document.querySelector(
    "#back-img-input + input[type='submit']"
  );
  let personImgSubmit = document.querySelector(
    "#personal-img-input + input[type='submit']"
  );

  function takeFileFromPressedImg(Img, btn) {
    Img.addEventListener("click", () => {
      btn.click(); // to upload file image
    });
  }

  takeFileFromPressedImg(backImg, backImgInput);
  takeFileFromPressedImg(personImg, personImgInput);

  // get file name
  function getFileNameFromInput(In, subbtn) {
    In.onchange = () => {
      console.log(In.files.item(0).name);
      console.log(In.files.item(0).size);
      console.log(In.files.item(0).type);
      subbtn.click();
    };
  }

  getFileNameFromInput(backImgInput, backImgSubmit);
  getFileNameFromInput(personImgInput, personImgSubmit);
}
console.log("path name: " + window.location.host);
