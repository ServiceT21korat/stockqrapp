
const API_URL = 'https://script.google.com/macros/s/AKfycbzNUKxf50ZSlbBxOxCt0zXR05Y2i8LAPmVnI1yc22pQsmStt76SsOa2nDBm9tdHPv63/exec';

async function loadMaterials() {
  try {
    const res = await fetch(API_URL + '?action=getMaterials');
    const data = await res.json();
    const list = document.getElementById("materialList");
    list.innerHTML = '';
    data.materials.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.code} - ${item.name} (เหลือ: ${item.stock} ${item.unit})`;
      list.appendChild(li);
    });
  } catch (err) {
    alert("โหลดรายการวัสดุไม่สำเร็จ");
    console.error(err);
  }
}

document.getElementById("withdrawForm").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const data = {
    action: "requisition",
    code: form.code.value,
    qty: Number(form.withdraw_qty.value),
    user: form.user.value
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    alert(result.message || "บันทึกการเบิกเรียบร้อย");
    loadMaterials();
    form.reset();
  } catch (err) {
    alert("เกิดข้อผิดพลาด");
    console.error(err);
  }
});

loadMaterials();
