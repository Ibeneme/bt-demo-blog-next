export async function convertToJpeg(file: File, quality = 0.9): Promise<File> {
  if (
    /\.(jpe?g|png)$/i.test(file.name) &&
    /^image\/(jpeg|png)$/.test(file.type)
  ) {
    return file;
  }

  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) {
    console.warn(`Could not convert ${file.name} to JPEG; uploading original.`);
    return file;
  }

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality)
  );
  if (!blob) return file;

  const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], newName, { type: "image/jpeg" });
}
