const url = `https://api.cloudinary.com/v1_1/dlbakzwho/image/upload`;

const uploadImage = async image => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'mebDoctorBookingApp');
  const dataresult = await fetch(url, {
    method: 'post',
    body: formData,
  });
  return dataresult.json();
};

export default uploadImage;
