function getAlertHeaderText(alertStatus) {
  if (alertStatus === "info") return "กำลังอัพเดต";
  else if (alertStatus === "success") return "สำเร็จ";
  else if (alertStatus === "error") return "ล้มเหลว";
  else if (alertStatus === "warning") return "คำเตือน";
}

export default getAlertHeaderText;
