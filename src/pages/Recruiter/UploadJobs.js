import { useState } from "react";
import { useForm } from "react-hook-form";
// import { CustomButton, JobCard, JobTypes, TextInput } from "../../components";
import CustomButton from "../../components/CustomButton";
import { jobs } from "../../utils/data";
import JobCard from "../../components/JobCard";
import JobType from "../../components/JobType";
// import TextInput from
import TextInput from "../../components/TextInput";

const UploadJob = () => {
  // const [jobtitle, setJobtitle] = useState("");
  const [jobtype, setJobType] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const [errMsg, setErrMsg] = useState("");
  const [jobTitle, setJobTitle] = useState("Full-Time");
  const onSubmit = async (data) => {
    const formData = {
      jobtitle: data.jobTitle,
      jobtype: data.jobType,
      vacancy: data.vacancy,
      experience: data.experience,
      location: data.location,
      description: data.desc,
      responsibilities: data.resposibilities,
    };

    try {
      const res = await fetch("/submit-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("Submission result:", result);
      alert("Job posted successfully");
      setJobTitle("");
      setJobType("");
      setVacancy("");
      setExperience("");
      setLocation("");
      setDescription("");
    } catch (error) {
      console.error("Submission error:", error);
      setErrMsg("Something went wrong during submission.");
    }
  };
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5 pt-20%">
      <div className="w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
        <div>
          <p className="text-gray-500 font-semibold text-2xl">Job Post</p>

          <form
            className="w-full mt-2 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="jobTitle"
              label="Job Title"
              placeholder="eg. Software Engineer"
              type="text"
              required={true}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              error={errors.jobTitle ? errors.jobTitle?.message : ""}
            />

            <div className="w-full flex gap-4">
              <div className={`w-1/2 mt-2`}>
                <label className="text-gray-600 text-sm mb-1">Job Type</label>
                <JobType jobTitle={jobTitle} setJobTitle={setJobTitle} />
              </div>

              <div className="w-1/2">
                <TextInput
                  name="salary"
                  label="Salary (USD)"
                  placeholder="eg. 1500"
                  type="number"
                  value={vacancy}
                  onChange={(e) => setVacancy(e.target.value)}
                  error={errors.salary ? errors.salary?.message : ""}
                />
              </div>
            </div>

            <TextInput
              name="vacancies"
              label="No. of Vacancies"
              placeholder="vacancies"
              type="number"
              value={vacancy}
              onChange={(e) => setVacancy(e.target.value)}
              error={errors.vacancies ? errors.vacancies?.message : ""}
            />

            <div className="w-full flex gap-4">
              <div className="w-1/2">
                <TextInput
                  name="experience"
                  label="Years of Experience"
                  placeholder="experience"
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  error={errors.experience ? errors.experience?.message : ""}
                />
              </div>

              <div className="w-1/2">
                <TextInput
                  name="location"
                  label="Job Location"
                  placeholder="eg. New York"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  error={errors.location ? errors.location?.message : ""}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">
                Job Description
              </label>
              <textarea
                className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                rows={4}
                cols={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                {...register("desc", {
                  required: "Job Description is required!",
                })}
                aria-invalid={errors.desc ? "true" : "false"}
              ></textarea>
              {errors.desc && (
                <span role="alert" className="text-xs text-red-500 mt-0.5">
                  {errors.desc?.message}
                </span>
              )}
            </div>

            {/* <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">
                Core Responsibilities
              </label>
              <textarea
                className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                rows={4}
                cols={6}
                value={responsility}
                onChange={(e) => setResponsiblity(e.target.value)}
                {...register("resposibilities")}
              ></textarea>
            </div> */}

            {errMsg && (
              <span role="alert" className="text-sm text-red-500 mt-0.5">
                {errMsg}
              </span>
            )}
            <div className="mt-2">
              <CustomButton
                type="submit"
                containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                title="Submit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0">
        <p className="text-gray-500 font-semibold">Recent Job Post</p>

        <div className="w-full flex flex-wrap gap-6">
          {jobs.slice(0, 4).map((job, index) => {
            return <JobCard job={job} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadJob;