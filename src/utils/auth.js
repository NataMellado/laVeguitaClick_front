export async function fetchUserSession() {
  console.log("fetching user session")
  
  const res = await fetch("http://localhost:8000/accounts/session/", {
    method: "GET",
    credentials: "include",
  });
  if (res.ok) {
    const data = await res.json();
    console.log(data)
    return data;
  } else {
    console.log("No esta autenticado")
    return { estaAutenticado: false };
  }
}
