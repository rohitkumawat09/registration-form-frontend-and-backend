import { useState } from "react";
import { instance } from "./axiosConfig";

const Home = () => {
  const [aadhaarFront, setAadhaarFrontFile] = useState(null);
  const [aadhaarBack, setAadhaarBackFile] = useState(null);

  const [aadharPreview, setAadharPreview] = useState({
    front: "",
    back: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadhaarFront: null,
    aadhaarBack: null,
    parentName: "",
    parentPhone: "",
    localAddress: "",
    sameAsLocal: false,
    permanentAddress: "",
    occupation: "Student",
    qualification: "",
    year: "",
    college: "",
    designation: "",
    company: "",
    course: "",
    source: "",
    friendName: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (name === "sameAsLocal") {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
          permanentAddress: checked ? prev.localAddress : "",
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAadharPreview((prev) => ({
            ...prev,
            [name === "aadhaarFront" ? "front" : "back"]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setAadharPreview((prev) => ({
          ...prev,
          [name === "aadhaarFront" ? "front" : "back"]: "",
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);

    try {
      const data = new FormData();

      for (const key in formData) {
        if (
          formData[key] !== null &&
          ![
            "qualification",
            "year",
            "college",
            "designation",
            "company",
          ].includes(key)
        ) {
          data.append(key, formData[key]);
        }
      }

      if (formData.occupation === "Student") {
        data.append("qualification", formData.qualification);
        data.append("year", formData.year);
        data.append("college", formData.college);
      } else {
        data.append("designation", formData.designation);
        data.append("company", formData.company);
      }

      const response = await instance.post("/api/details/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Form submitted successfully!");
      console.log("Success:", response.data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        aadhaarFront: null,
        aadhaarBack: null,
        parentName: "",
        parentPhone: "",
        localAddress: "",
        sameAsLocal: false,
        permanentAddress: "",
        occupation: "Student",
        qualification: "",
        year: "",
        college: "",
        designation: "",
        company: "",
        course: "",
        source: "",
        friendName: "",
        agreed: false,
      });
      setAadharPreview({ front: "", back: "" });
      setTermsAccepted(false);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        action="/api/details/add"
        method="post"
        encType="multipart/form-data"
      >
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
              value={formData.name}
              onChange={handleChange}
              required
              // minLength={4}
              // maxLength={30}
            />
            <input
              type="email"
              placeholder="Enter your email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              // pattern="\d{10}"
              // maxLength="10"
            />
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <div>
              <label>Gender:</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />{" "}
              Female
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />{" "}
              Other
            </div>
            {/* Aadhaar Image Uploads */}
            <div>
              <label htmlFor="aadhaarFront">Aadhaar Front:</label>
              <input
                type="file"
                name="aadhaarFront"
                id="aadhaarFront"
                onChange={handleChange}
                accept="image/*"
              />
              {aadharPreview.front && (
                <img
                  src={aadharPreview.front}
                  alt="Aadhaar Front Preview"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
            </div>
            <div>
              <label htmlFor="aadhaarBack">Aadhaar Back:</label>
              <input
                type="file"
                name="aadhaarBack"
                id="aadhaarBack"
                onChange={handleChange}
                accept="image/*"
              />
              {aadharPreview.back && (
                <img
                  src={aadharPreview.back}
                  alt="Aadhaar Back Preview"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
            </div>
          </div>

          <div className="section-box">
            <h3>Parent / Guardian Details</h3>
            <input
              type="text"
              placeholder="Enter your parent / guardian name"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
            />
            <input
              type="tel"
              placeholder="Enter your parent / guardian phone number"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              // pattern="\d{10}"
              // maxLength="10"
            />
          </div>

          <div className="section-box">
            <h3>Residential Details</h3>
            <textarea
              placeholder="Enter your local address (Where you stay in Jaipur)"
              name="localAddress"
              value={formData.localAddress}
              onChange={handleChange}
            ></textarea>
            <div>
              <input
                type="checkbox"
                id="sameAsLocal"
                name="sameAsLocal"
                checked={formData.sameAsLocal}
                onChange={handleChange}
              />
              <label htmlFor="sameAsLocal">
                Permanent address is the same as local address
              </label>

              <textarea
                placeholder="Enter your permanent address (address of your hometown)"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                disabled={formData.sameAsLocal} // Disable if sameAsLocal is checked
              ></textarea>
            </div>
          </div>

          <div className="section-box">
            <h3>Educational Details</h3>
            <div>
              <input
                type="radio"
                name="occupation" // Changed name from 'status' to 'occupation'
                value="Student"
                checked={formData.occupation === "Student"}
                onChange={handleChange}
              />{" "}
              Student
              <input
                type="radio"
                name="occupation" // Changed name from 'status' to 'occupation'
                value="Working"
                checked={formData.occupation === "Working"}
                onChange={handleChange}
              />{" "}
              Working Professional
              {formData.occupation === "Working" && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter your designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            {formData.occupation === "Student" && (
              <div>
                <input
                  type="text"
                  placeholder="Enter your qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Enter your completion year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="College / University"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="section-box">
            <h3>Course Details</h3>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select a course</option>
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
                checked={formData.source === "Google"}
                onChange={handleChange}
              />{" "}
              Google
              <input
                type="radio"
                name="source"
                value="LinkedIn"
                checked={formData.source === "LinkedIn"}
                onChange={handleChange}
              />{" "}
              LinkedIn
              <input
                type="radio"
                name="source"
                value="Instagram"
                checked={formData.source === "Instagram"}
                onChange={handleChange}
              />{" "}
              Instagram
              <input
                type="radio"
                name="source"
                value="College TPO"
                checked={formData.source === "College TPO"}
                onChange={handleChange}
              />{" "}
              College TPO
              <input
                type="radio"
                name="source"
                value="Friend"
                checked={formData.source === "Friend"}
                onChange={handleChange}
              />{" "}
              Friend
              {formData.source === "Friend" && (
                <div>
                  <input
                    type="text"
                    name="friendName"
                    placeholder="Enter your friend name"
                    value={formData.friendName || ""}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="toggle-container">
              <input
                type="checkbox"
                id="terms"
                name="agreed"
                checked={formData.agreed}
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

          <button type="submit" disabled={!formData.agreed || isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
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
                      setFormData((prev) => ({ ...prev, agreed: true }));
                      setTermsAccepted(true);
                      setShowTerms(false);
                    }}
                    style={{
                      cursor: "pointer",
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
                      cursor: "pointer",
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
