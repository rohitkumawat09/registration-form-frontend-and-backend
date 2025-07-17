import { useState } from "react";
import { instance } from "./axiosConfig";
const Home = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    parentName: "",
    parentPhone: "",
    localAddress: "",
    permanentAddress: "",
    designation: "",
    company: "",
    sameAddress: false,
    status: "Student",
    qualification: "",
    year: "",
    college: "",
    course: "",
    source: "Google",
    agreed: false,
    friendName: "",
  });

  // const [message, setMessage] = useState({
  //   type: "",
  //   messageString: "",
  // });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setData((prev) => ({
        ...prev,
        [name]: checked,
        ...(name === "sameAddress" && checked
          ? { permanentAddress: prev.localAddress }
          : name === "sameAddress" && !checked
        ? { permanentAddress: "" }  
          : {}),
      }));
    } else {
      setData((prev) => {
        let updatedData = { ...prev, [name]: value };

        if (name === "status" && value === "Student") {
          updatedData.designation = "";
          updatedData.company = "";
        }
        if (name === "status" && value === "Working") {
          updatedData.qualification = "";
          updatedData.year = "";
          updatedData.college = "";
        }

        return updatedData;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Data: ", data);
    try {
      console.log("first");
      const response = await instance.post("/api/details/add", data);
      console.log(response);
      if (response.status === 200) {
       alert("data add");
      }
    } catch (error) {
      // setMessage({
      //   type: "error",
      //   messageString: error.response?.data?.message || "Something went wrong",
      // });
      console.log(error);
    }

    setData({
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      parentName: "",
      parentPhone: "",
      localAddress: "",
      permanentAddress: "",
      sameAddress: false,
      status: "Student",
      qualification: "",
      designation: "",
      company: "",
      year: "",
      college: "",
      course: "",
      source: "Google",
      agreed: false,
      friendName: "",
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}  action="/api/details/add" method="post"encType="multipart/form-data">
        <div className="form-container">
          {/* {message?.type && (
            <div className={`message-box ${message.type}`}>
              {message.messageString}
            </div>
          )} */}

          <div className="section-box">
            <h3>Personal Details</h3>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
  //          minLength={4}
  // maxLength={30}
            />
            <input
              type="email"
              placeholder="Enter your email address"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              placeholder="Enter your phone number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              required
  //               pattern="\d{10}"
  // maxLength="10"
            />
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              name="dob"
              value={data.dob}
              onChange={handleChange}
              required
            />
            <div>

              
  <input type="file" name="avatar" />

              <label>Gender:</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={data.gender === "Male"}
                onChange={handleChange}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={data.gender === "Female"}
                onChange={handleChange}
              />{" "}
              Female
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={data.gender === "Other"}
                onChange={handleChange}
              />{" "}
              Other
            </div>
          </div>

          <div className="section-box">
            <h3>Parent / Guardian Details</h3>
            <input
              type="text"
              placeholder="Enter your parent / guardian name"
              name="parentName"
              value={data.parentName}
              onChange={handleChange}
            />
            <input
              type="tel"
              placeholder="Enter your parent / guardian phone number"
              name="parentPhone"
              value={data.parentPhone}
              onChange={handleChange}
  //                  pattern="\d{10}"
  // maxLength="10"
            />
          </div>

          <div className="section-box">
            <h3>Residential Details</h3>
            <textarea
              placeholder="Enter your local address (Where you stay in Jaipur)"
              name="localAddress"
              value={data.localAddress}
              onChange={handleChange}
            ></textarea>
            <div>
              <input
                type="checkbox"
                id="sameAddress"
                name="sameAddress"
                value={data.sameAddress}
                onChange={handleChange}
              />
              <label htmlFor="sameAddress">
                Permanent address is the same as local address
              </label>

              <textarea
                placeholder="Enter your permanent address (address of your hometown)"
                name="permanentAddress"
                value={data.permanentAddress}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="section-box">
            <h3>Educational Details</h3>
            <div>
              <input
                type="radio"
                name="status"
                value="Student"
                checked={data.status === "Student"}
                onChange={handleChange}
              />{" "}
              Student
              <input
                type="radio"
                name="status"
                value="Working"
                checked={data.status === "Working"}
                onChange={handleChange}
              />{" "}
              Working Professional
              {data.status === "Working" && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter your designation"
                    name="designation"
                    value={data.designation}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    name="company"
                    value={data.company}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            {data.status === "Student" && (
              <div>
                <input
                  type="text"
                  placeholder="Enter your qualification"
                  name="qualification"
                  value={data.qualification}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Enter your completion year"
                  name="year"
                  value={data.year}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="College / University"
                  name="college"
                  value={data.college}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="section-box">
            <h3>Course Details</h3>
            <select name="course" value={data.course} onChange={handleChange}>
              <option>Select a course</option>
              <option>Full Stack Development</option>
              <option>Frontend Development</option>
              <option>Backend Development</option>
            </select>

            <p>How did you come to know about us?</p>
            <div>
              <input
                type="radio"
                name="source"
                value="Google"
                checked={data.source === "Google"}
                onChange={handleChange}
              />{" "}
              Google
              <input
                type="radio"
                name="source"
                value="LinkedIn"
                checked={data.source === "LinkedIn"}
                onChange={handleChange}
              />{" "}
              LinkedIn
              <input
                type="radio"
                name="source"
                value="Instagram"
                checked={data.source === "Instagram"}
                onChange={handleChange}
              />{" "}
              Instagram
              <input
                type="radio"
                name="source"
                value="College TPO"
                checked={data.source === "College TPO"}
                onChange={handleChange}
              />{" "}
              College TPO
              <input
                type="radio"
                name="source"
                value="Friend"
                checked={data.source === "Friend"}
                onChange={handleChange}
              />{" "}
              Friend
              {data.source === "Friend" && (
                <div>
                  <input
                    type="text"
                    name="friendName"
                    placeholder="Enter your friend name"
                    value={data.friendName || ""}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            {/* <input
              type="checkbox"
              id="terms"
              name="agreed"
              checked={data.agreed}
              onChange={handleChange}
            /> */}

            <div className="toggle-container">
              <input
                type="checkbox"
                id="terms"
                name="agreed"
                checked={data.agreed}
                onChange={handleChange}
                className="toggle-input"
                disabled={!termsAccepted}
              />
              <label
                htmlFor="terms"
                className="toggle-label"
                onClick={() => setShowTerms(true)}
              ></label>
            </div>

            <label
              htmlFor="terms"
              onClick={() => setShowTerms(true)}
              style={{ cursor: "pointer" }}
            >
              By clicking submit, you agree to our
              <span style={{ color: "#007bff" }}> Terms & Conditions</span>
            </label>
          </div>

          <button type="submit" disabled={!data.agreed}>
            Register
          </button>

          {showTerms && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  padding: "20px",
                  width: "90%",
                  maxWidth: "500px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
                }}
              >
                <h2>Terms & Conditions</h2>
                <hr />
                <p>
                  <strong>You agree to the following:</strong>
                </p>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>You have understood the course content.</li>
                  <li>You have understood the course duration.</li>
                  <li>
                    You have cleared all your doubts regarding the course, the
                    content, and the duration.
                  </li>
                  <li>Fees once paid is not refundable.</li>
                  <li>
                    In case of uninformed leave, I will not be eligible for a
                    backup.
                  </li>
                  <li>
                    7 days or more of leave without prior permission would
                    result in termination of registration.
                  </li>
                </ul>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={() => {
                      setData((prev) => ({ ...prev, agreed: true }));
                      setTermsAccepted(true);
                      setShowTerms(false);
                    }}
                    style={{
                      cursor:"pointer",

                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "4px",
                    }}
                  >
                    I Agree
                  </button>

                  <button
                    onClick={() => setShowTerms(false)}
                    style={{
                      cursor:"pointer",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "4px",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Home;
