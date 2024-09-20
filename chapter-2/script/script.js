const output = document.getElementById("output");
const btn = document.getElementById("btn");
const data = [
  {
    name: "Kodok Samarinda",
    nickName: "acumalaka",
    class: "FSW-1",
    address: {
      province: "East Java",
      city: "Sidoarjo",
    },
    education: {
      bachelor: "Universitas Negeri Surabaya",
    },
  },
  {
    name: "Aruffin bin Abdul Salam",
    nickName: "Udin",
    class: "FSW-1",
    address: {
      province: "East Java",
      city: "Malang",
    },
    education: {
      bachelor: "UPN Veteran East Java",
    },
  },
  {
    name: "Zhang Aiqin",
    nickName: "Eggman",
    class: "FSW-1",
    address: {
      province: "East Java",
      city: "Malang",
    },
    education: {
      bachelor: "UPN Veteran East Java",
    },
  },
  {
    name: "Abdul Somat",
    nickName: "Maling Pencit",
    class: "FSW-1",
    address: {
      province: "Lampung",
      city: "Lampung",
    },
    education: {
      bachelor: "Universitas Lampung",
    },
  },
  {
    name: "Barokah",
    nickName: "Maling Jambu",
    class: "FSW-1",
    address: {
      province: "Lampung",
      city: "Lampung",
    },
    education: {
      bachelor: "Universitas Lampung",
    },
  },
];

btn.addEventListener("click", () => {
  try {
    /*
    output.innerText = `My name is ${data[0].name}, used to called ${data[0].nickName}\n`;
    output.innerText += `There are three students, ${data[0].nickName}, ${data[1].nickName}, and ${data[2].nickName}. ${data[0].nickName} is from ${data[0].address.city}, ${data[0].address.province}. ${data[1].nickName} is from ${data[1].address.city}, ${data[1].address.province}. And ${data[2].nickName} is from ${data[2].address.city}, ${data[2].address.province}.\n`;
    */
    data.map((item) => {
      output.innerText += `My name is ${item.name}, used to called ${item.nickName}, I am from ${item.address.city}, ${item.address.province}. And i am student of ${item.education.bachelor}\n`;
    });

    output.innerText += "Yang dari djatim =";
    data.map((item) => {
      output.innerText +=
        item.address.province === "East Java" ? ` ${item.nickName},` : "";
    });

    const filterLampung = data.filter(
      (item) => item.address.province === "Lampung"
    );
    output.innerText += `yang dari lampung = ${filterLampung
      .map((item) => item.nickName)
      .join(", ")}\n`;

    const sortedName = data.slice().sort((a, b) => (a.name < b.name ? 1 : -1));
    output.innerText += `Sort urutan nama = ${sortedName
      .map((item) => item.name)
      .join(", ")}\n`;
    console.log(data)
  } catch (err) {
    output.innerText += `${err}\n`;
  }
});
