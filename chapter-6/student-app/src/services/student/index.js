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