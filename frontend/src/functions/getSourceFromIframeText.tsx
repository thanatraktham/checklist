function getSourceFromIframeText(iframeText: string) {
  try {
    const srcText = iframeText.split(" ")[1];
    console.log(srcText.substring(5, srcText.length - 1));
    return srcText.substring(5, srcText.length - 1);
  } catch (error) {
    return "";
  }
}

export default getSourceFromIframeText;
