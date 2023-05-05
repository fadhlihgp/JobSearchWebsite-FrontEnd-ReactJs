import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  let navigate = useNavigate();

  // input login register
  const [inputAuth, setInputAuth] = useState({
    name: "",
    image_url: "",
    email: "",
    password: "",
    current_password: "",
    new_password: "",
  });

  // input job
  const [inputJob, setInputJob] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: "",
    company_name: "",
    company_image_url: "",
    company_city: "",
    salary_min: 0,
    salary_max: 0,
  });

  const [fetchStatus, setFetchStatus] = useState(true);

  const [data, setData] = useState(null);

  const [currentId, setCurrentId] = useState(-1);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setInputAuth({ ...inputAuth, [name]: value });
  };

  const handleInputJob = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setInputJob({ ...inputJob, [name]: value });
  };

  const fetchData = () => {
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        console.log(res);
        let data = res.data.data;
        let resultData = data.map((e) => {
          let {
            company_city,
            company_image_url,
            company_name,
            job_description,
            job_qualification,
            job_tenure,
            job_type,
            salary_max,
            salary_min,
            title,
            id,
          } = e;
          return {
            company_city,
            company_image_url,
            company_name,
            job_description,
            job_qualification,
            job_tenure,
            job_type,
            salary_max,
            salary_min,
            title,
            id,
          };
        });

        setData([...resultData]);
        setFetchStatus(false);
      })
      .catch((error) => {});
  };

  const fetchDataDetail = () => {
    axios.get(`https://dev-example.sanbercloud.com/api/job-vacancy/${currentId}`).then((res) => {
      let data = res.data;

      setInputJob({
        title: data.title,
        job_description: data.job_description,
        job_qualification: data.job_qualification,
        job_type: data.job_type,
        job_tenure: data.job_tenure,
        job_status: data.job_status,
        company_name: data.company_name,
        company_image_url: data.company_image_url,
        company_city: data.company_city,
        salary_min: data.salary_min,
        salary_max: data.salary_max,
      });
    });
  };

  const moveAdd = (event) => {
    event.preventDefault();

    setCurrentId(-1);
    setInputJob({
      title: "",
      job_description: "",
      job_qualification: "",
      job_type: "",
      job_tenure: "",
      job_status: "",
      company_name: "",
      company_image_url: "",
      company_city: "",
      salary_min: "",
      salary_max: "",
    });
    navigate("/dashboard/list-job-vacancy/form");
  };

  const resetJobInput = () => {
    setInputJob({
      title: "",
      job_description: "",
      job_qualification: "",
      job_type: "",
      job_tenure: "",
      job_status: "",
      company_name: "",
      company_image_url: "",
      company_city: "",
      salary_min: "",
      salary_max: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let {
      title,
      job_description,
      job_qualification,
      job_type,
      job_tenure,
      job_status,
      company_name,
      company_image_url,
      company_city,
      salary_min,
      salary_max,
    } = inputJob;

    if (parseInt(salary_min) >= parseInt(salary_max)) {
      toast.error("Minimum gaji harus lebih kecil dari maximum gaji !", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
      });
    } else {
      if (currentId === -1) {
        axios
          .post(
            "https://dev-example.sanbercloud.com/api/job-vacancy",
            {
              title,
              job_description,
              job_qualification,
              job_type,
              job_tenure,
              job_status,
              company_name,
              company_image_url,
              company_city,
              salary_min,
              salary_max,
            },
            { headers: { Authorization: "Bearer " + Cookies.get("token") } }
          )
          .then((res) => {
            toast.success("Berhasil menambah data", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored",
            });
            resetJobInput();
            setFetchStatus(true);
            navigate("/dashboard/list-job-vacancy");
          })
          .catch((error) => {
            toast.error("Kesalahan dalam menyimpan data", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored",
            });
            console.log(error);
          });
      } else {
        axios
          .put(
            "https://dev-example.sanbercloud.com/api/job-vacancy/" + currentId,
            {
              title,
              job_description,
              job_qualification,
              job_type,
              job_tenure,
              job_status,
              company_name,
              company_image_url,
              company_city,
              salary_min,
              salary_max,
            },
            { headers: { Authorization: "Bearer " + Cookies.get("token") } }
          )
          .then((res) => {
            toast.success("Berhasil mengubah data", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored",
            });
            resetJobInput();
            setFetchStatus(true);
            setCurrentId(-1);
            navigate("/dashboard/list-job-vacancy");
          })
          .catch((error) => {
            toast.error("Kesalahan memperbarui data", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored",
            });
            console.log(error);
            setCurrentId(-1);
          });
      }
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    let { email, password } = inputAuth;

    axios
      .post(`https://dev-example.sanbercloud.com/api/login`, { email, password })
      .then((res) => {
        console.log(res);
        let data = res.data;
        const { token, user } = data;

        Cookies.set("token", token, { expires: 1 });
        Cookies.set("user", JSON.stringify(user), { expires: 1 });

        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Email atau password salah !", {
          theme: "colored",
          position: toast.POSITION.TOP_CENTER,
        });
      });

    setInputAuth({
      email: "",
      password: "",
    });
  };

  const handleLogout = (event) => {
    Cookies.remove("token");
    Cookies.remove("user");
    navigate("/login");
  };

  const handleRegister = (event) => {
    event.preventDefault();
    let { name, image_url, email, password } = inputAuth;

    if (password.length > 8) {
      axios
        .post("https://dev-example.sanbercloud.com/api/register", { name, image_url, email, password })
        .then((res) => {
          let data = res.data;
          toast.success("Berhasil membuat akun, Silahkan login", {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
          });
          navigate("/login");
        })
        .then((error) => {
          alert(error.message);
        });
    } else if (password.length < 8) {
      toast.error("Password harus lebih dari 8 karakter !", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    }

    setInputAuth({
      name: "",
      image_url: "",
      email: "",
      password: "",
      current_password: "",
      new_password: "",
    });
  };

  const handleDelete = (id) => {
    //let id = event.target.value;
    axios
      .delete(`https://dev-example.sanbercloud.com/api/job-vacancy/${id}`, {
        headers: { Authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        toast.success("Berhasil menghapus data", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
        setFetchStatus(true);
      })
      .catch((error) => {
        toast.error("Kesalahan dalam menghapus data", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
      });
  };

  const handleEdit = (event) => {
    let id = event.target.value;
    setCurrentId(id);
    navigate(`/dashboard/list-job-vacancy/edit/${id}`);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    let { current_password, new_password } = inputAuth;

    if (current_password.length < 8 || new_password.length < 8) {
      toast.error("Minimal password harus 8 karakter", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (current_password === new_password) {
      toast.error("password lama dan password baru tidak boleh sama !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      axios
        .post(
          "https://dev-example.sanbercloud.com/api/change-password",
          { current_password, new_password },
          { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        )
        .then((res) => {
          toast.success("Password berhasil di ubah", {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
          });
        })
        .catch((error) => {
          toast.error("Password lama salah", {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
          });
        });
    }

    setInputAuth({
      new_password: "",
      current_password: "",
    });
  };

  function moneyFormat(number, prefix) {
    var number_string = number.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      rest = split[0].length % 3,
      rupiah = split[0].substr(0, rest),
      thousand = split[0].substr(rest).match(/\d{3}/gi);

    if (thousand) {
      let sparator = rest ? "." : "";
      rupiah += sparator + thousand.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp." + rupiah : "";
  }

  let state = {
    inputAuth,
    setInputAuth,
    fetchStatus,
    setFetchStatus,
    data,
    setData,
    inputJob,
    setInputJob,
    currentId,
    setCurrentId,
  };

  let handleFunction = {
    handleChange,
    handleLogin,
    handleRegister,
    handleLogout,
    handleSubmit,
    handleInputJob,
    handleDelete,
    fetchData,
    fetchDataDetail,
    handleEdit,
    handleChangePassword,
    moveAdd,
    moneyFormat,
  };

  return (
    <GlobalContext.Provider
      value={{
        state,
        handleFunction,
        ToastContainer,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
