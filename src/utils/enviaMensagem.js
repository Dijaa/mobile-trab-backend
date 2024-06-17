const enviaMesangem = async (numero, mensagem) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apikey", "mude-me");
    const raw = JSON.stringify({
      number: "55" + numero,
      options: {
        delay: 10,
        presence: "composing",
        linkPreview: false,
      },
      textMessage: {
        text: mensagem, 
       },
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    fetch("http://localhost:8080/message/sendText/mobile", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  
  export default enviaMesangem;