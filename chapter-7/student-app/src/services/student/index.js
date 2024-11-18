export const allStudent = async (nickName)=>{
  const token = localStorage.getItem("token");
  let params;
  if(nickName){
    params.nickName = nickName;
  }
  let url = `${import.meta.env.VITE_API_URL}/students/` + new URLSearchParams(params);
  const res = await fetch(url,{
    headers:{authorization : `Bearer ${token}`},
    method:"GET"
  })
  const result = await res.json();
  return result;
}

export const getStudentById = async (id)=>{
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/students/${id}`,{
    headers:{authorization : `Bearer ${token}`},
    method:"GET"
  })
  const result = await res.json();
  return result;
}

export const createStudent = async (request)=>{
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/students`,{
    headers:{authorization : `Bearer ${token}`},
    method:"POST",
    body: request
  })
  const result = await res.json();
  return result;
}

export const updateStudent = async (id,request)=>{
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/students/${id}`,{
    headers:{authorization : `Bearer ${token}`},
    method:"PUT",
    body: request
  })
  const result = await res.json();
  return result;
}

export const deleteStudent = async(id)=>{
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/students/${id}`,{
    headers:{authorization : `Bearer ${token}`},
    method:"DELETE",
  })
  const result = await res.json();
  return result;
}